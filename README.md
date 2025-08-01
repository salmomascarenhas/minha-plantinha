# 🌿 Minha Plantinha: Sistema de Irrigação Gamificado

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Nginx](https://img.shields.io/badge/nginx-009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Mantine](https://img.shields.io/badge/Mantine-339AF0?style=for-the-badge&logo=mantine&logoColor=white)

## 🎯 Sobre o Projeto

**Minha Plantinha** é um sistema gamificado que transforma o cuidado com plantas em uma experiência interativa e recompensadora, integrando uma interface web moderna com um dispositivo IoT (ESP32) para monitoramento e controle automático de irrigação.

O coração do projeto é o "Caquito", um mascote virtual cujas emoções refletem a saúde da planta real, com base nos dados dos sensores, engajando o usuário no cuidado diário e promovendo a consciência ambiental de forma lúdica.

## ✨ Funcionalidades

* 🔐 **Autenticação de Usuários:** Sistema seguro de login e cadastro com JWT.
* 🪴 **Gestão da Planta:** Cadastro de plantas e pareamento com dispositivos IoT.
* 📊 **Monitoramento em Tempo Real:** Dashboard com dados de umidade, temperatura e luminosidade.
* 💧 **Controle Remoto:** Acionamento manual da bomba d'água e de proteções.
* 🎮 **Gamificação:** Sistema de pontos e conquistas com o mascote "Caquito".
* 🤖 **Assistente com IA:** Dicas personalizadas sobre a saúde da planta usando Google Gemini.
* 📈 **Histórico de Dados:** Gráficos com o histórico dos sensores.

## 🛠️ Stack de Tecnologias

| Categoria      | Tecnologia          | Finalidade                              |
| :------------- | :------------------ | :-------------------------------------- |
| **Frontend** | React + Mantine     | UI moderna e responsiva                 |
| **Backend** | Node.js + Express   | API REST robusta                        |
| **Banco de Dados** | PostgreSQL + Prisma | Persistência de dados e ORM type-safe |
| **Autenticação** | JWT                 | Gerenciamento de sessões seguras        |
| **Deploy** | Docker + Nginx      | Containerização e proxy reverso         |
| **IoT** | ESP32 + Sensores    | Hardware embarcado                      |
| **IA** | Google Gemini       | Assistente inteligente                  |

## 🐳 Ambientes e Docker

O projeto é totalmente containerizado com Docker e foi projetado para rodar em dois ambientes distintos, gerenciados pelo script `docker-manager.sh`.

### **Desenvolvimento (`dev`)**

-   **Foco:** Agilidade e produtividade.
-   **Hot-Reload:** Frontend e Backend atualizam automaticamente no container ao salvar alterações no código.
-   **Servidores:** Vite Dev Server para o frontend, `ts-node-dev` para o backend.
-   **Logs:** Detalhados para facilitar o debug.

### **Produção (`prod`)**

-   **Foco:** Performance, segurança e estabilidade.
-   **Otimização:** Código compilado para JavaScript puro. Imagens Docker enxutas com multi-stage builds.
-   **Servidores:** Nginx servindo o build estático do React e atuando como proxy reverso para a API.
-   **Segurança:** Execução com usuário não-root e configuração de segurança no Nginx.

## 🚀 Como Rodar o Projeto

### **📋 Pré-requisitos**

-   **Git** (v2.0 ou superior)
-   **Docker** (v20.0 ou superior)
-   **Docker Compose** (v2.0 ou superior)

### **Passo 1: Clonar o Repositório**

```bash
git clone https://github.com/salmomascarenhas/minha-plantinha.git
cd minha-plantinha
````

### **Passo 2: Configurar as Variáveis de Ambiente**

Os arquivos `.env.*` na raiz do projeto controlam as configurações.

  - **Para Desenvolvimento:** O arquivo `.env.development` já vem pré-configurado e pronto para uso.
  - **Para Produção:** Você precisa criar e configurar o arquivo `.env.production`.

<!-- end list -->

```bash
# 1. Copie o arquivo de desenvolvimento como base para produção
cp .env.development .env.production

# 2. Edite o arquivo .env.production e altere as variáveis críticas
nano .env.production
```

**Altere estas variáveis em `.env.production`:**

```env
# Mude a porta do frontend para produção, se desejar (ex: 8080)
FRONTEND_PORT=8080

# GERE NOVAS CHAVES SEGURAS PARA PRODUÇÃO!
JWT_SECRET="gere_uma_nova_chave_super_segura_com_pelo_menos_32_caracteres"
GEMINI_API_KEY="sua_chave_real_do_google_gemini_aqui"
```

### **Passo 3: Usar o Gerenciador Docker**

O script `docker-manager.sh` simplifica todo o processo.

```bash
# Para iniciar o ambiente de DESENVOLVIMENTO
./docker-manager.sh up dev

# Para iniciar o ambiente de PRODUÇÃO
./docker-manager.sh up prod
```

### 🎛️ Comandos do Gerenciador

| Comando                  | Descrição                                                                      |
| :----------------------- | :----------------------------------------------------------------------------- |
| `up [dev\|prod]`         | Constrói as imagens (se necessário) e sobe os containers do ambiente escolhido.    |
| `down`                   | Para e remove os containers e a rede do último ambiente executado.               |
| `build [dev\|prod]`      | Força a reconstrução das imagens para o ambiente escolhido, sem usar cache.      |
| `restart [dev\|prod]`    | Reinicia os containers do ambiente.                                              |
| `logs`                   | Exibe os logs de todos os containers em tempo real.                              |
| `clean`                  | Para tudo e remove containers, redes e **volumes de banco de dados**. CUIDADO\!   |
| `help` (ou sem comando)  | Mostra a ajuda do script.                                                      |

### 🌐 Pontos de Acesso

| Ambiente          | Frontend (Navegador)           | Backend (API)                    |
| :---------------- | :----------------------------- | :------------------------------- |
| **Desenvolvimento** | `http://localhost:5173`        | `http://localhost:3000/api`      |
| **Produção** | `http://localhost:8080` (ou a porta que você definiu) | `http://localhost:8080/api`      |

-----

### 🚨 Solução de Problemas

Para erros comuns como portas em uso, falhas de build ou problemas de permissão, consulte nosso guia detalhado:
**[➡️ `docs/TROUBLESHOOTING.md`](https://www.google.com/search?q=./docs/TROUBLESHOOTING.md)**

-----

### 👨‍💻 Equipe

| Nome                                  | Matrícula | E-mail                  |
| :------------------------------------ | :-------- | :---------------------- |
| Francisco Cassiano de Vasconcelos Souza | 413067    | casinho.555@gmail.com   |
| Salmo da Cruz Mascarenhas             | 431447    | salmo.cruz@gmail.com    |
| Akyla de Aquino Pinto                 | 412723    | akylaaquino@hotmail.com |
