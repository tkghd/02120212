import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-quantum-dark text-white p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <Header />
        <main>
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
