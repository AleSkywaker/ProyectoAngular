'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');

function pruebas(req, res){
    console.log(res);
   res.status(200).send({
       mensaje: "probando una accion del controlador de usuario"
   });
}

function saveUser(req, res){

    var user = new User();

    var params = req.body;

    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    if(params.password){
        //encriptar contraseña y guardar datos
        bcrypt.hash(params.password, null, null, function(err, hash){
            user.password = hash;
                if(user.name != null && user.surname && user.email != null){
                    //Guardar usuario
                }else{
                    res.status(200).send({mensaje: 'Rellena todos los campos'})
                }
        });



    }else{
        res.status(500).send({mensaje: 'introduce la contraseña'})
    }

}

module.exports = {
    pruebas,
    saveUser
}