
export default function handler(req, res) {

  res.json({

    status: 'ok',

    version: '30.0.0',

    timestamp: new Date().toISOString()

  });

}

