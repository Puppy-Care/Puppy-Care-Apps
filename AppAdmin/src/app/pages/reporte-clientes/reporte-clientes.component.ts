import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../../../services/excel.service';
import { UserService } from "../../../services/user.services";

@Component({
  selector: 'app-reporte-clientes',
  templateUrl: './reporte-clientes.component.html',
  styleUrls: ['./reporte-clientes.component.css']
})
export class ReporteClientesComponent implements OnInit {


  EnviarVecFin;
  messages: any;
  constructor(private _userService: UserService, private excelService: ExcelService) {

  }
  ngOnInit() {



    this._userService.getAllUsers().subscribe(
      response => {
        this.messages = response.allusers;
        console.log("*****************************************");
        console.log("ESTE ES MI VECTOR DE USUARIOS", this.messages);
        console.log("*****************************************");
      },
      error => {
        console.log(error);
      }
    );
  }

  GenerarExcel() {
    this.agregarValoresArray();
    this.excelService.exportAsExcelFile(this.EnviarVecFin, 'reporteUsuarios');
  }

  agregarValoresArray() {

    var messagesExportar = {
      Cedula: null,
      Nombres: null,
      Apellidos: null,
      Correo: null,
      Celular: null,
      Convencional: null
    };

    var sendV = [];

    for (var i in this.messages) {
      /*console.log('a... ', this.messages[i].cedula);
      console.log('b... ', this.messages[i].nombre);
      console.log('c... ', this.messages[i].apellido);
      console.log('d... ', this.messages[i].correo);
      console.log('e... ', this.messages[i].tel_celular);
      console.log('f... ', this.messages[i].tel_convencional);*/
      ///////////////////////////////////////////////////////////////////
      messagesExportar.Cedula = this.messages[i].cedula;
      messagesExportar.Nombres = this.messages[i].nombre;
      messagesExportar.Apellidos = this.messages[i].apellido;
      messagesExportar.Correo = this.messages[i].correo;
      messagesExportar.Celular = this.messages[i].tel_celular;
      messagesExportar.Convencional = this.messages[i].tel_convencional;
      sendV.push(messagesExportar);
      messagesExportar = {
        Cedula: null,
        Nombres: null,
        Apellidos: null,
        Correo: null,
        Celular: null,
        Convencional: null
      };
    }
    this.EnviarVecFin = sendV;
    console.log('nuevo vector', sendV);
  }

}
