#!/usr/bin/env bash
set -euo pipefail

# Clean Deployment script for MusicHub
# Ensure we are in the root directory
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

echo "1. Pulling latest code..."
git pull origin main

echo "2. Building and starting containers with sudo..."
sudo docker compose down
sudo docker compose up -d --build

echo "3. Running database migrations..."
# Wait a few seconds for DB to be ready if it's a cold start
sleep 5
sudo docker compose exec -T api npx prisma migrate deploy
sudo docker compose exec -T api npx prisma generate

echo "4. Pruning old images to save space..."
sudo docker image prune -f

echo "✅ Deployment complete."
echo "Check status: sudo docker compose ps"
