# Use official Node.js image as the base
FROM node:22 AS build

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of your application
COPY . .

# Build the React app
RUN npm run build

# Serve the app using a simple server like 'serve' or similar
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 5000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "5000"]
