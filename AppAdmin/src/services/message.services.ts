import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";

import { GLOBAL } from "./global";


import { Observable } from 'rxjs/Observable';



@Injectable()
export class MessageService {
    public url: String;
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    addMessage(token, param): Observable<any> {

        let params = JSON.stringify(param);
        console.log("params" + params);
        //console.log("params"+params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });

        return this._http.post(this.url + 'message', params, { headers: headers }).map(res => res.json());

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
  
    
   UpdateEstadoMessageRevisado(token, obj)
   {
     obj.estado="4";
     let params = obj;
     console.log("objeto finalizado", obj._id);   
     let headers = new Headers({ "Content-type": "application/json","Authorization":token });
     return this._http.put(this.url +"updateMessageCancelacion/"+obj._id, params, { headers: headers })
       .map(res => res.json());
   }
  

    addMessageEnco(token, param): Observable<any> {
        let params = JSON.stringify(param);
        console.log("params" + params);
        //console.log("params"+params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });

        return this._http.post(this.url + 'messageEnco', params, { headers: headers }).map(res => res.json());

    }

    UpdateEstadoMessageEnco(token, obj)
    {
      obj.estado="2";
      let params = obj;
      console.log("objeto finalizado", obj._id);   
      let headers = new Headers({ "Content-type": "application/json","Authorization":token });
      return this._http.put(this.url +"updateMessageEncoCancelacion/"+obj._id, params, { headers: headers })
        .map(res => res.json());
    }
  

    getMessagesCancelados(token)
    {
        let headers = new Headers({ "Content-type": "application/json","Authorization":token });
        return this._http.get(this.url +"messagesCancelados", { headers: headers })
          .map(res => res.json());
          
    
    }

    getReceivedMessagesListadoSecretaria(token, fecha) {
        let dia = this.concatenacion(JSON.stringify(fecha.date.day));
        let mes = this.concatenacion(JSON.stringify(fecha.date.month));
        let ano = this.concatenacion(JSON.stringify(fecha.date.year));
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });

        return this._http.get(this.url + 'getReceivedMessagesListadoSecretaria/' + dia + '/' + mes + '/' + ano, { headers: headers }).map(res => res.json());
    }

    getReceivedMessagesEncoListadoSecretaria(token, fecha) {
        console.log('estoy en getReceivedMessagesEncoListadoSecretaria');
        console.log("FECAHHHHHHHHHHHHHHHHHHHHHHHHHHH" + JSON.stringify(fecha));


        let dia = this.concatenacion(JSON.stringify(fecha.date.day));
        let mes = this.concatenacion(JSON.stringify(fecha.date.month));
        let ano = this.concatenacion(JSON.stringify(fecha.date.year));
        console.log(dia, mes, ano);

        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });

        return this._http.get(this.url + 'getReceivedMessagesEncoListadoSecretaria/' + dia + '/' + mes + '/' + ano, { headers: headers }).map(res => res.json());
    }

    concatenacion(entrada){
        var concatenado;
        console.log('variable de entrada >> ', entrada);
        if(entrada >= 1 && entrada <=9){
            concatenado = '0'+entrada;
        }
        else{
            concatenado = entrada;
        }
        console.log('valor concatenado >>', concatenado);
        return concatenado;
    }

}

