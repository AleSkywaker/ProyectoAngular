'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// Configurar cabeceras

//carga de rutas base
app.get('/prueba', (req, res)=>{
   res.status(200).send({mensaje:"Hola Alex CRACK!!!  :)"})
})
// exportar module

module.exports = app;