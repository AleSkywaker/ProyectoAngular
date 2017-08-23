'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination')

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getArtist(req, res){
    var userId = req.params.id;

    Artist.findById(userId, (err, artist)=>{
         if(err){
            res.status(500).send({mensaje : "Error en la peticion"})
         }else{
             if(!artist){
                res.status(404).send({mensaje: "El artista no existe"})
             }else{
                res.status(200).send({artist})
             }
         }
    })


    
}

function saveArtist(req, res){
var artist = new Artist();

var params = req.body;
artist.name = params.name;
artist.description = params.description;
artist.image = 'null';

artist.save((err, artistStored)=>{
    if(err){
        res.status(500).send({mensaje : 'Error al guardar el artista'})
    }else{
        if(!artistStored){
            res.status(404).send({mensaje: 'El artista no se ha guardado'})
        }else{
            res.status(200).send({artist: artistStored})
        }
    }
})
}


function getArtists(req, res){
  
  var itemsPerPage = 3;

  /* if(req.params.page){
    var page = req.params.page;
  }else{
    var page = 1;
  } */

  var page = req.params.page || 1

  Artist.find().sort('name').paginate(page, itemsPerPage, function(err, artists, totalItems){
    if(err){
        res.status(500).send({mensaje:'Error en la peticion'})
    }else{
        if(!artists){
            res.status(404).send({mensaje:'No hay artistas'})
        }else{
            return res.status(200).send({
                total_items:totalItems,
                artists:artists
            })
        }
    }
  })
}

function updateArtist(req, res){
      var artistId = req.params.id;
      var update = req.body;

      Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated)=>{
        if(err){
            res.status(500).send({mensaje: 'Error al guardar artista'})
        }else{
            if(!artistUpdated){
                res.status(404).send({mensaje: 'No se ha podido guardar artista'})
            }else{
                res.status(200).send({artist: artistUpdated})
            }
        }
      })
}

function deleteArtist(req, res){
    var artistId = req.params.id;

    Artist.findByIdAndRemove(artistId, (err, artistRemoved)=>{
        if(err){
            res.status(500).send({mensaje: 'Error al eliminar artista'})
        }else{
            if(!artistRemoved){
                res.status(404).send({mensaje: 'El artista no pudo ser eliminado'})
            }else{
                

                Album.find({artist: artistRemoved._id}).remove((err, albumRemoved)=>{
                    if(err){
                        res.status(500).send({mensaje: 'Error al eliminar album'})
                    }else{
                        if(!albumRemoved){
                            res.status(404).send({mensaje: 'El album no pudo ser eliminado'})
                        }else{


                            Song.find({album: albumRemoved._id}).remove((err, songRemoved)=>{
                                if(err){
                                    res.status(500).send({mensaje: 'Error al eliminar una cancion'})
                                }else{
                                    if(!songRemoved){
                                        res.status(404).send({mensaje: 'la cancion no pudo ser eliminado'})
                                    }else{
                                        res.status(200).send({artist: artistRemoved})
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
}
function uploadImage(req, res){
    var artistId = req.params.id;
    var file_name = "No subido...."

     if(req.files){
         var file_path = req.files.image.path;
         var file_split = file_path.split('\/');
         var file_name = file_split[2];
         
         var ext_split = file_name.split('\.');
         var file_ext = ext_split[1];

         console.log(file_ext)

         if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

             Artist.findByIdAndUpdate(artistId, {image:file_name}, (err, artistUpdated)=>{
                 if(!artistUpdated){
                     res.status(404).send({mensaje: 'No se ha podido actualizar el usuario'})
                 } else{
                     res.status(200).send({artist: artistUpdated})
                 }
             });
         }else{
             res.status(200).send({mensaje:"Extension del archivo no es válida"})
         }       
     }else{
         res.status(200).send({mensaje:"No has subido ninguna imagen......."})
     }

 }

 function getImageFile(req, res){
     var imageFile = req.params.imageFile;
     var path_file = './uploads/artist/'+ imageFile;

     fs.exists(path_file, function(exists){
         if(exists){
             res.sendFile(path.resolve(path_file))
         }else{
             res.status(200).send({mensaje: ' No existe el fichero...'})
         }
     })
 }

module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
}