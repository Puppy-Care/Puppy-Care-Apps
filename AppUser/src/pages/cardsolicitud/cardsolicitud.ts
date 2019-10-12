import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { SolicitudesPage } from "../../pages/solicitudes/solicitudes";
import { MessageService } from "../../app/services/message.services";
import { UserService } from "../../app/services/user.services";
import { NotificacionesService } from "../../app/services/notificaciones.services";


@Component({
  selector: "page-cardsolicitud",
  templateUrl: "cardsolicitud.html",
})

export class CardsolicitudPage {
  public inf_viaje;
  public ruta;
  public fechaSalida;
  public horario;
  public num_maleta;
  public informacion;
  public estado;
  public cancelarV = false;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private _messageservice: MessageService, private _userservice: UserService, private _notifiacionesservice: NotificacionesService) {

    this.inf_viaje = JSON.parse(localStorage.getItem("recibi"));
    console.log('contexto info viaje', this.inf_viaje);

    this.ruta = this.inf_viaje.ruta;
    this.fechaSalida = this.inf_viaje.fechaSalida;
    this.horario = this.inf_viaje.horario;
    this.num_maleta = this.inf_viaje.num_maleta;
    this.informacion = this.inf_viaje.informacion;
    this.estado = this.inf_viaje.estado;

    if(this.inf_viaje.estado == '0'){
      this.estado = 'En progreso';
    }else{
      if(this.inf_viaje.estado == '1'){
        this.estado = 'Aceptado';
        this.cancelarV = true;
      }else{
        if(this.inf_viaje.estado == '2'){
          this.estado = 'Cancelado';
          this.cancelarV = true;
        }
      } 
    }
  }

  opciones() {
    this.navCtrl.push(SolicitudesPage);
  }

  CancelarSolicitud() {
    let alert = this.alertCtrl.create({
      title: "<center><h3>INFORMACIÓN</h3></center>",
      message: '<p align="justify">¿Está seguro que desea cancelar la solicitud de viaje realizada?<p>',
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
            console.log("cancelar solciitud");
            this.inf_viaje.estado = '2';

            this._notifiacionesservice.updateSolicitudesViajesCancelar(this._userservice.getToken(), this.inf_viaje).subscribe(response => {
              console.log('La solicitud ha sido cancelada.');
           //   this.socket.emit('create notification', { a: this.inf_viaje });
              //localStorage.setItem("vectorViajes", JSON.stringify(this.vectorViajes));
            }, (err) => { console.log("Error al cancelar la solicitud.", err) });
            this.navCtrl.push(SolicitudesPage);
          }
        }
      ],
      cssClass: 'customLoader'
    });
    alert.present();
  }
}