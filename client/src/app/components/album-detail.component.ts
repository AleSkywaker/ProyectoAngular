import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { AlbumService } from './../services/album.service';
import { Album } from './../models/album';
import { SongService } from './../services/song.service';
import { Song } from './../models/song';

@Component({
    selector: 'album-detail',
    templateUrl: './../views/album-detail.html',
    providers: [UserService,AlbumService, SongService]
})
export class AlbumDetailComponent implements OnInit{
    public album: Album;
    public songs: Song[];
    public identity;
    public token;
    public url: string;
    public alertMessage: string;
     
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,     
        private _albumService: AlbumService,
        private _songService: SongService
    ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;       
    }
    ngOnInit(){
        console.log('Album detalles component.ts cargado');
        
        //Sacar album de la base de datos
        this.getAlbum();
    }
    getAlbum(){
        
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            
            this._albumService.getAlbum(this.token, id).subscribe(
                response =>{
                    if(!response.album){
                        this._router.navigate(['/'])
                    }else{
                        this.album = response.album;

                        
                        //Sacar las canciones
                        this._songService.getSongs(this.token, response.album._id).subscribe(
                            response=>{
                                
                                if(!response.songs){
                                    this.alertMessage= 'Este album no tiene canciones'
                                }else{
                                    this.songs = response.songs;
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
}