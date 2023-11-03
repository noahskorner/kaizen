# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /kaizen

# Copy your project files into the container
COPY . .

# Install project dependencies
RUN npm install

# Define the command to run when the container starts
CMD ["npm", "test"]