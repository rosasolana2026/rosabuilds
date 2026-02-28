# Auto‑Builder Vercel API (Proxy)

This Vercel function exposes POST /api/submit and forwards to the local Auto‑Builder backend.

- Endpoint: POST /api/submit
- Env var required: BACKEND (e.g., https://contrary-theaters-candles-geology.trycloudflare.com)
- Body: { name, email, description, domain?, template? }
- Returns: { ok: true, jobId }

Deploy steps:
1) Import this repo/folder in Vercel and set Env BACKEND to the current backend URL.
2) Deploy. Your public endpoint will be: https://<vercel-project>.vercel.app/api/submit
3) Update rosabuilds/auto-builder/endpoint.json to that URL, or open the page with ?api=<url> once.

Note: This is a thin relay so jobs still land in ~/.openclaw/workspace/auto-builder/jobs/jobs.json on the Mac.
