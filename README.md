# 🌿 Minha Plantinha: Sistema de Irrigação Gamificado
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Mantine](https://img.shields.io/badge/Mantine-339AF0?style=for-the-badge&logo=mantine&logoColor=white)
![Rive](https://img.shields.io/badge/Rive-E85599?style=for-the-badge&logo=rive&logoColor=white)

## 📄 Índice
1.  [🎯 Sobre o Projeto](#-sobre-o-projeto)
2.  [✨ Funcionalidades Principais](#-funcionalidades-principais)
3.  [🏗️ Arquitetura do Sistema](#️-arquitetura-do-sistema)
4.  [🛠️ Stack de Tecnologias](#️-stack-de-tecnologias)
5.  [🚀 Como Rodar o Projeto](#-como-rodar-o-projeto)
6.  [✅ Andamento e Próximos Passos](#-andamento-e-próximos-passos)
7.  [👨‍💻 Equipe](#-equipe)

## 🎯 Sobre o Projeto
"Minha Plantinha" é um sistema que busca transformar o cuidado com plantas em uma experiência interativa, divertida e emocionalmente recompensadora. A plataforma integra uma **interface web gamificada** com um **dispositivo embarcado (ESP32)** para monitorar e controlar um sistema de irrigação automático.

O coração do projeto é o "Caquito", um mascote virtual cujas emoções e reações refletem o estado de saúde da planta real, com base nos dados coletados por sensores de umidade, temperatura e luminosidade. O objetivo é engajar o usuário no cuidado diário, fortalecer o vínculo com a natureza e promover a consciência ambiental de forma lúdica.

## ✨ Funcionalidades Principais
O sistema foi planejado com as seguintes funcionalidades centrais:

* 🔐 **Autenticação de Usuários (PLT-001):** Sistema de login e cadastro seguro com e-mail e senha, utilizando JWT para gerenciamento de sessões.
* 🪴 **Gestão da Planta (PLT-002):** Permite que o usuário cadastre sua planta e a vincule a um dispositivo ESP32 específico através de um ID de pareamento.
* 📊 **Monitoramento em Tempo Real (PLT-003):** Um dashboard exibe dados vitais da planta, como umidade do solo, temperatura, luminosidade e status de chuva, atualizados em tempo real.
* 💧 **Controle Remoto (PLT-004):** Botões na interface para acionar manualmente a bomba d'água ou uma lona de proteção.
* 🎮 **Gamificação (PLT-005):** Sistema de pontos, conquistas e medalhas para recompensar os bons cuidados. O mascote reage com animações (feliz, triste, seco) de acordo com o estado da planta.
* 🤖 **Assistente com IA (PLT-006):** Um assistente virtual que utiliza um modelo de linguagem (LLM) para gerar dicas, relatórios e alertas personalizados sobre a saúde da planta.
* 📈 **Histórico de Dados (PLT-007):** Gráficos que exibem o histórico semanal e mensal dos dados coletados pelos sensores.

## 🏗️ Arquitetura do Sistema
O projeto é modular e segue uma arquitetura de três camadas principais, baseada no padrão MVC:

1.  🌐 **Módulo Frontend (View):** A interface web responsiva com a qual o usuário interage Responsável por exibir o dashboard, as animações do mascote e os controles.

2. 🔗 **Módulo Backend (Controller/Model):** O cérebro do sistema. Um servidor Node.js/Express que gerencia a autenticação, a lógica de negócio, as regras de gamificação, a comunicação com o banco de dados e a API para o frontend e o dispositivo IoT.

3. 📡 **Módulo Embarcado (Hardware):** O dispositivo ESP32, responsável por ler os dados dos sensores (umidade, temperatura, etc.) e controlar os atuadores (bomba d'água, motor da lona).

## 🛠️ Stack de Tecnologias
| Categoria | Tecnologia | Finalidade |
| :--- | :--- | :--- |
| **Frontend** | `HTML` / `EJS` | Estrutura e renderização de páginas no servidor. |
| | `Mantine (v8)` | Biblioteca de componentes para uma UI moderna e responsiva. |
| **Animação** | `Rive` | Criação de animações vetoriais interativas e de alta performance para o mascote. |
| **Backend** | `Node.js` / `Express` | Ambiente de execução e framework para a construção da API REST. |
| **Banco de Dados** | `Prisma` | ORM para comunicação segura e eficiente com o banco de dados. |
| **Autenticação** | `JWT` | Geração de tokens para proteger rotas e gerenciar sessões de usuários |
| **Comunicação IoT**| `REST API` / `MQTT` | Protocolos para a comunicação entre o ESP32 e o backend. |
| **Inteligência Artificial**| `LLM (Gemini)` | Geração de conteúdo dinâmico, como dicas e relatórios. |

## 🚀 Como Rodar o Projeto
O projeto suporta configurações multi-ambiente com Docker, permitindo execução tanto em **desenvolvimento** quanto em **produção** com otimizações específicas para cada cenário.

### **📋 Pré-requisitos:**
* `Git` (versão 2.0+)
* `Docker` (versão 20.0+)
* `Docker Compose` (versão 2.0+)

### **⚙️ Configuração Inicial:**

```bash
# 1. Clone o repositório
git clone https://github.com/salmomascarenhas/minha-plantinha.git

# 2. Navegue até o diretório do projeto
cd minha-plantinha

# 3. Configure as variáveis de ambiente
# Copie os arquivos de exemplo para cada ambiente
cp .env.example .env.development
cp .env.example .env.production

# 4. Preencha as variáveis de ambiente para cada cenário
# .env.development - Para desenvolvimento local
# .env.production  - Para ambiente de produção
```

### **🔧 Configuração de Variáveis de Ambiente:**

#### **📁 `.env.development` (Desenvolvimento):**
```env
# Ambiente
NODE_ENV=development

# Servidor
BACKEND_PORT=3000
FRONTEND_PORT=5173

# Banco de Dados
DATABASE_URL="postgresql://user:password@localhost:5432/minha_plantinha_dev"

# Autenticação
JWT_SECRET="seu_jwt_secret_desenvolvimento"

# API Externa (LLM)
GEMINI_API_KEY="sua_api_key_gemini"
```

#### **📁 `.env.production` (Produção):**
```env
# Ambiente
NODE_ENV=production

# Servidor
BACKEND_PORT=3000
FRONTEND_PORT=80

# Banco de Dados
DATABASE_URL="postgresql://user:password@localhost:5432/minha_plantinha_prod"

# Autenticação
JWT_SECRET="seu_jwt_secret_super_seguro_producao"

# API Externa (LLM)
GEMINI_API_KEY="sua_api_key_gemini_producao"
```

### **🚀 Execução dos Ambientes:**

#### **💻 Ambiente de Desenvolvimento:**
```bash
# Iniciar aplicação em modo desenvolvimento
./docker-manager.sh up dev

# Ou usando docker-compose diretamente
docker compose --env-file .env.development up -d

# Build apenas (sem iniciar)
./docker-manager.sh build dev

# Parar aplicação
./docker-manager.sh down

# Ver logs em tempo real
./docker-manager.sh logs
```

**Acessos em Desenvolvimento:**
- 🌐 **Frontend:** http://localhost:5173
- 🔧 **Backend API:** http://localhost:3000/api
- 💚 **Health Check:** http://localhost:3000/health
- 📚 **Swagger Docs:** http://localhost:3000/api-docs

#### **🏭 Ambiente de Produção:**
```bash
# Iniciar aplicação em modo produção
./docker-manager.sh up prod

# Ou usando docker-compose diretamente
docker compose --env-file .env.production up -d

# Build apenas (sem iniciar)
./docker-manager.sh build prod

# Restart completo
./docker-manager.sh restart prod

# Limpar recursos Docker
./docker-manager.sh clean
```

**Acessos em Produção:**
- 🌐 **Frontend:** http://localhost (porta 80)
- 🔧 **Backend API:** http://localhost/api/* (proxy via nginx)
- 💚 **Health Check:** http://localhost:3000/health (direto)
- 🗄️ **Database:** localhost:5432

### **📊 Verificação de Status:**
```bash
# Ver containers rodando
docker ps

# Ver logs específicos de um serviço
docker logs frontend-production
docker logs backend-production
docker logs db-production

# Verificar saúde da aplicação
curl http://localhost/api/auth/register -X POST -H "Content-Type: application/json" -d '{}'
```

### **🔍 Diferenças entre Ambientes:**

| Aspecto | Desenvolvimento | Produção |
|---------|----------------|----------|
| **Build** | Hot reload, source maps | Otimizado, minificado |
| **Frontend Port** | 5173 | 80 |
| **Servidor Web** | Vite dev server | Nginx + proxy reverse |
| **SSL/HTTPS** | HTTP | Pronto para HTTPS |
| **Logs** | Verbose | Otimizado |
| **Performance** | Foco em DX | Foco em performance |
| **Docker Images** | Desenvolvimento | Multi-stage otimizado |

### **🚨 Notas Importantes:**
- ⚠️ **Produção:** Sempre use senhas fortes e chaves JWT seguras
- 🔒 **Segurança:** Nunca commite arquivos `.env` com credenciais reais
- 🗄️ **Database:** O Prisma executa migrações automaticamente no startup
- 🔄 **Updates:** Use `./docker-manager.sh restart prod` para aplicar mudanças
- 📦 **Volumes:** Dados do banco são persistidos entre restarts

### **📚 Documentação Adicional:**
- 📖 **[DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)** - Guia completo de deploy e troubleshooting
- 🔧 **[ENV_CONFIG.md](./ENV_CONFIG.md)** - Configuração detalhada de ambientes
- 🐳 **[docker-manager.sh](./docker-manager.sh)** - Script de gerenciamento Docker

## ✅ Andamento e Próximos Passos
Acompanhe aqui o status de desenvolvimento de cada funcionalidade.

  * [x] **Fase 0: Planejamento e Configuração**
      * [x] Definição do escopo e requisitos do projeto.
      * [x] Definição da arquitetura e da stack de tecnologias.
      * [x] Criação da estrutura inicial do projeto e do `README`.
      * [x] **🐳 Configuração Docker Multi-Ambiente** (DEV/PROD)
      * [x] **🔧 Pipeline de Deploy Automatizado**

  * [x] **Fase 1: Backend (API & Lógica de Negócio)**
      * [x] `PLT-001`: Implementar rotas de autenticação (cadastro, login) com JWT.
      * [x] `PLT-002`: Implementar endpoints CRUD para gerenciamento de plantas e pareamento com o ESP32.
      * [x] Criar endpoints para receber e armazenar os dados dos sensores.
      * [x] `PLT-004`: Criar endpoints para acionamento remoto dos atuadores.
      * [x] `PLT-005`: Modelar e implementar a lógica de gamificação (pontuação e conquistas).
      * [x] `PLT-007`: Desenvolver endpoints para consulta de histórico de dados.
      * [x] **🏭 Build de Produção Otimizado** (Multi-stage Docker)
      
  * [x] **Fase 2: Frontend (UI & Integração)**
      * [x] Construir as telas de Login e Cadastro.
      * [x] Desenvolver o Dashboard principal.
      * [x] `PLT-003`: Integrar o dashboard com a API para exibir dados em tempo real.
      * [x] Implementar a interface de controle remoto.
      * [x] `PLT-007`: Criar os gráficos para a visualização do histórico.
      * [x] **🌐 Deploy de Produção com Nginx** (Proxy reverso + Otimizações)
      * [x] Implementar o tema claro/escuro.

  * [x] **🚀 Fase Extra: DevOps & Infraestrutura**
      * [x] **Docker Multi-Ambiente:** Configurações separadas para DEV/PROD
      * [x] **Nginx Reverse Proxy:** Frontend servido via nginx com proxy para API
      * [x] **Build Otimizado:** Multi-stage builds para imagens menores
      * [x] **Health Checks:** Monitoramento de saúde dos containers
      * [x] **Script de Gerenciamento:** `docker-manager.sh` para facilitar deploys
      * [x] **Documentação de Deploy:** Guias completos para produção
    
  * [ ] **Fase 3: IoT (Dispositivo Embarcado)**
      * [ ] Desenvolver o código para o ESP32 ler os sensores de umidade, temperatura e luminosidade.
      * [ ] Implementar a comunicação (via REST ou MQTT) para enviar os dados ao backend.
      * [ ] Implementar a lógica para receber comandos do backend e acionar a bomba e o motor.

  * [ ] **Fase 4: Funcionalidades Avançadas**
      * [⏳] `PLT-006`: Integrar com a API do LLM para gerar as dicas do assistente virtual.
      * [ ] Implementar testes de unidade e integração.
      * [ ] Configurar pipeline de CI/CD (GitHub Actions).

  * [ ] **Fase 5: Melhorias Extras (Opcional)**
      * [ ] Permitir que o usuário se conecte ao hardware utilizando uma interface para detectar dispositivos na rede.
      * [ ] Integrar Frontend com uma biblioteca reativa moderna.
      * [ ] Refinar o design da interface.
      * [ ] **🔒 HTTPS & SSL:** Configuração para produção com certificados
      * [ ] **📊 Monitoramento:** Integração com ferramentas de observabilidade
      
# 👨‍💻 Equipe
| Nome | Matrícula | E-mail |
| :--- | :--- | :--- |
| Francisco Cassiano de Vasconcelos Souza | 413067 | casinho.555@gmail.com
Salmo da Cruz Mascarenhas | 431447 | salmo.cruz@gmail.com
Akyla de Aquino Pinto | 412723 | akylaaquino@hotmail.com 