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
    public alertMessage;

    constructor(private _userService: UserService){
        this.titulo = "Actualizar mis datos";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;
    }

    ngOnInit(){
        console.log('user-edit component cargado')
    }

    onSubmit(){
        //console.log(this.user)

        this._userService.updateUser(this.user).subscribe(
            response=>{
                if(!response.user){
                    this.alertMessage =  'El usuario no se ha actualizado';
                }else{
                    //this.user = response.user;
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    document.getElementById("identity_name").innerHTML = this.user.name;
                    this.alertMessage =  'Datos actualizados correctamente';     
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
        );

    }
}