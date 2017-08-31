import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { SongService } from './../services/song.service';
import { Song } from './../models/song';

@Component({
    selector: 'song-edit',
    templateUrl: './../views/song-edit.html',
    providers: [UserService, SongService]
})
export class SongEditComponent implements OnInit{
    public titulo: string;
    public song: Song;  
    public identity;
    public token;
    public url: string;
    public alertMessage: string;
    public is_edit: true;
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _songService: SongService
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
    }

    onSubmit(){
        this._route.params.forEach((params:Params)=>{
        let album_id = params['album'];
        this.song.album = album_id;

            this._songService.addSong(this.token, this.song).subscribe(
                response =>{
                    
                    if(!response.song){
                        this.alertMessage = 'error en el servidor';
                    }else{
                        this.song = response.song;
                        this.alertMessage = 'La canción se ha creado correctamente';
                        //deberá redirigir a la misma pagina para poder meter otra canción
                        //this._router.navigate(['/editar-album', response.album._id])
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
    }