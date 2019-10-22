import { Component } from "@angular/core";
import { NavController, AlertController, MenuController } from "ionic-angular";
import { ChoferService } from "../../app/services/chofer.service";
import { DetallesPage } from "../detalles/detalles";

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
      this.verViajes();
      
    this.mostrarContenidoDinamico(tipoMostrar);
    }
    if (tipoMostrar == 'reloj') {
      this.objAnimacion.estadoListar = estadoListar;
      this.objAnimacion.tipoMostrar = tipoMostrar;
      console.log('reloj');
      this.listarNotificacionesReloj(estadoListar);
      this.verViajes();
      
    this.mostrarContenidoDinamico(tipoMostrar);
    }
    if (tipoMostrar == 'calendario') {
      this.objAnimacion.estadoListar = estadoListar;
      this.objAnimacion.tipoMostrar = tipoMostrar;
      console.log('calendario');
      this.listarNotificacionesCalendario(estadoListar);
      this.verViajes();
      
    this.mostrarContenidoDinamico(tipoMostrar);
    }
  }

  listarNotificacionesCampana(estadoListar) {
    //campana viajes
    this._choferservice.getMessagesMioChofer(this._choferservice.getToken(), estadoListar).subscribe(response => {
      if (response.messagess[0] != undefined) {
        this.vectorViajes = response.messagess;
        this.darvuelta();
      }
    }, (err) => { console.log("Existen Complicaciones, intente más tarde", err) });
  }

  listarNotificacionesReloj(estadoListar) {
    // reloj viajes y encomiendas para hoy
    this._choferservice.getMessagesMioChoferHoy(this._choferservice.getToken(), estadoListar).subscribe(response => {
      if (response.messagess[0] != undefined) {
        this.vectorViajes = response.messagess;
        this.darvuelta();
      }
    }, (err) => { console.log("Existen Complicaciones, intente más tarde", err) });

   
  }

  listarNotificacionesCalendario(estadoListar) {
    //calendario
    this._choferservice.getMessagesMioChofer(this._choferservice.getToken(), estadoListar).subscribe(response => {
      if (response.messagess[0] != undefined) {
        this.vectorViajes = response.messagess;
        this.darvuelta();
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
      this.verViajes();
    } else {
      if (tipoMostrar == 'calendario') {
        this.titulo = "HISTORIAL";
        this.btnFinalizarViaje = false;
        this.btnFinalizarEncomiendas = false;
        this.verViajes();
      } else {
        if (tipoMostrar == 'reloj') {
          this.titulo = "PARA HOY";
          this.btnFinalizarViaje = true;
          this.btnFinalizarEncomiendas = true;
          this.verViajes();
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


  irDetalles(NotificacionIndividual, tipoEnviar) {

    localStorage.setItem("opcionesAnimacion", JSON.stringify(this.objAnimacion));
    console.log('ir a detaless >>>>', JSON.stringify(this.objAnimacion));
    if (tipoEnviar == 'viaje') {
      localStorage.setItem("viaje", JSON.stringify(NotificacionIndividual));
      this.navCtrl.push(DetallesPage);
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
     
      if (jsonAnimacion.estadoListar == "1" && jsonAnimacion.tipoMostrar == "calendario" && jsonAnimacion.boton == "viaje") {
        this.historial('1', 'calendario');
        this.verViajes();
        localStorage.removeItem('opcionesAnimacion');
      }
      
      if (jsonAnimacion.estadoListar == "0" && jsonAnimacion.tipoMostrar == "reloj" && jsonAnimacion.boton == "viaje") {
        this.historial('0', 'reloj');
        this.verViajes();
        localStorage.removeItem('opcionesAnimacion');
      }
      
    }
  }

  irFinalizar(NotificacionIndividual, tipoEnviar) {
    if (tipoEnviar == 'viaje') {
      localStorage.setItem("opcionesAnimacion", JSON.stringify(this.objAnimacion));
      console.log('irFInalizar ?>>>>>>>>>', JSON.stringify(this.objAnimacion));
      this._choferservice.FinalizarUpdateMessageChofer(this._choferservice.getToken(), NotificacionIndividual).subscribe(response => {
        this.navCtrl.push(PrincipalPage);
      }, (err) => { console.log("Existen Complicaciones, intente más tarde", err) });   
    }
  }
}