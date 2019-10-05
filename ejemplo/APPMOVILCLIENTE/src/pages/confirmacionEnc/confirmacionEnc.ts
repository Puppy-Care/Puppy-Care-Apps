import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { GLOBAL } from "../../app/services/global";
import { MessageService } from "../../app/services/message.services";
import { UserService } from '../../app/services/user.services';
import { PayPal } from '../../app/services/paypal.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
@Component({
  selector: "page-confirmacionEnc",
  templateUrl: "confirmacionEnc.html",
})

export class ConfirmacionEncPage {
  public inf_encomienda;
  public nombreChofer;
  public celChofer;
  public placa;
  public marca;
  public modelo;
  public ruta;
  public horario;
  public precio;
  public destinatario;
  public detalle_paquete;
  public dirigeE = false;
  public url;
  public url2;
  public fechaSalida;


  constructor(private iab: InAppBrowser, private _paypalservice: PayPal, public navCtrl: NavController, public alertCtrl: AlertController, private _messageservice: MessageService, private _userservice: UserService) {
    this.url = GLOBAL.url;
    this.inf_encomienda = JSON.parse(localStorage.getItem("confirmacionEnc"));
    console.log('contexto info viaje', this.inf_encomienda);

    console.log("par que me sakga indefinido", this.inf_encomienda["0"].precio);
    //VISUALIZAR EN CARTILLA
    this.nombreChofer = this.inf_encomienda["0"]._id_chofer.nombre + ' ' + this.inf_encomienda["0"]._id_chofer.apellido;
    this.celChofer = this.inf_encomienda["0"]._id_chofer.tel_celular;                                                              //poner cual corresponde
    this.placa = this.inf_encomienda["0"]._id_taxi.placa;
    this.marca = this.inf_encomienda["0"]._id_taxi.marca;
    this.modelo = this.inf_encomienda["0"]._id_taxi.modelo;
    this.ruta = this.inf_encomienda["0"].ruta;
    this.horario = this.inf_encomienda["0"].horario
    this.precio = this.inf_encomienda["0"].precio;
    this.fechaSalida = this.inf_encomienda["0"].fech_salida;
    this.destinatario = this.inf_encomienda["0"].destinatario;
    this.detalle_paquete = this.inf_encomienda["0"].detalle_paquete;
    this.url2 = this.url + 'get-image-chofer/' + this.inf_encomienda["0"]._id_chofer.image;

    var direccion = localStorage.getItem('DirigeE');
    if (direccion == '1') {
      this.dirigeE = true;
      localStorage.removeItem('DirigeE');
    }

  }

  calificar() {
    let alert = this.alertCtrl.create({
      title: '<center>Denuncia<br></center>',
      subTitle: '<center><img src="assets/imgs/denuncia1.png"></center>',
      inputs: [
        {
          name: 'denuncia',
          placeholder: 'Describa su denuncia.',
          type: ''
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            this.inf_encomienda["0"].denuncia = data.denuncia;
            this._messageservice.updateMessageEncoDenunciayCancelar(this._userservice.getToken(), this.inf_encomienda["0"]).subscribe(
              response => {
                console.log("se puso la denuncia ");
              },
              error => {
                console.log("error al posytear denunciaa ");
                console.log(error);
              }
            );
          }
        }
      ]
    });
    alert.present();
  }


  pagoE() {
    let data =
    {
      amount: this.precio,
      idViaje: this.inf_encomienda["0"]._id,
      pagoDe: 'Encomienda'
    }

    console.log("Info viaje", this.inf_encomienda["0"]._id);


    this._paypalservice.payment(data).subscribe(
      response => {
        console.log("response for server", response.links[1].href);
        var browser = this.iab.create(response.links[1].href);

      }, error => { }
    );
    //this.navCtrl.push(PagoOnlinePage);
  }

  confirmarPagoE() {
    const confirm = this.alertCtrl.create({
      title: 'Atención',
      message: 'Si elige esta opción podrá pagar por medio de la plataforma PAYPAL. Caso contrario cancele y espere pagar en efectivo al chofer',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Boton cancelar');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Boton continuar');
            this.pagoE();
          }
        }
      ]
    });
    confirm.present();
  }

}


