# Fixing WWW Subdomain with Kamal Proxy

## Problem

After initial deployment with Kamal, the main domain `https://suryascookware.com` worked perfectly, but `https://www.suryascookware.com` was not working. Users would get SSL/TLS errors when trying to access the www version.

## Root Cause

The issue was in the Kamal deployment configuration (`config/deploy.yml`). The proxy configuration only specified a single host:

```yaml
proxy:
  ssl: true
  host: suryascookware.com  # Only one domain!
  app_port: 3000
```

When we deployed, kamal-proxy only registered `suryascookware.com` and requested an SSL certificate for that domain only. The `www.suryascookware.com` subdomain was not registered with the proxy, so:

- HTTP requests to www returned 404
- HTTPS requests to www failed with SSL handshake errors
- No SSL certificate was obtained for the www subdomain

## Investigation Steps

### 1. Checked DNS Configuration

```bash
nslookup suryascookware.com
nslookup www.suryascookware.com
```

Both resolved correctly to `139.84.156.199` - DNS was working fine.

### 2. Checked Docker Container Labels

```bash
ssh root@139.84.156.199 "docker inspect suryas-cookware-web-xxx | grep -A 20 Labels"
```

Container had Traefik labels with both domains:

```
traefik.http.routers.suryas-cookware.rule: "Host(`suryascookware.com`) || Host(`www.suryascookware.com`)"
```

**BUT** - We're using kamal-proxy, not Traefik! These labels don't affect kamal-proxy.

### 3. Checked Kamal-Proxy Registration

```bash
ssh root@139.84.156.199 "docker exec kamal-proxy kamal-proxy list"
```

Output showed:

```
Service              Host                Path  Target             State    TLS  
suryas-cookware-web  suryascookware.com  /     4044c3d6955b:3000  running  yes
```

**Only `suryascookware.com` was registered!** This was the smoking gun.

### 4. Checked Kamal-Proxy Logs

```bash
ssh root@139.84.156.199 "docker logs kamal-proxy 2>&1 | tail -50"
```

Saw multiple "TLS handshake error: unknown server name" errors - kamal-proxy didn't recognize <www.suryascookware.com>.

## Solution

### Step 1: Update deploy.yml Configuration

Changed the proxy host from a single string to a comma-separated list of domains:

**Before:**

```yaml
proxy:
  ssl: true
  host: suryascookware.com
  app_port: 3000
```

**After:**

```yaml
proxy:
  ssl: true
  host: suryascookware.com,www.suryascookware.com
  app_port: 3000
```

**Important Notes:**

- ❌ Don't use an array: `host: [suryascookware.com, www.suryascookware.com]`
  - This will cause: `ERROR: proxy/host: should be a string`
- ✅ Use comma-separated string: `host: suryascookware.com,www.suryascookware.com`
- No spaces after the comma!

### Step 2: Redeploy

```bash
kamal deploy
```

During deployment, you'll see both domains being registered:

```
--host="suryascookware.com" --host="www.suryascookware.com"
```

### Step 3: Verify

Check kamal-proxy registration:

```bash
ssh root@139.84.156.199 "docker exec kamal-proxy kamal-proxy list"
```

Output should now show:

```
Service              Host                                       Path  Target             State    TLS 
suryas-cookware-web  suryascookware.com,www.suryascookware.com  /     18cbbf90d257:3000  running  yes
```

Test both domains:

```bash
curl -I https://suryascookware.com
curl -I https://www.suryascookware.com
```

Both should return `HTTP/2 200`.

## How Kamal-Proxy Handles Multiple Domains

When you specify multiple domains with comma separation:

1. **Kamal parses the host string** and creates multiple `--host` flags
2. **Kamal-proxy registers both domains** to the same target
3. **Let's Encrypt issues SSL certificates** for both domains automatically
4. **Both domains serve the same content** from the same container

## Why This Happened

The confusion arose because:

1. **Docker labels vs Kamal config** - The Traefik labels on the Docker container don't affect kamal-proxy behavior
2. **Kamal proxy is not Traefik** - Different proxy systems work differently
3. **Documentation gap** - Not immediately obvious that comma-separated string is the right format

## Best Practices

### Always Support Both WWW and Non-WWW

```yaml
proxy:
  ssl: true
  host: yourdomain.com,www.yourdomain.com
  app_port: 3000
```

### GoDaddy DNS Setup

Both domains should point to your server:

```
Type: A
Name: @
Value: 139.84.156.199

Type: A  
Name: www
Value: 139.84.156.199
```

### Testing Checklist

After deployment, verify:

- [ ] DNS resolves for both domains (`nslookup`)
- [ ] HTTP redirects to HTTPS for both
- [ ] HTTPS works for both domains
- [ ] Same content served on both
- [ ] SSL certificates valid for both (check browser)

## Related Files

- `config/deploy.yml` - Main Kamal configuration
- `.kamal/secrets` - Docker registry credentials
- `Dockerfile` - Application container definition

## Troubleshooting

### If WWW Still Doesn't Work

1. **Wait for DNS propagation** (can take up to 24 hours, usually 15-30 minutes)

   ```bash
   dig www.suryascookware.com
   ```

2. **Check kamal-proxy logs**

   ```bash
   ssh root@SERVER_IP "docker logs kamal-proxy --tail 100"
   ```

3. **Restart kamal-proxy**

   ```bash
   kamal proxy reboot
   ```

4. **Verify proxy configuration**

   ```bash
   ssh root@SERVER_IP "docker exec kamal-proxy kamal-proxy list"
   ```

5. **Redeploy if needed**

   ```bash
   kamal deploy
   ```

## Commit History

- Initial deployment with single domain
- Fixed www subdomain by updating proxy host to comma-separated list
- Verified both domains working with SSL

## References

- [Kamal Documentation](https://kamal-deploy.org/)
- [Kamal-Proxy GitHub](https://github.com/basecamp/kamal-proxy)
- Let's Encrypt automatic SSL certificate issuance

---

**Last Updated:** October 16, 2025  
**Issue Fixed:** WWW subdomain SSL/TLS errors  
**Solution:** Comma-separated host configuration in deploy.yml
