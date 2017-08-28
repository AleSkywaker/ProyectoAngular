import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'home',
    templateUrl: './../views/home.html',
    
})
export class HomeComponent implements OnInit{
    public titulo: string;
    
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.titulo = 'Pagina Principal';
       
    }
    ngOnInit(){
        console.log('Home-component.ts cargado');

        //Conseguiremos el listado de artista y se lo asignaremos a la propiedad artist
    }
}