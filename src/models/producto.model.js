const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    idCategoria : {type : Schema.ObjectId, ref:"categoria"},
    nombre : {type:String, required:1},
    urlProducto : String,
    imagen : {type:String, default:'default.webp'},
    precio : {type:Number, required:1},
    stock : {type:Number, required:1},
    plataforma : String,
    descripcion : {type:String, required:1},
    caracteristicas : [{
        genero : String,
        garantia : String,
        edicion : String,
        restriccionEdad : Number,
        color : String,
        conexion : String,
        desarrollador : {type:String, required:true},
        duracionBateria : String,
        almacenamiento : String,
        jugadores : String,
    }]

},{versionKey:0})

module.exports = mongoose.model('producto',productoSchema);