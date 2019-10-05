import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UserService } from "../../app/services/user.services";
import { LocaleDataIndex } from "@angular/common/src/i18n/locale_data";
import { NotificacionesService } from "../../app/services/notificaciones.services";
import { CardsolicitudEncPage } from "../../pages/cardsolicitudEnc/cardsolicitudEnc";
import { CardsolicitudPage } from "../../pages/cardsolicitud/cardsolicitud";
import { PrincipalPage } from "../principal/principal";

@Component({
  selector: "solicitudes",
  templateUrl: "solicitudes.html"
})

export class SolicitudesPage {

  public identity;
  public vectorEncomiendas;
  public vectorViajes;
  public viaje = true;
  public encomienda = false;
  public aux;
  public medio;
  public up;
  public viene;

  constructor(public navCtrl: NavController, private _userService: UserService, private _notificacionesservice: NotificacionesService) {
    // remover de las solicitudes
    localStorage.removeItem('objSolicitudViaje');
    localStorage.removeItem('objSolicitudEncomienda');
    localStorage.removeItem('busquedaaciento');
    localStorage.removeItem('getRuta');
    localStorage.removeItem('getExpress');
    localStorage.removeItem('getEnc_Ruta');
    
    this.identity = this._userService.getIdentity();
    //this.vectorViajes=JSON.parse(localStorage.getItem("vectorViajesMios"));
    // this.vectorEncomiendas=JSON.parse(localStorage.getItem("vectorEncomiendasMios"));
    this.solicitudes();

    this.viene = localStorage.getItem('viene');
    if (this.viene=='enc') {
      this.aparecerEncomienda();
    }

  }

  aparecerViaje() {
    this.solicitudes();
    // this.vectorViajes=JSON.parse(localStorage.getItem("vectorViajesMios"));
    this.viaje = true;
    this.encomienda = false;
  }

  aparecerEncomienda() {
    localStorage.removeItem('viene');
    this.solicitudes();
    //this.vectorEncomiendas=JSON.parse(localStorage.getItem("vectorEncomiendasMios"));
    this.viaje = false;
    this.encomienda = true;
  }

  solicitudes() {

    console.log("entre a silicitudes");
    this._notificacionesservice.getSolicitudesViajes(this._userService.getToken(), this._userService.getIdentity()).subscribe(response => {
      if (response.solicitudviajesmios[0] != undefined) {
        this.vectorViajes = response.solicitudviajesmios;
        this.darvuelta();
        console.log("viajes mios", this.vectorViajes);
        //localStorage.setItem("vectorViajesMios", JSON.stringify(this.vectorViajes));


      }
    }, (err) => { console.log("Existen COmplicaciones Intente mas tarde", err) }
    );




    this._notificacionesservice.getSolicitudesEnco(this._userService.getToken(), this._userService.getIdentity()).subscribe(response => {
      if (response.solicitudencomiendasmios[0] != undefined) {
        this.vectorEncomiendas = response.solicitudencomiendasmios;
        this.darvueltaencomienda();
        console.log("viajes mios  encomeindas", this.vectorEncomiendas);
        //localStorage.setItem("vectorEncomiendasMios", JSON.stringify(this.vectorEncomiendas));


      }
    }, (err) => { console.log("Existen COmplicaciones Intente mas tarde", err) }
    );

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

  irDetallesEnc(listado) {
    console.log("Listado de Encomienda..... Solicitudes recibidas", listado);

    localStorage.setItem("recibiEnc", JSON.stringify(listado));

    this.navCtrl.push(CardsolicitudEncPage);
  }

  irDetalles(listado) {
    console.log("Listado de Viaje..... Solicitudes recibidas", listado);

    localStorage.setItem("recibi", JSON.stringify(listado));

    this.navCtrl.push(CardsolicitudPage);
  }

  goBack(){
    this.navCtrl.push(PrincipalPage);
  }

}