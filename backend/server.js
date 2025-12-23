import express from 'express';
import cors from 'cors';

import sovereignRouter from './dashboard/sovereign.js';
import ownerAssetsRouter from './dashboard/owner-assets.js';
import corporateAssetsRouter from './dashboard/corporate-assets.js';
import transfersRouter from './dashboard/transfers.js';
import revenueRouter from './dashboard/revenue.js';
import accountsRouter from './dashboard/accounts.js';
import cardAtmRouter from './dashboard/card-atm.js';
import settingsRouter from './dashboard/settings.js';

const app = express();
app.use(cors());
app.use(express.json());

// Dashboard
app.use('/api/dashboard/sovereign', sovereignRouter);
app.use('/api/dashboard/owner-assets', ownerAssetsRouter);
app.use('/api/dashboard/corporate-assets', corporateAssetsRouter);
app.use('/api/dashboard/transfers', transfersRouter);
app.use('/api/dashboard/revenue', revenueRouter);
app.use('/api/dashboard/accounts', accountsRouter);
app.use('/api/dashboard/card-atm', cardAtmRouter);
app.use('/api/dashboard/settings', settingsRouter);

// Health check
app.get('/api/health', (req,res)=>res.json({status:'ok'}));
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>console.log(`Backend running on port ${PORT}`));
