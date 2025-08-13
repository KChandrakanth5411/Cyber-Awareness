from fastapi import FastAPI, HTTPException, Depends, Body, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uvicorn
import os
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Phishing Detection Service",
    description="API for detecting phishing attempts in emails and URLs",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000"), os.getenv("API_URL", "http://localhost:5000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class EmailContent(BaseModel):
    sender: str
    subject: str
    body: str
    links: Optional[List[str]] = []
    attachments: Optional[List[str]] = []

class PhishingDetectionRequest(BaseModel):
    email: EmailContent
    check_links: Optional[bool] = True
    check_attachments: Optional[bool] = True
    check_sender: Optional[bool] = True

class PhishingIndicator(BaseModel):
    type: str  # e.g., "sender", "link", "content", "attachment"
    confidence: float  # 0.0 to 1.0
    description: str
    evidence: str

class PhishingDetectionResponse(BaseModel):
    is_phishing: bool
    confidence: float  # 0.0 to 1.0
    indicators: List[PhishingIndicator] = []
    safe_elements: List[str] = []
    overall_risk: str  # "low", "medium", "high", "critical"
    analysis_time_ms: float

class URLCheckRequest(BaseModel):
    url: str

class URLCheckResponse(BaseModel):
    url: str
    is_malicious: bool
    confidence: float
    category: Optional[str] = None  # e.g., "phishing", "malware", "legitimate"
    risk_score: float  # 0.0 to 1.0

# Mock detection function (to be replaced with actual ML model)
def detect_phishing(email_content: EmailContent) -> PhishingDetectionResponse:
    # This is a placeholder for the actual ML-based detection
    # In a real implementation, this would use NLP and other techniques
    
    indicators = []
    safe_elements = []
    is_phishing = False
    confidence = 0.0
    
    # Check sender domain
    sender = email_content.sender.lower()
    if "bank" in sender and not sender.endswith((".com", ".org", ".net", ".gov")):
        is_phishing = True
        confidence = max(confidence, 0.85)
        indicators.append(PhishingIndicator(
            type="sender",
            confidence=0.85,
            description="Suspicious sender domain",
            evidence=f"Sender '{sender}' appears to impersonate a bank but uses an unusual domain"
        ))
    elif "@" in sender:
        safe_elements.append("Sender email format appears normal")
    
    # Check for suspicious links
    for link in email_content.links:
        link_lower = link.lower()
        if "bank" in link_lower and not any(domain in link_lower for domain in [".com/", ".org/", ".net/", ".gov/"]):
            is_phishing = True
            confidence = max(confidence, 0.9)
            indicators.append(PhishingIndicator(
                type="link",
                confidence=0.9,
                description="Suspicious URL",
                evidence=f"Link '{link}' appears to impersonate a bank website"
            ))
        elif link_lower.count("http") > 1:
            is_phishing = True
            confidence = max(confidence, 0.95)
            indicators.append(PhishingIndicator(
                type="link",
                confidence=0.95,
                description="URL obfuscation detected",
                evidence=f"Link '{link}' contains multiple http protocols, suggesting obfuscation"
            ))
        else:
            safe_elements.append(f"Link '{link}' appears normal")
    
    # Check email body for common phishing language
    body_lower = email_content.body.lower()
    suspicious_phrases = [
        "urgent", "immediate action", "verify your account", 
        "suspicious activity", "click here", "confirm your details",
        "your account will be suspended", "security alert"
    ]
    
    found_phrases = [phrase for phrase in suspicious_phrases if phrase in body_lower]
    if found_phrases:
        phrase_confidence = min(0.7 + (len(found_phrases) * 0.05), 0.9)
        is_phishing = True
        confidence = max(confidence, phrase_confidence)
        indicators.append(PhishingIndicator(
            type="content",
            confidence=phrase_confidence,
            description="Suspicious language detected",
            evidence=f"Email contains phishing indicators: {', '.join(found_phrases)}"
        ))
    else:
        safe_elements.append("Email content does not contain common phishing phrases")
    
    # Determine overall risk
    risk_level = "low"
    if confidence > 0.8:
        risk_level = "critical"
    elif confidence > 0.6:
        risk_level = "high"
    elif confidence > 0.3:
        risk_level = "medium"
    
    return PhishingDetectionResponse(
        is_phishing=is_phishing,
        confidence=confidence,
        indicators=indicators,
        safe_elements=safe_elements,
        overall_risk=risk_level,
        analysis_time_ms=123.45  # Mock analysis time
    )

# Mock URL checker (to be replaced with actual implementation)
def check_url(url: str) -> URLCheckResponse:
    # This is a placeholder for actual URL checking logic
    is_malicious = False
    confidence = 0.1
    category = "legitimate"
    risk_score = 0.1
    
    suspicious_patterns = [
        "phish", "secure", "login", "verify", "bank", "paypal", "signin",
        ".ru", ".xyz", ".tk", "bit.ly", "goo.gl"
    ]
    
    url_lower = url.lower()
    
    # Check for suspicious patterns
    for pattern in suspicious_patterns:
        if pattern in url_lower:
            is_malicious = True
            confidence = 0.7
            category = "phishing"
            risk_score = 0.7
            break
    
    # Check for URL obfuscation
    if url_lower.count("http") > 1 or "@" in url_lower:
        is_malicious = True
        confidence = 0.9
        category = "phishing"
        risk_score = 0.9
    
    # Check for IP address instead of domain
    import re
    ip_pattern = re.compile(r'^https?://\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}')
    if ip_pattern.match(url_lower):
        is_malicious = True
        confidence = 0.8
        category = "suspicious"
        risk_score = 0.8
    
    return URLCheckResponse(
        url=url,
        is_malicious=is_malicious,
        confidence=confidence,
        category=category,
        risk_score=risk_score
    )

# Routes
@app.get("/")
async def root():
    return {"message": "Phishing Detection Service API"}

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "phishing-detector", "version": "1.0.0"}

@app.post("/detect", response_model=PhishingDetectionResponse)
async def detect_phishing_email(request: PhishingDetectionRequest):
    try:
        result = detect_phishing(request.email)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/check-url", response_model=URLCheckResponse)
async def check_url_endpoint(request: URLCheckRequest):
    try:
        result = check_url(request.url)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the application
if __name__ == "__main__":
    port = int(os.getenv("PORT", 8001))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)