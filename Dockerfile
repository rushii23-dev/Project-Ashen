# Stage 1: Build the Vite React App
FROM node:20.19-alpine AS builder

WORKDIR /app
COPY package*.json ./
# Use npm ci for strict lockfile installation; skip lifecycle scripts for security
RUN npm ci --ignore-scripts

COPY . .
# Compile the typescript and build the vite static bundle
RUN npm run build

# Stage 2: Serve the static files using Nginx
FROM nginx:1.27-alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy our custom Nginx config for SPA routing on port 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the static build from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the default Cloud Run port
EXPOSE 8080

# Health check to verify the container is serving traffic
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
