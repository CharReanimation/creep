# Use official Node.js image as base
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the React app for production
RUN npm run build

# Nginx
FROM nginx:alpine

# Set the working directory in the container
WORKDIR /app

# Copy the built files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port the app will run on
EXPOSE 8080

# Start the server
