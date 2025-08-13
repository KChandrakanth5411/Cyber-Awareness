# Gamified Cyber Awareness Platform

A real-time, gamified phishing awareness and detection platform designed to educate users about cyber security threats through interactive quizzes, simulated phishing scenarios, and competitive leaderboards.

## Features

- **Interactive Phishing Quizzes**: Test your ability to identify phishing attempts with real-world examples
- **Real-time Leaderboards**: Compete with colleagues and track your progress
- **Personalized Dashboard**: View your stats, badges, and improvement areas
- **Admin Controls**: Create campaigns, manage users, and view analytics
- **AI-Powered Detection**: Analyze emails and URLs for phishing indicators

## Tech Stack

- **Frontend**: React with Vite, Tailwind CSS
- **API**: Node.js (Express)
- **Detection Service**: Python (FastAPI)
- **Database**: PostgreSQL (via Supabase)
- **Deployment**: Vercel (Frontend & API), Docker (local development)

## Repository Structure

```
├── .github/            # GitHub Actions workflows
├── apps/
│   ├── web-frontend/   # React frontend application
│   └── api/            # Express API server
├── services/
│   └── detector/       # Python FastAPI detection service
├── infra/              # Infrastructure as code, DB schemas
└── docker-compose.yml  # Docker configuration
```

## Quickstart

### Prerequisites

- Node.js 18+
- Python 3.9+
- Docker and Docker Compose (optional, for local development)

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/Chandrakanth-CyberK/Cyber-Awareness.git
cd Cyber-Awareness
```

2. Set up environment variables:

```bash
# For the API
cp apps/api/.env.example apps/api/.env

# For the detector service
cp services/detector/.env.example services/detector/.env
```

3. Start with Docker Compose (recommended):

```bash
docker-compose up
```

Or start each service individually:

```bash
# Frontend
cd apps/web-frontend
npm install
npm run dev

# API
cd apps/api
npm install
npm run dev

# Detector Service
cd services/detector
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

4. Access the services:

- Frontend: http://localhost:3000
- API: http://localhost:5000
- Detector Service: http://localhost:8001
- API Documentation: http://localhost:5000/api-docs
- Detector Documentation: http://localhost:8001/docs

## Environment Variables

### API (.env)

```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
FRONTEND_URL=http://localhost:3000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000
VITE_DETECTOR_URL=http://localhost:8001
```

### Detector Service (.env)

```
API_KEY=your_api_key
MODEL_PATH=./models/phishing_model.pkl
LOG_LEVEL=INFO
```

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

- Linting and testing for all services
- Docker build verification
- Automatic deployment to Vercel for production branches

### Safety & Security

- All passwords are hashed using bcrypt
- JWT authentication with configurable expiration
- Input validation on all API endpoints
- CORS protection configured for production

### UX Considerations

- Mobile-responsive design
- Accessible UI components
- Progressive enhancement
- Offline support for quiz taking

## Future Roadmap

- Integration with email providers for real phishing simulations
- Advanced analytics and reporting
- Team-based competitions
- Customizable training paths
- Multi-language support

## License

MIT