#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

echo "Pulling latest code..."
git pull origin main

echo "Installing dependencies..."
npm install

echo "Building project..."
npm run build

echo "Starting Docker containers..."
sudo docker compose down
sudo docker compose up -d --build

echo "Checking containers..."
sudo docker compose ps

echo "Deployment complete."
