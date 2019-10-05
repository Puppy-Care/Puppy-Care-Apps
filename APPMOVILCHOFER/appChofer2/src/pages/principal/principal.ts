import { Component } from "@angular/core";
import { NavController, AlertController, MenuController } from "ionic-angular";
import { ChoferService } from "../../app/services/chofer.service";
import { parseDate } from "ionic-angular/umd/util/datetime-util";
import { DetallesPage } from "../detalles/detalles";
import { DetallesEncomiendaPage } from "../detalles-encomienda/detalles-encomienda";
import { THIS_EXPR } from "../../../node_modules/@angular/compiler/src/output/output_ast";

@Component({
  selector: "page-principal",
  templateUrl: "principal.html"
})

export class PrincipalPage {

  constructor(public menuCtrl: MenuController, public navCtrl: NavController, private _choferservice: ChoferService) {
    //BLOQUEAR MENU
     if (this._choferservice.getIdentity() == null) {
       this.menuCtrl.enable(false, 'myMenu');
     } else {
       this.menuCtrl.enable(true, 'myMenu');
     }

    this.btnFinalizarViaje = true;
    this.btnFinalizarEncomiendas = true;
    this.portada = true;
    this.datosChofer = localStorage.getItem("identityC");
    this.datosChoferInt = JSON.parse(this.datosChofer);
    console.log('datos chofer', this.datosChoferInt);

    this.animacionAcciones();

  }

  public datosChofer;
  public datosChoferInt;

  public cont = 0;
  public vectorViajes;
  public vectorEncomiendas;

  //color de los botones
  public clrBotonViaje = "appcolr";
  public clrBotonEncomienda = "appcolr";
  public checkmarkViaje = "none";
  public checkmarkEncomienda = "none";

  //variables boleanas de los estados
  public contenidoDinamico = false;
  public contenidoDinamicoViaje = false;
  public contenidoDinamicoEncomienda = false;
  public btnFinalizarViaje = false;
  public btnFinalizarEncomiendas = false;
  public portada = true;

  //variables del mensaje
  public titulo;

  public medio;
  public up;
  public aux;
  public c = 0;

  //json de animacion de peultima accion realizada
  public objAnimacion = {
    estadoListar: null,
    tipoMostrar: null,
    boton: null
  };


  historial(estadoListar, tipoMostrar) {
    this.vectorViajes = null;
    this.vectorEncomiendas = null;
    this.portada = false;

    if (tipoMostrar == 'campana') {
      this.objAnimacion.estadoListar = estadoListar;
      this.objAnimacion.tipoMostrar = tipoMostrar;
      console.log('campana');
      this.listarNotificacionesCampana(estadoListar);
    }
    if (tipoMostrar == 'reloj') {
      this.objAnimacion.estadoListar = estadoListar;
      this.objAnimacion.tipoMostrar = tipoMostrar;
      console.log('reloj');
      this.listarNotificacionesReloj(estadoListar);
    }
    if (tipoMostrar == 'calendario') {
      this.objAnimacion.estadoListar = estadoListar;
      this.objAnimacion.tipoMostrar = tipoMostrar;
      console.log('calendario');
      this.listarNotificacionesCalendario(estadoListar);
    }
    this.mostrarContenidoDinamico(tipoMostrar);
  }

  listarNotificacionesCampana(estadoListar) {
    //campana viajes
    this._choferservice.getMessagesMioChofer(this._choferservice.getToken(), estadoListar).subscribe(response => {
      if (response.messagess[0] != undefined) {
        this.vectorViajes = response.messagess;
        this.darvuelta();
      }
    }, (err) => { console.log("Existen Complicaciones, intente más tarde", err) });
    //campana encomiendas
    this._choferservice.getMessagesMioEncoChofer(this._choferservice.getToken(), estadoListar).subscribe(response => {
      if (response.messagess[0] != undefined) {
        this.vectorEncomiendas = response.messagess;
        this.darvueltaencomienda();
      }
    }, (err) => { console.log("Existen COmplicaciones Intente mas tarde", err) });
  }

  listarNotificacionesReloj(estadoListar) {
    // reloj viajes y encomiendas para hoy
    this._choferservice.getMessagesMioChoferHoy(this._choferservice.getToken(), estadoListar).subscribe(response => {
      if (response.messagess[0] != undefined) {
        this.vectorViajes = response.messagess;
      }
    }, (err) => { console.log("Existen Complicaciones, intente más tarde", err) });

    // encomiendas para hoy
    this._choferservice.getReceivedMessagesEncoChoferHoy(this._choferservice.getToken(), estadoListar).subscribe(response => {
      if (response.messagess[0] != undefined) {
        this.vectorEncomiendas = response.messagess;
      }
    }, (err) => { console.log("Existen Complicaciones, intente más tarde", err) });
  }

  listarNotificacionesCalendario(estadoListar) {
    //calendario
    this._choferservice.getMessagesMioChofer(this._choferservice.getToken(), estadoListar).subscribe(response => {
      if (response.messagess[0] != undefined) {
        this.vectorViajes = response.messagess;
      }
    }, (err) => { console.log("Existen Complicaciones, intente más tarde", err) });
    //calendario
    this._choferservice.getMessagesMioEncoChofer(this._choferservice.getToken(), estadoListar).subscribe(response => {
      if (response.messagess[0] != undefined) {
        this.vectorEncomiendas = response.messagess;
      }
    }, (err) => { console.log("Existen Complicaciones, intente más tarde", err) });
  }

  darvuelta() {
    this.aux;
    this.vectorViajes.forEach(() => {
      this.c += 1;
    });
    this.medio = (this.c) / 2;
    this.up = (this.c) - 1;
    for (var i = 0; i < this.medio; i++) {
      this.aux = this.vectorViajes[i];
      this.vectorViajes[i] = this.vectorViajes[this.up];
      this.vectorViajes[this.up] = this.aux;
      this.up--;
    }
    this.c = 0;
  }

  darvueltaencomienda() {
    this.aux;
    this.vectorEncomiendas.forEach(() => {
      this.c += 1;
    });
    this.medio = (this.c) / 2;
    this.up = (this.c) - 1;
    for (var i = 0; i < this.medio; i++) {
      this.aux = this.vectorEncomiendas[i];
      this.vectorEncomiendas[i] = this.vectorEncomiendas[this.up];
      this.vectorEncomiendas[this.up] = this.aux;
      this.up--;
    }
    this.c = 0;
  }

  ordenar(vector) {
    this.cont = 0;
    vector.forEach(() => {
      this.cont += 1;
    });
    for (let k = 0; k < this.cont - 1; k++) {
      for (let f = 0; f < (this.cont - 1) - k; f++) {
        if (vector[f].fech_salida.localeCompare(vector[f + 1].fech_salida) > 0) {
          let aux;
          aux = vector[f];
          vector[f] = vector[f + 1];
          vector[f + 1] = aux;
        }
      }
    }
  }

  mostrarContenidoDinamico(tipoMostrar) {
    this.contenidoDinamico = true;
    this.checkmarkViaje = "none";
    this.checkmarkEncomienda = "none";
    this.clrBotonViaje = "appcolr";
    this.clrBotonEncomienda = "appcolr";
    this.contenidoDinamicoViaje = false;
    this.contenidoDinamicoEncomienda = false;

    if (tipoMostrar == 'campana') {
      this.titulo = "NOTIFICACIONES RECIBIDAS";
      this.btnFinalizarViaje = true;
      this.btnFinalizarEncomiendas = true;
    } else {
      if (tipoMostrar == 'calendario') {
        this.titulo = "HISTORIAL";
        this.btnFinalizarViaje = false;
        this.btnFinalizarEncomiendas = false;
      } else {
        if (tipoMostrar == 'reloj') {
          this.titulo = "PARA HOY";
          this.btnFinalizarViaje = true;
          this.btnFinalizarEncomiendas = true;
        }
      }
    }
  }

  verViajes() {
    this.objAnimacion.boton = "viaje";
    this.clrBotonViaje = "btnPresionado";
    this.clrBotonEncomienda = "appcolr";
    this.checkmarkViaje = "checkmark";
    this.checkmarkEncomienda = "none";
    this.contenidoDinamicoViaje = true;
    this.contenidoDinamicoEncomienda = false;
  }

  verEncomiendas() {
    this.objAnimacion.boton = "encomienda";
    this.clrBotonViaje = "appcolr";
    this.clrBotonEncomienda = "btnPresionado";
    this.checkmarkViaje = "none";
    this.checkmarkEncomienda = "checkmark";
    this.contenidoDinamicoViaje = false;
    this.contenidoDinamicoEncomienda = true;
  }

  irDetalles(NotificacionIndividual, tipoEnviar) {

    localStorage.setItem("opcionesAnimacion", JSON.stringify(this.objAnimacion));
    console.log('ir a detaless >>>>', JSON.stringify(this.objAnimacion));
    if (tipoEnviar == 'viaje') {
      localStorage.setItem("viaje", JSON.stringify(NotificacionIndividual));
      this.navCtrl.push(DetallesPage);
    } else {
      if (tipoEnviar == 'encomienda') {
        localStorage.setItem("encomienda", JSON.stringify(NotificacionIndividual));
        this.navCtrl.push(DetallesEncomiendaPage);
      }
    }
  }

  animacionAcciones() {
    var jsonAnimacion = JSON.parse(localStorage.getItem('opcionesAnimacion'));
    console.log('jsonViene en animaciones acciones>>> ', jsonAnimacion);

    if (jsonAnimacion != null) {
      if (jsonAnimacion.estadoListar == "0" && jsonAnimacion.tipoMostrar == "campana" && jsonAnimacion.boton == "viaje") {
        this.historial('0', 'campana');
        this.verViajes();
        localStorage.removeItem('opcionesAnimacion');
      }
      if (jsonAnimacion.estadoListar == "0" && jsonAnimacion.tipoMostrar == "campana" && jsonAnimacion.boton == "encomienda") {
        this.historial('0', 'campana');
        this.verEncomiendas();
        localStorage.removeItem('opcionesAnimacion');
      }
      if (jsonAnimacion.estadoListar == "1" && jsonAnimacion.tipoMostrar == "calendario" && jsonAnimacion.boton == "viaje") {
        this.historial('1', 'calendario');
        this.verViajes();
        localStorage.removeItem('opcionesAnimacion');
      }
      if (jsonAnimacion.estadoListar == "1" && jsonAnimacion.tipoMostrar == "calendario" && jsonAnimacion.boton == "encomienda") {
        this.historial('1', 'calendario');
        this.verEncomiendas();
        localStorage.removeItem('opcionesAnimacion');
      }
      if (jsonAnimacion.estadoListar == "0" && jsonAnimacion.tipoMostrar == "reloj" && jsonAnimacion.boton == "viaje") {
        this.historial('0', 'reloj');
        this.verViajes();
        localStorage.removeItem('opcionesAnimacion');
      }
      if (jsonAnimacion.estadoListar == "0" && jsonAnimacion.tipoMostrar == "reloj" && jsonAnimacion.boton == "encomienda") {
        this.historial('0', 'reloj');
        this.verEncomiendas();
        localStorage.removeItem('opcionesAnimacion');
      }
    } else { }
  }

  irFinalizar(NotificacionIndividual, tipoEnviar) {
    if (tipoEnviar == 'viaje') {
      localStorage.setItem("opcionesAnimacion", JSON.stringify(this.objAnimacion));
      console.log('irFInalizar ?>>>>>>>>>', JSON.stringify(this.objAnimacion));
      this._choferservice.FinalizarUpdateMessageChofer(this._choferservice.getToken(), NotificacionIndividual).subscribe(response => {
        this.navCtrl.push(PrincipalPage);
      }, (err) => { console.log("Existen Complicaciones, intente más tarde", err) });
    } else {
      if (tipoEnviar == 'encomienda') {
        this._choferservice.FinalizarUpdateMessageEncoChofer(this._choferservice.getToken(), NotificacionIndividual).subscribe(response => {
          this.navCtrl.push(PrincipalPage);
        }, (err) => { console.log("Existen Complicaciones, intente más tarde", err) });
      }
    }

  }
}