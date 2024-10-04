FROM node:16 as backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
RUN npm install node-fetch@2
CMD ["node", "app.js"]

FROM node:16 as frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

COPY frontend/ .

# Build the React app
RUN npm run build

# Expose the port
EXPOSE 8080

# Use the 'start' script to run the app
CMD ["npm", "start"]
