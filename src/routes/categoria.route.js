const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoria.controller');

router.get('/listar',(req,res) => {
    controller.listar(req,res);
});

router.get('/detalle/:id',(req,res) => {
    controller.buscarPorId(req,res);
});

router.post('/guardar',(req,res) => {
    controller.guardar(req,res);
});

router.put('/editar/:id',(req,res) => {
    controller.editar(req,res);
});

router.delete('/eliminar/:id',(req,res) => {
    controller.eliminar(req,res);
});

module.exports = router;

