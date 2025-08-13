# Changelog

All notable changes to the Gamified Cyber Awareness Platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2023-12-01

### Added

- Initial release of the Gamified Cyber Awareness Platform
- React frontend with Vite and Tailwind CSS
- Express API server with JWT authentication
- Python FastAPI detector service for phishing analysis
- Docker Compose setup for local development
- CI/CD pipeline with GitHub Actions
- Vercel deployment configuration
- Database schema for PostgreSQL (Supabase)
- User authentication and profile management
- Quiz system with phishing examples
- Leaderboard functionality
- Admin dashboard for campaign management
- Email and URL phishing detection

### Security

- Password hashing with bcrypt
- JWT authentication with configurable expiration
- Input validation on all API endpoints
- CORS protection
- Secure HTTP headers using Helmet