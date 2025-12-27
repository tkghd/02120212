'use client'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [status, setStatus] = useState<any>(null)

  useEffect(() => {
    fetch('https://hopeful-liberation-production-9d00.up.railway.app/api/status')
      .then(r => r.json())
      .then(setStatus)
      .catch(console.error)
  }, [])

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a24 100%)',
      color: 'white',
      padding: '40px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '20px'
        }}>
          🏦 TK GLOBAL BANK
        </h1>
        
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '20px',
          padding: '30px',
          border: '1px solid rgba(251,191,36,0.3)',
          marginTop: '30px'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
            💎 System Status
          </h2>
          
          {status ? (
            <div style={{ lineHeight: '2' }}>
              <p>✅ <strong>Status:</strong> {status.status}</p>
              <p>💰 <strong>Market Cap:</strong> {status.mcap}</p>
              <p>🏢 <strong>Entities:</strong> {status.entities?.total}</p>
              <p>🌐 <strong>Networks:</strong> {status.networks?.join(', ')}</p>
              <p>⏰ <strong>Updated:</strong> {new Date(status.timestamp).toLocaleString()}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div style={{
          background: 'rgba(16,185,129,0.1)',
          borderRadius: '20px',
          padding: '30px',
          border: '1px solid rgba(16,185,129,0.3)',
          marginTop: '20px'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>
            📡 API Endpoints
          </h2>
          <ul style={{ lineHeight: '2' }}>
            <li>✅ GET /api/status</li>
            <li>✅ POST /api/transfer</li>
            <li>⏳ GET /api/balance/global</li>
            <li>⏳ GET /health</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
