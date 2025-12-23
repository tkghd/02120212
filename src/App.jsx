import { SpeedInsights } from '@vercel/speed-insights/react';
import GlobalDashboard from './components/GlobalDashboard';

export default function App() {
  return (
    <>
      <GlobalDashboard />
      <SpeedInsights />
    </>
  );
}
