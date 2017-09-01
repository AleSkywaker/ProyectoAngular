import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './../services/global';
import { UploadService } from './../services/upload.service';
import { UserService } from './../services/user.service';
import { SongService } from './../services/song.service';
import { Song } from './../models/song';

@Component({
    selector: 'song-edit',
    templateUrl: './../views/song-add.html',
    providers: [UserService, SongService, UploadService]
})
export class SongEditComponent implements OnInit{
    public titulo: string;
    public song: Song;  
    public identity;
    public token;
    public url: string;
    public alertMessage: string;
    public is_edit: boolean;
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _songService: SongService,
        private _uploadService: UploadService
    ){
        this.titulo = 'Editar cancion';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.song= new Song(1, "", "" , "", "");   
        this.is_edit= true;    
    }
    ngOnInit(){
        console.log('Song EDIT component.ts cargado');  
        //LLamar un metodo para sacar la cancion a editar   
        this.getSong();  
    }
    getSong(){
        this._route.params.forEach((params:Params)=>{
            let id = params['id'];
            console.log(id)
            this._songService.getSong(this.token, id).subscribe(
                response =>{
                    if(!response.song){
                        this._router.navigate(['/']);
                        this.alertMessage = 'error en el servidor';
                    }else{
                        this.song = response.song;
                        console.log(this.song) 
                    }
                },
                err=>{
                    var errorMessage = <any>err;
                    if (errorMessage != null) {
                      var body = JSON.parse(err._body);
                      //this.alertMessage = body.mensaje;
                      console.log(err)
                    }
                }
            )
        })
    }
    onSubmit(){
        this._route.params.forEach((params:Params)=>{
        let id = params['id'];
        console.log(id)

        console.log(this.song)
            this._songService.editSong(this.token, id, this.song).subscribe(
                response =>{
                    if(!response.song){
                        this.alertMessage = 'error en el servidor otra vez';
                    }else{
                        this.alertMessage = 'La canción se ha actualizado correctamente';

                        if(!this.filesToUpload){
                            this._router.navigate(['/album', response.song.album]);
                        }else{
                            //Subir el fichero de audio
                            this._uploadService.makeFileRequest(this.url+'uploadfilesong/'+id, [], this.filesToUpload, 
                            this.token, 'file')
                            .then(
                                (result)=>{
                                    this._router.navigate(['/album', response.song.album]);
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