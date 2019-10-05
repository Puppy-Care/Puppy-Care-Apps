import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { UserService } from "../../app/services/user.services";
import { NotificacionesService } from "../../app/services/notificaciones.services";
import { Socket } from 'ng-socket-io';
import { PrincipalPage } from "../principal/principal";
import { ViajellenoService } from "../../app/services/viajelleno.service";
import { UbicacionFinalPage } from "../ubicacion-final/ubicacion-final"

@Component({
  selector: "page_user_asientos",
  templateUrl: "user_asientos.html",
  providers: [UserService, NotificacionesService, ViajellenoService]
})

export class UserAsientos {
  public imgOcu12_1 = false;
  public imgOcu21_1 = false;
  public imgOcu22_1 = false;
  public imgOcu23_1 = false;

  public imgOcu12_2 = true;
  public imgOcu21_2 = true;
  public imgOcu22_2 = true;
  public imgOcu23_2 = true;
  public objSolicitudViaje;
  public num_asiento;

  //Asientos
  public as_adelante = 0;
  public as_izq = 0;
  public as_medio = 0;
  public as_der = 0;

  public habilitar_as_adelante;
  public habilitar_as_izq;
  public habilitar_as_medio;
  public habilitar_as_derecha;
  public enviarSolicitud;
  public busquedaaciento = localStorage.getItem("busquedaaciento");

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, private socket: Socket, private _notificacionesService: NotificacionesService, private _userService: UserService, private _viajellenoservice: ViajellenoService) {
    console.log('AQUI DEBE ENTRAR AL CONSTRUCTOR');

    this.enviarSolicitud = false;

    this.habilitar_as_adelante = false;
    this.habilitar_as_adelante = false;
    this.habilitar_as_izq = false;
    this.habilitar_as_medio = false;
    this.habilitar_as_derecha = false;
    this.busquedaaciento = localStorage.getItem("busquedaaciento");
    console.log("aqui esta el bsqueda aciento...", this.busquedaaciento);
    _notificacionesService.getSolicitudesViajesTodos(_userService.getToken(), this.busquedaaciento).subscribe(
      response => {

        console.log("hola  todos solicitudes" + JSON.stringify(response.solicitudviajesTodos));
        // localStorage.setItem("busquedaaciento", "");
        response.solicitudviajesTodos.forEach(element => {
          if (element.p1 != 0) {
            this.habilitar_as_adelante = true;
          }

          if (element.p2 != 0) {
            this.habilitar_as_izq = true;
          }

          if (element.p3 != 0) {
            this.habilitar_as_medio = true;
          }

          if (element.p4 != 0) {
            this.habilitar_as_derecha = true;
          }
        });
        if (this.habilitar_as_adelante == true && this.habilitar_as_izq == true && this.habilitar_as_medio == true && this.habilitar_as_derecha == true) {
          this.enviarSolicitud = true;
        } else {
          this.enviarSolicitud = false;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  showImg(adelante, izq, medio, der) {
    if (adelante == '12') {
      this.imgOcu12_1 = !this.imgOcu12_1;
      this.imgOcu12_2 = !this.imgOcu12_2;
      if (!this.imgOcu12_2) {
        this.as_adelante = adelante;
        console.log(this.as_adelante);
      } else {
        this.as_adelante = 0;
        console.log(this.as_adelante);
      }
    }
    if (izq == '21') {
      this.imgOcu21_1 = !this.imgOcu21_1;
      this.imgOcu21_2 = !this.imgOcu21_2;
      if (!this.imgOcu21_2) {
        this.as_izq = izq;
        console.log(this.as_izq);
      } else {
        this.as_izq = 0;
        console.log(this.as_izq);
      }
    }

    if (medio == '22') {
      this.imgOcu22_1 = !this.imgOcu22_1;
      this.imgOcu22_2 = !this.imgOcu22_2;
      if (!this.imgOcu22_2) {
        this.as_medio = medio;
        console.log(this.as_medio);
      } else {
        this.as_medio = 0;
        console.log(this.as_medio);
      }
    }

    if (der == '23') {
      this.imgOcu23_1 = !this.imgOcu23_1;
      this.imgOcu23_2 = !this.imgOcu23_2;
      if (!this.imgOcu23_2) {
        this.as_der = der;
        console.log(this.as_der);
      } else {
        this.as_der = 0;
        console.log(this.as_der);
      }
    }
  }

  showAlertNoSatisfactorio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Intente nuevamente.');
    alert.addButton('OK');
    alert.present();
  }

  solicitarAsiento() {
    try {
      if (this.as_adelante == 12 || this.as_der == 23 || this.as_izq == 21 || this.as_medio == 22) {
        this.showAlertEnviarViaje();
      } else {
        this.messageShow('Debes elegir al menos un asiento para realizar esta solicitud.');
      }
    } catch (e) {
      this.showAlertNoSatisfactorio();
    }
  }

  messageShow(message) {
    let alert = this.alertCtrl.create();
    alert.setTitle('<center><h3>IMPORTANTE</h3></center><br>');
    alert.setSubTitle(message);
    alert.addButton('OK');
    alert.present();
  }

  showAlertConfirmado() {
    localStorage.removeItem('getRuta');
    localStorage.removeItem('getEnc_Ruta');
    localStorage.removeItem('objSolicitudViaje');
    let alert = this.alertCtrl.create({
      title: "<center><h3>IMPORTANTE</h3></center>",
      subTitle: "Montecarlo Trans Vip. Su petición ha sido atendida satisfactoriamente.",
      message: '<p align="justify">Esta solicitud puede ser cancelada antes de su confirmación. Para más información comunicate con nosotros.</p>',
      buttons: ["OK"],
      cssClass: 'customLoader'
    });
    alert.present();
  }

  showAlertEnviarViaje() {
    let alert = this.alertCtrl.create({
      title: '<center><h3>IMPORTANTE</h3></center>',
      subTitle: '<center>¿Desea enviar la solicitud?</center>',
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
            //Aqui va el envio de las reservas a la secretaria socket
            this.objSolicitudViaje = JSON.parse(localStorage.getItem("objSolicitudViaje"));
            this.objSolicitudViaje.asiento = this.num_asiento;
            this.objSolicitudViaje.socketId = this.socket.ioSocket.id;
            this.objSolicitudViaje.p1 = this.as_adelante;
            this.objSolicitudViaje.p2 = this.as_izq;
            this.objSolicitudViaje.p3 = this.as_medio;
            this.objSolicitudViaje.p4 = this.as_der;

            localStorage.setItem("objSolicitudViaje", JSON.stringify(this.objSolicitudViaje));
            console.log(JSON.stringify(this.objSolicitudViaje));
            // aqui guardo en la base     
            this._notificacionesService.saveSolicituViaje(this._userService.getToken(), this.objSolicitudViaje).subscribe(
              response => {
                console.log("hola" + response);
                /// aqui empieza lo que se guarda solicitud viajelleno
                this._notificacionesService.getSolicitudesViajesTodos(this._userService.getToken(), this.busquedaaciento).subscribe(
                  response => {
                    console.log("hola  todos solicitudes" + JSON.stringify(response.solicitudviajesTodos));
                  //  localStorage.setItem("busquedaaciento", "");
                    response.solicitudviajesTodos.forEach(element => {
                      if (element.p1 != 0) {
                        this.habilitar_as_adelante = true;
                      }

                      if (element.p2 != 0) {
                        this.habilitar_as_izq = true;
                      }

                      if (element.p3 != 0) {
                        this.habilitar_as_medio = true;
                      }

                      if (element.p4 != 0) {
                        this.habilitar_as_derecha = true;
                      }
                    });
                    if (this.habilitar_as_adelante == true && this.habilitar_as_izq == true && this.habilitar_as_medio == true && this.habilitar_as_derecha == true) {
                      console.log("ya opasaron los ifs", this.objSolicitudViaje);
                      this._viajellenoservice.saveViajelleno(this._userService.getToken(), this.objSolicitudViaje).subscribe(response => { console.log("se guardo correctamente") }, err => { console.log("existe algun error", err) });

                    }
                  },
                  error => {
                    console.log(error);
                  }
                );
                this.socket.emit('create notification', { a: this.objSolicitudViaje });
                console.log("provando socket Id", this.objSolicitudViaje.socketId);
                this.showAlertConfirmado();                   //Funcion para mandar mensaje que es satisfactorio el pedido

                localStorage.removeItem('busquedaaciento');
                this.navCtrl.push(PrincipalPage);
              },
              error => {
                console.log(error);
              }
            );
            // consulta para mandar solicitud viajelleno
          }
        }
      ],
      cssClass: 'customLoader'
    });
    alert.present();
  }
}