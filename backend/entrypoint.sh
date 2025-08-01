#!/bin/sh
set -e

npx prisma generate

echo "Aguardando o banco de dados..."
until npx prisma migrate deploy; do
  echo "Tentando conectar ao banco de dados novamente..."
  sleep 2
done
echo "Migrações aplicadas com sucesso."

if [ "$NODE_ENV" = "production" ]; then
  echo "Executando seed de produção..."
  npm run db:seed:prod
else
  echo "Executando seed de desenvolvimento..."
  npm run db:seed:dev
fi

echo "Seed executado com sucesso."

exec "$@"