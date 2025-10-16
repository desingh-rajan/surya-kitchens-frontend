# Deployment Guide for Surya's Cookware

## Prerequisites

1. **Docker Hub Account**: Create account at hub.docker.com
2. **Kamal Installed**: Install with `gem install kamal`
3. **Server Access**: SSH access to 139.84.156.199
4. **Domain Ready**: suryascookware.com pointing to the server

## Step-by-Step Deployment

### 1. GoDaddy DNS Setup

Login to GoDaddy and add these DNS records:

```
Type: A Record
Name: @
Value: 139.84.156.199
TTL: 600

Type: A Record
Name: www
Value: 139.84.156.199
TTL: 600
```

Wait for DNS propagation (can take up to 48 hours, usually 15-30 minutes).

### 2. Docker Hub Setup

1. Go to hub.docker.com and create repository:
   - Name: `suryas-cookware`
   - Visibility: Public or Private

2. Generate Access Token:
   - Account Settings → Security → New Access Token
   - Save this token securely!

### 3. Configure Kamal

1. Copy environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Docker Hub token:
   ```bash
   KAMAL_REGISTRY_PASSWORD=your_docker_hub_token_here
   ```

3. Verify your username in `config/deploy.yml` (should be your Docker Hub username)

### 4. Server Preparation

SSH into your server:
```bash
ssh root@139.84.156.199
```

Update system and install Docker:
```bash
apt update && apt upgrade -y
apt install docker.io docker-compose -y
systemctl enable docker
systemctl start docker
```

### 5. Deploy with Kamal

From your local project directory:

```bash
# Setup Kamal (first time only)
kamal setup

# Or deploy (for updates)
kamal deploy
```

### 6. SSL Certificate

Kamal will automatically:
- Set up Traefik as reverse proxy
- Obtain Let's Encrypt SSL certificate
- Configure automatic HTTPS redirect

### 7. Verify Deployment

Check your site:
- https://suryascookware.com
- https://www.suryascookware.com

### Useful Kamal Commands

```bash
# View logs
kamal app logs

# SSH into container
kamal app exec -i bash

# Restart app
kamal app restart

# Check status
kamal app status

# Rollback to previous version
kamal rollback

# Remove everything
kamal remove
```

## Troubleshooting

### DNS not resolving
```bash
# Check DNS propagation
dig suryascookware.com
nslookup suryascookware.com
```

### Docker build fails
```bash
# Test local build
docker build -t suryas-cookware .
docker run -p 3000:3000 suryas-cookware
```

### Can't connect to server
```bash
# Test SSH connection
ssh root@139.84.156.199

# Check if Docker is running
systemctl status docker
```

### SSL certificate issues
```bash
# Check Traefik logs
kamal traefik logs
```

## Project Structure

```
.
├── config/
│   └── deploy.yml          # Kamal configuration
├── Dockerfile              # Docker build instructions
├── .dockerignore          # Files to exclude from Docker build
├── .env                   # Environment variables (don't commit!)
└── .env.example           # Template for environment variables
```

## Security Notes

- Never commit `.env` file to git
- Keep Docker Hub token secure
- Use SSH keys instead of passwords for server access
- Regularly update server packages
- Monitor application logs

## Support

For issues or questions:
- Email: info@suryascookware.com
- Developer: desinghrajan.in
