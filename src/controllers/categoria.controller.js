const categoriaModel = require('../models/categoria.model');
const controller = {
    async listar(req,res){
        try{
            const result = await categoriaModel.find();
            res.json(result)
        }catch (err) {
            console.log('Error => ',err),
            res.status(500);
        }
    },
    async guardar(req,res){
        const {nombreCategoria} = req.body;
        try {
            const nCategoria = new categoriaModel();
            nCategoria.nombreCategoria = nombreCategoria;
            const result = await nCategoria.save();
            res.json(result);
        } catch (err) {
            console.log('Error => ',err);
            res.status(500);
        }
    },
    async editar(req,res){
        const {id} = req.params;
        const {nombreCategoria} = req.body;
        try{
            const nDato = {nombreCategoria};
            const result = await categoriaModel.findByIdAndUpdate(id,nDato,{new:true});
            res.json(result);
        }catch(err){
            console.log('Error =>',err)
            res.status(500);
        }
    },
    async buscarPorId(req,res){
        const {id} = req.params;
        try{
            const result = await categoriaModel.findById(id);
            res.json(result);
        }catch (err){
            console.log('Error => ',err)
            res.status(500);
        }
    },
    async eliminar(req,res){
        const {id} = req.params;
        try{
            await categoriaModel.findByIdAndDelete(id);
            res.json({"mensaje":"Elemento eliminado"})
        }catch (err){
            console.log('Error => ',err);
            res.status(500);
        }
    }
}

module.exports = controller;