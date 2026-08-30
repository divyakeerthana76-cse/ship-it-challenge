# Ship It Challenge App

## Overview

This is the challenge application for M4: SHIP IT of the Docker x Jenkins Bootcamp.

## Application Details

- **Port**: 3000 (internal)
- **Language**: Node.js
- **Framework**: Express.js
- **Token Endpoint**: `/token`

## Challenge Overview

In M4, you will:
1. Clone this repository
2. Create your own Dockerfile from scratch
3. Create your own Jenkinsfile from scratch
4. Deploy with your team's SHIP_TOKEN
5. Retrieve token from `/token` endpoint
6. Submit on Mission Control

## Running Locally

```bash
# Install dependencies
npm install

# Run locally
npm start

# Run tests
npm test
```

Then visit:
- App: http://localhost:3000
- Token: http://localhost:3000/token

## Application Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Main page with token display |
| `/token` | GET | Returns JSON: `{"token": "SHIP-XXXX-XXXX"}` |
| `/health` | GET | Health check: `{"status": "ok"}` |

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Application port (default: 3000) | No |
| `NODE_ENV` | Environment (production/development) | No |
| `SHIP_TOKEN` | Team's unique deployment token | **Yes** |

## Docker Requirements

Your Dockerfile should:
- Use Node.js as base image (node:20-alpine recommended)
- Set WORKDIR to /app
- Copy package*.json and run npm install
- Copy application source
- Expose port 3000
- Set CMD to start node src/index.js

## Jenkinsfile Requirements

Your Jenkinsfile must have 4 stages:
1. **Build** - npm install
2. **Test** - npm test (tests must pass!)
3. **Image** - docker build
4. **Deploy** - docker run with SHIP_TOKEN

## Deployment

Build and run with Docker:
```bash
docker build -t ship-it:v1 .
docker run -d -p 3004:3000 -e SHIP_TOKEN=YOUR_TOKEN ship-it:v1
```

## Important Notes

- Tests must pass for M4 completion
- Each team has a unique SHIP_TOKEN
- The Dockerfile and Jenkinsfile must be created BY YOU - not copied
- Port 3004 is used for M4 to avoid conflicts with M1/M2/M3
