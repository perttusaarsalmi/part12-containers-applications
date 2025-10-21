# Build stage
FROM node:20 AS build-stage

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Run tests (this will fail the build if tests fail)
RUN npm test

# Set the build-time environment variable
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Build the application
RUN npm run build

# Production stage
FROM nginx:1.25-alpine

# Copy the built application from build stage
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]