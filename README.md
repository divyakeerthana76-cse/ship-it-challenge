# Ship It Challenge App

## Overview

This is the challenge application for M4: SHIP IT of the Docker × Jenkins Bootcamp.

## Application Details

- **Port**: 3000
- **Language**: Node.js
- **Framework**: Express.js
- **Token Endpoint**: `/token`

## Running Locally

```bash
# Install dependencies
npm install

# Run locally
npm start

# Run tests
npm test
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Application port (default: 3000) | No |
| `NODE_ENV` | Environment (production/development) | No |
| `SHIP_TOKEN` | Team's unique deployment token | **Yes** |

## Example

```bash
SHIP_TOKEN=SHIP-A82F-19D4 npm start
```

Then visit:
- App: http://localhost:3000
- Token: http://localhost:3000/token

## Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Main page with token display |
| `/token` | GET | Returns JSON: `{"token": "SHIP-XXXX-XXXX"}` |
| `/health` | GET | Health check: `{"status": "ok"}` |

## Docker

Build and run with Docker:

```bash
docker build -t ship-it:v1 .
docker run -d -p 3000:3000 -e SHIP_TOKEN=SHIP-A82F-19D4 ship-it:v1
```

## Challenge Flow

1. Clone this repository
2. Create your own `Dockerfile`
3. Create your own `Jenkinsfile`
4. Set up CI/CD pipeline
5. Deploy with your team's `SHIP_TOKEN`
6. Retrieve token from `/token` endpoint
7. Submit on Mission Control

## For Organizers

Generate unique tokens for each team and share them securely. Each team needs:
1. Their unique `SHIP_TOKEN`
2. The repository URL
3. This README

The token format is: `SHIP-XXXX-XXXX`
