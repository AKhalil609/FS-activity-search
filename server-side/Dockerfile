# Stage 1: Build
FROM node:18 AS build

# Create and set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Production Image
FROM node:18-slim

# Create and set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/package.json /app/yarn.lock ./
COPY --from=build /app/dist ./dist

# Install only production dependencies
RUN yarn install --production

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
