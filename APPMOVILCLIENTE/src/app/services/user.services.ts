import { Injectable } from "@angular/core";
//import {Http,Response, Headers } from '@angular/http';
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { GLOBAL } from "./global";
import { Geolocation } from "@ionic-native/geolocation";
import { Solicitud } from "../models/solicitud";
import { Socket } from "ng-socket-io";

@Injectable()
export class UserService {
  public url: String;
  public identity;
  public token;
  public _solicitud: Solicitud; //variable de tipo solicitud para guardar las coordenadas
  public cont;
  //variables globales para la longitud y la latitud
  longitudUS: number;
  latitudUS: number;

  constructor(private _http: Http, private geolocation: Geolocation,private socket: Socket ) {
    this.url = GLOBAL.url;
    this._solicitud = new Solicitud("", "");
  }

  singup(user_to_login, getHash) {
    if (getHash) {
      console.log("aqui va el hash");
      user_to_login.getHash = getHash;
      console.log(user_to_login.getHash);
    }
    let json = JSON.stringify(user_to_login);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json" });
    return this._http
      .post(this.url + "login", params, { headers: headers })
      .map(res => res.json());
  }

  register(user_to_register) {
    let json = JSON.stringify(user_to_register);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json" });
    return this._http
      .post(this.url + "register", params, { headers: headers })
      .map(res => res.json());
  }

  update_user(user_to_update, estadoContrasena) {
    console.log("estadoCOntrasena", estadoContrasena);
    user_to_update.estadoContrasena=estadoContrasena;
    let json = JSON.stringify(user_to_update);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http
      .put(this.url + "update-user/" + user_to_update._id, params, { headers: headers })
      .map(res => res.json());
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem("identity"));
    if (identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    
    let token = localStorage.getItem("Token");
    console.log("este es el falso token"+token);
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  logout() {
    localStorage.removeItem("identity");
    localStorage.removeItem("Token");
    localStorage.removeItem("posicion");
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }

  //NUEVO SERVICIO PARA LA UBICACION
  iniciarGeolocalizacion() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        console.log(resp.coords);
        ////////////////////////////////
        this.latitudUS = resp.coords.latitude;
        this.longitudUS = resp.coords.longitude;
        var posicion = { latitud: this.latitudUS, longitud: this.longitudUS };
        localStorage.setItem("posicion", JSON.stringify(posicion));
        ///////////////////////////////
        this._solicitud.latitud = resp.coords.latitude.toString();
        this._solicitud.longitud = resp.coords.longitude.toString();
        this._solicitud.verDatos();
        console.log("tefo dice que mandas en la solicitud" + this._solicitud);
        /*this.registerSolicitud(this._solicitud).subscribe(
          response => {
            console.log("Que procede:", response);
          },
          err => {
            var errorMessage = <any>err;
            if (!errorMessage) {
              console.log(errorMessage);
            }
          }
        );

        /*let watch = this.geolocation.watchPosition();
        watch.subscribe(data => {
          console.log("Watch: ", data.coords);
          ////////////////////////////////
          this.latitudUS = resp.coords.latitude;
          this.longitudUS = resp.coords.longitude;
          ///////////////////////////////
          this._solicitud.latitud = data.coords.latitude.toString();
          this._solicitud.longitud = data.coords.longitude.toString();
          this._solicitud.verDatos();
          console.log("tefo dice que mandas en la solicitud" + this._solicitud);
          this.registerSolicitud(this._solicitud).subscribe(
            response => {
              console.log("Que procede:", response);
            },
            err => {
              var errorMessage = <any>err;
              if (!errorMessage) {
                console.log(errorMessage);
              }
            }
          );
        });*/
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }

  //REGISTRO DE LA UBICACION
  registerSolicitud(solicitud_to_register) {
    let json = JSON.stringify(solicitud_to_register);
    let params = json;
    console.log("JSON DEL WATCH: ", params);
    let headers = new Headers({ "Content-type": "application/json" });
    return this._http
      .post(this.url + "guardar", params, { headers: headers })
      .map(res => res.json());
  }

  public getMessagesss = () => { 
    localStorage.setItem("cont","1");
    return Observable.create((observer) => {
        console.log('estoy dentro del servicio, dentro del return');
        this.socket.on('cliente', (message) => {
          
          console.log("dentro del observer"+this.cont);
          if(localStorage.getItem("cont")=="1"){
            
            observer.next(message);
            }
        });
    });

    
  }


}
