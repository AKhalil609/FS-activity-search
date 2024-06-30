FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN yarn build

# Use an nginx server to serve the build files
FROM nginx:1.19.0
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port on which the app will run
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
