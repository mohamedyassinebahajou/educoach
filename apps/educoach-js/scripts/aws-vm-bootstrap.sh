#!/bin/bash
# Run once on a fresh Ubuntu EC2 instance (AWS Free Tier t2/t3.micro).
# Usage (on the VM):
#   sudo bash aws-vm-bootstrap.sh
# From your laptop:
#   scp -i ~/.ssh/educoach-key.pem apps/educoach-js/scripts/aws-vm-bootstrap.sh ubuntu@EC2_IP:~
#   ssh -i ~/.ssh/educoach-key.pem ubuntu@EC2_IP 'sudo bash ~/aws-vm-bootstrap.sh'

set -euo pipefail

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run as root: sudo bash aws-vm-bootstrap.sh"
  exit 1
fi

echo "==> Adding 2 GB swap (helps Docker build on 1 GB RAM)…"
if ! swapon --show | grep -q '/swapfile'; then
  fallocate -l 2G /swapfile 2>/dev/null || dd if=/dev/zero of=/swapfile bs=1M count=2048
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

DEPLOY_USER="${SUDO_USER:-ubuntu}"
if id "$DEPLOY_USER" &>/dev/null; then
  usermod -aG docker "$DEPLOY_USER"
  echo "Added $DEPLOY_USER to the docker group (log out and back in for it to apply)."
fi

mkdir -p /home/"$DEPLOY_USER"/Projet-FR-IA/apps
chown -R "${DEPLOY_USER}:${DEPLOY_USER}" /home/"$DEPLOY_USER"/Projet-FR-IA

echo ""
echo "Bootstrap done."
echo "Next:"
echo "  1. Upload the project to ~/Projet-FR-IA/apps/educoach-js (scp or git clone)"
echo "  2. cd ~/Projet-FR-IA/apps/educoach-js"
echo "  3. cp .env.production.example .env && nano .env   # set AUTH_SECRET"
echo "  4. docker compose up -d --build"
echo ""
echo "See HOSTING-AWS.md for security group and full steps."
