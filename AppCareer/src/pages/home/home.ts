import { Component, OnInit } from "@angular/core";
import { NavController, LoadingController, AlertController, MenuController } from "ionic-angular";

import { ChoferService } from "../../app/services/chofer.service";
import { PrincipalPage } from "../principal/principal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ChoferService]
})
export class HomePage implements OnInit {
  isActiveToggleTextPassword: Boolean = true;
  splash = true;

  public obj = {
    email: null,
    password: null
  };

  public identity;
  public token;

  constructor(
    public navCtrl: NavController,
    private _userService: ChoferService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController
  ) {
    //this.user = new User("", "", "", "", "", "", "", "");
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    console.log("las vaibles del Storage");
    console.log(this.identity + this.token);

    //BLOQUEAR MENU
    if (this.identity == null) {
      this.menuCtrl.enable(false, 'myMenu');
    } else {
      this.menuCtrl.enable(true, 'myMenu');
    }
    this.showAlertAviso();
  }

  ionViewDidLoad() {
    //this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
    }, 4000);
    //this.tabBarElement.style.display = 'none';
  }

  public onSubmit() {
    //conseguir losdatos del usuario
    //animacion de carga del sistema
    this.verificarUsuario();
    this._userService.singup(this.obj, "").subscribe(
      response => {
        console.log(response + "esto viene en la respuesta");
        let identity = response.user;
        this.identity = identity;
        console.log(identity);
        if (!this.identity._id) {
          console.log("el usuario no se ha logueado correctamente");
          // aqui la alerta
        } else {
          // crear local storage
          localStorage.setItem("identityC", JSON.stringify(identity));
          this._userService.singup(this.obj, "true").subscribe(
            response => {
              let token = response.token;
              this.token = token;
              if (this.token.length <= 0) {
                // aqui mensaje
                console.log("el token nose ha generado");
              } else {
                localStorage.setItem("TokenC", token);
                setTimeout(() => {
                 this.navCtrl.push(PrincipalPage);
                }, 3000);
              }
            },
            error => {
              var errorMessage = <any>error;
              if (errorMessage) {
                try {
                  var body = JSON.parse(error._body);
                  errorMessage = body.message;
                } catch(error){ errorMessage = "NO hay conexion intentelo Ms Tarde"; }
                setTimeout(() => {
                  this.showAlert(errorMessage);
                }, 3000);
                console.log(errorMessage);
              }
            }
          );
          //fin
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch(error){ errorMessage = "No hay conexión intentelo más tarde"; }
          setTimeout(() => {
            this.showAlert(errorMessage);
          }, 3000);
          console.log(errorMessage);
        }
      }
    );
  }

  verificarUsuario() {
    let loading = this.loadingCtrl.create({
      content: "Verficando sus datos"
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 3000);

  }

  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
  }
  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

  showAlert(errorr) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: errorr,
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertAviso() {
    let alert = this.alertCtrl.create({
      title: 'Aviso',
      subTitle: 'Para formar parte de la familia de  dogi entra al siguinte link y llena los datos despues espera un correo de confirmación con tu usuario y contraseña',
      message:'<a href=https://forms.gle/jzi1uAqNtGUzp31V6>https://forms.gle/jzi1uAqNtGUzp31V6</a>',
      buttons: ['OK']
    });
    alert.present();
  }
  
}
