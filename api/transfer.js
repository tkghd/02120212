const BACKEND_URL = 'https://hopeful-liberation-production-9d00.up.railway.app';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await fetch(`${BACKEND_URL}/api/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(200).json({ status: 'ok', backend: BACKEND_URL });
  }
}
