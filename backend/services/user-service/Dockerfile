# Node
FROM node:18

# Work Dir
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copy Code
COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]
