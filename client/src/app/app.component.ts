import { UserService } from './services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from "./models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  title = 'Proyecto de Musica';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;

  constructor(
    private _userService: UserService
  ) {
    this.user = new User("", "", "", "", "", 'ROLE_USER', "");
    this.user_register = new User("", "", "", "", "", 'ROLE_USER', "");
  }

  ngOnInit() {
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();

      console.log(this.identity);
      console.log(this.token);
  }
  onSubmit() {
    console.log(this.user)

    //Conseguir datos del usuario identificado 

    this._userService.signup(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;

        if (!this.identity._id) {
          alert("El usuario no es indentificado");
        } else {
          //Crear elemento en localStorage para tener usuario en session
          localStorage.setItem('identity', JSON.stringify(identity));

          //Conseguir el token para enviarselo a cada peticion http
          this._userService.signup(this.user, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;

              if (this.token.length <= 0) {
                alert("El token no se ha generado");
              } else {
                //Crear elemento en localStorage para tener tener token disponible
                localStorage.setItem('token', token);
                

                console.log(token);
                console.log(identity);
              }
            },
            err => {
              var errorMessage = <any>err;
              if (errorMessage != null) {
                var body = JSON.parse(err._body);
                this.errorMessage = body.mensaje;
                console.log(err)
              }
            }
          )
        }
      },
      err => {
        var errorMessage = <any>err;
        if (errorMessage != null) {
          var body = JSON.parse(err._body);
          this.errorMessage = body.mensaje;
          console.log(err)
        }
      }
    )
  }
  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }
}