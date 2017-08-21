'use strict'

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/musica', (err, res)=>{
   if(err){
       throw err;
   }else{
       console.log("conectado a base de datos.....")
   }
})
