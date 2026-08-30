# Deploy EduCoach JS on AWS (Free Tier EC2 — 12 months)

Deploy with **Docker** on a **t2.micro** or **t3.micro** instance. SQLite persists in a Docker volume on the instance disk.

**Free Tier (new AWS accounts, first 12 months — verify on [AWS Free Tier](https://aws.amazon.com/free/)):**

| Resource | Typical allowance |
|----------|-------------------|
| EC2 | **750 hours/month** of **t2.micro** or **t3.micro** (Linux) |
| EBS | **30 GB** gp2/gp3 |
| Data transfer | **15 GB/month** outbound (varies by region) |

One instance running 24/7 ≈ 720 h/month → fits in free tier. **After 12 months**, the instance is billed unless you stop or migrate.

**Specs:** 1 vCPU, **1 GB RAM** — bootstrap adds **2 GB swap** for Docker builds.

---

## Part 1 — Create the EC2 instance (AWS Console)

1. Sign in to [AWS Console](https://console.aws.amazon.com) → **EC2** → **Launch instance**.

| Setting | Value |
|---------|--------|
| Name | `educoach-vm` |
| AMI | **Ubuntu Server 24.04 LTS** (64-bit x86) |
| Instance type | **t2.micro** or **t3.micro** (must show **Free tier eligible**) |
| Key pair | **Create new** → download `.pem` (e.g. `educoach-key.pem`) |
| Network | Default VPC is fine |
| Storage | **30 GiB** gp3 (free tier) |
| Security group | Create new — see below |

2. **Security group** (inbound rules):

| Type | Port | Source | Purpose |
|------|------|--------|---------|
| SSH | 22 | **My IP** (recommended) | Admin access |
| Custom TCP | **3000** | `0.0.0.0/0` (testing) or **My IP** | EduCoach app |
| HTTP | 80 | `0.0.0.0/0` | Optional (Caddy later) |
| HTTPS | 443 | `0.0.0.0/0` | Optional (Caddy later) |

3. **Launch instance**.

4. Copy the **Public IPv4 address** (e.g. `3.x.x.x`).

5. Fix key permissions on your laptop:

```bash
chmod 400 ~/Downloads/educoach-key.pem
```

---

## Part 1b — Create with AWS CLI (optional)

```bash
export AWS_REGION=eu-west-3          # pick your region
export KEY_NAME=educoach-key
export SG_NAME=educoach-sg

aws ec2 create-key-pair --key-name "$KEY_NAME" --query 'KeyMaterial' --output text > "${KEY_NAME}.pem"
chmod 400 "${KEY_NAME}.pem"

VPC_ID=$(aws ec2 describe-vpcs --filters Name=isDefault,Values=true --query 'Vpcs[0].VpcId' --output text)

SG_ID=$(aws ec2 create-security-group --group-name "$SG_NAME" --description "EduCoach test" --vpc-id "$VPC_ID" --query 'GroupId' --output text)

MY_IP=$(curl -s https://checkip.amazonaws.com)

aws ec2 authorize-security-group-ingress --group-id "$SG_ID" --protocol tcp --port 22 --cidr "${MY_IP}/32"
aws ec2 authorize-security-group-ingress --group-id "$SG_ID" --protocol tcp --port 3000 --cidr 0.0.0.0/0

AMI_ID=$(aws ssm get-parameters --names /aws/service/canonical/ubuntu/server/24.04/stable/current/amd64/hvm/ebs-gp3/ami-id --query 'Parameters[0].Value' --output text)

aws ec2 run-instances \
  --image-id "$AMI_ID" \
  --instance-type t3.micro \
  --key-name "$KEY_NAME" \
  --security-group-ids "$SG_ID" \
  --block-device-mappings '[{"DeviceName":"/dev/sda1","Ebs":{"VolumeSize":30,"VolumeType":"gp3"}}]' \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=educoach-vm}]'
```

---

## Part 2 — Bootstrap the VM (Docker + swap)

Set variables on your laptop (repo root `Projet-FR-IA`):

```bash
export EC2_IP=YOUR_PUBLIC_IP
export KEY=~/Downloads/educoach-key.pem
export SSH="ssh -i $KEY -o StrictHostKeyChecking=accept-new ubuntu@$EC2_IP"
export SCP="scp -i $KEY"
```

Upload and run bootstrap:

```bash
$SCP apps/educoach-js/scripts/aws-vm-bootstrap.sh ubuntu@"$EC2_IP":~
$SSH 'sudo bash ~/aws-vm-bootstrap.sh'
```

Log out and back in so the `docker` group applies (or use `sudo docker` for the first deploy).

---

## Part 3 — Upload the app

### Option A — rsync/scp from your machine (no GitHub)

```bash
$SSH 'mkdir -p ~/Projet-FR-IA/apps'

$SCP -r apps/educoach-js ubuntu@"$EC2_IP":~/Projet-FR-IA/apps/
```

### Option B — Git clone on the server

```bash
$SSH
git clone https://github.com/YOUR_USER/Projet-FR-IA.git
```

---

## Part 4 — Configure and start

```bash
$SSH

cd ~/Projet-FR-IA/apps/educoach-js
cp .env.production.example .env
openssl rand -base64 32    # paste into AUTH_SECRET
nano .env
docker compose up -d --build
```

**.env` minimum:**

```env
AUTH_SECRET=your-generated-secret
HOST_PORT=3000
EDUCOACH_API_FALLBACK=local
DATABASE_URL=file:/data/educoach.db
```

First build may take **10–20 minutes** on t2/t3.micro.

Check status:

```bash
docker compose ps
docker compose logs -f web
```

---

## Part 5 — Open the site

```text
http://EC2_PUBLIC_IP:3000
```

Demo logins:

| User | Password |
|------|----------|
| `student1` … `student5` | `student123` |
| `coach` | `coach123` |

---

## Part 6 — Updates

From your laptop:

```bash
$SCP -r apps/educoach-js ubuntu@"$EC2_IP":~/Projet-FR-IA/apps/
$SSH 'cd ~/Projet-FR-IA/apps/educoach-js && docker compose up -d --build'
```

Or on the server after `git pull`:

```bash
cd ~/Projet-FR-IA/apps/educoach-js
git pull
docker compose up -d --build
```

---

## Optional — Elastic IP (stable URL)

If the public IP changes after stop/start:

1. EC2 → **Elastic IPs** → Allocate
2. Associate with `educoach-vm`
3. Free while attached to a **running** instance

---

## Optional — HTTPS with Caddy

With a domain’s **A record** → EC2 public IP:

```bash
sudo apt-get update
sudo apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt-get update && sudo apt-get install -y caddy

echo 'educoach.yourdomain.com {
  reverse_proxy localhost:3000
}' | sudo tee /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Open ports **80** and **443** in the security group.

---

## Stay in Free Tier

| Do | Avoid |
|----|--------|
| **t2.micro** / **t3.micro** only | Larger instance types |
| **30 GB** root volume | Extra large EBS volumes |
| **One** instance 24/7 (~720 h/mo) | Many instances at once |
| Budget alert at **$1** | Leaving unused Elastic IPs unattached (small charge) |

**Billing → Budgets** → create budget with email alert.

**Stop** the instance when not testing (EBS storage still counts toward free 30 GB; no compute hours while stopped).

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| SSH timeout | Security group: port **22** from your IP; instance **running** |
| Cannot connect to :3000 | Security group: **3000** open; `docker compose ps` |
| Build OOM / killed | `free -h` — re-run bootstrap for swap |
| `Permission denied (publickey)` | `chmod 400` on `.pem`; user is **`ubuntu`** |
| `Set AUTH_SECRET` | Edit `.env` before `docker compose up` |

---

See also: [`HOSTING.md`](./HOSTING.md) · [`HOSTING-GCP.md`](./HOSTING-GCP.md)
