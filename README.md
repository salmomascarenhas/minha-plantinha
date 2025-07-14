# 🌿 Minha Plantinha: Sistema de Irrigação Gamificado

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Mantine](https://img.shields.io/badge/Mantine-339AF0?style=for-the-badge&logo=mantine&logoColor=white)

## 🎯 Sobre o Projeto

Sistema gamificado que transforma o cuidado com plantas em uma experiência interativa e emocionalmente recompensadora. Integra uma **interface web** com um **dispositivo ESP32** para monitoramento e controle automático de irrigação.

**🌟 Destaques:**
- 🪴 Gestão de plantas com pareamento IoT
- 📊 Monitoramento em tempo real (umidade, temperatura, luminosidade)  
- 🎮 Sistema de gamificação com mascote virtual "Caquito"
- 💧 Controle remoto de irrigação e proteção
- 🤖 Assistente com IA para dicas personalizadas
- 📈 Histórico e gráficos de dados dos sensores

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

### **📋 Pré-requisitos**
- Git (2.0+)
- Docker (20.0+) 
- Docker Compose (2.0+)

### **⚡ Setup Rápido**

```bash
# 1. Clone e entre no projeto
git clone https://github.com/salmomascarenhas/minha-plantinha.git
cd minha-plantinha

# 2. Configure o ambiente desejado
cp .env.development .env.development  # Já configurado para desenvolvimento
cp .env.production .env.production    # Configure suas credenciais de produção

# 3. Execute o ambiente desejado
./docker-manager.sh up dev    # Desenvolvimento
./docker-manager.sh up prod   # Produção
```

### **🔧 Configuração de Produção**

Para produção, **edite** `.env.production` com credenciais seguras:

```env
# IMPORTANTES: Altere estas configurações!
POSTGRES_PASSWORD=SUA_SENHA_FORTE_AQUI
JWT_SECRET=SUA_CHAVE_JWT_SUPER_SEGURA_64_CARACTERES
GEMINI_API_KEY=sua-chave-api-gemini-producao
```

### **🎛️ Comandos Disponíveis**

```bash
# Gerenciamento geral
./docker-manager.sh up dev|prod     # Iniciar ambiente
./docker-manager.sh down            # Parar aplicação  
./docker-manager.sh build dev|prod  # Build imagens
./docker-manager.sh restart prod    # Restart produção
./docker-manager.sh logs            # Ver logs

# Verificação
docker ps                           # Status dos containers
curl http://localhost:3000/health   # Health check da API
```

### **🌐 Acessos por Ambiente**

| Ambiente | Frontend | Backend API | Health Check |
|----------|----------|-------------|--------------|
| **Desenvolvimento** | http://localhost:5173 | http://localhost:3000/api | http://localhost:3000/health |
| **Produção** | http://localhost | http://localhost/api | http://localhost:3000/health |
## ✅ Status do Projeto

### **🏆 Concluído:**
- [x] 🔐 Autenticação JWT (cadastro, login)
- [x] 🪴 Gestão de plantas e pareamento ESP32 
- [x] 📊 Dashboard com monitoramento em tempo real
- [x] 💧 Controle remoto de atuadores
- [x] 🎮 Sistema de gamificação e pontuação
- [x] � Histórico e visualização de dados
- [x] 🌐 Interface responsiva com tema claro/escuro
- [x] 🐳 Deploy multi-ambiente (dev/prod) com Docker
- [x] 🔧 Pipeline automatizado com nginx e proxy reverso

### **🚧 Em Desenvolvimento:**
- [⏳] 🤖 Assistente com IA (integração LLM)

### **📅 Próximos Passos:**
- [ ] � Código ESP32 para sensores e atuadores
- [ ] 🔗 Comunicação IoT (REST/MQTT)
- [ ] 🧪 Testes automatizados
- [ ] 🔒 HTTPS e certificados SSL

## 🛠️ Stack Tecnológica

| Categoria | Tecnologia | Finalidade |
|-----------|------------|------------|
| **Frontend** | React + Mantine | UI moderna e responsiva |
| **Backend** | Node.js + Express | API REST robusta |
| **Banco** | PostgreSQL + Prisma | Dados persistentes e ORM |
| **Auth** | JWT | Autenticação segura |
| **Deploy** | Docker + Nginx | Containerização e proxy |
| **IoT** | ESP32 + Sensores | Hardware embarcado |
| **IA** | Google Gemini | Assistente inteligente |

## 👨‍💻 Equipe

| Nome | Matrícula | E-mail |
|------|-----------|--------|
| Francisco Cassiano de Vasconcelos Souza | 413067 | casinho.555@gmail.com |
| Salmo da Cruz Mascarenhas | 431447 | salmo.cruz@gmail.com |
| Akyla de Aquino Pinto | 412723 | akylaaquino@hotmail.com |

---

### **📚 Documentação Avançada**
- 📖 [Guia de Deploy Avançado](./docs/DOCKER_DEPLOYMENT.md)
- 🔧 [Configuração Detalhada de Ambiente](./docs/ENV_CONFIG.md)
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

### **📚 Documentação Avançada**
- 📖 [Guia de Deploy Avançado](./docs/DOCKER_DEPLOYMENT.md)
- 🔧 [Configuração Detalhada de Ambiente](./docs/ENV_CONFIG.md)
      * [x] **🌐 Deploy de Produção com Nginx** (Proxy reverso + Otimizações)
 