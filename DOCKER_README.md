# 🌱 Minha Plantinha - Multi Environment Docker Setup

Este projeto utiliza Docker para gerenciar ambientes de desenvolvimento e produção de forma isolada e eficiente.

## 📁 Estrutura de Arquivos

```
/
├── .env                      # Variáveis padrão (development)
├── .env.development         # Variáveis específicas de dev
├── .env.production         # Variáveis específicas de prod
├── docker-compose.yml      # Configuração multi-ambiente
├── docker-manager.sh       # Script de gerenciamento
├── backend/
│   ├── Dockerfile.dev     # Docker para desenvolvimento
│   ├── Dockerfile.prod    # Docker para produção
│   └── .dockerignore
└── client/
    ├── Dockerfile.dev     # Docker para desenvolvimento
    ├── Dockerfile.prod    # Docker para produção
    └── .dockerignore
```

## 🚀 Quick Start

### Opção 1: Script de Gerenciamento (Recomendado)

```bash
# Tornar o script executável
chmod +x docker-manager.sh

# Desenvolvimento
./docker-manager.sh up dev

# Produção
./docker-manager.sh up prod

# Ver logs
./docker-manager.sh logs

# Parar aplicação
./docker-manager.sh down
```

### Opção 2: Docker Compose Direto

```bash
# Desenvolvimento
NODE_ENV=development docker compose --env-file .env.development up

# Produção
NODE_ENV=production docker compose --env-file .env.production up

# Build específico
NODE_ENV=production docker compose --env-file .env.production up --build
```

## 🔧 Configuração de Variáveis de Ambiente

### Desenvolvimento (.env.development)
- **Database**: PostgreSQL em container
- **Backend**: Hot reload habilitado
- **Frontend**: Vite dev server
- **Debug**: Modo debug ativo

### Produção (.env.production)
- **Database**: PostgreSQL otimizado
- **Backend**: Build otimizado + healthcheck
- **Frontend**: Build estático + Nginx
- **Security**: Headers de segurança + gzip

## 📋 Variáveis Importantes

### Backend
- `BACKEND_PORT`: Porta do servidor Express
- `BACKEND_HOST`: Host de bind
- `BACKEND_URL`: URL externa do backend
- `DATABASE_URL`: String de conexão PostgreSQL
- `JWT_SECRET`: Chave secreta JWT
- `GEMINI_API_KEY`: Chave API do Gemini

### Frontend
- `FRONTEND_PORT`: Porta do servidor frontend
- `VITE_API_URL`: URL da API para o frontend
- `VITE_APP_TITLE`: Título da aplicação
- `VITE_DEBUG_MODE`: Modo debug do frontend

### Database
- `POSTGRES_DB`: Nome do banco
- `POSTGRES_USER`: Usuário do PostgreSQL
- `POSTGRES_PASSWORD`: Senha do PostgreSQL

## 🎯 URLs de Acesso

### Desenvolvimento
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000
- **API**: http://localhost:3000/api

### Produção
- **Frontend**: http://localhost:80
- **Backend**: http://localhost:3000
- **API**: http://localhost/api

## 📦 Comandos Úteis

```bash
# Ver status dos containers
docker ps

# Logs específicos
docker compose logs backend
docker compose logs frontend
docker compose logs db

# Rebuild específico
docker compose build backend
docker compose build frontend

# Limpeza completa
./docker-manager.sh clean
```

## 🔍 Troubleshooting

### Problemas Comuns

1. **Port já em uso**
   ```bash
   # Verificar portas em uso
   sudo netstat -tulpn | grep :3000
   sudo netstat -tulpn | grep :5173
   ```

2. **Permissões de arquivo**
   ```bash
   # Dar permissões ao script
   chmod +x docker-manager.sh
   chmod +x backend/entrypoint.sh
   ```

3. **Problemas de build**
   ```bash
   # Rebuild completo
   ./docker-manager.sh clean
   ./docker-manager.sh build dev
   ```

4. **Database connection issues**
   ```bash
   # Verificar se o banco está rodando
   docker compose logs db
   
   # Resetar volumes se necessário
   docker compose down -v
   ```

## 🚀 Deploy em Produção

1. **Configure as variáveis de produção**
   ```bash
   # Edite .env.production com valores reais
   vim .env.production
   ```

2. **Execute em modo produção**
   ```bash
   ./docker-manager.sh build prod
   ./docker-manager.sh up prod
   ```

3. **Verifique saúde dos serviços**
   ```bash
   curl http://localhost/health
   curl http://localhost:3000/health
   ```

## 📈 Monitoramento

### Health Checks
- **Frontend**: `GET /health` → "healthy"
- **Backend**: `GET /health` → JSON status
- **Database**: Verificação automática PostgreSQL

### Logs
```bash
# Logs em tempo real
./docker-manager.sh logs

# Logs específicos
docker compose logs -f backend
docker compose logs -f frontend
```

---

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.
