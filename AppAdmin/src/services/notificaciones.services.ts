import { Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";

import { GLOBAL } from "./global";


import { Observable } from 'rxjs/Observable';
//import { Http } from "@angular/http";


@Injectable()
export class NotificacionesService {
    public url: String;
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }




    getSolicitudViaje(token, estado) {
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
        return this._http.get(this.url + "getSolitudesViaje/" + estado, { headers: headers })
            .map(res => res.json());


    }

    

    updateSolicitudViaje(token, jViaje) {
        //cambiando estado
        jViaje.estado = "1";
        let json = JSON.stringify(jViaje);
        let params = json;
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
        return this._http.put(this.url + "update-SolicitudesViajes/" + jViaje._id, params, { headers: headers })
            .map(res => res.json());

    }



    updateConjuntoSolicitudViaje(token, objetoBusqueda) {
        //cambiando estado
        console.log("entre al update conjunto", objetoBusqueda);
        let params = objetoBusqueda;
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
        return this._http.put(this.url + "update-ConjuntosolicitudViaje", params, { headers: headers })
            .map(res => res.json());
    }


   

}