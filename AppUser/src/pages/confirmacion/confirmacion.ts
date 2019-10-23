import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { GLOBAL } from "../../app/services/global";
import { HistorialPage } from "../historial/historial";
import { MessageService } from "../../app/services/message.services";
import { UserService } from '../../app/services/user.services';
//import { PagoOnlinePage } from '../pagoOnline/pagoOnline';
import { PayPal } from '../../app/services/paypal.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EnvioEmail } from '../../app/services/correo.service';
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
  public estado;
  public precio;

  public dirige = false;
  public url;
  public url2;
  public denuncia;

  constructor(private iab: InAppBrowser, public navCtrl: NavController, public alertCtrl: AlertController, private _messageservice: MessageService, private _userservice: UserService, private _paypalservice: PayPal, private _envioEmail:EnvioEmail) {
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
    this.estado = this.inf_viaje["0"].estado;

    this.precio = this.inf_viaje["0"].precio;
    this.url2 = this.url + 'get-image-chofer/' + this.inf_viaje["0"]._id_chofer.image;
    
    var direccion = localStorage.getItem('Dirige');
    if (direccion == '1') {
      if(this.estado == 2 || this.estado==3 || this.estado==4){
        this.dirige = false;
        localStorage.removeItem('Dirige');
      }else{
        this.dirige = true;
        localStorage.removeItem('Dirige');
      }
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

  cancelarViaje() {

    //alert('El viaje se ha cancelado correctamente');
    console.log('ESTOY EN CANCELAR VIAJE DEL DETALLE DE VIAJES REALIZADOS');
    this._messageservice.UpdateEstadoMessage(this._userservice.getToken(),  this.inf_viaje["0"]).subscribe(
      response => {
        console.log("Seactualizo el estado", response);
        //location.reload(true);
      },
      error => {
        console.log(error);
      }
    );

    var cancelarViaje =
    {
      obj: this.inf_viaje["0"],
      variable: 'CVU',
      usuario:this._userservice.getIdentity()
    }
    console.log("este es el objeto que cancela el viaje desde el usuario", cancelarViaje);
    //aqui va el envio del correo
    this._envioEmail.envioEmail(this._userservice.getToken(), cancelarViaje).subscribe(
      response => {
        console.log("Se envio el correo electronico ", response);
        //location.reload(true);
      },
      error => {
        console.log(error);
      }
    );

  }

  showAlertCancelar() {
    let alert = this.alertCtrl.create({
      title: '<center><h3>IMPORTANTE</h3></center>',
      subTitle: '<center>¿Desea cancelar la solicitud?</center>',
      message: '<p align="justify">Para más información comunicate con nosotros.</p>',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Solicitud Cancelada');
          }
        },
        {
          text: 'OK',
          handler: data => {
            this.cancelarViaje();
            this.navCtrl.push(HistorialPage);
          }
        }
      ],
      cssClass: 'customLoader'
    });
    alert.present();
  }


}