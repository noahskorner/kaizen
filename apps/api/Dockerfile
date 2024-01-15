# Use an official Node.js runtime as a base image
FROM node:20.9.0-alpine

# Set npm to a specific version
RUN npm install -g npm@10.2.2

# Copy the package*.json files
COPY out/json /usr/src/app

# Change to the working directory
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install --omit-dev=true

# Copy the rest of the application
COPY out/full/dist /usr/src/app

# Generate prisma client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["node", "apps/api/src/index.js"]
