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
    echo "  up        Start the application"
    echo "  down      Stop the application"
    echo "  build     Build the application images"
    echo "  restart   Restart the application"
    echo "  logs      Show container logs"
    echo "  clean     Stop and remove containers, networks, and volumes"
    echo ""
    echo "Environments:"
    echo "  dev       Development environment (default)"
    echo "  prod      Production environment"
    echo ""
    echo "Examples:"
    echo "  ./docker-manager.sh up dev"
    echo "  ./docker-manager.sh build prod"
    echo "  ./docker-manager.sh logs"
    echo ""
}

ENV_SHORT=${2:-dev}
if [ "$ENV_SHORT" = "dev" ]; then
    export NODE_ENV="development"
elif [ "$ENV_SHORT" = "prod" ]; then
    export NODE_ENV="production"
else
    echo -e "${RED}Ambiente inválido. Use 'dev' ou 'prod'.${NC}"
    exit 1
fi

ENV_FILE=".env.$NODE_ENV"

if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}Arquivo de ambiente $ENV_FILE não encontrado!${NC}"
    exit 1
fi

set -o allexport
source "$ENV_FILE"
set +o allexport

COMPOSE_FILES="-f docker-compose.yml"
if [ "$NODE_ENV" = "development" ]; then
    COMPOSE_FILES="$COMPOSE_FILES -f docker-compose.override.yml"
fi

COMPOSE_CMD="docker compose --env-file $ENV_FILE $COMPOSE_FILES"

# Commands
case $1 in
    "up")
        echo -e "${GREEN}🚀 Subindo a aplicação em modo $NODE_ENV...${NC}"
        $COMPOSE_CMD up -d --build
        echo -e "${GREEN}✅ Aplicação iniciada!${NC}"
        if [ "$NODE_ENV" = "development" ]; then
            echo -e "${BLUE}🌐 Frontend (Vite): http://localhost:${FRONTEND_PORT:-5173}${NC}"
            echo -e "${BLUE}🔧 Backend (API):  http://localhost:${BACKEND_PORT:-3000}${NC}"
        else
            echo -e "${BLUE}🌐 Aplicação: http://localhost:${FRONTEND_PORT:-80}${NC}"
        fi
        ;;
    "down")
        echo -e "${YELLOW}🛑 Parando a aplicação...${NC}"
        $COMPOSE_CMD down
        echo -e "${GREEN}✅ Aplicação parada!${NC}"
        ;;
    "build")
        echo -e "${BLUE}🔨 Construindo as imagens para $NODE_ENV...${NC}"
        $COMPOSE_CMD build --no-cache
        echo -e "${GREEN}✅ Build concluído!${NC}"
        ;;
    "restart")
        echo -e "${YELLOW}🔄 Reiniciando a aplicação...${NC}"
        $COMPOSE_CMD down
        $COMPOSE_CMD up -d --build
        echo -e "${GREEN}✅ Aplicação reiniciada!${NC}"
        ;;
    "logs")
        echo -e "${BLUE}📋 Mostrando logs...${NC}"
        $COMPOSE_CMD logs -f --tail=100
        ;;
    "clean")
        echo -e "${RED}🧹 Limpando todos os recursos Docker (containers, volumes, redes)...${NC}"
        $COMPOSE_CMD down -v --remove-orphans
        echo -e "${GREEN}✅ Limpeza concluída!${NC}"
        ;;
    *)
        show_help
        ;;
esac