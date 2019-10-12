import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { GLOBAL } from "../../app/services/global";
import { HistorialPage } from "../historial/historial";
import { MessageService } from "../../app/services/message.services";
import { UserService } from '../../app/services/user.services';
//import { PagoOnlinePage } from '../pagoOnline/pagoOnline';
//import { PayPal } from '../../app/services/paypal.service';
//import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: "page-confirmacion",
  templateUrl: "confirmacion.html",
})

export class ConfirmacionPage {
  public inf_viaje;
  public nombreChofer;
  public celChofer;
  public placa;
  public marca;
  public modelo;
  public ruta;
  public horario;
  public precio;
  public asiento1;
  public asiento2;
  public asiento3;
  public asiento4;
  public puestoCopiloto;
  public puestoAtrasIzquierdo;
  public puestoAtrasMedio;
  public puestoAtrasDerecho;
  public dirige = false;
  public url;
  public url2;
  public denuncia;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private _messageservice: MessageService, private _userservice: UserService) {
    this.url = GLOBAL.url;
    this.inf_viaje = JSON.parse(localStorage.getItem("confirmacion1"));
    console.log('contexto info viaje', this.inf_viaje);

    console.log("par que me sakga indefinido", this.inf_viaje["0"].num_maleta);
    //VISUALIZAR EN CARTILLA
    this.nombreChofer = this.inf_viaje["0"]._id_chofer.nombre + ' ' + this.inf_viaje["0"]._id_chofer.apellido;
    this.celChofer = this.inf_viaje["0"]._id_chofer.tel_celular;                                                              //poner cual corresponde
    this.placa = this.inf_viaje["0"]._id_taxi.placa;
    this.marca = this.inf_viaje["0"]._id_taxi.marca;
    this.modelo = this.inf_viaje["0"]._id_taxi.modelo;
    this.ruta = this.inf_viaje["0"].ruta;
    this.horario = this.inf_viaje["0"].horario;
    this.precio = this.inf_viaje["0"].precio;
    this.url2 = this.url + 'get-image-chofer/' + this.inf_viaje["0"]._id_chofer.image;
    this.comprobarAsientos();
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



  comprobarAsientos() {
    console.log('base de datos', this.inf_viaje["0"].p1);
    this.asiento1 = this.inf_viaje["0"].p1;
    this.asiento2 = this.inf_viaje["0"].p2;
    this.asiento3 = this.inf_viaje["0"].p3;
    this.asiento4 = this.inf_viaje["0"].p4;

    console.log('base de datos VARIBALEZ', this.asiento1);
    if (this.asiento1 != "0") {
      this.puestoCopiloto = "Seleccionado";
    } else {
      this.puestoCopiloto = "Libre";
    }
    if (this.asiento2 != "0") {
      this.puestoAtrasIzquierdo = "Seleccionado";
    } else {
      this.puestoAtrasIzquierdo = "Libre";
    }
    if (this.asiento3 != "0") {
      this.puestoAtrasMedio = "Seleccionado";
    } else {
      this.puestoAtrasMedio = "Libre";
    }
    if (this.asiento4 != "0") {
      this.puestoAtrasDerecho = "Seleccionado";
    } else {
      this.puestoAtrasDerecho = "Libre";
    }
  }


  pago() {
    let data =
    {
      amount: this.precio,
      idViaje: this.inf_viaje["0"]._id,
      pagoDe: 'Viaje'
    }

    console.log("Info viaje", this.inf_viaje["0"]._id);


    // this._paypalservice.payment(data).subscribe(
    //   response => {
    //     console.log("response for server", response.links[1].href);
    //     //var browser = this.iab.create(response.links[1].href);

    //   }, error => { }
    // );
    //this.navCtrl.push(PagoOnlinePage);
  }

  confirmarPagoViaje() {
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
            this.pago();
          }
        }
      ]
    });
    confirm.present();
  }

}