const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if(token == null){
        res.status(401).send('Token requerido');
    } else {    
        jwt.verify(token, SECRET_KEY, (err, result)=>{
                if(err){
                    res.status(403).send('Token inválido');
                } else {
                    if(result.access === "admin"){
                        req.datos = result;
                        next();
                    }else{
                        res.status(401).send('No tienes el permiso para realizar esta acción');
                    }
                }
        });
    }    
};

module.exports = verifyToken;