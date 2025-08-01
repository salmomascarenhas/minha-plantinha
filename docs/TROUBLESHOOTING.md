
# 🚨 Guia de Troubleshooting - Minha Plantinha

Este documento centraliza a solução para os problemas mais comuns encontrados ao rodar o projeto com Docker.

## 📋 Índice

1.  [Erro: `port is already allocated`](#1-erro-port-is-already-allocated)
2.  [Erro: `tsc: not found` ou `ts-node: not found`](#2-erro-tsc-not-found-ou-ts-node-not-found)
3.  [Erro: Permissões (`Can't write to /app/node_modules/...`)](#3-erro-permissões-cant-write-to-appnode_modules)
4.  [Hot-Reload não funciona em modo `dev`](#4-hot-reload-não-funciona-em-modo-dev)
5.  [Comandos Úteis de Docker para Debug](#5-comandos-úteis-de-docker-para-debug)

---

### 1. Erro: `port is already allocated`

**Sintoma:** Ao executar `up`, o Docker reclama que a porta (`5173`, `3000`, `80`, `8080`, etc.) já está em uso.

**Causa:** Outro serviço ou aplicação na sua máquina (Host) ou dentro do WSL já está ocupando essa porta.

**Solução:**

1.  **Identifique o Processo:**
    -   **Em Linux ou macOS:**
        ```bash
        # Substitua 8080 pela porta com problema
        sudo lsof -i :8080
        ```
    -   **No Windows (usando PowerShell como Administrador):**
        ```powershell
        # Substitua 8080 pela porta com problema
        netstat -aon | findstr ':8080'
        ```
        Anote o PID (último número) e procure-o no Gerenciador de Tarefas.

2.  **Ação:**
    -   Pare o processo que está usando a porta.
    -   Ou, se não puder pará-lo, altere a porta correspondente (`FRONTEND_PORT` ou `BACKEND_PORT`) no seu arquivo `.env.*` e reinicie o Docker.

### 2. Erro: `tsc: not found` ou `ts-node: not found`

**Sintoma:** O build falha (`tsc: not found`) ou o container de produção não consegue executar o seed (`ts-node: not found`).

**Causa:** Uma tentativa de executar uma dependência de desenvolvimento (`devDependency`) em um ambiente de produção, onde elas não são instaladas.

**Solução:**
-   **Build (`tsc`):** Verifique se o `client/Dockerfile` ou `backend/Dockerfile` não possui `ENV NODE_ENV=production` no estágio de `build`. As devDependencies são necessárias para construir, mas não para rodar.
-   **Seed (`ts-node`):** O `entrypoint.sh` deve ser "inteligente". Ele deve rodar `ts-node` em desenvolvimento e `node` com o arquivo `.js` compilado em produção. Nossa configuração atual já faz isso. Se o erro ocorrer, verifique se o `entrypoint.sh` e o `package.json` estão com os scripts de seed (`db:seed:dev`, `db:seed:prod`) corretos.

### 3. Erro: Permissões (`Can't write to /app/node_modules/...`)

**Sintoma:** Ocorre no container de produção (`backend-production`) ao tentar executar comandos do Prisma.

**Causa:** O container de produção roda com um usuário não-root (`backend`) por segurança. No entanto, a pasta `node_modules` foi criada pelo usuário `root` durante o build e o usuário `backend` não tem permissão para escrever nela (o que o Prisma precisa fazer).

**Solução:**
-   No `backend/Dockerfile`, no estágio `production`, garanta que a propriedade da pasta `/app` seja concedida ao usuário `backend` **antes** do comando `USER backend`.

    ```dockerfile
    # ... (depois dos comandos COPY)
    RUN addgroup -S nodejs && adduser -S backend -G nodejs
    RUN chown -R backend:nodejs /app  # <--- LINHA ESSENCIAL
    USER backend
    # ...
    ```

### 4. Hot-Reload não funciona em modo `dev`

**Sintoma:** Ao alterar um arquivo no `backend/src` ou `client/src`, o container não reinicia ou a página não atualiza.

**Causa:** Geralmente, um problema com a montagem dos volumes do Docker.

**Solução:**
-   Verifique o arquivo `docker-compose.override.yml`.
-   Confirme se os serviços `backend` e `frontend` possuem a seção `volumes` montando o código-fonte da sua máquina para dentro do container. Exemplo:
    ```yaml
    volumes:
      - ./backend:/app
      - /app/node_modules # Impede que o node_modules local sobrescreva o do container
    ```

### 5. Comandos Úteis de Docker para Debug

```bash
# Ver logs de um container específico em tempo real
docker logs -f backend-development

# Acessar o terminal de um container em execução
# Ótimo para verificar se os arquivos existem e testar comandos
docker exec -it backend-development /bin/sh

# Inspecionar toda a configuração de um container (redes, volumes, etc.)
docker inspect frontend-production

# Limpar o sistema Docker (remove containers parados, redes não usadas, etc.)
docker system prune -f