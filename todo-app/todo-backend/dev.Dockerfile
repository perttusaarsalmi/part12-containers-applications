FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# Use npm install for development mode
RUN npm install

COPY . .

# Expose the port
EXPOSE 3000

# Use nodemon for development with hot reload
CMD ["npm", "run", "dev"]