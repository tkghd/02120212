const express = require('express');
const app = express();
app.use(require('cors')());
app.use(express.json());
app.get('/', (req, res) => res.json({status:'ok',v:'73.2'}));
app.get('/api/health', (req, res) => res.json({status:'ok'}));
app.listen(process.env.PORT || 8080, '0.0.0.0');
