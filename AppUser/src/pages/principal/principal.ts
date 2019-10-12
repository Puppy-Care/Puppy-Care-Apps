import { Component } from "@angular/core";
import { NavController, AlertController, MenuController } from "ionic-angular";
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../app/services/user.services';
import { IMyDpOptions } from 'mydatepicker';
import { MessageService } from "../../app/services/message.services";
import { NotificacionesService } from "../../app/services/notificaciones.services";
import { UbicacionInicioPage } from "../ubicacion-inicio/ubicacion-inicio";
import { HistorialPage } from "../../pages/historial/historial";
import { SolicitudesPage } from "../../pages/solicitudes/solicitudes";


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

  public Raza;               //Variable de Raza
  public num_edad;
  public horarioR;
  public horarioE;
  public inf_adicional;

  //Primera Pagina de solicitar Patita
  public VarPatita = true;
  public menuprincipal = true;

  public bander = false;
  public solicita = false;

  //Objeto con la solicitud
  public objSolicitudViaje = {
    tipo: 'Viaje',
    estado: "0",
    raza: null,
    num_edad: null,
    fechaSalida: null,
    horarioR: null,
    horarioE: null,
    informacion: null,
    latitud_salida: null,
    longitud_salida: null,
    latitud_llegada: null,
    longitud_llegada: null,
    identity: null,
    estadoLleno: '0'
  };

  public aparecer = true;

  constructor(public menuCtrl: MenuController, public formBuilder: FormBuilder, public alertCtrl: AlertController, public navCtrl: NavController, public _ubicacionProv: UserService, private _messageservice: MessageService, private _notificacionesservice: NotificacionesService) {

  }

  //Activar Pedido
  activaV() {
    this.VarPatita = false;
    this.bander = true;
    this.solicita = true;
    this.menuprincipal = false;
  }

  irUbicacionInicio() {
    this.aparecer = false;

    this.objSolicitudViaje.raza = this.Raza;
    this.objSolicitudViaje.num_edad = this.num_edad;
    this.objSolicitudViaje.fechaSalida = this.fecha_salida;
    this.objSolicitudViaje.horarioR = this.horarioR;
    this.objSolicitudViaje.horarioE = this.horarioE;
    this.objSolicitudViaje.informacion = this.inf_adicional;
    this.objSolicitudViaje.identity = JSON.parse(localStorage.getItem("identity"));
    console.log(this.objSolicitudViaje);

    localStorage.setItem("objSolicitudViaje", JSON.stringify(this.objSolicitudViaje));

    if (this.Raza != null && this.Raza != ""  && this.num_edad != null && this.num_edad != "" && this.fecha_salida != "" && this.fecha_salida != null && this.horarioE != "" && this.horarioE != null && this.horarioR != "" && this.horarioR != null) {
      this.navCtrl.push(UbicacionInicioPage);
    } else {
    this.nolleno();
    }
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

  historial() {
    this.navCtrl.push(HistorialPage);
  }

  solicitudes() {
    this.navCtrl.push(SolicitudesPage);
  }

}
