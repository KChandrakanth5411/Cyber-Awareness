# Contributing to Gamified Cyber Awareness Platform

Thank you for considering contributing to the Gamified Cyber Awareness Platform! This document outlines the process for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How Can I Contribute?

### Reporting Bugs

Bugs are tracked as GitHub issues. Create an issue and provide the following information:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the bug
- Provide specific examples (screenshots, error messages, etc.)
- Describe the behavior you observed and what you expected to see
- Include any relevant context (browser, operating system, etc.)

### Suggesting Enhancements

Enhancement suggestions are also tracked as GitHub issues. When creating an enhancement suggestion, include:

- A clear and descriptive title
- A detailed description of the proposed functionality
- Any potential implementation approaches you have in mind
- Why this enhancement would be useful to most users

### Pull Requests

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes
4. Run tests to ensure your changes don't break existing functionality
5. Submit a pull request

## Development Setup

### Prerequisites

- Node.js 18+
- Python 3.9+
- Docker and Docker Compose (optional, for local development)

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/yourusername/gamified-cyberawareness.git
cd gamified-cyberawareness
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

## Coding Guidelines

### JavaScript/React

- Follow the ESLint configuration provided in the project
- Use functional components and hooks for React components
- Write meaningful comments for complex logic
- Use descriptive variable and function names

### Python

- Follow PEP 8 style guide
- Use type hints where appropriate
- Document functions and classes with docstrings

### Testing

- Write tests for new features and bug fixes
- Ensure all tests pass before submitting a pull request
- Aim for good test coverage

## Git Workflow

- Create a new branch for each feature or bug fix
- Use descriptive branch names (e.g., `feature/user-authentication`, `fix/login-validation`)
- Make small, focused commits with clear messages
- Keep pull requests focused on a single feature or bug fix

## Review Process

All submissions require review. We use GitHub pull requests for this purpose.

1. Submit a pull request with a clear description of the changes
2. Address any feedback from reviewers
3. Once approved, your changes will be merged

## License

By contributing to this project, you agree that your contributions will be licensed under the project's MIT License.