# Entity-based E-commerce Frontend
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy root package files for workspace context
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# Copy entity frontend package files
COPY entity-based-ecommerce/frontend/package.json ./entity-based-ecommerce/frontend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy entity frontend source code
COPY entity-based-ecommerce/frontend/ ./entity-based-ecommerce/frontend/

# Set working directory to the frontend
WORKDIR /app/entity-based-ecommerce/frontend

# Build the application
RUN pnpm build

# Expose port
EXPOSE 4001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4001 || exit 1

# Start the application
CMD ["pnpm", "preview", "--port", "4001", "--host", "0.0.0.0"]
