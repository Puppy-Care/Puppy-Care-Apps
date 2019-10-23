import { Component, NgZone, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { FormControl } from "@angular/forms";
import { } from "googlemaps";
import { MapsAPILoader } from "@agm/core";
import { Solicitud } from "../../app/models/solicitud";
import { UserService } from "../../app/services/user.services";
import { PathsMaps } from "../../app/models/paths_maps";
import { PrincipalPage } from "../principal/principal";
import { NotificacionesService } from "../../app/services/notificaciones.services";

@Component({
  selector: "page-ubicacion-final",
  templateUrl: "ubicacion-final.html",
  providers: [UserService, PathsMaps, NotificacionesService]
})

export class UbicacionFinalPage {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public animation: number;
  public object: any;
  public contador: number = 0;
  public poligonoVer = false;
 
  @ViewChild("search") public searchElementRef;

  constructor(
    public navCtrl: NavController,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public alertCtrl: AlertController,
    public ruta: PathsMaps,
    private _notificacionesService: NotificacionesService,
    private _userService: UserService
  ) {
    //this.zoom = 16;

    //crear el formulario de autocompletado
    this.searchControl = new FormControl();

    // establecer la posición actual
    //this.setCurrentPosition();

    //establecer la posicion por la opcion elegida en el menu pirncipal
    this.setUbicacionPorSeleccion();
  }

  //rutas en el mapa
  public paths1: any = this.ruta.paths1;
  public paths2: any = this.ruta.paths2;
  public paths3: any = this.ruta.paths3;
  public paths4: any = this.ruta.paths4;
  public paths5: any = this.ruta.paths5;
  public paths6: any = this.ruta.paths6;
  public paths6_1: any = this.ruta.paths6_1;

  public objSolicitudViaje: any;
  public objSolicitudEncomienda: any;

  ionViewDidLoad() {
    //mensaje de inicio
    if (this.contador == 0) {
      this.contador = 1;
      this.showAlert();
    }

    //set google maps defaults
    this.zoom;
    this.latitude;
    this.longitude;
    this.animation = 1;

    //crear el formulario de autocompletado
    this.searchControl = new FormControl();

    // establecer la posición actual
    //this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let nativeHomeInputBox = document
        .getElementById("txtHome1")
        .getElementsByTagName("input")[0];
      let autocomplete = new google.maps.places.Autocomplete(
        nativeHomeInputBox,
        {
          types: ["address"]
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 16;
          console.log("Autocompletando...");
          console.log("Latitud: ", this.latitude, " Longitud:", this.longitude);
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log("Geolocalizando...");
        console.log("Latitud: ", this.latitude, " Longitud:", this.longitude);
        this.zoom = 16;
      });
    }
  }

  private setUbicacionPorSeleccion() {
    console.log('QUITO');
    
    this.latitude = -0.1806532;
    this.longitude = -78.46783820000002;
    this.zoom = 14;
  }

  markerDragEnd($event: MouseEvent) {
    this.animation = 3;
    console.log("Arrastrando...");
    this.object = $event;
    this.latitude = this.object.coords.lat;
    this.longitude = this.object.coords.lng;
    console.log("Latitud: ", this.latitude, " Longitud:", this.longitude);
  }

  mapClicked($event: MouseEvent) {
    this.animation = 3;
    console.log("Clickeando...");
    this.object = $event;
    this.latitude = this.object.coords.lat;
    this.longitude = this.object.coords.lng;
    console.log("Latitud: ", this.latitude, " Longitud:", this.longitude);
  }

  detectarUbicacionInicio() {
    try {
      this.setCurrentPosition();
      this.animation = 1;
      this.zoom = 16;
      this.ionViewDidLoad();
    } catch (error) {
      console.log(error);
    }
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: "<center><h3>Selecciona tu lugar de llegada</h3></center>",
      subTitle: "<br>Puedes elegir tu ubicación actual, ingresar una dirección o seleccionar una ubicación específica tocando el mapa o arrastrando el marcador al lugar deseado.",
      buttons: ["Entendido"]
    });
    alert.present();
  }

  showAlertConfirmado() {
    localStorage.removeItem('objSolicitudViaje');
    let alert = this.alertCtrl.create({
      title: "<center><h3>IMPORTANTE</h3></center>",
      subTitle: "PATITAS. Su petición ha sido atendida satisfactoriamente.",
      message: '<p align="justify">Esta solicitud puede ser cancelada antes de su confirmación. Para más información comunicate con nosotros.</p>',
      buttons: ["OK"],
      cssClass: 'customLoader'
    });
    alert.present();
  }

  showAlertEnviarViaje() {
    let alert = this.alertCtrl.create({
      title: '<center><h3>IMPORTANTE</h3></center>',
      subTitle: '<center>¿Desea enviar la solicitud?</center>',
      message: '<p align="justify">Para más información comunicate con nosotros.</p>',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Solicitud Cancelada');
          }
        },
        {
          text: 'OK',
          handler: data => {
            this.objSolicitudViaje = JSON.parse(localStorage.getItem("objSolicitudViaje"));
            this.objSolicitudViaje.latitud_llegada = this.latitude;
            this.objSolicitudViaje.longitud_llegada = this.longitude;

            localStorage.setItem("objSolicitudViaje", JSON.stringify(this.objSolicitudViaje));
            console.log('es mi objeto ' + JSON.stringify(this.objSolicitudViaje));
            this._notificacionesService.saveSolicituViaje(this._userService.getToken(), this.objSolicitudViaje).subscribe(
              response => {
                console.log("hola" + response);
                // this.socket.emit('create notification', { a: this.objSolicitudViaje });
                this.showAlertConfirmado();
                this.navCtrl.push(PrincipalPage);
              },
              error => {
                console.log(error);
              }
            );
            //AQUI VA EL SIGUIENTE PASO DE LOS VIAJES

          }
        }
      ],
      cssClass: 'customLoader'
    });
    alert.present();
  }

  polygonClicked($event: MouseEvent) {
    this.showAlertPoligono();
  }

  showAlertPoligono() {
    let alert = this.alertCtrl.create({
      title: "Alerta",
      subTitle: "Actualmente no se realizan viajes por esta zona",
      buttons: ["Entendido"]
    });
    alert.present();
  }
}