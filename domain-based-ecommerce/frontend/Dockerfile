# Domain-based E-commerce Frontend
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy root package files for workspace context
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# Copy domain frontend package files
COPY domain-based-ecommerce/frontend/package.json ./domain-based-ecommerce/frontend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy domain frontend source code
COPY domain-based-ecommerce/frontend/ ./domain-based-ecommerce/frontend/

# Set working directory to the frontend
WORKDIR /app/domain-based-ecommerce/frontend

# Build the application
RUN pnpm build

# Expose port
EXPOSE 4002

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4002 || exit 1

# Start the application
CMD ["pnpm", "preview", "--port", "4002", "--host", "0.0.0.0"]
