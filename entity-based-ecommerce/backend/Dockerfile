# Entity-based E-commerce Backend
FROM node:18-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy root package files for workspace context
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# Copy entity backend package files
COPY entity-based-ecommerce/backend/package.json ./entity-based-ecommerce/backend/

# Install dependencies for the entire workspace
RUN pnpm install --frozen-lockfile

# Copy entity backend source code
COPY entity-based-ecommerce/backend/ ./entity-based-ecommerce/backend/

# Set working directory to the backend
WORKDIR /app/entity-based-ecommerce/backend

# Generate Prisma client using the filter to ensure correct context
RUN cd /app && pnpm --filter entity-backend db:generate

# Build the application
RUN cd /app && pnpm --filter entity-backend build

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1

# Start the application
CMD ["pnpm", "start"]
