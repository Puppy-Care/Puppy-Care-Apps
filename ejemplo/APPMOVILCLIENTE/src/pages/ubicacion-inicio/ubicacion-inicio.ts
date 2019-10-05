import { Component, NgZone, ViewChild } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { FormControl } from "@angular/forms";
import { } from "googlemaps";
import { MapsAPILoader, LatLngLiteral } from "@agm/core";
import { Solicitud } from "../../app/models/solicitud";
import { UserService } from "../../app/services/user.services";
import { UbicacionFinalPage } from "../ubicacion-final/ubicacion-final";

import { PathsMaps } from "../../app/models/paths_maps";

@Component({
  selector: "page-ubicacion-inicio",
  templateUrl: "ubicacion-inicio.html",
  providers: [UserService, PathsMaps]
})
export class UbicacionInicioPage {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public animation: number;
  public object: any;
  public contador: number = 0;
  public poligonoVer = true;

  @ViewChild("search") public searchElementRef;

  constructor(
    public navCtrl: NavController,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public alertCtrl: AlertController,
    public ruta: PathsMaps
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
        .getElementById("txtHome")
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
        //console.log("Geolocalizando...");
        //console.log("Latitud: ", this.latitude, " Longitud:", this.longitude);
        console.log("{ lat:", this.latitude, ", lng:", this.longitude, "},");
        this.zoom = 16;
      });
    }
  }

  private setUbicacionPorSeleccion() {
    let strValor: string;
    strValor = localStorage.getItem("getRuta");

    console.log("mi localstorage get ruta es >>>> ", strValor);

    switch (strValor) {
      case '"Riobamba - Quito"':
        console.log("es la opcion Riobamba - Quito");
        this.latitude = -1.6635508;
        this.longitude = -78.65464600000001;
        this.zoom = 15;
        break; //ruta riobamba - quito
      case '"Quito - Riobamba"':
        console.log("es la opcion Quito - Riobamba");
        this.latitude = -0.1806532;
        this.longitude = -78.46783820000002;
        this.zoom = 14;
        break; //ruta quito - riobamba
      case '"Riobamba-Quito-Aeropuerto UIO"':
        console.log("es la opcion Riobamba - Quito - Aeropuerto UIO");
        this.latitude = -1.6635508;
        this.longitude = -78.65464600000001;
        this.zoom = 15;
        break; //ruta Riobamba - Quito - Aeropuerto UIO
      case '"Aeropuerto UIO-Quito-Riobamba"':
        console.log("es la opcion Aeropuerto UIO - Quito - Riobamba");
        this.latitude = -0.1239264;
        this.longitude = -78.3618196;
        this.zoom = 15;
        break; //ruta Aeropuerto UIO - Quito - Riobamba
      case '"Express"':
        this.poligonoVer = false;
        console.log("es la opcion Express");
        this.setCurrentPosition();
        this.zoom = 15;
        break; //ruta express
      default:
        console.log("no ingreso ninguna ruta");
        this.setCurrentPosition();
        this.zoom = 15; //ruta sin ingresar
    }
  }

  markerDragEnd($event: MouseEvent) {
    this.animation = 3;
    //console.log("Arrastrando...");
    this.object = $event;
    this.latitude = this.object.coords.lat;
    this.longitude = this.object.coords.lng;
    //console.log("Latitud: ", this.latitude, " Longitud:", this.longitude);
    console.log("{ lat:", this.latitude, ", lng:", this.longitude, "},");
  }

  mapClicked($event: MouseEvent) {
    this.animation = 3;
    //console.log("Clickeando...");
    this.object = $event;
    this.latitude = this.object.coords.lat;
    this.longitude = this.object.coords.lng;
    //console.log("Latitud: ", this.latitude, " Longitud:", this.longitude);
    console.log("{ lat:", this.latitude, ", lng:", this.longitude, "},");
  }

  ////////////////////////////////////////
  centrarMapa($event: LatLngLiteral) {
    this.object = $event;
    //this.latitude = this.object.lat;
    //this.longitude = this.object.lng;
    //console.log("Evento de centrarMapa: ",  this.object);
  }
  /////////////////////////////////////

  polygonClicked($event: MouseEvent) {
    this.showAlertPoligono();
    //console.log("Clickeando el poligono...");
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
      title: "<center><h3>Selecciona tu lugar de salida</h3></center>",
      subTitle:
        "<br>Puedes elegir tu ubicación actual, ingresar una dirección o seleccionar una ubicación específica tocando el mapa o arrastrando el marcador al lugar deseado.",
      buttons: ["Entendido"]
    });
    alert.present();
  }

  showAlertPoligono() {
    let alert = this.alertCtrl.create({
      title: "Alerta",
      subTitle: "Actualmente no se realizan viajes por esta zona.",
      buttons: ["Entendido"]
    });
    alert.present();
  }

  public objSolicitudViaje: any;
  public objSolicitudEncomienda: any;

  //1 viaje 2 encomienda
  irUbicacionFinal() {

    if (localStorage.getItem("getEnc_Ruta") == '"1"') {
      this.objSolicitudViaje = JSON.parse(localStorage.getItem("objSolicitudViaje"));
      this.objSolicitudViaje.latitud_salida = this.latitude;
      this.objSolicitudViaje.longitud_salida = this.longitude;

      localStorage.setItem("objSolicitudViaje", JSON.stringify(this.objSolicitudViaje));
      console.log('es mi objeto ' + JSON.stringify(this.objSolicitudViaje));
      console.log("boton final");
      this.navCtrl.push(UbicacionFinalPage);
    } else {
      if (localStorage.getItem("getEnc_Ruta") == '"2"') {
        this.objSolicitudEncomienda = JSON.parse(localStorage.getItem("objSolicitudEncomienda"));
        this.objSolicitudEncomienda.latitud_salida = this.latitude;
        this.objSolicitudEncomienda.longitud_salida = this.longitude;

        localStorage.setItem("objSolicitudEncomienda", JSON.stringify(this.objSolicitudEncomienda));
        console.log('es mi objeto ' + JSON.stringify(this.objSolicitudEncomienda));
        console.log("boton final");
        this.navCtrl.push(UbicacionFinalPage);
      }
    }
  }
}

