# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./


# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .
# Build the Next.js project

RUN npm run build
# Expose the port the app runs on

EXPOSE 3000
# Start the Next.js application

CMD ["npm","start"]
