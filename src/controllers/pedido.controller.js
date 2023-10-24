const pedidoModel = require('../models/pedido.model');
const controller = {
    async guardar(req,res){
        const datos = req.body;
        try {
            const nPedido = new pedidoModel(datos);
            for (let index = 0; index < nPedido.detalle.length; index++) {
                nPedido.detalle[index].subtotal =  nPedido.detalle[index].precioProducto * nPedido.detalle[index].cantidad;            
            }
            const result = await nPedido.save();
            res.json(result);
        } catch (error) {
            console.log("Error => ",error);
            res.Status(500);
        }
    },
    async listar(req,res){
        try {
            const result = await pedidoModel.find();
            res.json(result);
        } catch (error) {
            console.log("Error => ",error);
            res.Status(500);
        }
    },
    async detallePedido(req,res){
        const {id} = req.params;
        try {
            const result = await pedidoModel.findById(id).populate('clienteId');        
            res.json(result);
        } catch (error) {
            console.log("Error => ",error);
            res.Status(500);
        }
    },
    async eliminarPedido(req,res){
        const {id} = req.params;
        try {
            await pedidoModel.findByIdAndDelete(id);
            res.json({mensaje:"Pedido eliminado"})
        } catch (error) {
            console.log("Error =>", error);
            res.Status(500);
        }
    }
}

module.exports = controller;