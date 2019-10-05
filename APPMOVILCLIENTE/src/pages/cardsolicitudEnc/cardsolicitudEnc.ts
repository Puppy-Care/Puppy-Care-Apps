import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { SolicitudesPage } from "../../pages/solicitudes/solicitudes";
import { UserService } from "../../app/services/user.services";
import { NotificacionesService } from "../../app/services/notificaciones.services";
import { Socket } from 'ng-socket-io';

@Component({
  selector: "page-cardsolicitudEnc",
  templateUrl: "cardsolicitudEnc.html",
})

export class CardsolicitudEncPage {
  public inf_encomienda;
  public ruta;
  public fechaSalida;
  public horario;
  public destinatario;
  public detalle_paquete;
  public estado;
  public cancelarE = false;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, private socket: Socket, private _notifiacionesservice: NotificacionesService, private _userservice: UserService) {
    this.inf_encomienda = JSON.parse(localStorage.getItem("recibiEnc"));
    console.log('contexto info enco', this.inf_encomienda);

    this.ruta = this.inf_encomienda.ruta;
    this.fechaSalida = this.inf_encomienda.fechaSalida;
    this.horario = this.inf_encomienda.horario;
    this.destinatario = this.inf_encomienda.destinatario;
    this.detalle_paquete = this.inf_encomienda.detalle_paquete;
    this.estado = this.inf_encomienda.estado;

    if (this.inf_encomienda.estado == '0') {
      this.estado = 'En progreso';
    } else {
      if (this.inf_encomienda.estado == '1') {
        this.estado = 'Aceptado';
        this.cancelarE = true;
      } else {
        if (this.inf_encomienda.estado == '2') {
          this.estado = 'Cancelado';
          this.cancelarE = true;
        }
      }
    }

  }

  opciones() {
    localStorage.setItem('viene', 'enc');
    this.navCtrl.push(SolicitudesPage);
  }


  CancelarSolicitudEnco() {

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
            this.inf_encomienda.estado = '2';

            this._notifiacionesservice.updateSolicitudesEncoCancelar(this._userservice.getToken(), this.inf_encomienda).subscribe(response => {
              console.log('se solicitud Encomienda se ha cancelado correctamente');
              //localStorage.setItem("vectorViajes", JSON.stringify(this.vectorViajes));
              this.socket.emit('create notification', { a: this.inf_encomienda });
            }, (err) => { console.log("Error al cancelar la solicitud Encomienda", err) });
            this.navCtrl.push(SolicitudesPage);
          }
        }
      ],
      cssClass: 'customLoader'
    });
    alert.present();
  }
}