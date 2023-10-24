const express = require('express');
const controller = require('../controllers/usuario.controller');
const router = express.Router();
const auth = require('../middlewares/auth');

router.post('/registrar',(req,res)=>{
    controller.registrar(req,res);
})
router.post('/login',(req,res)=>{
    controller.login(req,res);
})
router.get('/listar',auth,(req,res)=>{
    controller.listar(req,res);
})
router.get('/detalle/:id',(req,res)=>{
    controller.buscarPorId(req,res)
})
router.delete('/eliminar/:id',(req,res)=>{
    controller.eliminar(req,res);
})
router.put('/editar/:id',(req,res)=>{
    controller.editar(req,res);
})


module.exports = router;