import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { Artist } from './../models/artist';


@Component({
    selector: 'artist-list',
    templateUrl: './../views/artist-list.html',
    providers: [UserService]
})
export class ArtistListComponent implements OnInit{
    public titulo: string;
    public artists: Artist[];
    public identity;
    public token;
    public url: string;
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _useerService: UserService
    ){
        this.titulo = 'Artistas';
        this.identity = this._useerService.getIdentity();
        this.token = this._useerService.getToken();
        this.url = GLOBAL.url;
    }
    ngOnInit(){
        console.log('Artist list component.ts cargado');

        //Conseguiremos el listado de artista y se lo asignaremos a la propiedad artist
    }
}
