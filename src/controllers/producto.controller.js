const productoModel = require('../models/producto.model');
const fs = require('fs');
const controller = {
    async listar(req,res){
        const{nombreCategoria,plataforma} = req.params
        const urlPlataforma = (plataforma.charAt(0).toUpperCase() + plataforma.slice(1)).replace("-"," ")
        try {
            if(nombreCategoria){
                if(plataforma && plataforma != "all"){
                    const listadoProductos = await productoModel.aggregate([
                        {  $lookup : {
                            from : "categorias",
                            localField : "idCategoria",
                            foreignField : "_id",
                            as : "categoriaProducto"
                        }},
                        {   $match : {
                            plataforma : urlPlataforma,
                            "categoriaProducto.nombreCategoria" : nombreCategoria
                        }},
                        {
                            $unwind: '$categoriaProducto'
                        }
                    ])
                    res.json(listadoProductos);
                }else {
                    const listadoProductos = await productoModel.aggregate([
                        {  $lookup : {
                            from : "categorias",
                            localField : "idCategoria",
                            foreignField : "_id",
                            as : "categoriaProducto"
                        }},
                        {   $match : {
                            "categoriaProducto.nombreCategoria" : nombreCategoria
                        }},
                        {
                            $unwind: '$categoriaProducto'
                        }
                    ])
                    res.json(listadoProductos);
                }
            }
        } catch (err) {
            console.log("Error => ", err);
            res.status(500).json({ error: "Ocurrió un error interno." });
        }
    },
    async guardar(req,res){
        const {categoria, nombre, imagen, precio, stock, imagen64, plataforma,
            descripcion, caracteristicas} = req.body
        try {
            const productoExistente = await productoModel.findOne({nombre:nombre});
            if(productoExistente){
                productoExistente.stock += stock;
                await productoExistente.save();
            }else{
                const urlProducto = nombre.toLowerCase().replaceAll(" ","-");
                const nProducto = new productoModel();
                nProducto.idCategoria = categoria;
                nProducto.nombre = nombre;
                nProducto.plataforma = plataforma;
                nProducto.urlProducto = urlProducto;
                nProducto.precio = precio;
                nProducto.stock = stock;
                nProducto.descripcion = descripcion;
                nProducto.caracteristicas = caracteristicas;
                if(imagen){
                    const buffer = Buffer.from(imagen64,"base64");
                    fs.writeFileSync("./public/img/"+imagen, buffer);
                    nProducto.imagen = imagen;
                }
                try{
                    const result = await nProducto.save();
                    res.json(result);
                } catch (err){
                    console.log('Error => ',err);
                    res.status(500);
                }
            }
        } catch (error) {
            console.log("Error => ",error);
            res.status(500);
        }
    },
    async detalle(req,res){
        const {id} = req.params;
        try{
            const result = await productoModel.findById(id);
            res.json(result);
        }catch (err) {
            console.log("Error => ",err);
            res.status(500);
        }
    },
    async editar(req,res){
        const {id} = req.params;
        const {
            idCategoria, nombre, imagen, precio, stock, plataforma,imagen64, descripcion, caracteristicas
        } = req.body;
        if(imagen){
            const productoActual = await productoModel.findById(id);
            if(productoActual.imagen !== "default.png"){
                fs.unlinkSync("./public/img/"+productoActual.imagen);
            };
            const nuevaImg = "./public/img/"+imagen;
            const buffer = Buffer.from(imagen64, "base64");
            fs.writeFileSync(nuevaImg, buffer);
        }
        const nDatos = {idCategoria, nombre, precio, stock, plataforma,imagen64, descripcion, caracteristicas,imagen}
        try {
            const result = await productoModel.findByIdAndUpdate(id,nDatos,{new:1});
            res.json(result);
        } catch (error) {
            console.log("Error => ",error);
            res.status(500);
        }
    },
    async eliminar(req,res){
        const {id} = req.params;
        try{
            const producto = await productoModel.findById(id);
            const urlImg = producto.imagen;
            if(urlImg !== "default.webp"){
                fs.unlinkSync("./public/img/"+urlImg);
            }
            await productoModel.findByIdAndDelete(id);
            res.sendStatus(200);
        }catch(error){
            console.log(error)
            res.sendStatus(500);
        }
    }
}

module.exports = controller;