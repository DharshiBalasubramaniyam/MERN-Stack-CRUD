<h1 align="center">🌟 MyToDo 🌟</h1>

<p align="center">
  <img alt="Static Badge" src="https://img.shields.io/badge/Node.js-darkgreen?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/Express.js-gray?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/MongoDB-lightgreen?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/JWT-orange?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/React.js-darkblue?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/Redux-purple?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/Tailwind.css-white?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/Docker-blue?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/Docker%20Compose-hotpink?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/Kubernetes-maroon?style=for-the-badge">
</p>

MyTodo is a full-stack ToDo application built using the **MERN stack** with a **microservices architecture**, featuring centralized authentication and routing, Dockerized deployment, and production-ready **Kubernetes orchestration**.
## Table of contents

1. [Hightlights](#highlights)
2. [Features](#features)
3. [Tech stack](#tech-stack)
4. [Project structure](#project-structure)
5. [How to run?](#how-to-run-the-project)
    -  [Using Kubernetes](#%EF%B8%8F-using-kubernetes)
    -  [Using docker](#-using-docker)
    -  [Manual local setup](#-without-docker-manual-local-setup)
      
## Highlights

- ✅ **Microservices** architecture (auth-service, todo-service, user-service, api-gateway)

- 🌐 **API Gateway** for centralized routing, authentication middleware, and request forwarding.

- 🔐 **JWT-based** authentication with refresh tokens

- 🧠 **MongoDB** for persistent, schema-less data storage

- 💅 Responsive frontend using **React** + **TailwindCSS**

- ⚛️ **Redux** for efficient UI and state handling

- ⚙️ All components containerized and orchestrated using **Docker Compose**.

- ☸️ Fully deployable with **Kubernetes** manifests (Deployments, Services, Ingress, ConfigMaps, Secrets).

## Features

- **🔐 Authentication**
  - Register and log in using email and password
  - Sign in with Google (OAuth2)
  - Secure JWT-based authentication with access and refresh tokens

- **📝 Todo Management**
  - Create, view, update, and delete todo items
  - Sort and filter todos by due date, status, or category
  - Mark tasks as completed or pending
  - Categorize todos for better organization

- **🏷️ Category Management**
  - Full CRUD operations for custom categories
  - Associate todos with categories for enhanced filtering

## Tech stack

- **💅 Frontend**: React + Vite + TailwindCSS

- **🌐 API Gateway**: Node.js + Express 

- **🔐 Auth Service**: Node.js + Express + JWT + MongoDB

- **✅ Todo Service**: Node.js + Express + MongoDB

- **👤 User Service**: Node.js + Express + MongoDB

- **🧠 Database**: MongoDB ATLAS

- **⚙️ Containeriztion**: Docker, Docker Compose

- **☸️ Orchestration**: Kubernetes (YAML Manifests)

- **🔄 CI/CD**: GitHub Actions

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

### ☸️ Using Kubernetes

**1. Prerequisites**

- Ensure that **Minikube** or **Docker Desktop** is installed and properly configured.
- Verify that `kubectl` is installed and operational.
- Install and configure an Ingress controller (e.g., `ingress-nginx-controller`) to manage Ingress resources.

**2. Setting up environment variables**

  - Server related environment variables are set up in [`./kubernetes/server-secret.yaml`](`./kubernetes/server-secret.yaml`)
```yaml
data:
  ACCESS_TOKEN_SECRET: YOUR_TOKEN
  REFRESH_TOKEN_SECRET: YOUR_TOKEN
  MONGODB_URL: YOUR_CONNECTION_STRING
```
  - Since Vite apps can't read environment variables at runtime after being built, During build time, we set a placeholder for env variables and at runtime (in Kubernetes), mount a Secret as a [config file](./client/public/env_config.js), and the app fetches it dynamically. You do not need to update the `window.__RUNTIME_CONFIG__` in the [env_config.js](./client/public/env_config.js). We will change that object by mounting Secret as a volume during K8s deployment. Sample object you need to provide:
```js
window.__RUNTIME_CONFIG__ = {
   VITE_BACKEND_URL: "http://myapp.local.com/api/",
   VITE_GOOGLE_CLIENT_ID: YOUR_GOOGLE_CLIENT_ID // Used to create account/login with Google in the app
};
```
  - Replace `YOUR_GOOGLE_CLIENT_ID` with your actual id in `window.__RUNTIME_CONFIG__`, and convert modified `window.__RUNTIME_CONFIG__` to base64 and provide that value in [`./kubernetes/client-secret.yaml`](`./kubernetes/client-secret.yaml`).
```yaml
data:
  env_config.js: | 
    BASE64_OF_MODIFIED_window.__RUNTIME_CONFIG__
```

  - The ports and service urls are already configured in the [./kubernetes/config-map.yaml](./kubernetes/config-map.yaml).

**3. Setting up docker images**

  - There are 2 Github Actions workflows configured in this project for building and pushing docker images to dockerhub.
    - [auto-docker-build-push](./.github/workflows/auto-docker-build-push.yaml) - This workflow automatically triggers when there is a push to the main branch. It detects which parts (client and microservices) of the project have changed, and only builds and pushes the respective Docker images for the affected services.
    - [manual-docker-build-push](./.github/workflows/manual-docker-build-push.yaml) - This workflow allows you to manually trigger a build and push for all Docker images (client and all server services), regardless of changes. You can start this workflow whenever needed from the GitHub Actions UI.
  - You can trigger second workflow from GitHub Actions UI to build and push the docker images of all components for the first time. 
  - Before triggering workflows, set `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` in your github repository secrets. 
  - After pushing images, replace placeholder `<YOUR_DOCKER_USERNAME>` in [api-gateway.yaml](./kubernetes/api-gateway.yaml), [auth-service.yaml](./kubernetes/auth-service.yaml), [todo-service.yaml](./kubernetes/todo-service.yaml), [user-service.yaml](./kubernetes/user-service.yaml), [client.yaml](./kubernetes/client.yaml), with your username, to which you pushed docker images.


**4. Apply kubernetes artifacts**
  
  - Navigate to `kubernetes` directory.
```bash
cd kubernetes
```
  - Create config map and secrets
```bash
kubectl apply -f config-map.yaml
kubectl apply -f client-secret.yaml
kubectl apply -f server-secret.yaml
```
  - Create client and server services
```bash
kubectl apply -f api-gateway.yaml
kubectl apply -f auth-service.yaml
kubectl apply -f todo-service.yaml
kubectl apply -f user-service.yaml
kubectl apply -f client.yaml
```
  - Create ingress
    - Make sure you have installed ingress controller. I have used `ingress-nginx-controller`. If you use different one, replace `ingressClassName` in [`ingress.yaml`](./kubernetes/ingress.yaml) according to your controller.
    - The ingress is listening for 2 paths.
      - Route `/`: client
      - Route `/api`: api-gateway  (prefix `/api` is stripped before reaching the gateway)
    - API Gateway then routes internally based on the prefix: 
      - `/auth`: `auth-service:9002`
      - `/todo`: `todo-service:9001`
      - `/user`: `user-service:9003`
    - The service URLs and ports used by `api-gateway` to identify services are defined in [`config-map.yaml`](./kubernetes/config-map.yaml).
    - Apply ingress file
```bash
kubectl apply -f ingress.yaml
```
  > Since, We are using a custom hostname (`myapp.local.com`) with Kubernetes Ingress, we need to map it to your local machine's IP address. So we need to edit our system's hosts file and add an entry like,
    
  > Check the external IP address assigned by the ingress using command `kubectl get ingress mytodo-ingress`. Sometimes, it may take some time to assign a IP address. In my case I am using docker desktop, so it is localhost. You may get different IP address, if you use minikube.
```bash
<YOUR_INGRESS_EXTERNAL_IP>   myapp.local.com
```
> On Linux/macOS, the hosts file is at /etc/hosts. 
On Windows, it is at C:\Windows\System32\drivers\etc\hosts.

 - Access the application.
    - Now we are done.
    - Open a browser and hit [http://myapp.local.com/](http://myapp.local.com/).
    - You should now see your deployed MyTodo application running on Kubernetes!
    - You can now register, log in, and manage your tasks.

### 🐳 Using Docker

1. Install Prerequisites - Ensure you have the following installed on your machine:
   - [Docker](https://www.docker.com/)
   - [Docker Compose](https://docs.docker.com/compose/)
   
2. Fork the repository.

3. Clone the Repository.

```bash
git clone https://github.com/<your_username>/mytodo.git
```

4. Go to the root of the project directory.

```bash
cd mytodo
```

5. Create a `.env.docker` file in the root directory (where `docker-compose.yml` is located), using [`env.docker.example`](./.env.docker.example) as a reference. Fill in the required values for the server.

6. Create a `.env` file inside the `client/` directory (where the `client/Dockerfile` exists), using [`env.example`](./client/.env.example) as a reference. Fill in the required values for the client.

7. Build and run the containers

```bash
docker-compose up --build
```
> This will build and start all services (frontend, API gateway, auth-service, todo-service, user-service, and MongoDB). Services are exposed on:
  - API Gateway: [http://localhost:9000](http://localhost:9000)
  - Frontend: [http://localhost:5173](http://localhost:5173)

8. Start using the app by visiting [http://localhost:5173](http://localhost:5173). You can now register, log in, and manage your tasks.

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

4. Install dependencies. 

```bash
npm run install-all
```
> This will run `npm install` in the `client/` and each microservice directory.

5. Each service (`api-gateway`, `auth-service`, `todo-service`, `user-service`, and the `client`) contains a `.env.example` file for local setup.

  - Create a .env file for each one based on its example.
  - Fill in all the required values.

6. Start server
```bash
npm run start-server
```

7. Start Client
```bash
npm run start-client
```

Now, visit [http://localhost:5173/](http://localhost:5173/) on the browser.
