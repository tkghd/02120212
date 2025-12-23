
// REAL送金ルート
import realTransferRouter from './routes/real-transfer.js';
app.use('/api/real-transfer', realTransferRouter);

console.log('✅ REAL送金API有効化');
