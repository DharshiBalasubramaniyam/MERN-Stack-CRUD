<h1 align="center">🌟 MyToDo 🌟</h1>

<p align="center">
  <img alt="Static Badge" src="https://img.shields.io/badge/Node.js-darkgreen?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/Express.js-gray?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/MongoDB-lightgreen?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/React.js-darkblue?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/Redux-purple?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/Tailwind.css-white?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/Docker-blue?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/Docker%20Compose-hotpink?style=for-the-badge">
</p>

MyTodo is a full-stack, containerized task management application built with a microservices architecture. It features a clean React frontend, a secure authentication system using JWT, and backend services for managing user tasks—all connected through an API Gateway and orchestrated via Docker Compose.

## Table of contents

1. [Hightlights](#highlights)
2. [Tech stack](#tech-stack)
3. [Project structure](#project-structure)
4. [How to run?](#how-to-run-the-project)
    -  [Using docker](#-using-docker)
    -  [Manual local setup](#-without-docker-manual-local-setup)
      
## Highlights

✅ Microservices architecture (auth-service, todo-service, api-gateway)

🌐 API Gateway for centralized routing

🔐 JWT-based authentication with refresh tokens

🧠 MongoDB for persistent, schema-less data storage

⚙️ Docker Compose for easy orchestration and networking

💅 Responsive frontend using React + TailwindCSS

⚛️ Redux for efficient UI and state handling


## Tech stack

**💅 Frontend**: React + Vite + TailwindCSS

**🌐 API Gateway**: Node.js + Express (handles routing and service communication)

**🔐 Auth Service**: Node.js + Express + JWT + MongoDB

**✅ Todo Service**: Node.js + Express + MongoDB

**🧠 Database**: MongoDB (containerized)

**⚙️ DevOps**: Docker, Docker Compose, custom network (bridge)


## Project structure

```bash
├ mytodo
  ├──client/ # Frontend react + vite application
  │  ├──nginx/ # Nginx configuration for docker containerization
  │  │  └──default.conf
  │  ├──public/ 
  │  │  └──env_config.js # Runtime environment variables configuration for K8s deployment
  │  ├──src/
  │  ├──Dockerfile 
  │  └──.env # Environment variables configuration for both manual(local) and docker deployment
  ├──server/ # Collection of microservices
  │  ├──api-gateway # Handles centralized authentication and routing 
  │  │  ├──middlewares/
  │  │  ├──gateway.js
  │  │  ├──Dockerfile 
  │  │  └──.env # Environment variables configuration for manual(local) deployment
  │  ├──auth-service # Handles user registration, login and refresh tokens
  │  │  ├──config/ # Database connection configuration
  │  │  ├──controllers/
  │  │  ├──middlewares/
  │  │  ├──models/
  │  │  ├──routes/
  │  │  ├──utils/
  │  │  ├──app.js
  │  │  ├──Dockerfile 
  │  │  └──.env # Environment variables configuration for manual(local) deployment
  │  ├──todo-service # Handles todo tasks management
  │  │  ├──config/ # Database connection configuration
  │  │  ├──controllers/
  │  │  ├──middlewares/
  │  │  ├──models/
  │  │  ├──routes/
  │  │  ├──app.js
  │  │  ├──Dockerfile 
  │  │  └──.env # Environment variables configuration for manual(local) deployment
  │  └──user-service # Handles category and profile management
  │  │  ├──config/ # Database connection configuration
  │  │  ├──controllers/
  │  │  ├──middlewares/
  │  │  ├──models/
  │  │  ├──routes/
  │  │  ├──app.js
  │  │  ├──Dockerfile 
  │  │  └──.env # Environment variables configuration for manual(local) deployment
  ├──kubernetes/ # Collection of artifacts for k8s deployment
  │  ├──api-gateway.yaml # K8s config for api gateway deployment and service
  │  ├──auth-service.yaml # K8s config for auth service deployment and service 
  │  ├──todo-service.yaml # K8s config for todo service deployment and service
  │  ├──user-service.yaml # K8s config for user service deployment and service
  │  ├──config-map.yaml # K8s config map variables for both server and client
  │  ├──client-secret.yaml # K8s secrets for client application
  │  ├──server-secret.yaml # K8s secrets for microservices
  │  └──ingress.yaml 
  ├──docker-compose.yml # Docker compose file
  ├──env.docker # Environment variables of server for docker deployment
  └──package.json # Centalized script management
```

## How to run the project?

### 🐳 Using Docker

1. Make sure you have the following installed: Docker and Docker compose
   
2. Fork the repository.

3. Clone the Repository.

```bash
git clone https://github.com/<your_username>/mytodo.git
```

4. Go to the root of the project directory.

```bash
cd mytodo
```

5. Create a `.env` file at the root (Where the `docker-compose.yml` exists) similar to `env.example` and fill in missing values. This file contains the environment variables needed to run inside docker.

6. Build and run the containers

```bash
docker-compose up --build
```
> This will build and start all services (frontend, api-gateway, auth-service, todo-service, and MongoDB) and expose ports:
Frontend: [http://localhost:5173](http://localhost:5173)
API Gateway: [http://localhost:9000](http://localhost:9000)

7. Start using the app by visiting [http://localhost:5173](http://localhost:5173). Register, log in and manage tasks.

### 💻 Without Docker (Manual local setup)

1. Fork the repository.

2. Clone the Repository.

```bash
git clone https://github.com/<your_username>/mytodo.git
```

3. Go to the root of the project directory.

```bash
cd mytodo
```

4. Install dependencies. Navigate to server and client  and install dependencies.

```bash
cd server/api-gateway
npm install

cd ../auth-service
npm install

cd ../todo-service
npm install

cd ../../client
npm install
```

5. Setting up environment variables. Each part(api-gateway, auth-service, todo-service and client) contains its own `.env.example` file for local setup.  Create a respective `.env` file for each one and fill missing values.

6. Create a MongoDB connection.

7. Run backend services.

```bash
npm start
```
 
8. Run the client

```bash
npm run dev
```

Now, visit [http://localhost:5173/](http://localhost:5173/) on the browser.
