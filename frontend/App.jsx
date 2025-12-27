import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_BASE;

export default function App() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/status`)
      .then(r => r.json())
      .then(setStatus);
  }, []);

  if (!status) return <div>Loading...</div>;

  return (
    <div style={{
      background:"#0b0f19",
      color:"#0ff",
      height:"100vh",
      padding:"20px",
      fontFamily:"monospace"
    }}>
      <h1>TKG GLOBAL BANK HUD</h1>
      <pre>{JSON.stringify(status, null, 2)}</pre>
    </div>
  );
}
