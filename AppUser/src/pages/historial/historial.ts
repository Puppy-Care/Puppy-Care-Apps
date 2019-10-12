import { Component } from "@angular/core";

import { NavController } from "ionic-angular";
//import { DetallesPage } from "../detalles/detalles"; crear una pagina detalle
import { UserService } from "../../app/services/user.services";
import { LocaleDataIndex } from "@angular/common/src/i18n/locale_data";
import { MessageService } from "../../app/services/message.services";
import { ConfirmacionPage } from "../../pages/confirmacion/confirmacion";
import { PrincipalPage } from "../principal/principal";

@Component({
  selector: "historial",
  templateUrl: "historial.html"
})


export class HistorialPage {

  public identity;
  public vectorEncomiendas;
  public vectorViajes;
  public viaje = true;
  public encomienda = false;

  public aux;
  public medio;
  public up;

  constructor(public navCtrl: NavController, private _userService: UserService, private _messageservice: MessageService) {
    // remover de las solicitudes
    localStorage.removeItem('objSolicitudViaje');
    
    this.identity = this._userService.getIdentity();
    //this.vectorViajes = JSON.parse(localStorage.getItem("vectorViajes"));
    //this.vectorEncomiendas = JSON.parse(localStorage.getItem("vectorEncomiendas"));
    this.historial();
    console.log(this.vectorViajes);
  }

  aparecerViaje() {

    console.log('es mi metodo aparecerviaje');
    this.historial();
    this.viaje = true;
    this.encomienda = false;
  }

  historial() {
    this.vectorViajes = null;
    // trae todos los viajes
    this._messageservice.getMessages(this._userService.getToken()).subscribe(response => {

      if (response.messagess[0] != undefined) {
        this.vectorViajes = response.messagess;
        console.log('mi vector de viajes antes de dar la vuelta', this.vectorViajes);
        this.darvuelta();
        console.log('mi vector de viajes DESPUES de dar la vuelta', this.vectorViajes);
        //localStorage.setItem("vectorViajes", JSON.stringify(this.vectorViajes));
      }
    }, (err) => { console.log("Existen COmplicaciones Intente mas tarde", err) });
  }

  public c = 0;

  darvuelta() {
    //this.vectorViajes=JSON.parse(localStorage.getItem("vectorViajes"));
    this.aux;
    this.vectorViajes.forEach(() => {
      this.c += 1;
    });


    this.medio = (this.c) / 2;
    this.up = (this.c) - 1;
    /*By Jhonatan Choto*/
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
    /*By Jhonatan Choto*/
    for (var i = 0; i < this.medio; i++) {
      this.aux = this.vectorEncomiendas[i];
      this.vectorEncomiendas[i] = this.vectorEncomiendas[this.up];
      this.vectorEncomiendas[this.up] = this.aux;
      this.up--;
    }
    this.c = 0;
  }


  irDetalles(listado) {
    console.log('Este es mi listado ejejjeje >>>', listado._id);
    this._messageservice.getMessagesId(this._userService.getToken(), listado._id).subscribe(response => {

      console.log("loq ue vien por el socket mi pecs", response.messagess);
      localStorage.setItem("confirmacion1", JSON.stringify(response.messagess));

      localStorage.setItem('Dirige', '1');
     this.navCtrl.push(ConfirmacionPage);

    }, (err) => { console.log("Existen COmplicaciones Intente mas tarde", err) });
  }

  goBack(){
    this.navCtrl.push(PrincipalPage);
  }

}