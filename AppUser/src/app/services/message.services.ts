import { Injectable } from "@angular/core";
import {Http,Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";

import { GLOBAL } from "./global";


import {Observable} from 'rxjs/Observable';
//import { Http } from "@angular/http";


@Injectable()
export class MessageService {
    public url:String;
    constructor(private _http:Http)
    {
    this.url= GLOBAL.url;
    }
    
 addMessage(token, message):Observable<any>
 {
     let params = JSON.stringify(message);
     let headers = new HttpHeaders().
     set('Content-Type', 'application/json').set('Authorization', token);
     return  this._http.post(this.url+'message'+ params, {headers:headers});

    }

    getMessages(token)
{
    let headers = new Headers({ "Content-type": "application/json","Authorization":token });
    return this._http.get(this.url +"my-messages", { headers: headers })
      .map(res => res.json());
      

}

getMessagesEnco(token)
{
    let headers = new Headers({ "Content-type": "application/json","Authorization":token });
    return this._http.get(this.url +"my-messagesEnco", { headers: headers })
      .map(res => res.json());
      

}


getMessagesId(token, idSolicitud)
{
    let headers = new Headers({ "Content-type": "application/json","Authorization":token });
    return this._http.get(this.url +"my-messagesMio/"+idSolicitud, { headers: headers })
      .map(res => res.json());
      

}



getMessagesEncoId(token, idSolicitud)
{
    let headers = new Headers({ "Content-type": "application/json","Authorization":token });
    return this._http.get(this.url +"my-messagesEncoMio/"+idSolicitud, { headers: headers })
      .map(res => res.json());
}


updateMessageDenunciayCancelar(token, viaje)
{
    console.log(" entre al metodo de Menssage denuncia y cancelar", viaje);
    let json = JSON.stringify(viaje);
    let params = json;
    let headers = new Headers({ "Content-type": "application/json","Authorization":token });
    return this._http.put(this.url +"updateMessageDenuncia/"+viaje._id, params,{ headers: headers })
      .map(res => res.json());
}

updateMessageEncoDenunciayCancelar(token, encomeinda)
{
    let json = JSON.stringify(encomeinda);
    let params = json;
    let headers = new Headers({ "Content-type": "application/json","Authorization":token });
    return this._http.put(this.url +"updateMessageEncoDenuncia/"+encomeinda._id,params, { headers: headers })
      .map(res => res.json());
}

UpdateEstadoMessage(token, obj)
{
  obj.estado="2";
  let params = obj;
  console.log("objeto finalizado", obj._id);   
  let headers = new Headers({ "Content-type": "application/json","Authorization":token });
  return this._http.put(this.url +"updateMessageCancelacion/"+obj._id, params, { headers: headers })
    .map(res => res.json());
}
}