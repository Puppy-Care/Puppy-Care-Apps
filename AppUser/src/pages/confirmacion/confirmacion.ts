import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { GLOBAL } from "../../app/services/global";
import { HistorialPage } from "../historial/historial";
import { MessageService } from "../../app/services/message.services";
import { UserService } from '../../app/services/user.services';
//import { PagoOnlinePage } from '../pagoOnline/pagoOnline';
import { PayPal } from '../../app/services/paypal.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: "page-confirmacion",
  templateUrl: "confirmacion.html",
})

export class ConfirmacionPage {
  public inf_viaje;
  public nombreChofer;
  public celChofer;
  
  public raza;
  public num_edad;
  public fechaSalida;
  public horarioR;
  public horarioE;
  public informacion;
  
  public precio;

  public dirige = false;
  public url;
  public url2;
  public denuncia;

  constructor(private iab: InAppBrowser, public navCtrl: NavController, public alertCtrl: AlertController, private _messageservice: MessageService, private _userservice: UserService, private _paypalservice: PayPal) {
    this.url = GLOBAL.url;
    this.inf_viaje = JSON.parse(localStorage.getItem("confirmacion1"));
    console.log('contexto info viaje', this.inf_viaje);

    console.log("par que me sakga indefinido", this.inf_viaje["0"].num_maleta);
    //VISUALIZAR EN CARTILLA
    this.nombreChofer = this.inf_viaje["0"]._id_chofer.nombre + ' ' + this.inf_viaje["0"]._id_chofer.apellido;
    this.celChofer = this.inf_viaje["0"]._id_chofer.tel_celular;                                                              //poner cual corresponde
    
    this.raza = this.inf_viaje["0"].raza;
    this.num_edad = this.inf_viaje["0"].num_edad;
    this.fechaSalida = this.inf_viaje["0"].fech_salida;
    this.horarioR = this.inf_viaje["0"].horarioR;    
    this.horarioE = this.inf_viaje["0"].horarioE;
    this.num_edad = this.inf_viaje["0"].num_edad;

    this.precio = this.inf_viaje["0"].precio;
    this.url2 = this.url + 'get-image-chofer/' + this.inf_viaje["0"]._id_chofer.image;
    
    var direccion = localStorage.getItem('Dirige');
    if (direccion == '1') {
      this.dirige = true;
      localStorage.removeItem('Dirige');
    }
  }

  calificar() {
    let alert = this.alertCtrl.create({
      title: '<center>Denuncia</center>',
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
            this.inf_viaje["0"].denuncia = data.denuncia;

            this._messageservice.updateMessageDenunciayCancelar(this._userservice.getToken(), this.inf_viaje["0"]).subscribe(
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


  pago() {
    let data =
    {
      amount: this.precio,
      idViaje: this.inf_viaje["0"]._id,
      pagoDe: 'Viaje'
    }

    console.log("Info viaje", this.inf_viaje["0"]._id);


    this._paypalservice.payment(data).subscribe(
      response => {
        console.log("response for server", response.links[1].href);
        var browser = this.iab.create(response.links[1].href);

      }, error => { }
    );
    //this.navCtrl.push(PagoOnlinePage);
  }

  confirmarPagoViaje() {
    const confirm = this.alertCtrl.create({
      title: 'Atención',
      message: 'Si elige esta opción podrá pagar por medio de la plataforma PAYPAL. Caso contrario cancele y espere pagar en efectivo',
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
            this.pago();
          }
        }
      ]
    });
    confirm.present();
  }

}