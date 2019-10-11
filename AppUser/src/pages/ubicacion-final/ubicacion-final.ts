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
  public poligonoVer = true;

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
    console.log('es una prueba borra');
    let strValor: string;
    strValor = localStorage.getItem("getRuta");

    switch (strValor) {
      case '"Riobamba - Quito"':
        console.log("es la opcion 1");
        this.latitude = -0.1806532;
        this.longitude = -78.46783820000002;
        this.zoom = 14;
        break; //ruta riobamba - quito
      case '"Quito - Riobamba"':
        console.log("es la opcion 2");
        this.latitude = -1.6635508;
        this.longitude = -78.65464600000001;
        this.zoom = 15;
        break; //ruta quito - riobamba
      case '"Riobamba-Quito-Aeropuerto UIO"':
        console.log("es la opcion 3");
        this.latitude = -0.1239264;
        this.longitude = -78.3618196;
        this.zoom = 15;
        break; //ruta riobamba - aeropuerto GYQ
      case '"Aeropuerto UIO-Quito-Riobamba"':
        console.log("es la opcion 4");
        this.latitude = -1.6635508;
        this.longitude = -78.65464600000001;
        this.zoom = 15;
        break; //ruta aeropuerto GYQ - riobamba
      case '"Express"':
        this.poligonoVer = false;
        console.log("es la opcion 5");
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

  reservar() {
    let strExpress: string;
    strExpress = localStorage.getItem("getExpress");

    let strValorRuta: string;
    strValorRuta = localStorage.getItem("getEnc_Ruta");

    console.log("VARIABLE DE VER QUE ES >>>>>>>" + strExpress);
    console.log("VARIABLE DE VER QUE ES RUTA >>>>>>>" + strValorRuta);
    //1 VIAJES SE VA A RESERVAR ASIENTOS - 2 ENCOMIENDAS
    if (strExpress == '"Express"') {
      this.showAlertEnviarViaje();
    } else {
      if (strValorRuta == '"1"') {
        this.objSolicitudViaje = JSON.parse(localStorage.getItem("objSolicitudViaje"));
        this.objSolicitudViaje.latitud_llegada = this.latitude;
        this.objSolicitudViaje.longitud_llegada = this.longitude;

        localStorage.setItem("objSolicitudViaje", JSON.stringify(this.objSolicitudViaje));
        console.log('es mi objeto ' + JSON.stringify(this.objSolicitudViaje));
        this.Asiento();
        // this.navCtrl.push(UserAsientos);
        console.log("Boton de Reservar");
      } else {
        if (strValorRuta == '"2"') {
          this.showAlertEnviarEncomienda();
        }
      }
    }
  }

  showAlertConfirmado() {
    localStorage.removeItem('objSolicitudViaje');
    localStorage.removeItem('objSolicitudEncomienda');
    localStorage.removeItem('busquedaaciento');
    localStorage.removeItem('getRuta');
    localStorage.removeItem('getExpress');
    localStorage.removeItem('getEnc_Ruta');
    let alert = this.alertCtrl.create({
      title: "<center><h3>IMPORTANTE</h3></center>",
      subTitle: "Montecarlo Trans Vip. Su petición ha sido atendida satisfactoriamente.",
      message: '<p align="justify">Esta solicitud puede ser cancelada antes de su confirmación. Para más información comunicate con nosotros.</p>',
      buttons: ["OK"],
      cssClass: 'customLoader'
    });
    alert.present();
  }

  Asiento() {
    let alert = this.alertCtrl.create({
      title: "<center>RECUERDA</center><br>",
      subTitle: "<table>" +
        "<tr><td>" +
        "<img src='assets/imgs/Asiento1.png'/>" +
        "</td><td>" +
        "<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Asiento Disponible</p>" +
        "</td></tr><tr><td>" +
        "<img src='assets/imgs/AsientoAct1.png'/>" +
        "</td><td>" +
        "<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Asiento Elegido</p>" +
        "</td></tr><tr><td>" +
        "<img src='assets/imgs/AsientoOc1.png'/>" +
        "</td><td>" +
        "<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Asiento Ocupado</p>" +
        "</td></tr></table>",
      buttons: ["OK"]
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

  showAlertEnviarEncomienda() {
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
            this.objSolicitudEncomienda = JSON.parse(localStorage.getItem("objSolicitudEncomienda"));
            this.objSolicitudEncomienda.latitud_llegada = this.latitude;
            this.objSolicitudEncomienda.longitud_llegada = this.longitude;
            // this.objSolicitudEncomienda.socketId = this.socket.ioSocket.id;

            localStorage.setItem("objSolicitudEncomienda", JSON.stringify(this.objSolicitudEncomienda));
            console.log('es mi objeto ' + JSON.stringify(this.objSolicitudEncomienda));
            // aqui guardo en la base     
            this._notificacionesService.saveSolicituEncomienda(this._userService.getToken(), this.objSolicitudEncomienda).subscribe(
              response => {
                console.log("hola" + response);
                // this.socket.emit('create notification', { a: this.objSolicitudEncomienda });
                this.showAlertConfirmado();
                this.navCtrl.push(PrincipalPage);
              },
              error => {
                console.log(error);
              }
            );
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

  // showAlertEnviarPedido() {
  //   let alert = this.alertCtrl.create({
  //     title: '<center><h3>IMPORTANTE</h3></center>',
  //     subTitle: 'Solicitud aceptada',
  //     message: '<p>Para más información comunicate con nosotros.</p>',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Solicitud Cancelada');
  //         }
  //       },
  //       {
  //         text: 'OK',
  //         handler: data => {
  //           //Aqui va el envio del pedido confirmado al socketc
  //           this.showAlertConfirmado();
  //           this.navCtrl.push(PrincipalPage);
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }
}