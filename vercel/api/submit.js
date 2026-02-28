export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const data = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
    const { name, email, description, domain, template } = data || {};
    if (!name || !email || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const backend = process.env.BACKEND || 'https://contrary-theaters-candles-geology.trycloudflare.com';
    const r = await fetch(, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, description, domain, template })
    });
    if (!r.ok) {
      const t = await r.text();
      return res.status(502).json({ error: 'Upstream error', status: r.status, body: t.slice(0, 500) });
    }
    const j = await r.json();
    return res.status(200).json(j);
  } catch (e) {
    return res.status(500).json({ error: 'Server error', message: String(e && e.message || e) });
  }
}
