# Use a Node.js image to build the React app
FROM node:16 AS build

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# # Serve the app with a lightweight server
# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose port 80 for serving the app
EXPOSE 3000

# # Start the server
# CMD ["nginx", "-g", "daemon off;"]

CMD ["npm","start"]
