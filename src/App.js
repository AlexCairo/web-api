const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('node:http') 
const { Server } = require("socket.io");
require('dotenv').config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors:{
        origin : process.env.FRONT_END_URL
    }
}); 

//Conexión con la base de datos

mongoose.connect(process.env.DB_URL)
.then(() => console.log('Conectado a la base de datos'))
.catch((err) => console.log('Ocurrió un error al conectarse con la base de datos',err));

app.use(express.json({limit:'20mb'}));
app.use(cors());
app.use(express.static('public'))

// Routes

const usuarioRutas = require('./routes/usuario.route');
const productoRutas = require('./routes/producto.route');
const categoriaRutas = require('./routes/categoria.route');
const pedidoRutas = require('./routes/pedido.route');
const auth = require('./middlewares/auth');

app.use('/api/usuarios',usuarioRutas);
app.use('/api/productos',productoRutas);
app.use('/api/pedidos',pedidoRutas);

app.use(auth);

app.use('/api/categorias',categoriaRutas);

io.on('connection', (socket) => {
    socket.on('purchaseCompleted', (msg) => {
        console.log(msg);
        socket.broadcast.emit('purchaseCompletedMsg', msg);
    })
})

httpServer.listen(3002, () => {
    console.log('Server on port 3002');
})