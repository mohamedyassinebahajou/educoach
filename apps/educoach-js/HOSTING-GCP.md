# Deploy EduCoach JS on Google Cloud (Always Free e2-micro)

This guide deploys the app on a **free-tier** `e2-micro` VM with Docker. SQLite data persists on the VM disk via a Docker volume.

**Always Free limits (check [Google Cloud free tier](https://cloud.google.com/free) for updates):**

- `e2-micro` VM in **`us-west1`**, **`us-central1`**, or **`us-east1`** only
- ~30 GB standard persistent disk
- Egress bandwidth cap (fine for classroom testing)

**VM specs:** 1 vCPU shared, **1 GB RAM** — we add **swap** so `docker compose build` can finish.

---

## Part 1 — Create the VM (Google Cloud Console)

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and create a project (e.g. `educoach-test`).
2. **Billing:** attach a billing account (required even for Always Free; you stay in free limits if configured correctly).
3. **Compute Engine → VM instances → Create instance**

| Setting | Value |
|---------|--------|
| Name | `educoach-vm` |
| Region | **`us-central1`** (or `us-west1` / `us-east1`) |
| Zone | any in that region |
| Machine type | **e2-micro** |
| Boot disk | Ubuntu 24.04 LTS, **30 GB** standard persistent disk |
| Firewall | Allow **HTTP** and **HTTPS** (optional, for later) |

4. Click **Create**.

5. **Firewall for port 3000** (until you add a reverse proxy):

   - **VPC network → Firewall → Create rule**
   - Name: `allow-educoach-3000`
   - Targets: `All instances` (or network tag `educoach` on the VM)
   - Source IPv4: `0.0.0.0/0` (testing only — restrict to your IP in production)
   - Protocol/port: **tcp:3000**
   - Create

6. Note the VM **External IP** (e.g. `34.x.x.x`).

---

## Part 1b — Create the VM (gcloud CLI)

```bash
export PROJECT_ID=educoach-test
export ZONE=us-central1-a
export VM=educoach-vm

gcloud config set project "$PROJECT_ID"

gcloud compute instances create "$VM" \
  --zone="$ZONE" \
  --machine-type=e2-micro \
  --image-family=ubuntu-2404-lts-amd64 \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=30GB \
  --tags=http-server,https-server

gcloud compute firewall-rules create allow-educoach-3000 \
  --allow=tcp:3000 \
  --target-tags=http-server \
  --description="EduCoach JS test port"
```

---

## Part 2 — Bootstrap the VM (Docker + swap)

From your laptop (repo root `Projet-FR-IA`):

```bash
export ZONE=us-central1-a
export VM=educoach-vm

gcloud compute scp apps/educoach-js/scripts/gcp-vm-bootstrap.sh "$VM":~ --zone="$ZONE"
gcloud compute ssh "$VM" --zone="$ZONE" --command='sudo bash ~/gcp-vm-bootstrap.sh'
```

Log out and back in (or run deploy commands with `sudo docker` until group membership applies).

---

## Part 3 — Upload the app

### Option A — rsync from your machine (no GitHub required)

From **`Projet-FR-IA`** on your laptop:

```bash
export ZONE=us-central1-a
export VM=educoach-vm

# Sync the Next.js app only (smaller upload)
gcloud compute ssh "$VM" --zone="$ZONE" --command='mkdir -p ~/Projet-FR-IA/apps/educoach-js'

gcloud compute scp --recurse \
  apps/educoach-js \
  "$VM":~/Projet-FR-IA/apps/ \
  --zone="$ZONE"
```

On the VM:

```bash
gcloud compute ssh "$VM" --zone="$ZONE"

cd ~/Projet-FR-IA/apps/educoach-js
cp .env.production.example .env
nano .env   # set AUTH_SECRET — see below
docker compose up -d --build
```

First build may take **10–20 minutes** on e2-micro (swap helps).

### Option B — Git clone (if the repo is on GitHub)

```bash
gcloud compute ssh "$VM" --zone="$ZONE"

git clone https://github.com/YOUR_USER/Projet-FR-IA.git
cd Projet-FR-IA/apps/educoach-js
cp .env.production.example .env
nano .env
docker compose up -d --build
```

---

## Part 4 — Environment file

On the VM, edit `apps/educoach-js/.env`:

```env
AUTH_SECRET=paste-output-of-openssl-rand-base64-32
HOST_PORT=3000
EDUCOACH_API_FALLBACK=local
DATABASE_URL=file:/data/educoach.db
```

Generate a secret on the VM:

```bash
openssl rand -base64 32
```

---

## Part 5 — Open the site

```text
http://EXTERNAL_IP:3000
```

Demo logins (auto-seeded):

| User | Password |
|------|----------|
| `student1` … `student5` | `student123` |
| `coach` | `coach123` |

Check logs:

```bash
cd ~/Projet-FR-IA/apps/educoach-js
docker compose logs -f web
```

---

## Part 6 — Updates

From your laptop (rsync + rebuild):

```bash
gcloud compute scp --recurse apps/educoach-js "$VM":~/Projet-FR-IA/apps/ --zone="$ZONE"
gcloud compute ssh "$VM" --zone="$ZONE" --command='cd ~/Projet-FR-IA/apps/educoach-js && docker compose up -d --build'
```

Or on the VM after `git pull`:

```bash
cd ~/Projet-FR-IA/apps/educoach-js
git pull
docker compose up -d --build
```

---

## Optional — HTTP on port 80 (Caddy)

If you have a domain pointing to the VM IP:

```bash
sudo apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt-get update && sudo apt-get install -y caddy

echo 'your.domain.com {
  reverse_proxy localhost:3000
}' | sudo tee /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Ensure firewall allows **tcp:80** and **tcp:443** (default HTTP/HTTPS rules).

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Build killed (OOM) | Confirm swap: `free -h` — re-run bootstrap script |
| `Connection refused` on :3000 | `docker compose ps` — wait for build; check firewall rule |
| `Set AUTH_SECRET in .env` | Edit `.env` on the VM before `docker compose up` |
| Slow first load | Normal on e2-micro; cold start after idle |
| Billing surprise | Use **only** `e2-micro` in **us-central1/west1/east1**; set budget alert in GCP |

**Budget alert:** Billing → Budgets & alerts → Create budget (e.g. €1) with email notification.

---

## Stay in Always Free

- Do **not** upgrade machine type above `e2-micro` in those 3 regions without checking cost.
- Avoid extra static IPs, load balancers, or large disks.
- Stop the VM when not testing if you want zero egress (instance stop is free; disk still counts toward free disk quota).

---

See also: [`HOSTING.md`](./HOSTING.md) for generic Docker and env reference.
