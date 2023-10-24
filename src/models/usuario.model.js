const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema ({
    nombre : {type: String, required:true},
    password : {type: String, required:true},
    email: {type: String, required:true, unique:true},
    acceso: {type:String, default: "cliente"},
    estado: {type:String, default: "I"}, // I : inactivo || A : activo
    fechaCreacion : {type:Date, default: Date.now()}
},{versionKey:0});

module.exports = mongoose.model("usuario",usuarioSchema);