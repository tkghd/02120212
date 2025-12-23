import React from 'react';
import SupremeInterface from './components/SupremeInterface';

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const accessLevel = urlParams.get('access');

  if (accessLevel === 'sovereign') {
    return <SupremeInterface />;
  }

  return <SupremeInterface />;
}

export default App;
