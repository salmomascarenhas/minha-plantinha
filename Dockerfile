FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production=false
COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma
RUN npm run build

FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/prisma ./prisma
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh
COPY .env .env
EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "dist/app.js"]

FROM node:20-alpine AS dev
WORKDIR /app
ENV NODE_ENV=development
COPY package.json package-lock.json* ./
RUN npm install --production=false
COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh
COPY .env .env
EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "run", "dev"]
