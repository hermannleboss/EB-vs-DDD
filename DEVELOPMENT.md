# Monorepo Development Guide

## Prerequisites

- Node.js 18+ (see `.nvmrc` for exact version)
- pnpm 8+ (package manager)

```bash
# Install pnpm if not already installed
npm install -g pnpm
```

## Project Structure

```
├── package.json                 # Root workspace configuration
├── pnpm-workspace.yaml         # pnpm workspace definition
├── entity-based-ecommerce/     # Entity-based architecture
│   ├── backend/                 # Express.js API (port 3001)
│   └── frontend/                # Nuxt.js frontend (port 4001)
└── domain-based-ecommerce/      # Domain-driven architecture
    ├── backend/                 # Express.js API (port 3002)
    └── frontend/                # Nuxt.js frontend (port 4002)
```

## Getting Started

### 1. Install Dependencies

```bash
# Install all workspace dependencies
pnpm install

# Or alternatively
pnpm install:all
```

### 2. Development Commands

#### Start All Applications

```bash
# Start all backends and frontends simultaneously
pnpm start:all

# Start only entity-based applications
pnpm start:entity

# Start only domain-based applications  
pnpm start:domain
```

#### Individual Application Commands

```bash
# Entity-based backend
pnpm entity:backend:dev

# Entity-based frontend
pnpm entity:frontend:dev

# Domain-based backend
pnpm domain:backend:dev

# Domain-based frontend
pnpm domain:frontend:dev
```

### 3. Database Operations

```bash
# Generate Prisma clients for all backends
pnpm db:generate

# Push schema changes to databases
pnpm db:push

# Run migrations for all backends
pnpm db:migrate

# Open Prisma Studio
pnpm db:studio:entity  # Entity-based database
pnpm db:studio:domain  # Domain-based database
```

### 4. Build Commands

```bash
# Build all applications
pnpm build

# Build specific applications
pnpm entity:backend:build
pnpm entity:frontend:build
pnpm domain:backend:build
pnpm domain:frontend:build
```

### 5. Utility Commands

```bash
# Clean all build artifacts and caches
pnpm clean

# Run linting across all packages
pnpm lint

# Run tests across all packages
pnpm test
```

## Package Management

### Adding Dependencies

```bash
# Add to root workspace
pnpm add <package> -w

# Add to specific package
pnpm add <package> --filter entity-backend
pnpm add <package> --filter entity-frontend
pnpm add <package> --filter domain-backend
pnpm add <package> --filter domain-frontend
```

### Installing New Package

```bash
# Install in specific workspace
pnpm --filter entity-backend add express
pnpm --filter entity-frontend add @nuxtjs/axios
```

## Development Workflow

1. **Initial Setup**: Run `pnpm install` to install all dependencies
2. **Development**: Use `pnpm start:all` or individual package commands
3. **Testing**: Access applications at their respective ports:
   - Entity Backend: <http://localhost:3001>
   - Entity Frontend: <http://localhost:4001>
   - Domain Backend: <http://localhost:3002>
   - Domain Frontend: <http://localhost:4002>

## Architecture Comparison

Both architectures implement the same e-commerce functionality but with different organizational patterns:

- **Entity-based**: Traditional MVC pattern organized by database entities
- **Domain-based**: Domain-driven design with clean architecture layers

Use this monorepo to compare, learn, and experiment with both approaches.

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure no other applications are running on ports 3001, 3002, 4001, 4002
2. **Database issues**: Run `pnpm db:generate` and `pnpm db:push` if you encounter Prisma errors
3. **Cache issues**: Run `pnpm clean` to clear all build caches

### Reset Everything

```bash
# Clean all caches and rebuild
pnpm clean
rm -rf node_modules */*/node_modules
pnpm install
pnpm db:generate
pnpm db:push
```

## Useful pnpm Commands

```bash
# List all workspace packages
pnpm list --depth=0

# Run command in all packages
pnpm --recursive run <script>

# Run command in parallel
pnpm --parallel run <script>

# Filter by package name pattern
pnpm --filter "*backend*" run dev
pnpm --filter "*frontend*" run build
```
