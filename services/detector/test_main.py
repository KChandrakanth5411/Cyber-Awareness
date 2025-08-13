import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "Phishing Detector API" in response.json()["message"]

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_detect_phishing():
    test_data = {
        "subject": "Urgent: Your account has been compromised",
        "body": "Dear user, your account has been compromised. Click here to reset your password: http://suspicious-link.com",
        "sender": "security@suspicious-domain.com"
    }
    
    response = client.post("/detect", json=test_data)
    assert response.status_code == 200
    
    result = response.json()
    assert "score" in result
    assert "is_phishing" in result
    assert "indicators" in result
    assert isinstance(result["indicators"], list)

def test_check_url():
    test_data = {
        "url": "http://suspicious-phishing-site.com/login"
    }
    
    response = client.post("/check-url", json=test_data)
    assert response.status_code == 200
    
    result = response.json()
    assert "is_malicious" in result
    assert "risk_score" in result
    assert "categories" in result
    assert isinstance(result["categories"], list)