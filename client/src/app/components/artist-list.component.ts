import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { Artist } from './../models/artist';
import { ArtistService } from './../services/artist.service';


@Component({
    selector: 'artist-list',
    templateUrl: './../views/artist-list.html',
    providers: [UserService, ArtistService ]
})
export class ArtistListComponent implements OnInit{
    public titulo: string;
    public artists: Artist[];
    public identity;
    public token;
    public url: string;
    public next_page: number;
    public prev_page: number;
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService
    ){
        this.titulo = 'Artistas';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.next_page = 1;
        this.prev_page = 1;
    }
    ngOnInit(){
        console.log('Artist list component.ts cargado');

        //Conseguiremos el listado de artista y se lo asignaremos a la propiedad artist

        this.getArtist();
    }
    getArtist(){
        this._route.params.forEach((params: Params)=>{
            let page = +params['page']
            if(!page){
                page = 1;
            }else{
                this.next_page = page+1;
                this.prev_page = page-1;

                if(this.prev_page == 0){
                    this.prev_page = 1;
                }
            }
            this._artistService.getArtists(this.token, page).subscribe(
                response =>{
                    if(!response.artists){
                        this._router.navigate(['/'])
                    }else{
                        this.artists = response.artists;
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

    
    public confirmado;
    onDeleteConfirm(id){
        this.confirmado = id;
    }
    onCancelArtist(){
        this.confirmado = null;
    }
    onDeleteArtist(id){
        this._artistService.deleteArtists(this.token, id).subscribe(
            response =>{
                if(!response.artist){
                    alert('error en el servidor')
                }
                    this.getArtist();
                
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
    }
}
