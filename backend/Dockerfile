# Dockerfile for Node.js/Express.js backend (production)

# Use an official Node.js runtime as a parent image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the application files to the working directory
COPY . .

# Expose the port on which the app runs
EXPOSE 3000

# Command to run the application in production mode
CMD ["npm", "start"]
