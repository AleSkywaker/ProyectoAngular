import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { ArtistService } from './../services/artist.service';
import { Artist } from './../models/artist';
import { Album } from './../models/album';
import { AlbumService } from './../services/album.service';


@Component({
    selector: 'artist-detail',
    templateUrl: './../views/artist-detail.html',
    providers: [UserService,ArtistService,AlbumService]
})
export class ArtistDetailComponent implements OnInit{
    
    public artist: Artist;
    public albums: Album[];
    public identity;
    public token;
    public url: string;
    public alertMessage: string;
     
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,   
        private _artistService: ArtistService,
        private _albumService: AlbumService
    ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;       
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

                        //Sacar los albums del artista
                        this._albumService.getAlbums(this.token, response.artist._id).subscribe(
                            response=>{
                                
                                if(!response.albums){
                                    this.alertMessage= 'Este artista no tiene albums'
                                }else{
                                    this.albums = response.albums;
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