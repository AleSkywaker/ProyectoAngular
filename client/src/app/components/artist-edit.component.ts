import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { ArtistService } from './../services/artist.service';
import { Artist } from './../models/artist';


@Component({
    selector: 'artist-edit',
    templateUrl: './../views/artist-add.html',
    providers: [UserService,ArtistService]
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
        private _artistService: ArtistService
    ){
        this.titulo = 'Crear nuevo artista';
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
        console.log(this.artist);
        this._artistService.addArtist(this.token, this.artist).subscribe(
            response =>{
                
                if(!response.artist){
                    this.alertMessage = 'error en el servidor';
                }else{
                    this.artist = response.artist;
                    this.alertMessage = 'Artista se creado correctamente';
                    //this._router.navigate(['/editar-artist'], response.artist._id)
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
}