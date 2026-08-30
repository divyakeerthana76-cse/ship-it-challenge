# Docker x Jenkins Bootcamp - Mission Guide

**Event:** Docker x Jenkins Bootcamp  
**Date:** Monday, 31 August 2026  
**Venue:** AB3 709, VIT Chennai  
**Organizer:** Code{Y}Gen - VIT Chennai

---

## Mission Overview

Welcome to the Docker x Jenkins Bootcamp! You will complete 4 missions that take you from running your first container to deploying a full CI/CD pipeline.

### Mission Timeline

| Time | Activity |
|------|----------|
| 08:45 - 09:30 | Registration & Setup |
| 09:30 - 12:00 | Expert Session + Docker Basics |
| 12:00 - 13:00 | M1 & M2 Guided Lab |
| 13:00 - 14:00 | Lunch Break |
| 14:00 - 15:15 | M3: Jenkins Lab |
| 15:15 - 16:00 | M4: Ship It Challenge |
| 16:00 - 16:45 | Awards & Closing |

---

## IMPORTANT: Port Allocation

Each mission uses a different port to avoid conflicts:

| Mission | Port | Container Name |
|---------|------|---------------|
| M1 | 3001 | m1-sample-app |
| M2 | 3002 | m2-app |
| M3 | 3003 | m3-app |
| M4 | 3004 | ship-it |

**Always check `docker ps` before starting a mission!**

---

## M1: CONTAINERIZE

**Tagline:** Run it. Then own the image.  
**Estimated Time:** 45 minutes

### What You'll Learn
- Pull and run public Docker images
- Build your own images from Dockerfiles
- Manage containers (start, stop, remove)
- Customize application code

### Prerequisites
- Docker Desktop/Engine installed and running
- Run `docker version` to confirm Docker is working
- GitHub account ready
- Sample repository cloned

### Steps

#### Level 1 - Run an Existing Image
```bash
docker run -d --name m1-welcome -p 8080:80 docker/welcome-to-docker
docker ps
```
Open http://localhost:8080 in your browser.

#### Cleanup
```bash
docker stop m1-welcome
docker rm m1-welcome
```

#### Level 2 - Build Your Own Image
```bash
cd sample-app
docker build -t <your-username>/sample-app:v1 .
docker images
```

#### Level 3 - Customize the Application
1. Edit the application code (change the headline text)
2. Rebuild with v2 tag:
```bash
docker build -t <your-username>/sample-app:v2 .
docker run -d --name m1-sample-app -p 3001:3000 <your-username>/sample-app:v2
```
3. Open http://localhost:3001 to see your customized app

### Hints
- Docker daemon running? `docker version` must show both client AND server
- Build context matters: run `docker build` from the folder with the Dockerfile
- Port 3001 for M1 to avoid conflicts

---

## M2: BUILD

**Tagline:** Write the Dockerfile. Read every layer.  
**Estimated Time:** 40 minutes

### Prerequisites
- M1 VERIFIED
- Sample app builds with your tag

### Steps

#### Read the Dockerfile
```bash
cat Dockerfile
```
Understand: FROM, WORKDIR, COPY, RUN, EXPOSE, CMD

#### Improve the Build
Key improvement: Copy package.json BEFORE source code for caching:
```bash
docker build -t <your-username>/sample-app:v3 .
```

#### Clean up M1 first
```bash
docker rm -f m1-sample-app
```

#### Verify from Clean Slate
```bash
docker run -d --name m2-app -p 3002:3000 <your-username>/sample-app:v3
curl http://localhost:3002
```

### Hints
- Layer caching: COPY package.json + install FIRST, then COPY code
- M2 uses port 3002

---

## M3: AUTOMATE

**Tagline:** Green pipeline or it didn't happen.  
**Estimated Time:** 60 minutes

### Prerequisites
- M2 VERIFIED
- Jenkins accessible in lab
- Code pushed to GitHub
- Jenkinsfile in repository

### Steps

#### Level 1 - Connect GitHub to Jenkins
1. Open Jenkins → "New Item" → "Pipeline"
2. Select "Pipeline script from SCM"
3. Set Git → Repository URL
4. Add credentials if private repo

#### Level 2 - Understand the Jenkinsfile
```bash
cat Jenkinsfile
```
4 stages: Build, Test, Image, Deploy

#### Level 3 - Run the Pipeline
```bash
git add . && git commit -m 'trigger' && git push
```
Or click "Build Now" in Jenkins.

#### Level 4 - Verify Deployment
All 4 stages should be GREEN.

### Architecture Note
For M3, Jenkins runs on the lab server. Ask mentors for the correct deployment URL format - it may not be localhost.

---

## M4: SHIP IT

**Tagline:** Fresh app. No hand-holding. Deploy it.  
**Estimated Time:** 45 minutes

### IMPORTANT: This is an independent challenge!

You must create your own Dockerfile and Jenkinsfile. The challenge app provides only the application code.

### Prerequisites
- M3 VERIFIED
- Challenge repo URL from organizers
- Your team's SHIP_TOKEN from mission control

### What You Need to Figure Out

The challenge app gives you:
- Application port: 3000
- Start command: `npm start`
- Test command: `npm test` (tests MUST pass!)
- SHIP_TOKEN environment variable required

### Steps

#### Step 1: Clone & Run Locally
```bash
git clone <challenge-repo-url>
cd <repo-name>
npm install
npm start
```
Open http://localhost:3000

#### Step 2: Create Dockerfile
Create a Dockerfile. Requirements:
- Node.js base image (node:20-alpine recommended)
- WORKDIR set to /app
- Copy package.json first, then run npm install
- Copy source code
- EXPOSE 3000
- CMD to start node src/index.js

Build and test:
```bash
docker build -t ship-it:v1 .
docker run -d --name ship-it -p 3004:3000 -e SHIP_TOKEN=<your-token> ship-it:v1
```

#### Step 3: Create Jenkinsfile
Create a Jenkinsfile with 4 stages:
1. **Build** - npm install
2. **Test** - npm test (tests MUST pass - no `|| true`!)
3. **Image** - docker build
4. **Deploy** - docker run with SHIP_TOKEN

#### Step 4: Run Pipeline
```bash
git add . && git commit -m 'ship it' && git push
```
All 4 stages must be GREEN.

#### Step 5: Get Your Token
```bash
curl http://localhost:3004/token
```
Submit the token on Mission Control!

### Verification
- [ ] App runs locally without Docker
- [ ] Dockerfile created (you figure this out!)
- [ ] Tests pass (no cheating with `|| true`)
- [ ] Jenkinsfile created (you figure this out!)
- [ ] Pipeline all green
- [ ] SHIP token retrieved and submitted

### Common Errors

| Error | Fix |
|-------|-----|
| Token rejected | Copy EXACTLY with SHIP- prefix and dashes |
| Tests fail | Fix your tests - `npm test || true` is NOT allowed |
| App won't start | `docker logs ship-it` to see errors |

---

## Environment Variables

### Challenge App (M4)
| Variable | Required | Default |
|----------|----------|---------|
| `PORT` | No | 3000 |
| `NODE_ENV` | No | development |
| `SHIP_TOKEN` | **Yes** | Your team's token |

### Running Locally
```bash
npm install
npm start
npm test  # Must pass!
```

---

## Resources

### Docker
- [Docker Getting Started](https://docs.docker.com/get-started/)
- [Dockerfile Reference](https://docs.docker.com/reference/dockerfile/)

### Jenkins
- [Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)

---

## Need Help?

- **Mentors** are circulating - raise your hand
- Check error tables in Mission Control
- Ask your teammate - collaboration is encouraged!

---

**Good luck! Remember: CODE. CONTAINERIZE. AUTOMATE. DEPLOY.**
