# Use an official Node.js runtime as a base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the dist directory
COPY out/dist /usr/src/app

# Change to the app directory
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install --omit-dev=true

# Change back to the main working directory
WORKDIR /usr/src/app

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["node", "apps/api/server.js"]
