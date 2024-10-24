# Base image for Node.js
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json /app

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application (if required for production)
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Nuxt app in production mode
CMD ["npm", "run", "start"]
