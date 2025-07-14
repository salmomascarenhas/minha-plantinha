# 🔧 Configuração de Ambientes - Minha Plantinha

Este arquivo detalha as configurações específicas para cada ambiente do projeto.

## 📋 Estrutura de Ambientes

### **🏗️ Arquitetura Multi-Ambiente:**
```
minha-plantinha/
├── .env.development      # ← Configurações de desenvolvimento
├── .env.production       # ← Configurações de produção  
├── .env.example          # ← Template com todas as variáveis
├── docker-compose.yml    # ← Orquestração multi-ambiente
└── docker-manager.sh     # ← Script de gerenciamento
```

## 🔧 Variáveis de Ambiente

### **📁 `.env.example` (Template Base):**
```env
# ==============================================
# MINHA PLANTINHA - CONFIGURAÇÃO DE AMBIENTE
# ==============================================

# Ambiente de execução
NODE_ENV=development

# Configurações do Servidor
BACKEND_PORT=3000
FRONTEND_PORT=5173

# Configurações do Banco de Dados
DATABASE_URL="postgresql://user:password@localhost:5432/minha_plantinha"

# Autenticação e Segurança
JWT_SECRET="change-this-secret-key"
JWT_EXPIRE_IN="7d"

# APIs Externas
GEMINI_API_KEY="your-gemini-api-key-here"

# Configurações de CORS (Desenvolvimento)
FRONTEND_URL="http://localhost:5173"

# Configurações de Email (Opcional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Logs e Debug
LOG_LEVEL="info"
DEBUG="false"
```

### **💻 `.env.development` (Desenvolvimento):**
```env
# ==============================================
# DESENVOLVIMENTO - MINHA PLANTINHA
# ==============================================

# Ambiente
NODE_ENV=development

# Servidor (Portas diferentes para evitar conflitos)
BACKEND_PORT=3000
FRONTEND_PORT=5173

# Banco de Dados (Container de desenvolvimento)
DATABASE_URL="postgresql://dev_user:dev_password@db-development:5432/minha_plantinha_dev"

# Autenticação (Chaves simples para desenvolvimento)
JWT_SECRET="development_jwt_secret_not_secure"
JWT_EXPIRE_IN="24h"

# APIs Externas
GEMINI_API_KEY="your-development-gemini-key"

# CORS (Permitir localhost)
FRONTEND_URL="http://localhost:5173"

# Debug habilitado
LOG_LEVEL="debug"
DEBUG="true"

# Email (Pode usar serviços de teste)
SMTP_HOST="smtp.mailtrap.io"
SMTP_PORT=2525
SMTP_USER="your-mailtrap-user"
SMTP_PASS="your-mailtrap-pass"
```

### **🏭 `.env.production` (Produção):**
```env
# ==============================================
# PRODUÇÃO - MINHA PLANTINHA
# ==============================================

# Ambiente
NODE_ENV=production

# Servidor (Porta 80 para frontend via nginx)
BACKEND_PORT=3000
FRONTEND_PORT=80

# Banco de Dados (Container de produção)
DATABASE_URL="postgresql://prod_user:STRONG_SECURE_PASSWORD@db-production:5432/minha_plantinha_prod"

# Autenticação (ALTERE ESTAS CHAVES!)
JWT_SECRET="SUPER_SECURE_JWT_SECRET_CHANGE_THIS_IN_PRODUCTION"
JWT_EXPIRE_IN="7d"

# APIs Externas (Chaves de produção)
GEMINI_API_KEY="your-production-gemini-key"

# CORS (Domínio de produção)
FRONTEND_URL="https://yourdomain.com"

# Logs otimizados
LOG_LEVEL="warn"
DEBUG="false"

# Email (Configurações reais)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="production@yourdomain.com"
SMTP_PASS="your-secure-app-password"
```

## 🚀 Configuração de Deploy

### **🔧 Setup Inicial:**
```bash
# 1. Copiar templates
cp .env.example .env.development
cp .env.example .env.production

# 2. Configurar desenvolvimento
nano .env.development
# (Ajustar portas, banco dev, etc.)

# 3. Configurar produção (IMPORTANTE!)
nano .env.production
# ALTERAR: JWT_SECRET, DATABASE_URL, passwords!
```

### **⚠️ Checklist de Segurança para Produção:**

- [ ] **JWT_SECRET:** Gerado com alta entropia (64+ caracteres)
- [ ] **DATABASE_URL:** Senha forte para usuário do banco
- [ ] **GEMINI_API_KEY:** Chave de API válida e com limites
- [ ] **SMTP credentials:** Configurações reais para email
- [ ] **FRONTEND_URL:** URL correta do domínio de produção
- [ ] **DEBUG:** Definido como "false"
- [ ] **LOG_LEVEL:** Configurado para "warn" ou "error"

### **🔐 Geração de Senhas Seguras:**
```bash
# JWT Secret (64 caracteres aleatórios)
openssl rand -base64 64

# Password para banco (32 caracteres)
openssl rand -base64 32

# Ou usando Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

## 🐳 Configuração Docker

### **📦 docker-compose.yml - Configuração Multi-Ambiente:**
```yaml
services:
  # Backend - Usa Dockerfile baseado no NODE_ENV
  backend:
    build:
      context: ./backend
      dockerfile: ${NODE_ENV:-development} == "production" ? "Dockerfile.prod" : "Dockerfile"
    container_name: backend-${NODE_ENV:-development}
    environment:
      - NODE_ENV=${NODE_ENV:-development}
    ports:
      - "${BACKEND_PORT:-3000}:3000"
    depends_on:
      - db

  # Frontend - Vite (dev) ou Nginx (prod)  
  frontend:
    build:
      context: ./client
      dockerfile: ${NODE_ENV:-development} == "production" ? "Dockerfile.prod" : "Dockerfile"
    container_name: frontend-${NODE_ENV:-development}
    ports:
      - "${FRONTEND_PORT:-5173}:${NODE_ENV:-development}" == "production" ? "80" : "5173"
    depends_on:
      - backend

  # Database - PostgreSQL
  db:
    image: postgres:15-alpine
    container_name: db-${NODE_ENV:-development}
    environment:
      POSTGRES_DB: ${POSTGRES_DB:-minha_plantinha}
      POSTGRES_USER: ${POSTGRES_USER:-user}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-password}
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
    name: minha-plantinha-${NODE_ENV:-development}_db-data
```

## 🔍 Verificação de Configuração

### **✅ Validação de Ambiente:**
```bash
# Verificar variáveis carregadas
./docker-manager.sh up dev
docker exec backend-development env | grep NODE_ENV
docker exec backend-development env | grep DATABASE_URL

# Testar conectividade
curl http://localhost:5173  # Development
curl http://localhost:80    # Production
```

### **🔧 Debug de Configuração:**
```bash
# Verificar se arquivos .env existem
ls -la .env.*

# Validar sintaxe dos arquivos .env
cat .env.development | grep -v '^#' | grep '='
cat .env.production | grep -v '^#' | grep '='

# Testar carregamento no container
docker exec backend-development node -e "console.log(process.env.NODE_ENV)"
```

### **📊 Health Check de Ambiente:**
```bash
# Verificar saúde dos serviços
curl http://localhost:3000/health  # Backend direto
curl http://localhost/health       # Via proxy (produção)

# Verificar banco de dados
docker exec db-development psql -U user -d minha_plantinha_dev -c "SELECT 1;"
docker exec db-production psql -U prod_user -d minha_plantinha_prod -c "SELECT 1;"
```

## 🚨 Problemas Comuns

### **❌ "Environment file not found"**
```bash
# Solução: Criar arquivos de ambiente
cp .env.example .env.development
cp .env.example .env.production
```

### **❌ "Database connection failed"**
```bash
# Verificar DATABASE_URL no arquivo .env
grep DATABASE_URL .env.development
grep DATABASE_URL .env.production

# Verificar se o container do banco está rodando
docker ps | grep postgres
```

### **❌ "Port already in use"**
```bash
# Verificar conflitos de porta
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :3000
sudo netstat -tulpn | grep :5173

# Alterar portas nos arquivos .env se necessário
```

### **❌ "JWT Secret not defined"**
```bash
# Verificar se JWT_SECRET está definido
grep JWT_SECRET .env.production

# Gerar novo secret se necessário
echo "JWT_SECRET=$(openssl rand -base64 64)" >> .env.production
```

---

**📝 Nota:** Sempre mantenha os arquivos `.env.production` seguros e nunca os commite no controle de versão!
