import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrincipalPage } from '../principal/principal';
import { ChoferService } from "../../app/services/chofer.service";
import { CallNumber } from '@ionic-native/call-number';
@Component({
  selector: 'page-detalles',
  templateUrl: 'detalles.html',
})
export class DetallesPage {

  public viajeDetalle;
  public latitud_salida;
  public longitud_salida;
  public latitud_llegada;
  public longitud_llegada;
  public animacion;
  public btnEnviar;
  public p1;
  public p2;
  public p3;
  public p4;
  public a1 = true;
  public a2 = true;
  public a3 = true;
  public a4 = true;
  public express;
  
  constructor(public navCtrl: NavController, private callNumber: CallNumber, public navParams: NavParams, private _choferservice: ChoferService) {
    this.viajeDetalle = JSON.parse(localStorage.getItem("viaje"));
    this.animacion = JSON.parse(localStorage.getItem("opcionesAnimacion"));
    console.log('ANIMACION >>',this.animacion);

    if (this.animacion.tipoMostrar == "calendario") {
      this.btnEnviar = false;
    }else{
      this.btnEnviar = true;
    }

    this.latitud_salida = Number(this.viajeDetalle.latitud_salida);
    this.longitud_salida = Number(this.viajeDetalle.longitud_salida);
    this.latitud_llegada = Number(this.viajeDetalle.latitud_llegada);
    this.longitud_llegada = Number(this.viajeDetalle.longitud_llegada);
    console.log('mi LocalStorage de viaje en detalles >>> ', this.viajeDetalle);

    if(this.viajeDetalle.p1 == '12'){
      this.p1='Seleccionado';
    }else{
      this.p1='Libre';
    }

    if(this.viajeDetalle.p2 == '21'){
      this.p2='Seleccionado';
    }else{
      this.p2='Libre';
    }

    if(this.viajeDetalle.p3 == '22'){
      this.p3='Seleccionado';
    }else{
      this.p3='Libre';
    }

    if(this.viajeDetalle.p4 == '23'){
      this.p4='Seleccionado';
    }else{
      this.p4='Libre';
    }

    if(this.viajeDetalle.p1 != '12' && this.viajeDetalle.p2 != '21' && this.viajeDetalle.p3 != '22' && this.viajeDetalle.p4 != '23'){
      this.express = '- Viaje Express ';
      this.a1 =false;
      this.a2 =false;
      this.a3 =false;
      this.a4 =false;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallesPage');
  }

  envioNotificacion() {
    console.log('estoy en el botón envioNotificacion');
    this.navCtrl.push(PrincipalPage);
  }

  terminarEnvio() {

    this._choferservice.FinalizarUpdateMessageChofer(this._choferservice.getToken(), this.viajeDetalle).subscribe(response => {
    }, (err) => { console.log("Existen Complicaciones, intente más tarde", err) });


    this.navCtrl.push(PrincipalPage);
  }

  llama(telefonoLlamar) {
    console.log('este es mi telefono a llamar >>>', telefonoLlamar)
    this.callNumber.callNumber(telefonoLlamar, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

}
