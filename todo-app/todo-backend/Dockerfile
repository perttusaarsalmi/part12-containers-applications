FROM node:20

WORKDIR /usr/src/app

# Copy package files first for better layer caching
COPY package*.json ./

# Use npm ci for production - faster and more reliable
RUN npm ci --only=production && npm cache clean --force

# Copy the rest of the application code
COPY . .

# Create non-root user for security
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
RUN chown -R appuser:appgroup /usr/src/app
USER appuser

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]