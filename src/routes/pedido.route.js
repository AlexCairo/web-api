const express = require('express');
const controller = require('../controllers/pedido.controller');
const router = express.Router();

router.get('/listar',(req,res) => {
    controller.listar(req,res);
});

router.get('/detalle/:id',(req,res) => {
    controller.detallePedido(req,res);
});

router.post('/guardar',(req,res)=> {
    controller.guardar(req,res);
});

router.get('/capture-order/:orderId', (req,res) => {
    controller.captureOrder(req,res);
})

router.get('/cancel-order/:orderId', (req,res) => {
    controller.cancelOrder(req,res);
})

router.delete('/eliminar/:id',(req,res)=>{
    controller.eliminarPedido(req,res);
});

module.exports = router;
