const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    nombreCategoria : {type:String, required:true}
},{versionKey:0})

module.exports = mongoose.model('categoria',categoriaSchema);

