import { Injectable } from "@angular/core";
import { Http, Response, Headers, Jsonp } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";

import { GLOBAL } from "./global";


import { Observable } from 'rxjs/Observable';
import { APP_ID_RANDOM_PROVIDER } from "@angular/core/src/application_tokens";
//import { Http } from "@angular/http";


@Injectable()
export class NotificacionesService {
    public url: String;
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    saveSolicituViaje(token, solicitud) {
        console.log("entre a solicitud viaje");
        let params = JSON.stringify(solicitud);
        console.log("entre a solicitud viaje a  ver el json", params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
        return this._http.post(this.url + "saveSolicitudViaje", params, { headers: headers });

    }


    saveSolicituEncomienda(token, solicitud) {
        console.log("entre a solicitud viaje");
        let params = JSON.stringify(solicitud);
        console.log("entre a solicitud Encomienda a  ver el json", params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
        return this._http.post(this.url + "saveSolicitudEncomienda", params, { headers: headers });

    }


    getSolicitudesViajes(token, identity) {
        console.log("zorro choto", identity._id);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
        return this._http.get(this.url + "getSolitudesViajeMio/" + identity._id, { headers: headers })
            .map(res => res.json());


    }

    getSolicitudesEnco(token, identity) {
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
        return this._http.get(this.url + "getSolitudesEncomiendaMio/" + identity._id, { headers: headers })
            .map(res => res.json());


    }


    getSolicitudesViajesTodos(token, busqueda) {
       let params=busqueda;
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
        return this._http.post(this.url + "getSolitudesViajeTodas" ,params, { headers: headers })
            .map(res => res.json());


    }
    updateSolicitudesViajesCancelar(token, solicitudViaje)
    {
        console.log("antes de mandar la solicitud para cancelar", solicitudViaje);
        let json = JSON.stringify(solicitudViaje);
        let params = json;
        let headers = new Headers({ "Content-type": "application/json","Authorization":token });
        return this._http.put(this.url +"update-MessageCancelacion/"+solicitudViaje._id,params, { headers: headers })
          .map(res => res.json());
    }
    
    updateSolicitudesEncoCancelar(token, solicitudEncomienda)
    {
        console.log("antes de mandar la solicitud para cancelar", solicitudEncomienda);
        let json = JSON.stringify(solicitudEncomienda);
        let params = json;
        let headers = new Headers({ "Content-type": "application/json","Authorization":token });
        return this._http.put(this.url +"update-SolicitudEncoCancelacion/"+solicitudEncomienda._id,params, { headers: headers })
          .map(res => res.json());
    }

 
    
}