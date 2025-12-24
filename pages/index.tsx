export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
        🏦 TK GLOBAL BANK
      </h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
        The Ultimate Sovereign Banking System
      </p>
      <div style={{ 
        background: 'rgba(255,255,255,0.1)', 
        padding: '2rem', 
        borderRadius: '1rem',
        backdropFilter: 'blur(10px)'
      }}>
        <p>💎 Market Cap: $205T</p>
        <p>🌐 Jurisdictions: 8</p>
        <p>🤖 AI Models: 5</p>
        <p>📡 APIs: 20+</p>
      </div>
    </div>
  )
}
