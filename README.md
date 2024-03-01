```markdown
# Vehicle Management System

## NodeJs API

This folder contains the backend Node.js application that serves as the API for the project.
The API is deployed on [Google Cloud Platform](https://inbound-hawk-415316.el.r.appspot.com).
The API endpoints are documented in the Swagger YAML file located at [NodeJs/swagger.yaml](NodeJs/swagger.yaml).

### Prerequisites

- Node.js
- MongoDB (or your preferred database)

### Installing Dependencies

# Navigate to the NodeJs folder
cd NodeJs

# Install dependencies
npm install
```

### Running the API Locally

```bash
# Start the Node.js server
npm start
```

The API will be accessible at `http://localhost:YOUR_PORT` where `YOUR_PORT` is the port specified in your environment or the default port.

## React App

The `ReactApp` folder contains the frontend code for the project. The app is deployed on [Netlify](https://whimsical-speculoos-3577d8.netlify.app).

### Prerequisites

- Node.js
- npm or yarn

### Installing Dependencies

```bash
# Navigate to the ReactApp folder
cd ReactApp

# Install dependencies
npm install
```

### Running the React App Locally

```bash
# Start the React development server
npm start
```

The app will be accessible at `http://localhost:3000` (or another available port).

## API Documentation

The API endpoints and specifications are documented in the Swagger YAML file located at [NodeJs/swagger.yaml](NodeJs/swagger.yaml). You can view the documentation using Swagger UI or any compatible Swagger viewer.

## Deployment

- **NodeJs API:** [Google Cloud Platform Deployment](https://inbound-hawk-415316.el.r.appspot.com)
- **React App:** [Netlify Deployment](https://whimsical-speculoos-3577d8.netlify.app)

The Node.js API is deployed on Google Cloud Platform, and the React App is deployed on Netlify.

