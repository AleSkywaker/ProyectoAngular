'use strict'

function pruebas(req, res){
    console.log(res);
   res.status(200).send({
       mensaje: "probando una accion del controlador de usuario"
   });
}

module.exports = {
    pruebas
}