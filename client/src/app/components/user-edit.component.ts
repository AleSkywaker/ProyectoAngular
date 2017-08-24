import { Component, OnInit } from '@angular/core';

import { User } from './../models/user';
import { UserService } from './../services/user.service';

@Component({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.html',
    providers:[UserService]
})

export class UserEditComponent implements OnInit{
    public titulo: string;
    public user: User;
    public identity;
    public token;

    ngOnInit(){
        console.log('user-edit component cargado')
    }
}