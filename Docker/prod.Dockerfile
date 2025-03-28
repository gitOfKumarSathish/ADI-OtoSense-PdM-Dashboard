FROM node:22-alpine

LABEL version="1.0.0" \
  copyright="Copyright 2025. Analog Devices Inc. All rights reserved."

# Install Git
RUN apk add --no-cache git

WORKDIR /usr/src/app

# Install Angular CLI globally (optional if you have it as a devDependency)
RUN npm install -g @angular/cli@19

# Copy the package.json and package-lock.json (if present) first to install dependencies
COPY package*.json ./

Copy . .

# Install dependencies
RUN npm ci --verbose
  
EXPOSE 4200

