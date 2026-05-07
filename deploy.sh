#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/www/wwwroot/hub.arosoft.io}"
REPO_URL="${REPO_URL:-https://github.com/AROSOFTio/musichub-modular.git}"
BRANCH="${BRANCH:-main}"

cd "$APP_DIR"

echo "Configuring git safe directory..."
sudo git config --global --add safe.directory "$APP_DIR" || true

echo "Syncing code from $REPO_URL ($BRANCH)..."
sudo git remote set-url origin "$REPO_URL"
sudo git fetch origin "$BRANCH"
sudo git reset --hard "origin/$BRANCH"

if [ ! -f .env ]; then
  echo "Creating .env from .env.example..."
  sudo cp .env.example .env
  echo "Edit $APP_DIR/.env with production secrets, then rerun this script."
  exit 1
fi

echo "Rebuilding and starting containers..."
sudo docker compose down --remove-orphans
sudo docker compose build --no-cache
sudo docker compose up -d

echo "Running database migrations and seed..."
sudo docker compose exec api npm run prisma:migrate:deploy
sudo docker compose exec api npm run seed

echo "Container status..."
sudo docker compose ps
