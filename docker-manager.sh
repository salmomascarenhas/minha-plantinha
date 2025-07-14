#!/bin/bash

# ==============================================
# MINHA PLANTINHA - DOCKER MANAGEMENT SCRIPT
# ==============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Help function
show_help() {
    echo -e "${BLUE}🌱 Minha Plantinha - Docker Management${NC}"
    echo ""
    echo "Usage: ./docker-manager.sh [COMMAND] [ENVIRONMENT]"
    echo ""
    echo "Commands:"
    echo "  up          Start the application"
    echo "  down        Stop the application"
    echo "  build       Build the application"
    echo "  restart     Restart the application"
    echo "  logs        Show logs"
    echo "  clean       Clean volumes and images"
    echo ""
    echo "Environments:"
    echo "  dev         Development environment (default)"
    echo "  prod        Production environment"
    echo ""
    echo "Examples:"
    echo "  ./docker-manager.sh up dev"
    echo "  ./docker-manager.sh build prod"
    echo "  ./docker-manager.sh logs"
    echo ""
}

# Set environment
ENV=${2:-development}
if [ "$ENV" = "dev" ]; then
    ENV="development"
elif [ "$ENV" = "prod" ]; then
    ENV="production"
fi

export NODE_ENV=$ENV

# Load environment variables
if [ -f ".env.$ENV" ]; then
    echo -e "${GREEN}📄 Loading .env.$ENV${NC}"
    # Use a more robust method to load env vars
    set -o allexport
    source ".env.$ENV"
    set +o allexport
else
    echo -e "${YELLOW}⚠️  .env.$ENV not found, using defaults${NC}"
fi

# Commands
case $1 in
    "up")
        echo -e "${GREEN}🚀 Starting Minha Plantinha in $ENV mode...${NC}"
        docker compose --env-file .env.$ENV up -d
        echo -e "${GREEN}✅ Application started!${NC}"
        echo -e "${BLUE}🌐 Frontend: http://localhost:${FRONTEND_PORT:-5173}${NC}"
        echo -e "${BLUE}🔧 Backend: http://localhost:${BACKEND_PORT:-3000}${NC}"
        ;;
    "down")
        echo -e "${YELLOW}🛑 Stopping Minha Plantinha...${NC}"
        docker compose down
        echo -e "${GREEN}✅ Application stopped!${NC}"
        ;;
    "build")
        echo -e "${BLUE}🔨 Building Minha Plantinha for $ENV...${NC}"
        docker compose --env-file .env.$ENV build --no-cache
        echo -e "${GREEN}✅ Build completed!${NC}"
        ;;
    "restart")
        echo -e "${YELLOW}🔄 Restarting Minha Plantinha...${NC}"
        docker compose down
        docker compose --env-file .env.$ENV up -d
        echo -e "${GREEN}✅ Application restarted!${NC}"
        ;;
    "logs")
        echo -e "${BLUE}📋 Showing logs...${NC}"
        docker compose logs -f --tail=100
        ;;
    "clean")
        echo -e "${RED}🧹 Cleaning up Docker resources...${NC}"
        docker compose down -v
        docker system prune -f
        echo -e "${GREEN}✅ Cleanup completed!${NC}"
        ;;
    *)
        show_help
        ;;
esac
