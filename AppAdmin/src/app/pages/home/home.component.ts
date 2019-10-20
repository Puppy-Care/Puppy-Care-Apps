import { Component, OnInit } from "@angular/core";
import { GLOBAL } from "../../../services/global";
import { UserService } from "../../../services/user.services";
import { NotificacionesService } from "../../../services/notificaciones.services";
import { MessageService } from '../../../services/message.services';

import { Secretaria } from "../../../models/secretaria";
import { Chofer } from "../../../models/chofer";

//import { Socket } from "ng-socket-io";

//import * as $ from 'jquery';
//import { renderComponent } from "@angular/core/src/render3";
//import {Popup} from "ng2-opd-popup";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {


  public notViaje;
  public notEnc;

  public url;
  public url2;
  public buscar;
  public listadoChoferes;
  public listadoSecretarias;

  public listados;
  public listadoC = true;
  public listadoS = true;
 
  public datosChoferes;
  public datosSecretarias;


  ctitle = 'app';
  public IngreseUsuario = false;
  public ReporteClientes = false;
  public ModificarUsuario = false;
  public IngreseChofer = false;
  public ModificarChofer = false;

  public ReporteUno = false;
  public ReporteDos = false;
  public ReporteTres = false;
  public primera = "Home";
  public segunda = "";
  public secretaria_register: Secretaria;
  public chofer_register: Chofer;
  
  public loading = false;
  public imagen = true;
  public textBox = true;
  public txtHide = true;
  public txtAparece = true;
  public verViajesTotales = false;
  

  public detalleSolicitudViaje = false;


  /* VALIDACION DE LOS CAMPOS DE LOS FORMULARIOS */
  // public cedulaVal = false;
  public vContrasenaSecre: String;
  public vContrasenaChofer: String;

  //reportes de los viajes realizados 
  public viajesRealizados = false;
  public viajesRealizadosDetalles = false;


  //////////////////
  public textBoxContra = true;
  public textBoxContraC = true;


  public tipoUsuario = 'password';
  public tipoUsuarioM = 'password';
  public tipoUsuarioC = 'password';
  public tipoChofer = 'password';

  public clase_ojoUsuario = 'fa fa-eye fa-lg';
  public clase_ojoUsuarioM = 'fa fa-eye fa-lg';
  public clase_ojoUsuarioC = 'fa fa-eye fa-lg';
  public clase_ojoChofer = 'fa fa-eye fa-lg';

  public estadoClaveChofer;
  public estadoClaveUsuario;
  public contrasenaNew;
  public contrasenaNewUser;

  /////////////////////////////////************************  notificaciones  ********************************** */
  public notificationBeta;
  public contador: any = 0;
  public smsLlenos;
  messages = [];    //variable que almacena las notificaciones que llegan
  messagesViajeLLeno = [];    //variable que almacena las notificaciones que llegan

  
  myObject;
  myObject1;
  prueba;

  public cont = 0;

  public mensajeerrormodals;
  public mensajecorrectomodals;
  public hola1 = true;
  constructor(private _userService: UserService, private _messageService: MessageService, private _notificacionesService: NotificacionesService) {

    this.mensajeerrormodals = "hola";

    this.secretaria_register = new Secretaria("", "", "", "", "", "", "", "", "");
    this.chofer_register = new Chofer("", "", "", "", "", "", "", "", "", "", "");
    
    this.url = GLOBAL.url;
    this.contador = 1;
 

    this.estadoClaveChofer = "0";
    this.estadoClaveUsuario = "0";

  

      this._notificacionesService.getSolicitudViaje(this._userService.getToken(), "0").subscribe(
        response => {
          this.messages = response.solicitudviajes;
          console.log("*****************************************");
          console.log("ESTE ES MI VECTOR DE MENSAJES DEL IF", this.messages);
          console.log("*****************************************");
          this.apareceNotificacionViaje();
        },
        error => {
          console.log(error);
        }
      );
    }
   
  

  hola() //  esta funcion  debe cargar el json  con todos los datos del usuario y enviarlos por la notificacion
  {
    console.log("entre  a la funcioin hola");
    let message = { text: "jola  juuapo danni", receiver: "5b4639dfa2c64a651860dcd8" };

    this._messageService.addMessage(this._userService.getToken(), message).subscribe(
      response => {
        console.log("hola" + response.message);

      },
      error => {
        console.log(error);
      }
    )


    //console.log("hola tefo");


  }

  //animacion del ojo de la contrasenia
  myFunctionUsuario() {
    if (this.tipoUsuario === 'text') {
      this.tipoUsuario = 'password';
      this.clase_ojoUsuario = 'fa fa-eye fa-lg';
    } else {
      this.tipoUsuario = 'text';
      this.clase_ojoUsuario = 'fa fa-eye-slash fa-lg';
    }
  }
  habilitarContrasenaU() {

    if (this.tipoUsuarioM === 'text') {
      this.tipoUsuarioM = 'password';
      this.clase_ojoUsuarioM = 'fa fa-eye fa-lg';
      this.textBoxContra = true;
      this.estadoClaveUsuario = '0';
    } else {
      this.tipoUsuarioM = 'text';
      this.clase_ojoUsuarioM = 'fa fa-eye-slash fa-lg';
      this.textBoxContra = false;
      this.estadoClaveUsuario = '1';
    }
    console.log('estadoClaveContrasenaUsuario......', this.estadoClaveUsuario);
  }
  habilitarContrasenaC() {

    if (this.tipoUsuarioC === 'text') {
      this.tipoUsuarioC = 'password';
      this.clase_ojoUsuarioC = 'fa fa-eye fa-lg';
      this.textBoxContraC = true;
      this.estadoClaveChofer = '0';
    } else {
      this.tipoUsuarioC = 'text';
      this.clase_ojoUsuarioC = 'fa fa-eye-slash fa-lg';
      this.textBoxContraC = false;
      this.estadoClaveChofer = '1';
    }
    console.log('estadoClaveContrasenaChofer......', this.estadoClaveChofer);
  }
  myFunctionChofer() {
    if (this.tipoChofer === 'text') {
      this.tipoChofer = 'password';
      this.clase_ojoChofer = 'fa fa-eye fa-lg';
    } else {
      this.tipoChofer = 'text';
      this.clase_ojoChofer = 'fa fa-eye-slash fa-lg';
    }
  }



  public ngOnInit() {

    this.estadoClaveChofer = '0';
    console.log('estadoClaveChofer/////', this.estadoClaveChofer);
    this.estadoClaveUsuario = "0";
    console.log('estadoClaveUsuario/////', this.estadoClaveUsuario);
    this.url2 = '../assets/img/IngresarChofer.png';
  
  }


  habilitar() {
    this.textBox = !this.textBox;
    this.txtHide = true;
    this.txtAparece = false;
  }

  deshabilitar() {
    this.textBox = !this.textBox;
    this.txtHide = !this.txtHide;
    this.txtAparece = !this.txtAparece;
  }



  apareceIngreseUsuario() {

    this.ReporteClientes = false;
    this.listadoC = false;
    this.listadoS = false;
   
    this.primera = "Usuario";
    this.segunda = "Nuevo";
   
    this.IngreseUsuario = true;
    this.ModificarUsuario = false;
    this.IngreseChofer = false;
    this.ModificarChofer = false;
    this.ReporteTres = false;
    this.ReporteDos = false;
    this.ReporteUno = false;
    this.imagen = false;
    this.detalleSolicitudViaje = false;
    
    this.verViajesTotales = false;

    this.viajesRealizados = false;
    this.viajesRealizadosDetalles = false;
   
  }

  apareceIngresarChofer() {

    this.ReporteClientes = false;
    this.listadoC = false;
    this.listadoS = false;
   
   
    this.IngreseUsuario = false;
    this.ModificarUsuario = false;
    this.IngreseChofer = true;
    this.ModificarChofer = false;
    this.ReporteTres = false;
    this.ReporteDos = false;
    this.ReporteUno = false;
    this.primera = "Paseador";
    this.segunda = "Nuevo";
    this.imagen = false;
    this.detalleSolicitudViaje = false;
   
    this.verViajesTotales = false;

    this.viajesRealizados = false;
    this.viajesRealizadosDetalles = false;
    
    this.url2 = '../assets/img/IngresarChofer.png';
  }

  aparecerReporteClientes() {
    this.ReporteClientes = true;
    this.listadoC = false;
    this.listadoS = false;
 
   
    this.ModificarChofer = false;
    this.IngreseUsuario = false;
    this.ModificarUsuario = false;
    this.IngreseChofer = false;
    this.ReporteTres = false;
    this.ReporteDos = false;
    this.ReporteUno = false;
    this.primera = "Cliente";
    this.segunda = "Listar clientes";
    this.imagen = false;
    this.detalleSolicitudViaje = false;
   
    this.verViajesTotales = false;

    this.viajesRealizados = false;
    this.viajesRealizadosDetalles = false;
  
    this.url2 = "../assets/img/IngresarAuto.png";
  }

  

  aparecerReporteUno() {

    this.ReporteClientes = false;
    this.listadoC = false;
    this.listadoS = false;
    
    //reporte de viajes pendientes
    this.ReporteTres = false;
    this.ReporteDos = false;
    this.ReporteUno = true;
    this.IngreseUsuario = false;
    this.ModificarUsuario = false;
    this.IngreseChofer = false;
    this.ModificarChofer = false;
    this.primera = "Reporte";
    this.segunda = "Viajes Pendientes";
    this.imagen = false;
    this.detalleSolicitudViaje = false;
    this.verViajesTotales = false;
    
    this.viajesRealizados = false;
    this.viajesRealizadosDetalles = false;
   
  }

  aparecerReporteDos() {

    this.ReporteClientes = false;
    this.listadoC = false;
    this.listadoS = false;
  
    // reporte de viajes en curso
    this.ReporteTres = false;
    this.ReporteDos = true;
    this.ReporteUno = false;

    this.IngreseUsuario = false;
    this.ModificarUsuario = false;
    this.IngreseChofer = false;
    this.ModificarChofer = false;
    this.primera = "Reporte";
    this.segunda = "Viajes En Curso";
    this.imagen = false;
    this.detalleSolicitudViaje = false;
   
    this.verViajesTotales = false;
  
    this.viajesRealizados = false;
    this.viajesRealizadosDetalles = false;

  }

  aparecerReporteTres() {

    this.ReporteClientes = false;
    this.listadoC = false;
    this.listadoS = false;

    this.ReporteTres = true;
    this.ReporteDos = false;
    this.ReporteUno = false;
    
    this.IngreseUsuario = false;
    this.ModificarUsuario = false;
    this.IngreseChofer = false;
    this.ModificarChofer = false;
    this.primera = "Reporte";
    this.segunda = "Viajes Exitosos";
    this.imagen = false;
    this.detalleSolicitudViaje = false;
    
    this.verViajesTotales = false;
    
    this.viajesRealizados = false;
    this.viajesRealizadosDetalles = false;

  }

  apareceDetalleViaje() {

    this.ReporteClientes = false;
    this.listadoC = false;
    this.listadoS = false;
  
    this.ReporteTres = false;
    this.ReporteDos = false;
    this.ReporteUno = false;
    
    this.IngreseUsuario = false;
    this.ModificarUsuario = false;
    this.IngreseChofer = false;
    this.ModificarChofer = false;
    this.primera = "Alerta";
    this.segunda = "Viajes";
    this.imagen = false;
    this.detalleSolicitudViaje = true;
  
    this.verViajesTotales = false;
   
    this.viajesRealizados = false;
    this.viajesRealizadosDetalles = false;
  
  }
 

  //metodo para aparecer todas las notificaciones de los viajes
  apareceNotificacionViaje() {

    this.ReporteClientes = false;
    console.log('aparecenotificaionViaje');
    //this.organizarViajes();
    this.listadoC = false;
    this.listadoS = false;

   
    this.IngreseUsuario = false;
    this.ModificarUsuario = false;
    this.verViajesTotales = true;
  
    this.IngreseChofer = false;
    this.ModificarChofer = false;
    this.ReporteTres = false;
    this.ReporteDos = false;
    this.ReporteUno = false;
    this.primera = "Viajes";
    this.segunda = "Totales";
    this.imagen = false;
    this.detalleSolicitudViaje = false;
   
    this.viajesRealizados = false;
    this.viajesRealizadosDetalles = false;

    this.url2 = '../assets/img/IngresarChofer.png';
  }
  //metodo para aparecer todas las notificaciones de las encomiendas 
  

  busquedaChofer() {
    this.loading = true;
    this._userService.buscarChoferes(this.buscar).subscribe(
      response => {
        //console.log("satisfactoriamente");

        this.listadoChoferes = response.choferes;
        if (this.listadoChoferes == "") {
          this.listadoC = false;
        } else {
          this.listadoC = true;
        }
        // console.log(this.listadoChoferes);
        this.loading = false;
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          console.log(errorMessage);
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }
          // this.loading =false;
        }
        // this.loading =false;
      }

    );
  }

  busquedaSecretarias() {
    this.loading = true;
    this._userService.buscarSecretarias(this.buscar).subscribe(
      response => {
        //console.log("satisfactoriamente");
        // console.log(response);
        console.log('secretarias antes  OBJETO>>>>>', response);
        this.listadoSecretarias = response.secretarias;
        console.log('secretarias despues ARRAY >>>>>', this.listadoSecretarias);
        if (this.listadoSecretarias == "") {
          this.listadoS = false;
        } else {
          this.listadoS = true;
        }
        //console.log(this.listadoSecretarias);
        this.loading = false;
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          console.log(errorMessage);
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }
          // this.loading =false;
        }
        // this.loading =false;
      }

    );
  }

  

  busqueda() {

    this.ReporteClientes = false;
    this.ReporteTres = false;
    this.ReporteDos = false;
    this.ReporteUno = false;
    
    this.IngreseUsuario = false;
    this.ModificarUsuario = false;
    this.IngreseChofer = false;
    this.ModificarChofer = false;
    this.primera = "Busqueda";
    this.segunda = "Listado";
    this.imagen = false;
    this.listados = true;
    this.detalleSolicitudViaje = false;
   
    this.verViajesTotales = false;
   
    this.viajesRealizados = false;
    this.viajesRealizadosDetalles = false;

    this.busquedaChofer();
    this.busquedaSecretarias();
  
  }




  mostrarDatosSecretarias(datosSecretarias) {

    this.ReporteClientes = false;
    this.contrasenaNewUser = "";
    this.primera = "Usuario";
    this.segunda = "Modificar";
   
    this.IngreseUsuario = false;
    this.verViajesTotales = false;
    
    this.IngreseChofer = false;
    this.ModificarChofer = false;
    this.ReporteTres = false;
    this.ReporteDos = false;
    this.ReporteUno = false;
    this.imagen = false;
    this.detalleSolicitudViaje = false;
  
    this.textBox = true;
    this.txtHide = false;
    this.txtAparece = true;
    this.ModificarUsuario = true;
    this.listados = false;
    this.viajesRealizados = false;
    this.viajesRealizadosDetalles = false;

    this.datosSecretarias = datosSecretarias;
    console.log("hola tefo2" + this.datosSecretarias.nombre);
  }


  mostrarDatosChofer(datosChoferes) {

    this.ReporteClientes = false;
    this.textBox = true;
    this.txtHide = false;
    this.txtAparece = true;
    this.ModificarChofer = true;
    this.listados = false;
    this.datosChoferes = datosChoferes;

    this.verViajesTotales = false;
    
    this.IngreseUsuario = false;
    this.ModificarUsuario = false;
    this.IngreseChofer = false;
    this.ReporteTres = false;
    this.ReporteDos = false;
    this.ReporteUno = false;
    this.primera = "Chofer";
    this.segunda = "Modificar";
    this.imagen = false;
    this.detalleSolicitudViaje = false;
  
    this.viajesRealizados = false;
    this.viajesRealizadosDetalles = false;
  


    if (this.datosChoferes.image == undefined) {
      this.url2 = '../assets/img/IngresarChofer.png';

    } else {
      this.url2 = this.url + 'get-image-chofer/' + this.datosChoferes.image;
      console.log("este es la iamgen" + this.datosChoferes.image);
    }

  }



  onRegisterSecretaria() {
    this.loading = true;
    this.secretaria_register.estado = '0';
    this._userService.registerSecretaria(this.secretaria_register).subscribe(
      response => {
        this.mensajecorrectomodals = "Los datos de la secretaria se han guardado satisfactoriamente.";
        console.log("satisfactoriamente");
        this.loading = false;
        document.getElementById("openModalCorrecto").click();
        this.limpiar(1);
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          this.mensajeerrormodals = JSON.parse(errorMessage._body).message;
          document.getElementById("openModalError").click();
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }
          this.loading = false;
        }
      }
    );
  }

  onRegisterChofer() {
    this.loading = true;
    this.chofer_register.estado = '0';
    this._userService.registerChofer(this.chofer_register).subscribe(
      response => {
        this.loading = false;
        if (!this.filesToUpload) {
        } else {
          console.log("nombre de archivo" + this.filesToUpload[0].name);
          this.makeFileRequest(this.url + 'upload-image-chofer/' + response.chofer._id, [], this.filesToUpload).then(

            (result: any) => {
              this.chofer_register.image = result.image;
            }
          );
        }
        this.mensajecorrectomodals = "Los datos del chofer se han guardado satisfactoriamente.";
        document.getElementById("openModalCorrecto").click();
        this.limpiar(2);
      },
      err => {
        let errorMessage = <any>err;
        if (errorMessage) {
          this.mensajeerrormodals = JSON.parse(errorMessage._body).message;
          document.getElementById("openModalError").click();
          console.log("error de existencia" + errorMessage);
          try {
            let body = JSON.parse(err._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }
          this.loading = false;
          //console.log(errorMessage);
        }
      }
    );
  }



  onUpdateSecretarias(estado) {
    console.log('mi contra con ******>>>>', this.contrasenaNewUser);
    this.datosSecretarias.estado = estado;
    this.loading = true;

    if (this.contrasenaNewUser != null || this.contrasenaNewUser != '') {
      this.estadoClaveUsuario = '1';
      console.log('estadoclaveusuario si es diferente null ""', this.estadoClaveUsuario);
    }

    if (this.contrasenaNewUser == null || this.contrasenaNewUser == '') {
      this.estadoClaveUsuario = '0';
      console.log('estadoclaveusuario 0000000 ""', this.estadoClaveUsuario);
    }

    if (this.estadoClaveUsuario == '1') {
      console.log('Estado clave usuario vane', this.contrasenaNewUser);
      this.datosSecretarias.contrasena = this.contrasenaNewUser;
    }

    this._userService.update_secretarias(this.datosSecretarias, this.estadoClaveUsuario).subscribe(
      response => {
        this.mensajecorrectomodals = "Los Secretaria se ha eliminado correctamente"; // esto puso el tefo chumadod
        console.log("satisfactoriamenteUpdate");
        this.loading = false;

        if (estado == '0') {
          this.mensajecorrectomodals = "Los datos del secretario/a se han modificado satisfactoriamente.";
          document.getElementById("openModalCorrecto").click();
        } else {
          this.mensajecorrectomodals = "La cuenta del secretario/a ha sido eliminada.";
          document.getElementById("openModalCorrecto").click();
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          console.log(errorMessage);
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }

          // this.loading =false;
        }
      }
    );
  }


  onUpdateChoferes(estado) {
    this.datosChoferes.estado = estado;
    this.loading = true;
    console.log('me esta viniendo esto .....', this.datosChoferes);

    if (this.contrasenaNew != null || this.contrasenaNew != '') {
      this.estadoClaveChofer = '1';
      console.log('estadoclaveusuario si es diferente null ""', this.estadoClaveChofer);
    }

    if (this.contrasenaNew == null || this.contrasenaNew == '') {
      this.estadoClaveChofer = '0';
      console.log('estadoclaveusuario 0000000 ""', this.estadoClaveChofer);
    }

    if (this.estadoClaveChofer == '1') {
      this.datosChoferes.contrasena = this.contrasenaNew;
    }

    this._userService.update_Choferes(this.datosChoferes, this.estadoClaveChofer).subscribe(
      response => {
        console.log("satisfactoriamenteUpdate");
        this.loading = false;
        if (!this.filesToUpload) {
        } else {
          console.log("id del chofer a actualizar" + this.datosChoferes._id);
          this.makeFileRequest(this.url + 'upload-image-chofer/' + this.datosChoferes._id, [], this.filesToUpload).then(

            (result: any) => {
              this.chofer_register.image = result.image;//  aqui s epone en caso que se trabaje con identyti

            }
          );
        }
        if (estado == '0') {
          this.mensajecorrectomodals = "Los datos del Chofer se han modificado satisfactoriamente.";
          document.getElementById("openModalCorrecto").click();
        } else {
          this.mensajecorrectomodals = "La cuenta del Chofer ha sido eliminada.";
          document.getElementById("openModalCorrectoEliminar").click();
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          console.log(errorMessage);

          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";

            this.loading = false;
            document.getElementById("openModalError").click();
          }

          // this.loading =false;
        }
      }
    );
  }



  limpiar(valor) {
    if (valor == '1') {
      this.hola1 = true;
      this.secretaria_register = new Secretaria("", "", "", "", "", "", "", "", "");
    }
    if (valor == '2') {
      this.chofer_register = new Chofer("", "", "", "", "", "", "", "", "", "", "");
      this.url2 = "../assets/img/IngresarChofer.png";
    }

  
  }

  logout() {
    this._userService.logout();
  }

  public filesToUpload: Array<File>;

  readUrl(event: any) {

    this.filesToUpload = <Array<File>>event.target.files;

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url2 = event.target.result;
       
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }


  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    // var token = this.tpken;
    return new Promise(function (resolve, reject) {
      var fromData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for (var i = 0; i < files.length; i++) {
        fromData.append('image', files[i], files[i].name)
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST', url, true);
      // xhr.setRequestHeader('Authorization', token);
      xhr.send(fromData);
    });
  }

  mostrarNotificacion(NotificacionIndividual) {


    localStorage.setItem("notIndiv", JSON.stringify(NotificacionIndividual));
    console.log('ID DE MI NOTIFICACION INDIVIDUAL>>>>>', NotificacionIndividual);
    var tipo = NotificacionIndividual.tipo;

    console.log("Esto es la notificacion Individual INDIVIDUAL", NotificacionIndividual);

    if (tipo == "Viaje") {
      //json a guardar de viaje
      var jViaje = {
     
        j_tipo: NotificacionIndividual.tipo,
        j_id: NotificacionIndividual.user,
        j_estado: NotificacionIndividual.estado,
        j_raza: NotificacionIndividual.raza,
        j_num_edad: NotificacionIndividual.num_edad,
        j_fechaSalida: NotificacionIndividual.fechaSalida,
        j_informacion: NotificacionIndividual.informacion,
        j_horarioR: NotificacionIndividual.horarioR,
        j_horarioE: NotificacionIndividual.horarioE,
        j_latitud_salida: NotificacionIndividual.latitud_salida,
        j_longitud_salida: NotificacionIndividual.longitud_salida,
        j_latitud_llegada: NotificacionIndividual.latitud_llegada,
        j_longitud_llegada: NotificacionIndividual.longitud_llegada,
        //nuevos asientos
     
        //nuevos asientos
        j_cedula: NotificacionIndividual.user.cedula,
        j_nombre: NotificacionIndividual.user.nombre,
        j_apellido: NotificacionIndividual.user.apellido,
        j_correo: NotificacionIndividual.user.correo,
        j_celular: NotificacionIndividual.user.tel_celular,
        j_convencional: NotificacionIndividual.user.tel_convencional
      };
      localStorage.setItem("viaje", JSON.stringify(jViaje));
      console.log('********* mi localsoteage viaje>>>>> ', jViaje);
      this.apareceDetalleViaje();
    
    }
  }



  obtenerSolicitudesViajes() {

    this._notificacionesService.getSolicitudViaje(this._userService.getToken(), "0").subscribe(
      response => {
        console.log("hola" + response.solicitudviajes);
        this.messages = response.solicitudviajes;

        console.log("*****************************************");
        console.log(" ----- ESTE ES MI VECTOR DE MENSAJES DESDE LA DATABASE", this.messages);
        console.log("*****************************************");
        this.ordenar(this.messages);
        console.log("*****************************************");
        console.log(" ----- ESTE ES MI VECTOR DE MENSAJES LLAMADO A ORDENAR", this.messages);
        console.log("*****************************************");

        let ct = 0;

        this.messages.forEach(() => {
          ct = ct + 1;
          console.log('estoy en el sensual foreach');
        });
        console.log('valor de mi contador >>> ', ct);
        this.notViaje = ct;


      },
      error => {
        console.log(error);
      }
    );
    // aqui se obtiene las  solicitudes de Encomeidnas
  }




  aceptarBoton(notIndividual) {
    var jIndividual = JSON.stringify(notIndividual);
    console.log("BOTON ACEPTAR", jIndividual);

    this._notificacionesService.updateConjuntoSolicitudViaje(this._userService.getToken(), jIndividual).subscribe(
      response => {
        console.log("veamo si llega viaje lleno update", response.solicitudviaje);
      },
      error => {
        console.log(error);
      }
    );

    console.log("este es el id en primera instancia", notIndividual);
    

  }










  cancelarBoton() {
    console.log("BOTON CANCELAR");
  }


  ordenar(vector1) {

    let vector = vector1;

    console.log('<<<<<< MI VECTOR ANTES DE LA ORDENADA >>>>>>', vector);
    this.cont = 0;
    vector.forEach(() => {
      this.cont += 1;
    });
    console.log(this.cont);
    for (let k = 0; k < this.cont - 1; k++) {
      //console.log('mi FOR', vector[k]);
      for (let f = 0; f < (this.cont - 1) - k; f++) {
        // console.log('mi FOR', vector[f]);
        if (vector[f].fechaSalida.localeCompare(vector[f + 1].fechaSalida) > 0) {
          let aux;
          aux = vector[f];
          vector[f] = vector[f + 1];
          vector[f + 1] = aux;
        }
      }
    }
    console.log("<<<<<< MI VECTOR DESPUES DE LA ORDENADA >>>>>>", vector);
    this.messages = vector;
  }



  aparecerViajesRealizados() {

    this.ReporteClientes = false;
    this.viajesRealizados = true;
    this.viajesRealizadosDetalles = false;
    
    this.listadoC = false;
    this.listadoS = false;
   
    this.ReporteTres = false;
    this.ReporteDos = false;
    this.ReporteUno = false;
  
    this.IngreseUsuario = false;
    this.ModificarUsuario = false;
    this.IngreseChofer = false;
    this.ModificarChofer = false;
    this.primera = "Reporte";
    this.segunda = "Viajes Realizados";
    this.imagen = false;
    this.detalleSolicitudViaje = false;
    this.verViajesTotales = false;
   
  }
  aparecerViajesRealizadosDetalles() {

    this.ReporteClientes = false;
    this.viajesRealizados = false;
    this.viajesRealizadosDetalles = true;
   
    this.listadoC = false;
    this.listadoS = false;

    this.ReporteTres = false;
    this.ReporteDos = false;
    this.ReporteUno = false;
   
    this.IngreseUsuario = false;
    this.ModificarUsuario = false;
    this.IngreseChofer = false;
    this.ModificarChofer = false;
    this.primera = "Viajes Realizados";
    this.segunda = "Detalles";
    this.imagen = false;
    this.detalleSolicitudViaje = false;
    this.verViajesTotales = false;
   
  }
  aparecerEncomiendasRealizadas() {

    this.ReporteClientes = false;
    this.viajesRealizados = false;
    this.viajesRealizadosDetalles = false;
    
    this.listadoC = false;
    this.listadoS = false;

    this.ReporteTres = false;
    this.ReporteDos = false;
    this.ReporteUno = false;
   
    this.IngreseUsuario = false;
    this.ModificarUsuario = false;
    this.IngreseChofer = false;
    this.ModificarChofer = false;
    this.primera = "Consulta";
    this.segunda = "Pagos Por días";
    this.imagen = false;
    this.detalleSolicitudViaje = false;
    this.verViajesTotales = false;
 
  }

  recargar() {
    location.reload(true);
  }

}

