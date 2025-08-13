FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Use a lightweight node image for serving the built app
FROM node:18-alpine

WORKDIR /app

# Install serve to run the application
RUN npm install -g serve

# Copy the build from the previous stage
COPY --from=0 /app/dist /app

# Expose the port the app will run on
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", ".", "-l", "3000"]