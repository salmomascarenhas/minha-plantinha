# ==============================================
# DEVELOPMENT DOCKERFILE - BACKEND
# ==============================================

FROM node:20-alpine AS development
WORKDIR /app

# Set development environment
ENV NODE_ENV=development

# Install development dependencies
COPY package.json package-lock.json* ./
RUN npm install && npm cache clean --force

# Copy source code
COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma

# Copy entrypoint script
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh && \
    apk add --no-cache dos2unix && \
    dos2unix entrypoint.sh

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "run", "dev"]
