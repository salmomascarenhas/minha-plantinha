#!/bin/sh
set -e

npx prisma generate

# Espera o banco de dados ficar pronto
until npx prisma migrate deploy; do
  echo "Aguardando o banco de dados ficar pronto..."
  sleep 2
done

exec "$@"
