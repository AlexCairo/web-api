const usuarioModel = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
const {TOKEN_EXPIRES, SECRET_KEY} = require('../config')

const controller = {
    async registrar(req,res) {
        try {
            const datos = req.body;
            const nUsuario = new usuarioModel(datos);
            const result = await nUsuario.save();
            res.json(result);                
        } catch (error) {
            console.log("Error => ",error);
            res.Status(500);
        }
    },
    async login(req,res){
        const {email, password} = req.body;
        const cliente = {email,password};
        try{
            const result = await usuarioModel.findOne(cliente);
            if(result){
                const payload = { 
                    userId : result._id,
                    user : result.nombre,
                    access : result.acceso,
                    email : result.email,
                }
                const token = jwt.sign(payload,SECRET_KEY,{expiresIn:TOKEN_EXPIRES});
                res.json({"token":token});
            } else {
                throw new Error;
            }
        } catch(err){
            res.status(500).json({error: "Internal server error"});
        }
    },
    async listar(req,res) {
        try {
            const result = await usuarioModel.find();
            res.json(result);
        } catch (error) {
            console.log("Error => ",error);
            res.Status(500);
        }
    },
    async buscarPorId(req,res){
        const {id} = req.params;
        try {
            const result = await usuarioModel.findById(id);
            res.json(result);
        } catch (error) {
            console.log("Error => ",error);
            res.Status(500);
        }
    },
    async editar(req,res) {
        const {id} = req.params;
        const datos = req.body;
        try {
            const result = await usuarioModel.findByIdAndUpdate(id,datos,{new:1});
            res.json(result);
        } catch (error) {
            console.log('Error : ',error);
            res.Status(500);
        }
    },
    async eliminar(req,res) {
        const {id} = req.params;
        try {
            await usuarioModel.findByIdAndDelete(id);
            res.json({mensaje:"Usuario eliminado"})
        } catch (error) {
            console.log("Error => ",error);
            res.Status(500);
        }
    }
}

module.exports = controller;