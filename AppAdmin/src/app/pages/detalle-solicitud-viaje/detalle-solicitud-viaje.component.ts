import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Viaje } from '../../../models/viaje';
import { MessageService } from '../../../services/message.services';

import { UserService } from '../../../services/user.services';
import { NotificacionesService } from '../../../services/notificaciones.services';

import { EnvioEmail } from '../../../services/correo.service';

@Component({
  selector: 'app-detalle-solicitud-viaje',
  templateUrl: './detalle-solicitud-viaje.component.html',
  styleUrls: ['./detalle-solicitud-viaje.component.css']
})
export class DetalleSolicitudViajeComponent implements DoCheck, OnDestroy {

  public mensajeerrormodals = 'Ingrese todos los datos antes de aceptar la solicitud';

  ngOnDestroy() {
    localStorage.removeItem("viaje");
  }

  ngDoCheck() {
    this.viajeDetalle = JSON.parse(localStorage.getItem("viaje"));
 
    this.tipo = this.viajeDetalle.j_tipo;
    this.estado = this.viajeDetalle.j_ruta;
    this.raza = this.viajeDetalle.raza;
    this.fechaSalida = this.viajeDetalle.j_fechaSalida;
    this.horarioR = this.viajeDetalle.j_horarioR;
    this.horarioE = this.viajeDetalle.j_horarioE;
    this.latitud_salida = Number(this.viajeDetalle.j_latitud_salida);
    this.longitud_salida = Number(this.viajeDetalle.j_longitud_salida);
    this.latitud_llegada = Number(this.viajeDetalle.j_latitud_llegada);
    this.longitud_llegada = Number(this.viajeDetalle.j_longitud_llegada);
    this.informacion=this.viajeDetalle.j_informacion
    this.nombre = this.viajeDetalle.j_nombre;
    this.apellido = this.viajeDetalle.j_apellido;
    this.cedula = this.viajeDetalle.j_cedula;
    this.correo = this.viajeDetalle.j_correo;
    this.celular = this.viajeDetalle.j_celular;
    this.convencional = this.viajeDetalle.j_convencional;
    
  
  }



  public viajeDetalle;  // este es mi local storage
  public identitySecretaria;  //e ste es mi local storage de la secretaria

  public tipo;
  public estado;
  public raza;
  public num_edad;
  public fechaSalida;
  public horarioR;
  public horarioE;
  public informacion;
  public longitud_salida;
  public latitud_salida;
  public longitud_llegada;
  public latitud_llegada;
  public nombre;
  public apellido;
  public cedula;
  public correo;
  public celular;
  public convencional;
  public precio;
  public _solicitudViajeSend: Viaje;  // variable de tipo Viaje para guardar mis datos

  public _solicitudSendId = {
    idSolicitud: null,
    sockett: null,
    tipoSolicitud: null
  };


  /// variables para listar en conbo box chofer
  public listadoChoferes;
  //variables para listar en conbo bo taxi
  public listadoTaxis;
  //id del taxi
  public _idTaxi;
  //id del conductor
  public _idConductor;

  constructor(private _envioEmail: EnvioEmail, private _notificacionesService: NotificacionesService, private _userService: UserService, private _messageService: MessageService) {
    this.viajeDetalle = JSON.parse(localStorage.getItem("viaje"));
    console.log('ESTE ES MI OBJETO PARA PRUEBA WOLF >>>>>', this.viajeDetalle);
    this.identitySecretaria = JSON.parse(localStorage.getItem("identity"));

    this._solicitudViajeSend = new Viaje("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");

    //para la visualizacion en el detallesolicitudViaje.html
    this.tipo = this.viajeDetalle.j_tipo;
    this.estado = this.viajeDetalle.j_ruta;
    this.raza = this.viajeDetalle.raza;
    this.fechaSalida = this.viajeDetalle.j_fechaSalida;
    this.horarioR = this.viajeDetalle.j_horarioR;
    this.horarioE = this.viajeDetalle.j_horarioE;
    this.latitud_salida = Number(this.viajeDetalle.j_latitud_salida);
    this.longitud_salida = Number(this.viajeDetalle.j_longitud_salida);
    this.latitud_llegada = Number(this.viajeDetalle.j_latitud_llegada);
    this.longitud_llegada = Number(this.viajeDetalle.j_longitud_llegada);
    this.informacion=this.viajeDetalle.j_informacion
    this.nombre = this.viajeDetalle.j_nombre;
    this.apellido = this.viajeDetalle.j_apellido;
    this.cedula = this.viajeDetalle.j_cedula;
    this.correo = this.viajeDetalle.j_correo;
    this.celular = this.viajeDetalle.j_celular;
    this.convencional = this.viajeDetalle.j_convencional;

    console.log('***********************');
    console.log('VARIABLES de viaje');
    console.log('***********************');
    console.log('LatS > ', this.latitud_salida);
    console.log('LngS > ', this.longitud_salida);
    console.log('LatLL > ', this.latitud_llegada);
    console.log('LngLL > ', this.longitud_llegada);

    //guardando en la clase viajes.ts
    this._solicitudViajeSend.tipo = this.viajeDetalle.j_tipo;
    this._solicitudViajeSend._id_secretaria = this.identitySecretaria._id;
    this._solicitudViajeSend.receiver = this.viajeDetalle.j_id;
    this._solicitudViajeSend.raza = this.viajeDetalle.j_raza;
    this._solicitudViajeSend.num_edad = this.viajeDetalle.j_num_edad;
    this._solicitudViajeSend.fechaSalida = this.viajeDetalle.j_fechaSalida;
    this._solicitudViajeSend.horarioR = this.viajeDetalle.j_horarioR;
    this._solicitudViajeSend.horarioE = this.viajeDetalle.j_horarioE;
    this._solicitudViajeSend.informacion = this.viajeDetalle.j_informacion;
    this._solicitudViajeSend.latitud_salida = this.viajeDetalle.j_latitud_salida;
    this._solicitudViajeSend.longitud_salida = this.viajeDetalle.j_longitud_salida;
    this._solicitudViajeSend.latitud_llegada = this.viajeDetalle.j_latitud_llegada;
    this._solicitudViajeSend.longitud_llegada = this.viajeDetalle.j_longitud_llegada;
    this._solicitudViajeSend.precio = this.precio;
    this._solicitudViajeSend.estado = '0';
    //console.log("danni zorroojhb nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", this._solicitudViajeSend);

    // cargar datos del chofer
    this.busquedaChofer();
    // cargar datos del taxi
  

  }

  validacion() {
    console.log('precio >> ', this.precio);
    console.log('conductor >> ', this._idConductor);
    if (this.precio == null || this._idConductor == null) {
      console.log('POR FAVOR LLENE TODOS LOS CAMPOS');
      return false;
    }
    else {
      console.log('POR FAVOR LLENE TODOS LOS CAMPOS');
      return true;
    }
  }

  enviarMensaje() //  esta funcion  debe cargar el json  con todos los datos del usuario y enviarlos por la notificacion
  {
    var camposValidacion = this.validacion();
    if (camposValidacion == true) {
      console.log("entre  a la funcioin hola");

      var notIndiv = JSON.parse(localStorage.getItem("notIndiv"));

      this._notificacionesService.updateSolicitudViaje(this._userService.getToken(), notIndiv).subscribe(
        response => {
          console.log(response.solicitudViaje);
          localStorage.setItem("banderaViajeEncom", "viaje");
          location.reload(true);
        },
        error => {
          console.log(error);
        }
      );

      console.log('entre  a la funcioin enviarMensaje');
      // let json = JSON.stringify(this._solicitudViajeSend);
      // console.log(json);
      // let message = { text: "jola  juuapo danni", receiver: "5b4639dfa2c64a651860dcd8" };

      this._messageService.addMessage(this._userService.getToken(), this._solicitudViajeSend).subscribe(
        response => {
          console.log('hola vanessa' + JSON.stringify(response.viaje._id));
          this._solicitudSendId.idSolicitud = response.viaje._id;
          this._solicitudSendId.tipoSolicitud = this._solicitudViajeSend.tipo;
          console.log('los ies que se envia', this._solicitudSendId);
      
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log('***********LLENE TODOS LOS CAMPOS');
      document.getElementById("openModalError").click();
    }

  }


  asignarViaje() {

    /////////////////////////////
    this.asignarFechaHora();
    /////////////////////////////
    this._solicitudViajeSend.precio = this.precio;
    this._solicitudViajeSend.tipoPago = "Efectivo";
    console.log('Datos de mi viaje.ts PRUEBA A VER QUE SE ENCVIA>>> ', this._solicitudViajeSend);
    this.enviarMensaje();


    var asignarViaje =
    {
      obj: this._solicitudViajeSend,
      variable: 'AV'

    }
    //aqui va el envio del correo
    console.log('LA INFORMACION DE MI SOLITCITUD DE VIAJEEEEEEEEEEEEEE >>>>>>>>>. ', asignarViaje.obj)
    this._envioEmail.envioEmail(this._userService.getToken(), asignarViaje).subscribe(
      response => {
        console.log("Se envio el correo electronico ", response);
        location.reload(true);
      },
      error => {
        console.log(error);
      }
    );

  }

  asignarFechaHora() {
    var dt = new Date();
    var month = dt.getMonth() + 1;
    var day = dt.getDate();
    var year = dt.getFullYear();
    var hour = dt.getHours();
    var minute = dt.getMinutes();
    var seconds = dt.getSeconds();

    var horaHoy = hour + ':' + minute + ':' + seconds;
    var fechaHoy = day + '/' + month + '/' + year;
    console.log('fecha de hoy:::::::', fechaHoy);
    this._solicitudViajeSend.fech_solicitud = fechaHoy;
    console.log('fecha de hoy:::::::', horaHoy);
    this._solicitudViajeSend.hora_solicitud = horaHoy;

  }



  busquedaChofer() {

    this._userService.buscarChoferes("0").subscribe(
      response => {
        console.log("satisfactoriamente");

        this.listadoChoferes = response.choferes;
        var myjson = JSON.stringify(this.listadoChoferes);
        console.log("satisfactoriamente" + myjson);

      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          console.log(errorMessage);
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";

            document.getElementById("openModalError").click();
          }
          // this.loading =false;
        }
      }

    );
  }


  

  mostrarDatosConductor(datosConductor) {
    this._idConductor = datosConductor;
    this._solicitudViajeSend._id_chofer = this._idConductor;
    console.log('DATOS DEL CONDUCTOR INDIVIDUAL >>>> ', this._idConductor);
  }

 
  
  cancelarViaje() {
    alert('ESTOY EN CANCELAR VIAJE DEL DETALLE DE SOLICITUD DE VIAJE');
    console.log('ESTOY EN CANCELAR VIAJE DEL DETALLE DE SOLICITUD DE VIAJE');
  }


}
