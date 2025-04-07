# frontend/todo-app/Dockerfile

FROM node:22 AS build

WORKDIR /app

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy .env file for Vite to use at build time
COPY .env .env

# Copy the rest of the application
COPY . .

# Build the app (Vite reads from .env here)
RUN npm run build

# Install serve to run the production build
RUN npm install -g serve

# Expose port and start the server
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
