# Stage 1: Build the Vite React App
FROM node:20.19-alpine AS builder

WORKDIR /app
COPY package*.json ./
# Use npm ci for strict lockfile installation; skip lifecycle scripts for security
RUN npm ci --ignore-scripts

COPY . .
# Compile the typescript and build the vite static bundle
RUN npm run build

# Stage 2: Serve the static files using a non-root (unprivileged) Nginx.
# nginxinc/nginx-unprivileged runs as uid 101 and listens on 8080 by default,
# so no process ever runs as root in the final image.
FROM nginxinc/nginx-unprivileged:1.27-alpine

# Briefly elevate only to lay down config and assets, then drop privileges again.
USER root

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy our custom Nginx config for SPA routing on port 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the static build from the builder stage, owned by the unprivileged user
COPY --from=builder --chown=101:101 /app/dist /usr/share/nginx/html

# Run the container as the built-in non-root user — never as root
USER 101

# Expose the default Cloud Run port
EXPOSE 8080

# Health check to verify the container is serving traffic
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
