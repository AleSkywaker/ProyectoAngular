import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { Artist } from './../models/artist';


@Component({
    selector: 'artist-add',
    templateUrl: './../views/artist-add.html',
    providers: [UserService]
})
export class ArtistAddComponent implements OnInit{
    public titulo: string;
    public artist: Artist;
    public identity;
    public token;
    public url: string;
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _useerService: UserService
    ){
        this.titulo = 'Crear nuevo artista';
        this.identity = this._useerService.getIdentity();
        this.token = this._useerService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist("", "", "");
    }
    ngOnInit(){
        console.log('Añadir Artista component.ts cargado');

        //Conseguiremos el listado de artista y se lo asignaremos a la propiedad artist
    }
}