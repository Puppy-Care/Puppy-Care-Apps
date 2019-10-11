import { Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";

import { GLOBAL } from "./global";


import { Observable } from 'rxjs/Observable';


@Injectable()
export class CuentasService {
  public url: String;
  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }




  saveCuentas(token, cuentas) {
    let json = JSON.stringify(cuentas);
    let params = json;
    console.log(params);

    let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
    return this._http.post(this.url + "registerCuentas/", params, { headers: headers })
      .map(res => res.json());
  }



  getCuentas(token, fecha, idChofer) {
    console.log('fechaaaaaaaaaaa >>>> ', fecha);
    var fecha = fecha.split('/');
    console.log('mi diaaaaaaaaaaaaaaa >>>>', fecha[0]);
    var dia = fecha[0];
    var mes = fecha[1];
    var ano = fecha[2];
    console.log('fecha>>>>', fecha);

    let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
    return this._http.get(this.url + 'thisCuentas/' + dia + '/' + mes + '/' + ano + '/' + idChofer, { headers: headers })
      .map(res => res.json());
  }


  getCuentasAll(token, fecha) {
    console.log('fechaaaaaaaaaaa >>>> ', fecha);
    var fecha = fecha.split('/');
    console.log('mi diaaaaaaaaaaaaaaa >>>>', fecha[0]);
    var dia = fecha[0];
    var mes = fecha[1];
    var ano = fecha[2];
    console.log('fecha>>>>', fecha);

    let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
    return this._http.get(this.url + 'allcuentas/' + dia + '/' + mes + '/' + ano, { headers: headers })
      .map(res => res.json());
  }


}
