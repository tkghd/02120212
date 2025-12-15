const cluster = require('cluster');
const os = require('os');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const compression = require('compression');
const axios = require('axios');

if (cluster.isMaster) {
  os.cpus().forEach(() => cluster.fork());
} else {
  const app = express();
  app.use(compression());
  const server = http.createServer(app);
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('chat', async (msg) => {
      io.emit('chat', msg);
      try {
        const res = await axios.post('https://api.genspark.ai/respond', { prompt: msg });
        io.emit('chat', 'GenSpark: ' + res.data.reply);
      } catch (e) {
        console.error('GenSpark error:', e.message);
      }
    });
  });

  server.listen(3000, () => console.log('Chatroom+GenSpark ONLINE'));
}
const cluster=require('cluster');const os=require('os');const express=require('express');const http=require('http');const {Server}=require('socket.io');const compression=require('compression');const axios=require('axios');if(cluster.isMaster){os.cpus().forEach(()=>cluster.fork());}else{const app=express();app.use(compression());const server=http.createServer(app);const io=new Server(server);io.on('connection',(socket)=>{console.log('user connected');socket.on('chat',async(msg)=>{io.emit('chat',msg);try{const res=await axios.post('https://api.genspark.ai/respond',{prompt:msg});io.emit('chat','GenSpark:'+res.data.reply);}catch(e){console.error(e);}});});server.listen(3000,()=>console.log('Chatroom+GenSpark ONLINE'));}}
