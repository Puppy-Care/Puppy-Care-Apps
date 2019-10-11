import { Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { GLOBAL } from "./global";

@Injectable()
export class ChoferService {
  public url: String;
  public identity;
  public token;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
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
      .post(this.url + "loginChofer", params, { headers: headers })
      .map(res => res.json());
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem("identityC"));
    if (identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem("TokenC");
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  logout() {
    localStorage.removeItem("identityC");
    localStorage.removeItem("TokenC");
    localStorage.removeItem("posicion");
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }


  getMessagesMioChofer(token, estadoListar) {
    console.log("estado del listar antes de mandar", estadoListar);
    console.log("Entre mensajes mio chiofer");
    let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
    return this._http.get(this.url + "getReceivedMessagesChofer/" + estadoListar, { headers: headers })
      .map(res => res.json());
  }
  
  

  getMessagesMioChoferHoy(token, estadoListar) {
    console.log("estado del listar antes de mandar", estadoListar);
    console.log("Entre mensajes mio chiofer");
    let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
    return this._http.get(this.url + "getReceivedMessagesChoferHoy/" + estadoListar, { headers: headers })
      .map(res => res.json());

  }


 


  FinalizarUpdateMessageChofer(token, objFinalizado)
  {
    objFinalizado.estado="1";
    let params = objFinalizado;
    console.log("objeto finalizado", objFinalizado._id);   
    let headers = new Headers({ "Content-type": "application/json","Authorization":token });
    return this._http.put(this.url +"updateMessageChofer/"+objFinalizado._id, params, { headers: headers })
      .map(res => res.json());
  }


  
  


}