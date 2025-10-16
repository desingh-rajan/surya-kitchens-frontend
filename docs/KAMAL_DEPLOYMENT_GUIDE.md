# Kamal 2.x Deployment Guide - Complete Reference

## Table of Contents

1. [Overview](#overview)
2. [Common Deployment Issues](#common-deployment-issues)
3. [Correct deploy.yml Template](#correct-deployyml-template)
4. [Configuration Explained](#configuration-explained)
5. [Secrets Management](#secrets-management)
6. [Deployment Commands](#deployment-commands)
7. [Troubleshooting](#troubleshooting)

---

## Overview

**Kamal Version:** 2.7.0+  
**Proxy:** kamal-proxy (NOT Traefik!)  
**Key Difference:** Kamal 2.x has different configuration syntax than Kamal 1.x

---

## Common Deployment Issues

### Issue #1: Unknown Configuration Keys

**Error:**

```
ERROR: unknown keys: servers, ssh, builder, registry, env
```

**Cause:**  
Kamal 2.x changed configuration structure. Many top-level keys were removed or renamed.

**Solution:**  
Use simplified flat structure. Remove nested `servers`, `ssh`, `builder` keys.

---

### Issue #2: Registry Password Format

**Error:**

```
ERROR: registry/password: should be a string
```

**Cause:**  
Using ERB syntax like `<%= ENV["KAMAL_REGISTRY_PASSWORD"] %>` in deploy.yml

**Solution:**  
Move secrets to `.kamal/secrets` file (NOT `.kamal/secrets.env`):

```bash
# .kamal/secrets
KAMAL_REGISTRY_PASSWORD=dckr_pat_your_token_here
```

Then reference in deploy.yml:

```yaml
registry:
  username: desinghrajan
  password:
    - KAMAL_REGISTRY_PASSWORD
```

---

### Issue #3: Proxy Host Format for Multiple Domains

**Error:**

```
ERROR: proxy/host: should be a string
```

**Cause:**  
Using array format for multiple domains:

```yaml
host:
  - suryascookware.com
  - www.suryascookware.com
```

**Solution:**  
Use comma-separated string (NO spaces after comma):

```yaml
host: suryascookware.com,www.suryascookware.com
```

---

### Issue #4: WWW Subdomain Not Working

**Symptom:**  

- `https://suryascookware.com` works
- `https://www.suryascookware.com` returns SSL/TLS error or 404

**Cause:**  
Only one domain registered with kamal-proxy. Docker labels don't affect kamal-proxy.

**Solution:**  
Add both domains in proxy host configuration (see Issue #3).

---

### Issue #5: Healthcheck Failures

**Error:**

```
ERROR: container failed health check
```

**Cause:**  

- No healthcheck endpoint exists
- Wrong healthcheck path
- Container takes too long to start

**Solution:**  

1. Create healthcheck endpoint (`src/app/up/route.ts`):

```typescript
export async function GET() {
  return new Response('OK', { status: 200 });
}
```

2. Configure healthcheck in deploy.yml:

```yaml
proxy:
  healthcheck:
    path: "/"  # or "/up" if you prefer
    timeout: 60
    interval: 10
```

---

### Issue #6: Kamal-Proxy vs Traefik Confusion

**Important:**  
Kamal 2.x uses **kamal-proxy**, NOT Traefik!

**What This Means:**

- ❌ Docker Traefik labels are IGNORED by kamal-proxy
- ❌ Traefik configuration files don't work
- ✅ Must configure domains in `deploy.yml` proxy section
- ✅ kamal-proxy handles SSL via Let's Encrypt automatically

**Check what's registered:**

```bash
ssh root@SERVER_IP "docker exec kamal-proxy kamal-proxy list"
```

---

## Correct deploy.yml Template

This is the **WORKING** template for Kamal 2.x:

```yaml
# Deploy to these servers
servers:
  web:
    - 139.84.156.199

# Docker image configuration
image: desinghrajan/suryas-cookware

# Service name (must be unique per app on shared VPS)
service: suryas-cookware

# Docker registry authentication
registry:
  username: desinghrajan
  password:
    - KAMAL_REGISTRY_PASSWORD

# Proxy configuration (kamal-proxy, not Traefik!)
proxy:
  ssl: true
  host: suryascookware.com,www.suryascookware.com
  app_port: 3000
  healthcheck:
    path: "/"
    timeout: 60
    interval: 10

# SSH configuration
ssh:
  user: root

# Environment variables for the container
env:
  clear:
    NODE_ENV: production

# Deployment settings
deploy:
  max_versions: 5
```

---

## Configuration Explained

### Service Name

```yaml
service: suryas-cookware
```

- Must be unique per application on the VPS
- Used in container names: `suryas-cookware-web-{commit-hash}`
- Used in proxy routing

### Registry Configuration

```yaml
registry:
  username: desinghrajan
  password:
    - KAMAL_REGISTRY_PASSWORD
```

- Docker Hub username
- Password loaded from `.kamal/secrets` file
- Token must have read/write permissions

### Proxy Configuration

```yaml
proxy:
  ssl: true                                          # Enable HTTPS via Let's Encrypt
  host: suryascookware.com,www.suryascookware.com  # Comma-separated domains
  app_port: 3000                                     # Container port
  healthcheck:
    path: "/"                                        # Health check endpoint
    timeout: 60                                      # Max wait time (seconds)
    interval: 10                                     # Check interval (seconds)
```

**Key Points:**

- `ssl: true` enables automatic Let's Encrypt certificates
- `host` must be comma-separated string for multiple domains
- `app_port` is where Next.js listens inside container
- Healthcheck ensures container is ready before routing traffic

### SSH Configuration

```yaml
ssh:
  user: root
```

- User to SSH as when deploying
- Must have Docker permissions
- Root or user in `docker` group

### Environment Variables

```yaml
env:
  clear:
    NODE_ENV: production
```

- `clear` = plain text variables (not secrets)
- `secret` = references to values in `.kamal/secrets`

Example with secrets:

```yaml
env:
  clear:
    NODE_ENV: production
  secret:
    - DATABASE_URL
```

### Deploy Settings

```yaml
deploy:
  max_versions: 5
```

- Keep last 5 deployed versions
- Older versions are automatically pruned
- Allows quick rollback if needed

---

## Secrets Management

### File Location

```
.kamal/secrets
```

**NOT** `.kamal/secrets.env` (wrong name!)

### File Format

```bash
# .kamal/secrets
KAMAL_REGISTRY_PASSWORD=dckr_pat_xxxxxxxxxxxxxxxxxxxxx
DATABASE_URL=postgresql://user:pass@host/db
REDIS_URL=redis://localhost:6379
```

### Security

```bash
# Add to .gitignore (should already be there)
echo ".kamal/secrets" >> .gitignore
```

### Getting Docker Hub Token

1. Go to <https://hub.docker.com/settings/security>
2. Click "New Access Token"
3. Name: "kamal-deploy"
4. Permissions: "Read, Write, Delete"
5. Copy token to `.kamal/secrets`

---

## Deployment Commands

### Initial Setup

```bash
# Install Kamal
gem install kamal

# Initialize (creates config/deploy.yml)
kamal init

# Set up secrets
mkdir -p .kamal
echo "KAMAL_REGISTRY_PASSWORD=your_token" > .kamal/secrets
chmod 600 .kamal/secrets
```

### First Deployment

```bash
# Set up kamal-proxy on server
kamal proxy boot

# Deploy application
kamal deploy
```

### Subsequent Deployments

```bash
# Build and deploy
kamal deploy

# Or if no code changes, just redeploy
kamal deploy --skip-build
```

### Common Operations

```bash
# Check deployment status
kamal details

# View logs
kamal app logs --tail 100

# SSH into running container
kamal app exec -i bash

# Rollback to previous version
kamal rollback

# Stop application
kamal app stop

# Remove everything
kamal remove
```

### Proxy Management

```bash
# Check what's registered
kamal proxy details

# Restart proxy
kamal proxy reboot

# View proxy logs
kamal proxy logs

# List all services
ssh root@SERVER_IP "docker exec kamal-proxy kamal-proxy list"
```

---

## Troubleshooting

### Deployment Fails with "Unknown Keys"

**Check Kamal version:**

```bash
kamal version
```

Should be 2.0+. If 1.x, upgrade:

```bash
gem update kamal
```

---

### "Registry Password Should Be String"

**Check secrets file:**

```bash
cat .kamal/secrets
```

Should contain:

```
KAMAL_REGISTRY_PASSWORD=dckr_pat_xxxxx
```

**Verify deploy.yml:**

```yaml
registry:
  password:
    - KAMAL_REGISTRY_PASSWORD  # Array with one string
```

---

### WWW Domain Not Working

**Check proxy registration:**

```bash
ssh root@SERVER_IP "docker exec kamal-proxy kamal-proxy list"
```

Should show both domains:

```
Host: suryascookware.com,www.suryascookware.com
TLS: yes
```

**If only one domain shown:**

1. Update deploy.yml: `host: domain.com,www.domain.com`
2. Redeploy: `kamal deploy`

---

### Healthcheck Failing

**Check container logs:**

```bash
kamal app logs --tail 50
```

**Test healthcheck manually:**

```bash
# Get container name
ssh root@SERVER_IP "docker ps | grep suryas-cookware"

# Test endpoint
ssh root@SERVER_IP "docker exec CONTAINER_NAME curl -f http://localhost:3000/"
```

**Common causes:**

- Next.js not started yet (increase timeout)
- Wrong port (check app_port matches Next.js)
- No healthcheck endpoint (create `/up` route)

---

### SSL Certificate Issues

**Check certificate:**

```bash
curl -vI https://suryascookware.com 2>&1 | grep -i "certificate"
```

**Check kamal-proxy logs:**

```bash
ssh root@SERVER_IP "docker logs kamal-proxy --tail 100"
```

**Force certificate renewal:**

```bash
kamal proxy reboot
kamal deploy
```

---

### Container Won't Start

**Check Docker logs directly:**

```bash
ssh root@SERVER_IP "docker logs CONTAINER_NAME"
```

**Check if port is available:**

```bash
ssh root@SERVER_IP "netstat -tulpn | grep 3000"
```

**Common causes:**

- Build errors (check Dockerfile)
- Missing dependencies (check package.json)
- Port conflict (change app_port)
- Out of memory (check with `free -h`)

---

### Proxy Not Routing Traffic

**Verify proxy is running:**

```bash
ssh root@SERVER_IP "docker ps | grep kamal-proxy"
```

**Check proxy configuration:**

```bash
ssh root@SERVER_IP "docker exec kamal-proxy kamal-proxy list"
```

**Restart proxy:**

```bash
kamal proxy reboot
```

---

## Quick Reference

### File Structure

```
project/
├── config/
│   └── deploy.yml           # Kamal configuration
├── .kamal/
│   └── secrets              # Environment secrets (gitignored)
├── Dockerfile               # Container image
├── .dockerignore           # Files to exclude from build
└── src/
    └── app/
        └── up/
            └── route.ts     # Healthcheck endpoint
```

### Must-Have Files

**1. Dockerfile**

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

**2. next.config.ts**

```typescript
const nextConfig = {
  output: 'standalone',  // REQUIRED for Docker
};
```

**3. Healthcheck Endpoint** (`src/app/up/route.ts`)

```typescript
export async function GET() {
  return new Response('OK', { status: 200 });
}
```

**4. .dockerignore**

```
node_modules
.next
.git
.env*
*.log
```

---

## Deployment Checklist

### Before First Deploy

- [ ] Kamal 2.x installed (`kamal version`)
- [ ] Docker Hub token created
- [ ] `.kamal/secrets` created with token
- [ ] `deploy.yml` configured correctly
- [ ] DNS A records pointing to server
- [ ] Dockerfile with standalone output
- [ ] Healthcheck endpoint created

### During Deploy

- [ ] `kamal proxy boot` (first time only)
- [ ] `kamal deploy`
- [ ] Wait for healthcheck to pass
- [ ] Check kamal-proxy registration

### After Deploy

- [ ] Test main domain with HTTPS
- [ ] Test www subdomain with HTTPS
- [ ] Check SSL certificates valid
- [ ] Verify application functions correctly
- [ ] Check logs for errors

---

## Important Notes

1. **Kamal 2.x is DIFFERENT from Kamal 1.x**
   - Configuration syntax changed
   - Uses kamal-proxy instead of Traefik
   - Simpler, flatter structure

2. **Docker Labels Don't Work**
   - kamal-proxy ignores Traefik labels
   - Must configure in deploy.yml

3. **Secrets File Name Matters**
   - Must be `.kamal/secrets` (no extension)
   - NOT `.kamal/secrets.env`

4. **Multiple Domains Format**
   - Comma-separated string
   - NO spaces: `domain.com,www.domain.com`
   - NOT array format

5. **Standalone Output Required**
   - Next.js must have `output: 'standalone'`
   - Otherwise Docker image won't work

6. **Healthcheck is Critical**
   - Deploy will fail without it
   - Must return 200 OK
   - Should be fast (<1s response time)

---

## Resources

- [Kamal Official Docs](https://kamal-deploy.org/)
- [Kamal GitHub](https://github.com/basecamp/kamal)
- [Kamal-Proxy GitHub](https://github.com/basecamp/kamal-proxy)
- [Docker Hub Tokens](https://hub.docker.com/settings/security)

---

**Last Updated:** October 17, 2025  
**Kamal Version:** 2.7.0  
**Project:** Surya's Cookware  
**Deployment:** Successfully deployed to production
