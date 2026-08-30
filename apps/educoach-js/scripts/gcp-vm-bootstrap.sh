#!/bin/bash
# Run once on a fresh Ubuntu e2-micro VM (Google Cloud Always Free).
# Usage (on the VM):
#   curl -fsSL https://raw.githubusercontent.com/YOUR_ORG/YOUR_REPO/main/apps/educoach-js/scripts/gcp-vm-bootstrap.sh | bash
# Or copy from your laptop:
#   gcloud compute scp apps/educoach-js/scripts/gcp-vm-bootstrap.sh educoach-vm:~ --zone=YOUR_ZONE
#   gcloud compute ssh educoach-vm --zone=YOUR_ZONE -- 'bash ~/gcp-vm-bootstrap.sh'

set -euo pipefail

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run as root: sudo bash gcp-vm-bootstrap.sh"
  exit 1
fi

echo "==> Adding 2 GB swap (helps Docker build on 1 GB RAM)…"
if ! swapon --show | grep -q '/swapfile'; then
  fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "==> Installing Docker…"
apt-get update
apt-get install -y ca-certificates curl git
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${VERSION_CODENAME}") stable" \
  > /etc/apt/sources.list.d/docker.list
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
systemctl enable docker
systemctl start docker

DEPLOY_USER="${SUDO_USER:-$USER}"
if [[ "$DEPLOY_USER" != "root" ]]; then
  usermod -aG docker "$DEPLOY_USER"
  echo "Added $DEPLOY_USER to the docker group (log out and back in for it to apply)."
fi

mkdir -p /opt/educoach-js
chown -R "${DEPLOY_USER}:${DEPLOY_USER}" /opt/educoach-js

echo ""
echo "Bootstrap done."
echo "Next:"
echo "  1. Upload the project to /opt/educoach-js (git clone or gcloud scp)"
echo "  2. cd /opt/educoach-js/apps/educoach-js"
echo "  3. cp .env.production.example .env && nano .env   # set AUTH_SECRET"
echo "  4. docker compose up -d --build"
echo ""
echo "See HOSTING-GCP.md for firewall and full steps."
