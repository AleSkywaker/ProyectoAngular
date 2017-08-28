import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { ArtistService } from './../services/artist.service';
import { Artist } from './../models/artist';
import { UploadService } from './../services/upload.service';


@Component({
    selector: 'artist-edit',
    templateUrl: './../views/artist-add.html',
    providers: [UserService,ArtistService,UploadService]
})
export class ArtistEditComponent implements OnInit{
    public titulo: string;
    public artist: Artist;
    public identity;
    public token;
    public url: string;
    public alertMessage: string;
    public is_edit: boolean ;
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _uploadService: UploadService,
        private _artistService: ArtistService
    ){
        this.titulo = 'Editar artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist("", "", "");
        this.is_edit = true;
    }
    ngOnInit(){
        console.log('Artista Edit component.ts cargado');
        
        //LLamar el metodo del api para sacar un artista en base a su id getArtist.
        this.getArtist();
    }
    getArtist(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            
            this._artistService.getArtist(this.token, id).subscribe(
                response =>{
                    if(!response.artist){
                        this._router.navigate(['/'])
                    }else{
                        this.artist = response.artist;
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
        });

    }
    onSubmit(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
        console.log(this.artist);
        this._artistService.editArtist(this.token, id,  this.artist).subscribe(
            response =>{
                
                if(!response.artist){
                    this.alertMessage = 'error en el servidor';
                }else{
                    this.alertMessage = 'Artista se ha actualizado correctamente';

                    //Subir imagen del artista
                    this._uploadService.makeFileRequest(this.url+'uploadimageartist/'+id, [], this.filesToUpload, 
                    this.token, 'image')
                    .then(
                        (result)=>{
                            this._router.navigate(['/artistas', 1]);
                        },
                        (error)=>{
                            console.log(error);
                        }
                    )
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
    });    
    }
    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}