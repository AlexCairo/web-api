const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidoSchema = new Schema({
    clienteId: {type: Schema.ObjectId, ref: 'usuario', required:true},
    fecha: {type:Date, default:Date.now()},
    detalle: [{
        nombreProducto : {type:String, required:true},
        precioProducto : {type:Number, required:true},
        cantidad : {type:Number, required:true},
        subtotal : Number
    }],
    estadoPedido : {type:String, default: 'S'} // S : sin pagar || E : en proceso || P : pagado || A : anulado 
},{versionKey:0});

module.exports = mongoose.model('pedido',pedidoSchema);