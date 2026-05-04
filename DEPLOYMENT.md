# Deploying pantryx.org

The marketing site is a **Next.js** app. The public API surface is **`https://pantryx.org/api/...`**, which Next.js proxies to **Heroku** via `rewrites` in `next.config.ts`.

## Vercel

1. Import the **Pantryx-Frontend** repo and deploy the default production branch.
2. In **Project → Settings → Environment Variables**, set:
   - **`BACKEND_URL`** — `https://pantryx-9007814d1092.herokuapp.com` (no trailing slash), or your newer Heroku app URL if it changes.
3. Attach the custom domain **`pantryx.org`** (and optionally **`www.pantryx.org`** with a redirect to the apex, per your preference).

After deploy, smoke-test the proxy:

```bash
curl -sS -o /dev/null -w "%{http_code}\n" https://pantryx.org/api/health
```

Expect **`200`**.

## GoDaddy DNS

Point the domain at Vercel using the records Vercel shows for `pantryx.org` (typically **A** / **CNAME** to Vercel’s edge). Wait for DNS propagation, then confirm TLS in the Vercel dashboard.

## Heroku (backend)

1. Ensure the Vapor app exposes **`GET /api/health`** and your real routes under **`/api/...`**.
2. Set **`ALLOWED_ORIGINS`** to include your marketing origin, for example:
   - `https://pantryx.org`
   - (optional) `https://www.pantryx.org`, `http://localhost:3000` for local dev against production API
3. Rate limiting on OAuth/SIWA uses the client IP from **`X-Forwarded-For`**. **Vercel** normally forwards the visitor’s address when proxying to Heroku; if you ever see all traffic bucketed as one IP, re-check your edge and proxy headers (see **Pantryx-Backend** `README.md`).

## Client apps

iOS and other clients should call **`https://pantryx.org/api/...`** in production so TLS and routing stay consistent with the marketing site.
