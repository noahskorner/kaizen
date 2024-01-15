# Use an official Node.js runtime as a base image
FROM node:20.9.0-alpine

# Set npm to a specific version
RUN npm install -g npm@10.2.2

# Clear npm's cache
RUN npm cache clean --force

# Copy the package*.json files
COPY out/json /usr/src/app

# Change to the working directory
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install --omit-dev=true

# Generate prisma client
RUN npx prisma generate

# Copy the rest of the application
COPY out/full/dist /usr/src/app

# Change to the working directory
WORKDIR /usr/src/app

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["node", "apps/api/src/server.js"]
