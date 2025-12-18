import { API_BASE_URL } from '../config/api';

export async function callAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

export async function healthCheck() {
  return callAPI('/api/health');
}

export async function secureTransfer(to: string, amount: number) {
  return callAPI('/api/secure-transfer', {
    method: 'POST',
    body: JSON.stringify({ to, amount }),
  });
}

export async function callAI(prompt: string) {
  return callAPI('/api/ai', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  });
}
