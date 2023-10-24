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
            res.Status(500).send("Error al registrar");
        }
    },
    async login(req,res){
        const {email, password} = req.body;
        try{
            const cliente = {email,password};
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
            }else{
                res.status(401).send("Credenciales incorrectas");
            }
        }catch(err){
            console.log(err);
            res.status(500)
        }
    },
    async listar(req,res) {
        try {
            const result = await usuarioModel.find();
            res.json(result);
        } catch (error) {
            console.log("Error => ",error);
            res.Status(500).send("Error al listar");
        }
    },
    async buscarPorId(req,res){
        const {id} = req.params;
        try {
            const result = await usuarioModel.findById(id);
            res.json(result);
        } catch (error) {
            console.log("Error => ",error);
            res.Status(500).send("Error al buscar usuario");
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
            res.Status(500).send('Error al editar');
        }
    },
    async eliminar(req,res) {
        const {id} = req.params;
        try {
            await usuarioModel.findByIdAndDelete(id);
            res.json({mensaje:"Usuario eliminado"})
        } catch (error) {
            console.log("Error => ",error);
            res.Status(500).send("Error al eliminar");
        }
    }
}

module.exports = controller;