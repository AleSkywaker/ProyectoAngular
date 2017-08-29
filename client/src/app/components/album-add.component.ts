import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { Artist } from './../models/artist';
import { ArtistService } from './../services/artist.service';
import { Album } from './../models/album';
import { AlbumService } from './../services/album.service';

@Component({
    selector: 'album-add',
    templateUrl: './../views/album-add.html',
    providers: [UserService,ArtistService, AlbumService]
})
export class AlbumAddComponent implements OnInit{
    public titulo: string;
    public artist: Artist;
    public album: Album;
    public identity;
    public token;
    public url: string;
    public alertMessage: string;
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _albumService: AlbumService,
        private _artistService: ArtistService
    ){
        this.titulo = 'Crear nuevo album';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.album = new Album("", "", 2017 , "", "");
        
    }
    ngOnInit(){
        console.log('Album ADD component.ts cargado');
        
        //LLamar el metodo del api para sacar un artista en base a su id getArtist.      
    }
    onSubmit(){
        this._route.params.forEach((params:Params)=>{
            let artist_id = params['artist'];
            this.album.artist = artist_id;

            this._albumService.addAlbum(this.token, this.album).subscribe(
                response =>{
                    
                    if(!response.album){
                        this.alertMessage = 'error en el servidor';
                    }else{
                        this.album = response.album;
                        this.alertMessage = 'El album se ha creado correctamente';
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
    }