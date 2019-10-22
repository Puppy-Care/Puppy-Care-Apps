import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../../../services/message.services';
import { UserService } from '../../../services/user.services';
import { EnvioEmail } from '../../../services/correo.service';

@Component({
  selector: 'app-detalles-viajes-realizados',
  templateUrl: './detalles-viajes-realizados.component.html',
  styleUrls: ['./detalles-viajes-realizados.component.css']
})
export class DetallesViajesRealizadosComponent implements OnInit, OnDestroy {

  constructor(private _envioEmail: EnvioEmail, private _messageService: MessageService, private _userService: UserService) {
    this.viajeRealizadoDetalle = JSON.parse(localStorage.getItem('notificacionViajeRealizado'));
    console.log('mi componente de detallesviajesrealizados >>>', this.viajeRealizadoDetalle);

    this.latitud_salida = Number(this.viajeRealizadoDetalle.latitud_salida);
    this.longitud_salida = Number(this.viajeRealizadoDetalle.longitud_salida);
    this.latitud_llegada = Number(this.viajeRealizadoDetalle.latitud_llegada);
    this.longitud_llegada = Number(this.viajeRealizadoDetalle.longitud_llegada);

    if (this.viajeRealizadoDetalle.p1 != '0') {
      this.puestoCopiloto = "Ocupado";
    } else {
      this.puestoCopiloto = "Libre";
    }
    if (this.viajeRealizadoDetalle.p2 != '0') {
      this.puestoAtrasIzquierdo = "Ocupado";
    } else {
      this.puestoAtrasIzquierdo = "Libre";
    }
    if (this.viajeRealizadoDetalle.p3 != '0') {
      this.puestoAtrasMedio = "Ocupado";
    } else {
      this.puestoAtrasMedio = "Libre";
    }
    if (this.viajeRealizadoDetalle.p4 != '0') {
      this.puestoAtrasDerecho = "Ocupado";
    } else {
      this.puestoAtrasDerecho = "Libre";
    }
  }

  public viajeRealizadoDetalle;
  public puestoCopiloto;
  public puestoAtrasIzquierdo;
  public puestoAtrasMedio;
  public puestoAtrasDerecho;
  public latitud_salida;
  public longitud_salida;
  public latitud_llegada;
  public longitud_llegada;

  ngOnInit() {
  }

  ngOnDestroy() {
    localStorage.removeItem('notificacionViajeRealizado');
  }

  cancelarViaje() {

    //alert('El viaje se ha cancelado correctamente');
    console.log('ESTOY EN CANCELAR VIAJE DEL DETALLE DE VIAJES REALIZADOS');
    this._messageService.UpdateEstadoMessage(this._userService.getToken(), this.viajeRealizadoDetalle).subscribe(
      response => {
        console.log("Seactualizo el estado", response);
        location.reload(true);
      },
      error => {
        console.log(error);
      }
    );

    var cancelarViaje =
    {
      obj: this.viajeRealizadoDetalle,
      variable: 'CV'

    }
    //aqui va el envio del correo
    this._envioEmail.envioEmail(this._userService.getToken(), cancelarViaje).subscribe(
      response => {
        console.log("Se envio el correo electronico ", response);
       // location.reload(true);
      },
      error => {
        console.log(error);
      }
    );

  }
}
