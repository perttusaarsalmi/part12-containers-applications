FROM node:20

WORKDIR /usr/src/app

# Copy package files first for better layer caching
COPY package*.json ./

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# Copy the rest of the source code
COPY . .

# npm run dev is the command to start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]