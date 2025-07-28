# PowerShell setup script for EB-vs-DDD Monorepo
# Run this script to set up the development environment

Write-Host "🚀 Setting up EB-vs-DDD Monorepo..." -ForegroundColor Green

# Check if pnpm is installed
try {
    $pnpmVersion = pnpm --version
    Write-Host "✅ pnpm is installed (version: $pnpmVersion)" -ForegroundColor Green
} catch {
    Write-Host "❌ pnpm not found. Installing pnpm..." -ForegroundColor Red
    npm install -g pnpm
    Write-Host "✅ pnpm installed successfully" -ForegroundColor Green
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
pnpm install

# Generate Prisma clients
Write-Host "🔧 Generating Prisma clients..." -ForegroundColor Blue
pnpm db:generate

# Push database schemas
Write-Host "🗄️ Setting up databases..." -ForegroundColor Blue
pnpm db:push

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Available commands:" -ForegroundColor Yellow
Write-Host "  pnpm start:all     - Start all applications" -ForegroundColor Cyan
Write-Host "  pnpm start:entity  - Start entity-based apps only" -ForegroundColor Cyan
Write-Host "  pnpm start:domain  - Start domain-based apps only" -ForegroundColor Cyan
Write-Host ""
Write-Host "Application URLs:" -ForegroundColor Yellow
Write-Host "  Entity Backend:  http://localhost:3001" -ForegroundColor Cyan
Write-Host "  Entity Frontend: http://localhost:4001" -ForegroundColor Cyan  
Write-Host "  Domain Backend:  http://localhost:3002" -ForegroundColor Cyan
Write-Host "  Domain Frontend: http://localhost:4002" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 See DEVELOPMENT.md for more commands and documentation" -ForegroundColor Blue
