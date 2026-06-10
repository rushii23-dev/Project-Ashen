# Stage 1: Build the Vite React App
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
# Use npm ci for strict lockfile installation
RUN npm ci

COPY . .
# Compile the typescript and build the vite static bundle (including all heavy assets in /public)
RUN npm run build

# Stage 2: Serve the static files using Nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy our custom Nginx config for SPA routing on port 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the massive static build from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the default Cloud Run port
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
