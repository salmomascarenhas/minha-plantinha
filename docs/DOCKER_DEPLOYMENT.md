# 🐳 Docker Deployment Guide - Minha Plantinha

Este guia fornece instruções detalhadas para deploy e gerenciamento dos ambientes Docker do projeto Minha Plantinha.

## 📋 Sumário
1. [🏗️ Arquitetura Docker](#️-arquitetura-docker)
2. [⚙️ Configuração Multi-Ambiente](#️-configuração-multi-ambiente)
3. [🚀 Deploy de Produção](#-deploy-de-produção)
4. [🔧 Troubleshooting](#-troubleshooting)
5. [📊 Monitoramento](#-monitoramento)

## 🏗️ Arquitetura Docker

### **📦 Estrutura de Containers:**
```
┌─────────────────────────────────────────────────────────────┐
│                    PRODUÇÃO (Porta 80)                     │
├─────────────────────────────────────────────────────────────┤
│ 🌐 Frontend (Nginx)                                        │
│ ├── 📄 Serve arquivos estáticos (React build)              │
│ ├── 🔄 Proxy reverso para /api/* → Backend                 │
│ └── 🛡️ Headers de segurança configurados                   │
├─────────────────────────────────────────────────────────────┤
│ 🔧 Backend (Node.js/Express) - Porta 3000                  │
│ ├── 🔑 API REST com autenticação JWT                       │
│ ├── 🗄️ Integração com Prisma ORM                          │
│ └── 🤖 Integração com LLM (Gemini)                         │
├─────────────────────────────────────────────────────────────┤
│ 🗄️ Database (PostgreSQL) - Porta 5432                     │
│ ├── 📊 Dados persistidos em volume Docker                  │
│ └── 🔄 Migrações automáticas via Prisma                    │
└─────────────────────────────────────────────────────────────┘
```

### **🏷️ Containers por Ambiente:**

| Ambiente | Frontend Container | Backend Container | Database Container |
|----------|-------------------|-------------------|--------------------|
| **Desenvolvimento** | `frontend-development` | `backend-development` | `db-development` |
| **Produção** | `frontend-production` | `backend-production` | `db-production` |

## ⚙️ Configuração Multi-Ambiente

### **📁 Arquivos de Configuração:**
```bash
.
├── docker-compose.yml          # Configuração principal multi-ambiente
├── .env.development           # Variáveis para desenvolvimento
├── .env.production           # Variáveis para produção
├── docker-manager.sh         # Script de gerenciamento
├── backend/
│   ├── Dockerfile            # Para desenvolvimento
│   └── Dockerfile.prod       # Para produção (otimizado)
└── client/
    ├── Dockerfile            # Para desenvolvimento  
    ├── Dockerfile.prod       # Para produção (nginx)
    └── nginx.conf           # Configuração do nginx
```

### **🔧 Variáveis de Ambiente Essenciais:**

#### **Desenvolvimento (.env.development):**
```env
NODE_ENV=development
BACKEND_PORT=3000
FRONTEND_PORT=5173
DATABASE_URL=postgresql://user:password@db-development:5432/minha_plantinha_dev
JWT_SECRET=development_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

#### **Produção (.env.production):**
```env
NODE_ENV=production
BACKEND_PORT=3000
FRONTEND_PORT=80
DATABASE_URL=postgresql://user:password@db-production:5432/minha_plantinha_prod
JWT_SECRET=super_secure_production_key_change_this
GEMINI_API_KEY=your_production_gemini_api_key
```

## 🚀 Deploy de Produção

### **🏭 Deploy Completo:**
```bash
# 1. Preparar ambiente
git clone https://github.com/salmomascarenhas/minha-plantinha.git
cd minha-plantinha

# 2. Configurar produção
cp .env.example .env.production
# Editar .env.production com valores seguros

# 3. Build e deploy
./docker-manager.sh build prod
./docker-manager.sh up prod

# 4. Verificar status
docker ps
curl http://localhost/api/auth/register -X POST -H "Content-Type: application/json" -d '{}'
```

### **🔄 Atualizações em Produção:**
```bash
# Para aplicar mudanças no código
git pull origin main
./docker-manager.sh build prod
./docker-manager.sh restart prod

# Para mudanças apenas nas variáveis de ambiente
./docker-manager.sh restart prod
```

### **📊 Verificação de Deploy:**
```bash
# Status dos containers
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Logs específicos
docker logs frontend-production --tail=50
docker logs backend-production --tail=50
docker logs db-production --tail=50

# Teste de conectividade
curl -I http://localhost                    # Frontend
curl -I http://localhost/api/auth/register  # API via proxy
curl -I http://localhost:3000/health        # Backend direto
```

## 🔧 Troubleshooting

### **🚨 Problemas Comuns:**

#### **❌ Frontend não carrega (porta 80):**
```bash
# Verificar container nginx
docker logs frontend-production

# Verificar configuração nginx
docker exec frontend-production cat /etc/nginx/conf.d/default.conf

# Testar configuração nginx
docker exec frontend-production nginx -t
```

#### **❌ API não responde via proxy:**
```bash
# Verificar conectividade backend
docker exec frontend-production ping backend-production

# Verificar proxy nginx
docker exec frontend-production cat /etc/nginx/conf.d/default.conf | grep proxy_pass

# Testar diretamente
curl http://localhost:3000/health
```

#### **❌ Database connection failed:**
```bash
# Verificar status do banco
docker logs db-production

# Verificar conectividade
docker exec backend-production ping db-production

# Verificar variáveis de ambiente
docker exec backend-production env | grep DATABASE_URL
```

#### **❌ Containers não sobem:**
```bash
# Verificar conflitos de porta
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :3000

# Verificar logs de build
./docker-manager.sh build prod

# Limpar cache e rebuildar
./docker-manager.sh clean
./docker-manager.sh build prod
```

### **🔍 Logs Detalhados:**
```bash
# Logs em tempo real
./docker-manager.sh logs

# Logs específicos com timestamp
docker logs frontend-production -t
docker logs backend-production -t  
docker logs db-production -t

# Logs com filtro
docker logs backend-production 2>&1 | grep ERROR
docker logs frontend-production 2>&1 | grep nginx
```

## 📊 Monitoramento

### **💚 Health Checks:**
```bash
# Status geral da aplicação
curl http://localhost:3000/health

# Retorno esperado:
{
  "status": "healthy",
  "environment": "production", 
  "timestamp": "2025-07-14T18:44:00.000Z",
  "uptime": 123.45,
  "version": "1.0.0"
}
```

### **📈 Métricas de Performance:**
```bash
# Uso de recursos dos containers
docker stats --no-stream

# Espaço em disco
docker system df

# Informações detalhadas
docker inspect frontend-production
docker inspect backend-production
docker inspect db-production
```

### **🔒 Verificação de Segurança:**
```bash
# Headers de segurança
curl -I http://localhost | grep -E "(X-Frame-Options|X-XSS-Protection|X-Content-Type-Options)"

# SSL/TLS (quando configurado)
openssl s_client -connect localhost:443 -servername yourdomain.com

# Portas expostas
nmap localhost
```

### **🗄️ Backup de Dados:**
```bash
# Backup do banco de dados
docker exec db-production pg_dump -U user minha_plantinha_prod > backup_$(date +%Y%m%d_%H%M%S).sql

# Backup de volumes
docker run --rm -v minha-plantinha_db-data:/data -v $(pwd):/backup alpine tar czf /backup/db_backup_$(date +%Y%m%d_%H%M%S).tar.gz /data
```

## 🎛️ Comandos Úteis do docker-manager.sh

```bash
# Ver ajuda completa
./docker-manager.sh

# Comandos principais
./docker-manager.sh up prod        # Iniciar produção
./docker-manager.sh down          # Parar aplicação
./docker-manager.sh build prod    # Build produção
./docker-manager.sh restart prod  # Restart produção
./docker-manager.sh logs          # Ver logs
./docker-manager.sh clean         # Limpar recursos

# Desenvolvimento
./docker-manager.sh up dev        # Iniciar desenvolvimento
./docker-manager.sh build dev     # Build desenvolvimento
```

## 🚨 Checklist de Deploy

### **Antes do Deploy:**
- [ ] Variáveis de ambiente configuradas em `.env.production`
- [ ] JWT_SECRET alterado para valor seguro
- [ ] DATABASE_URL com credenciais corretas
- [ ] GEMINI_API_KEY configurada
- [ ] Portas 80 e 3000 disponíveis no servidor
- [ ] Docker e Docker Compose instalados

### **Durante o Deploy:**
- [ ] Build executado sem erros
- [ ] Todos os containers iniciaram com sucesso
- [ ] Health check retorna status "healthy"
- [ ] Frontend acessível na porta 80
- [ ] API respondendo via proxy nginx
- [ ] Database conectado e migrações aplicadas

### **Após o Deploy:**
- [ ] Logs verificados para erros
- [ ] Performance dos containers monitorada
- [ ] Backup de dados configurado
- [ ] Monitoramento de saúde ativo
- [ ] Documentação de acesso atualizada

---

**📞 Suporte:** Em caso de problemas, verifique os logs detalhados e consulte a seção de troubleshooting.
