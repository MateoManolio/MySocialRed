# Dockerfile for Angular frontend (production)

# Use an official Node.js runtime as a parent image for building
FROM node:lts-alpine as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files to the working directory
COPY . .

# Build the Angular application for production
RUN npm run build --prod

# Use Nginx as a lightweight, efficient web server
FROM nginx:alpine

# Copy the built Angular app from the build stage to the default Nginx public directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose the port on which Nginx runs
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
