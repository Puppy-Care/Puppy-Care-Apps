import { Injectable } from "@angular/core";
//import {Http,Response, Headers } from '@angular/http';
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";

import { GLOBAL } from "./global";


import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {
  public url: String;
  public identity;
  public token;


  //variables globales para la longitud y la latitud


  constructor(private _http: Http) {
    this.url = GLOBAL.url;

  }

  

  singup(secretaria_to_login, getHash) {
    if (getHash) {
      console.log("aqui va el hash", getHash);
      secretaria_to_login.getHash = getHash;
      console.log(secretaria_to_login.getHash);
    }
    let json = JSON.stringify(secretaria_to_login);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json" });
    return this._http
      .post(this.url + "loginSecre", params, { headers: headers })
      .map(res => res.json());
  }

  buscarChoferes(buscar) {
    console.log("dentro de buscar chofer" + buscar);
    let json = JSON.stringify(buscar);
    let params = json;
    //console.log(params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http.get(this.url + "choferes/" + buscar, { headers: headers })
      .map(res => res.json());

  }


  buscarSecretarias(buscar) {
    let json = JSON.stringify(buscar);
    let params = json;
    //console.log(params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http.get(this.url + "secretarias/" + buscar, { headers: headers })
      .map(res => res.json());

  }


  buscarTaxis(buscar) {
    let json = JSON.stringify(buscar);
    let params = json;
    //console.log(params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http.get(this.url + "taxis/" + buscar, { headers: headers })
      .map(res => res.json());

  }



  registerSecretaria(user_to_register) {
    let json = JSON.stringify(user_to_register);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http
      .post(this.url + "registerSecre", params, { headers: headers })
      .map(res => res.json());
  }



  registerChofer(chofer_to_register) {
    let json = JSON.stringify(chofer_to_register);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http
      .post(this.url + "registerChofer", params, { headers: headers })
      .map(res => res.json());
  }

  registerTaxi(taxi_to_register) {
    let json = JSON.stringify(taxi_to_register);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http
      .post(this.url + "registerTaxi", params, { headers: headers })
      .map(res => res.json());
  }



  update_secretarias(secretaria_to_update, estadoContrasena) {
    secretaria_to_update.estadoContrasena = estadoContrasena;
    console.log("clave usuario anes de mndar",secretaria_to_update.estadoContrasena);
    let json = JSON.stringify(secretaria_to_update);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http
      .put(this.url + "update-secretaria/" + secretaria_to_update._id, params, { headers: headers })
      .map(res => res.json());
  }

  update_Choferes(chofer_to_update, estadoContrasena) {
    chofer_to_update.estadoContrasena = estadoContrasena;
    let json = JSON.stringify(chofer_to_update);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http
      .put(this.url + 'update-chofer/' + chofer_to_update._id , params, { headers: headers })
      .map(res => res.json());
  }

  update_Taxis(taxis_to_update) {
    let json = JSON.stringify(taxis_to_update);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http
      .put(this.url + "update-taxi/" + taxis_to_update._id, params, { headers: headers })
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
    localStorage.clear();
    this.identity = null;
    this.token = null;
    location.reload(true);
  }

  getAllUsers()
  {
   
    
    //console.log(params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http.get(this.url + "allusers/" , { headers: headers })
      .map(res => res.json());
  }

}