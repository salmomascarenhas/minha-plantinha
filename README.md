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
Graças ao uso de Docker, o ambiente de desenvolvimento pode ser iniciado com um único comando.

**Pré-requisitos:**
* `Git`
* `Docker`
* `Docker Compose`

**Passos para a execução:**

```bash
# 1. Clone o repositório
git clone [https://github.com/salmomascarenhas/minha-plantinha](https://github.com/salmomascarenhas/minha-plantinha)

# 2. Navegue até o diretório do projeto
cd minha-plantinha

# 3. Configure as variáveis de ambiente
# Crie um arquivo .env na raiz do projeto, a partir do exemplo fornecido.
# Este passo é crucial para o funcionamento da aplicação.
cp .env.example .env

# Preencha o arquivo .env com suas credenciais (banco de dados, segredos, etc.)

# 4. Suba os contêineres com o Docker Compose
# Este comando irá construir as imagens e iniciar todos os serviços
# (aplicação, banco de dados, etc.)
docker-compose up

# Para rodar em segundo plano (detached mode), use a flag -d:
# docker-compose up -d
````

O serviço da aplicação está configurado para executar as migrações do Prisma automaticamente ao iniciar. Após a execução, a API estará disponível em `http://localhost:3000` (ou na porta que você definir no seu `.env`).

## ✅ Andamento e Próximos Passos
Acompanhe aqui o status de desenvolvimento de cada funcionalidade.

  * [x] **Fase 0: Planejamento e Configuração**
      * [x] Definição do escopo e requisitos do projeto.
      * [x] Definição da arquitetura e da stack de tecnologias.
      * [x] Criação da estrutura inicial do projeto e do `README`.

  * [ ] **Fase 1: Backend (API & Lógica de Negócio)**
      * [x] `PLT-001`: Implementar rotas de autenticação (cadastro, login) com JWT.
      * [x] `PLT-002`: Implementar endpoints CRUD para gerenciamento de plantas e pareamento com o ESP32.
      * [x] Criar endpoints para receber e armazenar os dados dos sensores.
      * [x] `PLT-004`: Criar endpoints para acionamento remoto dos atuadores.
      * [⏳] `PLT-005`: Modelar e implementar a lógica de gamificação (pontuação e conquistas).
      * [x] `PLT-007`: Desenvolver endpoints para consulta de histórico de dados.
      
  * [ ] **Fase 2: Frontend (UI & Integração)**
      * [x] Construir as telas de Login e Cadastro.
      * [x] Desenvolver o Dashboard principal.
      * [x] `PLT-003`: Integrar o dashboard com a API para exibir dados em tempo real.
      * [⏳] `PLT-005`: Integrar a animação do Rive e fazer com que ela reaja aos dados.
      * [x] Implementar a interface de controle remoto.
      * [x] `PLT-007`: Criar os gráficos para a visualização do histórico.
      * [ ] Implementar o tema claro/escuro.
    
  * [ ] **Fase 3: IoT (Dispositivo Embarcado)**
      * [ ] Desenvolver o código para o ESP32 ler os sensores de umidade, temperatura e luminosidade.
      * [ ] Implementar a comunicação (via REST ou MQTT) para enviar os dados ao backend.
      * [ ] Implementar a lógica para receber comandos do backend e acionar a bomba e o motor.

  * [ ] **Fase 4: Funcionalidades Avançadas**
      * [⏳] `PLT-006`: Integrar com a API do LLM para gerar as dicas do assistente virtual.
      * [ ] Implementar testes de unidade e integração.
      * [ ] Configurar pipeline de CI/CD (Opcional).

  * [ ] **Fase 5: Melhorias Extras (Opcional)**
      * [ ] Permitir que o usuário se conecte ao hardware utilizando uma interface para detectar dispositivos na rede.
      * [ ] Integrar Frontend com uma biblioteca reativa moderna.
      * [ ] Refinar o design da interface.
      
# 👨‍💻 Equipe
| Nome | Matrícula | E-mail |
| :--- | :--- | :--- |
| Francisco Cassiano de Vasconcelos Souza | 413067 | casinho.555@gmail.com
Salmo da Cruz Mascarenhas | 431447 | salmo.cruz@gmail.com
Akyla de Aquino Pinto | 412723 | akylaaquino@hotmail.com 