import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrincipalPage } from '../principal/principal';
import { ChoferService } from "../../app/services/chofer.service";
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-detalles-encomienda',
  templateUrl: 'detalles-encomienda.html',
})
export class DetallesEncomiendaPage {

  public encomiendaDetalle;
  public latitud_salida;
  public longitud_salida;
  public latitud_llegada;
  public longitud_llegada;
  public animacion;
  public btnEnviar;

  constructor(public navCtrl: NavController,  private callNumber: CallNumber, public navParams: NavParams,private _choferservice: ChoferService) {
    this.encomiendaDetalle = JSON.parse(localStorage.getItem("encomienda"));
    this.latitud_salida = Number(this.encomiendaDetalle.latitud_salida);
    this.longitud_salida = Number(this.encomiendaDetalle.longitud_salida);
    this.latitud_llegada = Number(this.encomiendaDetalle.latitud_llegada);
    this.longitud_llegada = Number(this.encomiendaDetalle.longitud_llegada);
    console.log('mi LocalStorage de encomienda en detalles>>> ', this.encomiendaDetalle);
    this.animacion = JSON.parse(localStorage.getItem("opcionesAnimacion"));
    console.log('ANIMACION >>',this.animacion);

    if (this.animacion.tipoMostrar == "calendario") {
      this.btnEnviar = false;
    }else{
      this.btnEnviar = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallesEncomiendaPage');
  }

  envioNotificacion() {
    console.log('estoy en el botón envioNotificacion');
    this.navCtrl.push(PrincipalPage);
  }

  
  terminarEnvio() {

    this._choferservice.FinalizarUpdateMessageEncoChofer(this._choferservice.getToken(),  this.encomiendaDetalle).subscribe(response => {
    }, (err) => { console.log("Existen Complicaciones, intente más tarde", err) });
  
    location.reload();  
  this.navCtrl.push(PrincipalPage);
}

llama(telefonoLlamar) {
  console.log('este es mi telefono a llamar >>>', telefonoLlamar)
  this.callNumber.callNumber(telefonoLlamar, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
}

}
