import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadService } from './../services/upload.service';

import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { Artist } from './../models/artist';

import { Album } from './../models/album';
import { AlbumService } from './../services/album.service';

@Component({
    selector: 'album-edit',
    templateUrl: './../views/album-add.html',
    providers: [UserService, AlbumService, UploadService]
})
export class AlbumEditComponent implements OnInit{
    public titulo: string;
    public artist: Artist;
    public album: Album;
    public identity;
    public token;
    public url: string;
    public alertMessage: string;
    public is_edit: boolean;
    
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _albumService: AlbumService,
        private _uploadService: UploadService
        
    ){
        this.titulo = 'Editar album';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.album = new Album("", "", 2017 , "", "");
        this.is_edit = true;
    }
    ngOnInit(){
        console.log('Album edit component.ts cargado');
        
        //Conseguir el album   
        this.getAlbum(); 
    }
    getAlbum(){
        this._route.params.forEach((params:Params)=>{
            let id = params['id'];

            this._albumService.getAlbum(this.token, id).subscribe(
                response =>{
                    
                    if(!response.album){
                        this._router.navigate(['/']);
                    }else{
                        this.album = response.album;
                        //this.alertMessage = 'El album se ha creado correctamente';
                        //this._router.navigate(['/editar-artista', response.artist._id])
                    }
                }, 
                err=>{
                    var errorMessage = <any>err;
                    if (errorMessage != null) {
                      var body = JSON.parse(err._body);
                      this.alertMessage = body.mensaje;
                      console.log(err)
                    }
                }

            )
        })  
    }  
    onSubmit(){
        this._route.params.forEach((params:Params)=>{
            let id = params['id'];
            

            this._albumService.editAlbum(this.token, id, this.album).subscribe(
                response =>{
                    
                    if(!response.album){
                        this.alertMessage = 'error en el servidor';
                    }else{
                        this.alertMessage = 'El album se ha actualizado correctamente';
                        if(!this.filesToUpload){
                            //Redirigir
                            console.log(this.album)
                            this._router.navigate(['/artista', response.album.artist]);
                        }else{
                            //subir la imagen del album        
                        this._uploadService.makeFileRequest(this.url+'uploadimagealbum/'+id, [], this.filesToUpload, 
                        this.token, 'image')
                        .then(
                            (result)=>{
                                this._router.navigate(['/artista', response.album.artist]);
                            },
                            (error)=>{
                                console.log(error);
                            }
                          )
                        }               
                    }
                }, 
                err=>{
                    var errorMessage = <any>err;
                    if (errorMessage != null) {
                      var body = JSON.parse(err._body);
                      this.alertMessage = body.mensaje;
                      console.log(err)
                    }
                }
            )
        })
    }
    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput:any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
    }