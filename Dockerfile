FROM node:14-alpine

# Backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend/ .
CMD ["npm", "start"]

# Frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build
CMD ["npx", "serve", "-s", "build"]