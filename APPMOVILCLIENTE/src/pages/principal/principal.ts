import { Component } from "@angular/core";
import { NavController, AlertController, MenuController } from "ionic-angular";
import { UserService } from '../../app/services/user.services';
import { UbicacionInicioPage } from "../ubicacion-inicio/ubicacion-inicio";
import { IMyDpOptions } from 'mydatepicker';
import { Socket } from 'ng-socket-io';
import { MessageService } from "../../app/services/message.services";
import { NotificacionesService } from "../../app/services/notificaciones.services";
import { HistorialPage } from "../../pages/historial/historial";
import { ConfirmacionPage } from "../../pages/confirmacion/confirmacion";
import { ConfirmacionEncPage } from "../../pages/confirmacionEnc/confirmacionEnc";
import { SolicitudesPage } from "../../pages/solicitudes/solicitudes";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: "page-principal",
  templateUrl: "principal.html",
  providers: [UserService]
})

export class PrincipalPage {
  myModel: any; // Modelo de datos.
  public displayMont = new Date().getMonth();
  public displayDay = new Date().getDate();
  public displayYear = new Date().getFullYear();
  public vectorViajes;
  public vectorEncomiendas;
  public vectorViajesMios;
  public vectorEncomiendasMios;

  //Datapicker
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    dayLabels: { su: "Do", mo: "Lu", tu: "Ma", we: "Mi", th: "Ju", fr: "Vi", sa: "Sa" },
    monthLabels: { 1: "Ene", 2: "Feb", 3: "Mar", 4: "Abr", 5: "May", 6: "Jun", 7: "Jul", 8: "Ago", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dic" },
    todayBtnTxt: "Hoy",
    firstDayOfWeek: "mo",
    sunHighlight: false,
    markCurrentDay: true,
    minYear: this.displayYear - 1,
    height: '40px',
    disableUntil: { year: this.displayYear, month: this.displayMont + 1, day: this.displayDay - 1 }
  };


  // Initialized to specific date (09.10.2018). Datpicker
  // public mes = this.displayMont + 1;
  // public fecha_salida: any = { date: { year: this.displayYear, month: this.displayMont + 1, day: this.displayDay }, formatted: this.displayDay + "/" + this.mes + "/" + this.displayYear };
  // public fecha_salidaE: any = { date: { year: this.displayYear, month: this.displayMont + 1, day: this.displayDay }, formatted: this.displayDay + "/" + this.mes + "/" + this.displayYear };
  public fecha_salida;
  public fecha_salidaE;

  public viaje: any[] = [{ "ruta": "Riobamba - Quito" },
  { "ruta": "Quito - Riobamba" },
  { "ruta": "Riobamba-Quito-Aeropuerto UIO" },
  { "ruta": "Aeropuerto UIO-Quito-Riobamba" },
  { "ruta": "Express" }];

  public viajeE: any[] = [{ "ruta": "Riobamba - Quito" },
  { "ruta": "Quito - Riobamba" },
  { "ruta": "Riobamba-Quito-Aeropuerto UIO" },
  { "ruta": "Aeropuerto UIO-Quito-Riobamba" }];

  public RutasExpress;          //Ruta  de los viajes 
  public RutaOrigen;               //Variable de ruta express origen
  public RutaDestino;                //Variable de ruta express destino
  public horario;
  public horarioExpress;        //variable del horario express
  public num_maleta;
  public inf_adicional;

  //VARIBALES ENCOMINEDAS
  public RutasExpress1;         //Ruta  de las encomiendas 
  public horarioE;
  public destinatario;
  public detalleEnc;
  public largo1;
  public ancho1;
  public alto1;

  public VarViaje = true;
  public VarEnc = true;
  public menuprincipal = true;

  public bander = false;
  public bander_1 = false;
  public bander2 = false;
  public bander2_1 = false;
  public bander3 = false;
  public solicita = false;
  public bander_6 = false;
  public bander_7V = false;

  //Banderas de Encomiendas
  public banderE = false;
  public bander_1E = false;
  public bander2E = false;
  public bander3E = false;
  public bander_5E = false;
  public solicitaE = false;
  public bander_98 = false;
  // busqueda siento
  public busquedaaciento =
    {
      fecha: null,
      hora: null,
      rura: null

    }
  //Objeto con la solicitud
  public objSolicitudViaje = {
    tipo: 'Viaje',
    estado: "0",
    ruta: null,
    horario: null,
    fechaSalida: null,
    num_maleta: null,
    informacion: null,
    latitud_salida: null,
    longitud_salida: null,
    latitud_llegada: null,
    longitud_llegada: null,
    //asiento: null,
    identity: null,
    socketId: null,
    p1: null,
    p2: null,
    p3: null,
    p4: null,
    estadoLleno: '0'
  };

  //Objeto con la solicitud de encomiendas
  public objSolicitudEncomienda = {
    tipo: 'Encomienda',
    estado: "0",
    ruta: null,
    horario: null,
    fechaSalida: null,
    latitud_salida: null,
    longitud_salida: null,
    latitud_llegada: null,
    longitud_llegada: null,
    detalle_paquete: null,
    destinatario: null,
    identity: null,
    socketId: null,
  };

  public aparecer = true;

  constructor(public menuCtrl: MenuController, public formBuilder: FormBuilder, public alertCtrl: AlertController, public navCtrl: NavController, public _ubicacionProv: UserService, private _messageservice: MessageService, private _notificacionesservice: NotificacionesService) {
    //CUANDO EL MENU LE BLOQUEO
    // if (this._ubicacionProv.getIdentity() == null) {
    //   this.menuCtrl.enable(false, 'myMenu');
    // } else {
    //   this.menuCtrl.enable(true, 'myMenu');
    // }

    // remover de las solicitudes
    localStorage.removeItem('objSolicitudViaje');
    localStorage.removeItem('objSolicitudEncomienda');
    localStorage.removeItem('busquedaaciento');
    localStorage.removeItem('getRuta');
    localStorage.removeItem('getExpress');
    localStorage.removeItem('getEnc_Ruta');
    localStorage.removeItem('confirmacion1');
    localStorage.removeItem('confirmacionEnc');
    localStorage.removeItem('recibi');
    localStorage.removeItem('recibiEnc');

    // this.objSolicitudViaje.fechaSalida = this.fecha_salida.formatted;
    // this.objSolicitudEncomienda.fechaSalida = this.fecha_salidaE.formatted;
    this._ubicacionProv.iniciarGeolocalizacion();

    _ubicacionProv.getMessagesss().subscribe(message => {

      console.log("MOSTRAR VANESSA EN ALGO E V" + JSON.stringify(message.a));// estio hay que cargar en la targeta
      // localStorage.setItem("confirmacion", JSON.stringify(message.a));/// aqui vane rediriges
      localStorage.setItem("cont", "2");

      if (message.a.tipoSolicitud == 'Viaje') {
        this._messageservice.getMessagesId(this._ubicacionProv.getToken(), message.a.idSolicitud).subscribe(response => {

          console.log("loq ue vien por el socket mi pecs", response.messagess);
          localStorage.setItem("confirmacion1", JSON.stringify(response.messagess));
          this.navCtrl.push(ConfirmacionPage);

        }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) });

      } else {
        console.log('ESTO ES UNA ENCOMIENDA VANESSA........');
        this._messageservice.getMessagesEncoId(this._ubicacionProv.getToken(), message.a.idSolicitud).subscribe(response => {

          console.log("lo que viene en el socket Enc", response.messagess);
          localStorage.setItem("confirmacionEnc", JSON.stringify(response.messagess));
          this.navCtrl.push(ConfirmacionEncPage);

        }, (err) => { console.log("Existen COmplicaciones Intente mas tarde", err) });

      }

      /*let cont = 0;
      if (JSON.stringify(message.tipo) == "viaje") {
        this._messageservice.getMessages(this._ubicacionProv.getToken()).subscribe(response => {
          if (response.messagess[0] != undefined) {
            let vector;
            vector = response.messagess;
            vector.forEach(() => {
              cont += 1;
            });
              console.log(cont - 1);
            console.log(response.messagess[cont - 1]);
          }
        }, () => { }
        );
      } else {
        // encomiendas
        let contEnco = 0;
        this._messageservice.getMessagesEnco(this._ubicacionProv.getToken()).subscribe(response => {
          console.log("Entre a encomiendas vemaos si fregrwsa");
          if (response.messagessEnco[0] != undefined) {

            let vector;
            vector = response.messagessEnco;
            vector.forEach(() => {
              contEnco += 1;
            });
            console.log(contEnco - 1);
            console.log(response.messagessEnco[contEnco - 1]);
          }
        }, () => { }
        );
      }*/
    }); // esto es loq ue hace terminar
    console.log("Esta es la fecha que tiene ...>>>>", this.fecha_salida);
  }

  irUbicacionInicio() {
    this.aparecer = false;
    if (this.RutasExpress == 'Express') {
      this.objSolicitudViaje.ruta = this.RutaOrigen + '-' + this.RutaDestino;
      this.busquedaaciento.rura = this.RutaOrigen + '-' + this.RutaDestino;
      this.objSolicitudViaje.horario = this.horarioExpress;
      this.busquedaaciento.hora = this.horarioExpress;
    } else {
      this.objSolicitudViaje.ruta = this.RutasExpress;
      this.busquedaaciento.rura = this.RutasExpress;
      if (this.horario == 'Express') {
        this.objSolicitudViaje.horario = this.horarioExpress;
        this.busquedaaciento.hora = this.horarioExpress;
      } else {
        this.objSolicitudViaje.horario = this.horario;
        this.busquedaaciento.hora = this.horario;
      }
    }

    if (this.fecha_salida != "" && this.fecha_salida != null) {
      this.busquedaaciento.fecha = this.fecha_salida.formatted;
    }

    this.objSolicitudViaje.fechaSalida = this.fecha_salida;
    this.objSolicitudViaje.num_maleta = this.num_maleta;
    this.objSolicitudViaje.informacion = this.inf_adicional;
    this.objSolicitudViaje.identity = JSON.parse(localStorage.getItem("identity"));
    console.log(this.objSolicitudViaje);
    localStorage.setItem("objSolicitudViaje", JSON.stringify(this.objSolicitudViaje));
    localStorage.setItem("busquedaaciento", JSON.stringify(this.busquedaaciento));
    console.log("guardando en mi ruta Viajes", this.RutasExpress);
    localStorage.setItem("getRuta", JSON.stringify(this.RutasExpress));
    localStorage.setItem("getEnc_Ruta", JSON.stringify('1'));

    if (this.RutasExpress != null && this.num_maleta != null && this.num_maleta != "" && this.fecha_salida != "" && this.fecha_salida != null) {
      if (this.RutasExpress == 'Express') {
        if (this.horarioExpress != null && this.RutaOrigen != null && this.RutaDestino != null && this.RutaOrigen != "" && this.RutaDestino != "") {
          this.navCtrl.push(UbicacionInicioPage);
        } else {
          this.nolleno();
        }
      } else {
        if (this.horario == 'Express') {
          if (this.horarioExpress != null) {
            this.navCtrl.push(UbicacionInicioPage);
          } else {
            this.nolleno();
          }
        } else {
          if (this.horario != null) {
            this.navCtrl.push(UbicacionInicioPage);
          } else {
            this.nolleno();
          }
        }
      }
    } else {
      this.nolleno();
    }
  }

  concatenacion(entrada) {
    var concatenado;
    console.log('variable de entrada >> ', entrada);
    if (entrada >= 1 && entrada <= 9) {
      concatenado = '0' + entrada;
    }
    else {
      concatenado = entrada;
    }
    console.log('valor concatenado >>', concatenado);
    return concatenado;
  }

  irUbicacionInicioEncomienda() {
    this.objSolicitudEncomienda.ruta = this.RutasExpress1;
    this.objSolicitudEncomienda.horario = this.horarioE;
    this.objSolicitudEncomienda.fechaSalida = this.fecha_salidaE;


    this.objSolicitudEncomienda.destinatario = this.destinatario;
    this.objSolicitudEncomienda.detalle_paquete = ' Tamaño de la encomienda:       LARGO: ' + this.largo1 + 'cm ANCHO: ' + this.ancho1 + 'cm ALTO: ' + this.alto1 + 'cm ' + '-   ' + this.detalleEnc;
    this.objSolicitudEncomienda.identity = JSON.parse(localStorage.getItem("identity"));
    console.log(this.objSolicitudEncomienda);
    localStorage.setItem("objSolicitudEncomienda", JSON.stringify(this.objSolicitudEncomienda));

    console.log("guardando en mi ruta Encomienda", this.RutasExpress1);
    localStorage.setItem("getRuta", JSON.stringify(this.RutasExpress1));
    localStorage.setItem("getEnc_Ruta", JSON.stringify('2'));

    if (this.fecha_salidaE != "" && this.fecha_salidaE != null && this.RutasExpress1 != null && this.horarioE != null && this.destinatario != null && this.destinatario != "" && this.detalleEnc != null && this.detalleEnc != "" && this.alto1 != null && this.alto1 != "" && this.ancho1 != null && this.ancho1 != "" && this.largo1 != null && this.largo1 != "") {
      this.navCtrl.push(UbicacionInicioPage);
    } else {
      this.nolleno();
    }
  }

  activarExpress() {
    if (this.RutasExpress == "Express") {
      this.bander = true;
      this.bander_1 = true;
      this.bander2 = false;
      this.bander2_1 = true;
      this.bander3 = true;
      localStorage.setItem("getExpress", JSON.stringify('Express'));
    } else {
      this.bander = true;
      this.bander_1 = false;
      this.bander2 = true;
      this.bander2_1 = false;
      this.bander3 = true;
      localStorage.removeItem('getExpress');
      if (this.horario == "Express") {
        this.bander = true;
        this.bander_1 = false;
        this.bander2 = true;
        this.bander2_1 = true;
        this.bander3 = true;
        localStorage.setItem("getExpress", JSON.stringify('Express'));
      } else {
        this.bander = true;
        this.bander_1 = false;
        this.bander2 = true;
        this.bander2_1 = false;
        this.bander3 = true;
        localStorage.removeItem('getExpress');
      }
    }
  }

  activaV() {
    this.VarViaje = false;
    this.VarEnc = false;
    this.bander = true;
    this.bander_1 = false;
    this.bander2 = true;
    this.bander2_1 = false;
    this.bander3 = true;
    this.bander_6 = true;
    this.solicita = true;
    this.menuprincipal = false;
    this.bander_7V = true;
  }

  activaE() {
    this.showAlert();
    this.VarViaje = false;
    this.VarEnc = false;
    this.banderE = true;
    this.bander_1E = true;
    this.bander2E = true;
    this.bander3E = true;
    this.bander_98 = true;
    this.bander_5E = true;
    this.solicitaE = true;
    this.menuprincipal = false;
  }

  showAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('<center><h3>AVISOS IMPORTANTES!</h3></center>');
    alert.setSubTitle('<div><dl>' +
      '<br><dt>No permitido:</dt>' +
      '<dd>&nbsp;&nbsp;&nbsp;<strong>-</strong> Comida preparada</dd>' +
      '<dd>&nbsp;&nbsp;&nbsp;<strong>-</strong> Mascotas</dd>' +
      '<br><dt>Recuerda poner en la Encomienda los siguientes datos:</dt>' +
      '<dd>&nbsp;&nbsp;&nbsp;<strong>-</strong> Nombre destinatario</dd>' +
      '<dd>&nbsp;&nbsp;&nbsp;<strong>-</strong> Dirección de entrega</dd>' +
      '<dd>&nbsp;&nbsp;&nbsp;<strong>-</strong> Teléfono destinatario</dd>' +
      '<br><dt>Aviso:</dt>' +
      '<dd>Las Encomiendas se receptarán (2 Horas Antes). <br><br> El precio depende del tamaño de la encomienda, se permite un máximo de 50x50x50cm. En caso de ser mayor tendrá un costo adicional.</dd>' +
      '</dl>' +
      '</div>');
    alert.addButton('OK');
    alert.present();
  }

  showAlertViajeIda(message) {
    let alert = this.alertCtrl.create();
    alert.setTitle('<center><h3>IMPORTANTE</h3></center>');
    alert.setSubTitle(message);
    alert.setMessage('<center>Para más información comunicate con nosotros.<center>');
    alert.addButton('OK');
    alert.present();
  }

  nolleno() {
    let alert = this.alertCtrl.create({
      title: "<center><h3>INFORMACIÓN</h3></center>",
      message: '<p align="justify">Ingrese todos los datos requeridos, existen campos vacíos.<p>',
      buttons: ["OK"],
      cssClass: 'customLoader'
    });
    alert.present();
  }

  clickMensaje(RutasExpress) {
    if (RutasExpress == "Riobamba-Quito-Aeropuerto UIO") {
      this.showAlertViajeIda('<br>Esta ruta consiste en: Dejar a todas las personas en Quito y después ir al Aeropuerto UIO. <h6>(Precio: $40.00) (Tiempo: 5 Horas Aprox.)</h6><br>' +
        'Si desea un recorrrido personalizado al Aeropuerto UIO, escoja la opción "Express". <h6> (Precio: $100.00)(Tiempo: 3 Horas Aprox.)</h6>');
    } else {
      if (RutasExpress == "Aeropuerto UIO-Quito-Riobamba") {
        this.showAlertViajeIda('<br>Esta ruta consiste en: Recogerle del Aeropuerto UIO, y después a otros clientes en Quito. <h6>(Precio: $40.00) (Tiempo: 5 Horas Aprox.)<br>(Usted será recogido 2 Horas Antes de su horario.)</h6><br>' +
          'Si usted desea un recorrrido personalizado desde el Aeropuerto UIO (Quito), escoja la opción "Express".');
      }
    }
  }

  historial() {
    this.navCtrl.push(HistorialPage);
  }

  public h;
  maletas() {
    this.h = localStorage.getItem("getExpress");
    if (this.h == null) {
      this.aparecer = false;
    } else {
      this.aparecer = true;
    }
  }

  solicitudes() {
    this.navCtrl.push(SolicitudesPage);
    /*console.log("entre a silicitudes");
    this._notificacionesservice.getSolicitudesViajes(this._ubicacionProv.getToken(), this._ubicacionProv.getIdentity()).subscribe(response => {
      if (response.solicitudviajesmios[0] != undefined) {
        this.vectorViajesMios = response.solicitudviajesmios;
        console.log("viajes mios", this.vectorViajesMios);
        localStorage.setItem("vectorViajesMios", JSON.stringify(this.vectorViajesMios));


      }
    }, (err) => { console.log("Existen COmplicaciones Intente mas tarde", err) }
    );

    this._notificacionesservice.getSolicitudesEnco(this._ubicacionProv.getToken(), this._ubicacionProv.getIdentity()).subscribe(response => {
      if (response.solicitudencomiendasmios[0] != undefined) {
        this.vectorEncomiendasMios = response.solicitudencomiendasmios;
        console.log("viajes mios  encomeindas", this.vectorEncomiendasMios);
        localStorage.setItem("vectorEncomiendasMios", JSON.stringify(this.vectorEncomiendasMios));


      }
    }, (err) => { console.log("Existen COmplicaciones Intente mas tarde", err) }
    );*/
  }
}