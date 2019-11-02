import { Component } from '@angular/core';
//import { HomeComponent } from '../home/home.component';
import { UserService } from "../../../services/user.services";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent {

  public obj = {
    email: null,
    password: null
  };
  public identity;
  public token;
  public loading = false;
  public error = "";
  public errorMessage;
  constructor(private _userService: UserService) {
  }

  irAHomePrincipal() {
    console.log('este es el evento ir a homre princiapl ');
  }


  public loguin() {
  
    this.loading = true;
    this._userService.singup(this.obj, "").subscribe(
      response => {
        this.loading = false;
        console.log(response + "esto viene en la respuesta");
        let identity = response.secretaria;
        this.identity = identity;
        console.log(identity);
        if (!this.identity._id) {
          console.log("el usuario no se ha logueado correctamente");

          // aqui la alerta
        } else {
          // crear local storage
          localStorage.setItem("identity", JSON.stringify(identity));

          this._userService.singup(this.obj, "true").subscribe(
            response => {
              let token = response.token;
              this.token = token;
              console.log(token)
              if (this.token.length <= 0) {
                // aqui mensaje
                console.log("el token nose ha generado");
              } else {
                localStorage.setItem("Token", token);
                location.reload(true);
                //location.href = "www.appmontecarlotransvip.com:4200";
              }
            },
            error => {
              this.loading = false;
              this.errorMessage = <any>error;
              if (this.errorMessage) {
                try {
                  var body = JSON.parse(error._body);
                  this.errorMessage = body.message;
                  document.getElementById("openModalError").click();
                } catch{ this.errorMessage = "No hay conexion intentelo Ms Tarde"; }
                this.error = this.errorMessage;
                console.log(this.error);
                document.getElementById("openModalError").click();
              }
            }
          );
          //fin
        }
      },
      error => {
        this.loading = false;
       this.errorMessage = <any>error;
       
        if (this.errorMessage) {
          try {
            var body = JSON.parse(error._body);
            this.errorMessage = body.message;
            document.getElementById("openModalError").click();
          } catch{ this.errorMessage = "No hay conexión intentelo más tarde"; }
          document.getElementById("openModalError").click();
          this.error = this.errorMessage;
          console.log(this.error);
        }
      });

  }
}
