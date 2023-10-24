const express = require('express');
const router = express.Router();
const controller = require('../controllers/producto.controller');
const auth = require('../middlewares/auth');

router.get('/listar/:nombreCategoria/:plataforma',(req,res)=> {
    controller.listar(req,res);
});

router.get('/detalle/:id',(req,res)=>{
    controller.detalle(req,res);
});

router.post('/guardar',auth,(req,res)=>{
    controller.guardar(req,res);
});

router.delete('/eliminar/:id',auth,(req,res)=>{
    controller.eliminar(req,res);
});

router.put('/editar/:id',auth,(req,res)=>{
    controller.editar(req,res);
});

module.exports = router;