# Phishing Detection Service

This microservice provides AI-powered phishing detection capabilities for the Gamified Cyber Awareness Platform. It analyzes emails and URLs to identify potential phishing attempts and provides detailed feedback on suspicious elements.

## Features

- Email phishing detection
- URL safety checking
- Detailed analysis of suspicious elements
- Risk scoring and categorization

## Setup

### Prerequisites

- Python 3.9+
- pip

### Installation

1. Create a virtual environment:

```bash
python -m venv venv
```

2. Activate the virtual environment:

```bash
# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

5. Edit the `.env` file with your configuration settings.

## Running the Service

```bash
python main.py
```

The service will be available at http://localhost:8001 by default.

## API Endpoints

### Health Check

```
GET /health
```

Returns the service status.

### Phishing Detection

```
POST /detect
```

Analyzes an email for phishing indicators.

Example request:

```json
{
  "email": {
    "sender": "security@bankofamerica-secure.com",
    "subject": "Urgent: Your Account Has Been Compromised",
    "body": "Dear Customer, We have detected suspicious activity on your account. Click the link below to verify your identity and secure your account immediately.",
    "links": ["https://bank0famerica-secure.com/verify"],
    "attachments": []
  },
  "check_links": true,
  "check_attachments": true,
  "check_sender": true
}
```

### URL Check

```
POST /check-url
```

Checks if a URL is potentially malicious.

Example request:

```json
{
  "url": "https://bank0famerica-secure.com/verify"
}
```

## Integration with Main Application

The main API service communicates with this detector service to analyze phishing content. Configure the `DETECTOR_URL` in the main API's `.env` file to point to this service.

## Development

### Adding New Detection Features

To enhance the detection capabilities:

1. Modify the `detect_phishing` function in `main.py`
2. Add new indicator types and detection logic
3. Update the response models if necessary

### Testing

Manual testing can be performed using the Swagger UI available at http://localhost:8001/docs when the service is running.