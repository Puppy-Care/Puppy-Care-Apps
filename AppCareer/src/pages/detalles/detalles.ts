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
