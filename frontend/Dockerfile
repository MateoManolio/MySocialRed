# Dockerfile for Angular frontend (production)

# Use an official Node.js runtime as a parent image for building
FROM node:lts-alpine as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./


RUN npm ci

# Copy the application files to the working directory
COPY . .

# Build the Angular application for production
RUN npm run build

# Use Nginx as a lightweight, efficient web server
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose the port on which Nginx runs
EXPOSE 80
