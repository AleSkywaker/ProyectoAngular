'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 4800;

mongoose.connect('mongodb://localhost:27017/musica', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("conectado a base de datos.....");
        app.listen(port, function () {
            console.log(`Servidor del api rest escuchando en http://localhost ${port}`);
        })
    }
})
