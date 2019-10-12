import { Component, OnInit, DoCheck } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { MessageService } from '../../../services/message.services';
import { UserService } from '../../../services/user.services';
//import { CuentasService } from '../../../services/cuentas.services';


@Component({
  selector: 'app-viajes-realizados',
  templateUrl: './viajes-realizados.component.html',
  styleUrls: ['./viajes-realizados.component.css']
})
export class ViajesRealizadosComponent implements OnInit, DoCheck {

  public mensajeerrormodals1 = 'Debe llenar todos los datos antes de continuar';


  public _idConductor;// variable para comparar con el listado de choferes
  public listadoChoferes;// variables para listar en conbo box chofer
  messages = [];    //variable que almacena los viajes realizados
  messagesE = [];    //variable que almacena los viajes realizados
  public _fecha;//fecha a comparar
  public totalRecChofer; //almacena el valor total recaudado por el chofer en esa fecha
  public totalCarrChofer; //almacena el total de carreras por el chofer en esa fecha
  public totalCarrEncoChofer; //almacena el total de encomiendas por el chofer en esa fecha
  public nombreChoferMostr; //almacena el nombre del chofer
  public mensajeError = true; //almacena el nombre del chofer
  public peaje = 0; //peaje
  public gasolina = 0; //gasolina
  public lunch = 0; //lunch
  public varios = 0;
  public totalPagar = 0; //lunch
  totalPagarST: number;
  public lstViajes = false;
  public lstEncomiendas = false;

  public fechaEntrante;
  public verListadoFecha = false;
  public viajesRealizadosDetalles = false;
  public encomiendasRealizadasDetalles = false;
  public cabecera = true;


  public displayMont = new Date().getMonth();
  public displayDay = new Date().getDate();
  public displayYear = new Date().getFullYear();

  //Datapicker
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    dayLabels: { su: "Do", mo: "Lu", tu: "Ma", we: "Mi", th: "Ju", fr: "Vi", sa: "Sa" },
    monthLabels: { 1: "Ene", 2: "Feb", 3: "Mar", 4: "Abr", 5: "May", 6: "Jun", 7: "Jul", 8: "Ago", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dic" },
    todayBtnTxt: "Hoy",
    firstDayOfWeek: "mo",
    sunHighlight: false,
    markCurrentDay: true,
    minYear: this.displayYear - 1,
    height: '40px',
    width: '105%'
    //disableUntil: { year: this.displayYear, month: this.displayMont + 1, day: this.displayDay - 1 }
  };

  // Initialized to specific date (09.10.2018). Datpicker
  public mes = this.displayMont + 1;
  //esta es mi fecha
  public fecha_salida;
  //public fecha_salida: any = { date: { year: this.displayYear, month: this.displayMont + 1, day: this.displayDay }, formatted: this.displayDay + "/" + this.mes + "/" + this.displayYear };

  constructor( private _userService: UserService, private _messageService: MessageService) {

    this.cabecera = true;
    this.verListadoFecha = false;
    this.viajesRealizadosDetalles = false;
    this.encomiendasRealizadasDetalles = false;
    this.busquedaChofer(); // cargar datos del chofer
  }

  ngOnInit() {
  }

  ngDoCheck() {
    // console.log('estoy en el ngdocheck');
    this.totalPagarST = this.totalRecChofer - this.peaje - this.gasolina - this.lunch - this.varios;
    this.totalPagar = Math.round(this.totalPagarST * 100) / 100;
  }


  verFechaViajes() {

    this.cargarValores();

    this.gasolina = 0;
    this.lunch = 0;
    this.varios = 0;
    this.peaje = 0;
    this.cargarValores();

    if (this.fecha_salida != null && this.fecha_salida != "" && this._idConductor != null && this._idConductor != "") {

      //this.verListadoFecha = true;
      this.cabecera = true;
      this.viajesRealizadosDetalles = false;
      this.encomiendasRealizadasDetalles = false;
      //console.log('Fecha capturada Seleccionada >>>>>> ', this.fecha_salida);
      this._messageService.getReceivedMessagesListadoSecretaria(this._userService.getToken(), this.fecha_salida).subscribe(
        response => {
          this.messages = response.messagess;
          // console.log('estos son mis viajes que estan realizados en una fecha sin filtrar por chofer>>>', this.messages);
          this.verFechaEncomiendas();
          this.calcularTotalViajes();
        },
        error => {
          //console.log(error);
        }
      );
    } else {
      document.getElementById("openModalError").click();
      //alert("Debe llenar todos los campos antes de continuar");
    }
  }


  cargarValores() {
    //alert('cargar Valores');
    this._cuentaService.getCuentas(this._userService.getToken(), this.fecha_salida.formatted, this._idConductor).subscribe(
      response => {
        // this.messagesE = response.messagess;
        console.log('de regreso con los datos para las secres', response.cuentas);
        this.peaje = response.cuentas.peaje;
        this.gasolina = response.cuentas.gasolina;
        this.lunch = response.cuentas.lunch;
        this.varios = response.cuentas.varios;
      },
      error => {
        console.log(error);
      }
    );
  }

  verFechaEncomiendas() {
    console.log('entre a las encomiendas');
    //console.log('fecha capturada Seleccionada', this.fecha_salida);
    this._messageService.getReceivedMessagesEncoListadoSecretaria(this._userService.getToken(), this.fecha_salida).subscribe(
      response => {
        this.messagesE = response.messagess;
        //console.log('NUEVAS ENCOMIENDAS >>>>>>>', this.messagesE);
      },
      error => {
        //console.log(error);
      }
    );
  }


  mostrarNotificacion(listado) {
    this.gasolina = 0;
    this.lunch = 0;
    this.varios = 0;
    this.peaje = 0;
    this.viajesRealizadosDetalles = true;
    this.encomiendasRealizadasDetalles = false;
    this.verListadoFecha = false;
    this.mensajeError = false;
    this.cabecera = true;
    localStorage.setItem('notificacionViajeRealizado', JSON.stringify(listado));
    //console.log('mostrarNotificacion  :::::::::::::', JSON.stringify(listado));
  }

  mostrarNotificacionEncomienda(listado) {
    this.gasolina = 0;
    this.lunch = 0;
    this.varios = 0;
    this.peaje = 0;
    this.viajesRealizadosDetalles = false;
    this.encomiendasRealizadasDetalles = true;
    this.verListadoFecha = false;
    this.mensajeError = false;
    this.cabecera = true;
    localStorage.setItem('notificacionViajeRealizado', JSON.stringify(listado));
    console.log('mostrarNotificacionEncomienda  :::::::::::::', JSON.stringify(listado));
  }

  busquedaChofer() {

    this._userService.buscarChoferes("0").subscribe(
      response => {
        //console.log("satisfactoriamente");

        this.listadoChoferes = response.choferes;
        var myjson = JSON.stringify(this.listadoChoferes);
        //console.log("satisfactoriamente" + myjson);

      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          //console.log(errorMessage);
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";

            document.getElementById("openModalError").click();
          }
          // this.loading =false;
        }
      }

    );
  }

  mostrarDatosConductor(datosConductor) {
    this.gasolina = 0;
    this.lunch = 0;
    this.varios = 0;
    this.peaje = 0;
    this.cargarValores();

    this._idConductor = datosConductor;
    if (this._idConductor != null && this._idConductor != "") {

      this.actualizarVectorEncomiendasClickChofer();
      this.actualizarVectorViajesClickChofer();
      this._idConductor = datosConductor;
      //console.log('DATOS DEL CONDUCTOR INDIVIDUAL >>>> ', this._idConductor);
    }
  }

  calcularTotalViajes() {

    var idChofer = this._idConductor;
    var viajesRealizadosSF = this.messages;
    var encomiendasRealizadasSF = this.messagesE;
    //console.log('estoy en calcular total viaje y estos son mis datos de ENTRADA >>> ', idChofer, ' >>> ', viajesRealizadosSF);

    var ct = 0;
    var ct1 = 0;
    var total = 0;
    var banderaViajes = false;
    var banderaEncomiendas = false;
    var banderaViajes1 = false;
    var banderaEncomiendas1 = false;
    var nombreChofer;
    console.log('MI VECTOR DE VIAJES ******-------', viajesRealizadosSF);
    for (var i in viajesRealizadosSF) {
      if (viajesRealizadosSF[i]['tipoPago'] == "Online") {
        banderaViajes = true;
      }
      // console.log('estoy en mi tipopagp', viajesRealizadosSF[i]['tipoPago']);
      if (idChofer == viajesRealizadosSF[i]['_id_chofer']['_id'] && viajesRealizadosSF[i]['tipoPago'] == "Efectivo") {
        nombreChofer = viajesRealizadosSF[i]['_id_chofer']['nombre'] + ' ' + viajesRealizadosSF[i]['_id_chofer']['apellido'];
        banderaViajes1 = true;
        ct++;
        console.log('contador', ct);
        total = total + Number(viajesRealizadosSF[i]['precio']);
      }
    }
    console.log('MI VECTOR DE ENCOMIENDAS ******-------', encomiendasRealizadasSF);
    for (var i in encomiendasRealizadasSF) {
      if (encomiendasRealizadasSF[i]['tipoPago'] == "Online") {
        banderaEncomiendas = true;
      }
      //console.log('estoy en mi idchofer', encomiendasRealizadasSF[i]['_id_chofer']['_id']);
      if (idChofer == encomiendasRealizadasSF[i]['_id_chofer']['_id'] && encomiendasRealizadasSF[i]['tipoPago'] == "Efectivo") {
        nombreChofer = encomiendasRealizadasSF[i]['_id_chofer']['nombre'] + ' ' + encomiendasRealizadasSF[i]['_id_chofer']['apellido'];
        banderaEncomiendas1 = true;
        ct1++;
        console.log('contador enco', ct1);
        total = total + Number(encomiendasRealizadasSF[i]['precio']);
      }
    }

    if (ct != 0 || ct1 != 0) {
      this.verListadoFecha = true;
      this.mensajeError = false;
      if (ct != 0 || banderaViajes == true || banderaViajes1 == true) { this.lstViajes = true; } else { this.lstViajes = false; }
      if (ct1 != 0 || banderaEncomiendas == true || banderaEncomiendas1 == true) { this.lstEncomiendas = true; } else { this.lstEncomiendas = false; }
    } else {
      this.verListadoFecha = false;
      this.mensajeError = true;
    }

    console.log('total', total);
    this.totalRecChofer = Math.round(total * 100) / 100;
    this.totalCarrChofer = ct;
    this.totalCarrEncoChofer = ct1;
    this.nombreChoferMostr = nombreChofer;
  }


  onDateChanged(datosFecha) {

    this.gasolina = 0;
    this.lunch = 0;
    this.varios = 0;
    this.peaje = 0;

    this.cargarValores();

    if (datosFecha != null && datosFecha != "") {

      this.fecha_salida = datosFecha;
      this.actualizarVectorEncomiendasClickFecha();
      this.actualizarVectorViajesClickFecha();
      let dia = this.concatenacion(datosFecha.date.day);
      let mes = this.concatenacion(datosFecha.date.month);
      let ano = datosFecha.date.year;
      let concatenacionFecha = dia + '/' + mes + '/' + ano;
      this._fecha = concatenacionFecha;
      //console.log('estoy en mi ondatechange sin el cerito ', this._fecha);
    }
  }

  concatenacion(entrada) {
    var concatenado;
    //console.log('variable de entrada >> ', entrada);
    if (entrada >= 1 && entrada <= 9) {
      concatenado = '0' + entrada;
    }
    else {
      concatenado = entrada;
    }
    //console.log('valor concatenado >>', concatenado);
    return concatenado;
  }

  actualizarVectorEncomiendasClickFecha() {
    if (this.fecha_salida != null && this.fecha_salida != "" && this._idConductor != null && this._idConductor != "") {
      //this.verListadoFecha = true;
      this.cabecera = true;
      this.viajesRealizadosDetalles = false;
      this.encomiendasRealizadasDetalles = false;
      //console.log('Fecha capturada Seleccionada >>>>>> ', this.fecha_salida);
      ////////////////////////////////
      console.log('entre a las encomiendas');
      //console.log('fecha capturada Seleccionada', this.fecha_salida);
      this._messageService.getReceivedMessagesEncoListadoSecretaria(this._userService.getToken(), this.fecha_salida).subscribe(
        response => {
          this.messagesE = response.messagess;
          console.log('NUEVAS ENCOMIENDAS >>>>>>>', this.messagesE);
          this.calcularTotalViajes();
        },
        error => {
          //console.log(error);
        }
      );
      ////////////////////////////////
    } else {
      //alert("Debe llenar todos los datos antes de continuar");
    }
  }

  actualizarVectorViajesClickFecha() {
    if (this.fecha_salida != null && this.fecha_salida != "" && this._idConductor != null && this._idConductor != "") {
      //this.verListadoFecha = true;
      this.cabecera = true;
      this.viajesRealizadosDetalles = false;
      this.encomiendasRealizadasDetalles = false;
      //console.log('Fecha capturada Seleccionada >>>>>> ', this.fecha_salida);
      this._messageService.getReceivedMessagesListadoSecretaria(this._userService.getToken(), this.fecha_salida).subscribe(
        response => {
          this.messages = response.messagess;
          // console.log('estos son mis viajes que estan realizados en una fecha sin filtrar por chofer>>>', this.messages);
          this.calcularTotalViajes();
        },
        error => {
          //console.log(error);
        }
      );
    } else {
      //alert("Debe llenar todos los datos antes de continuar");
    }
  }

  actualizarVectorViajesClickChofer() {
    if (this.fecha_salida != null && this.fecha_salida != "" && this._idConductor != null && this._idConductor != "") {
      //this.verListadoFecha = true;
      this.cabecera = true;
      this.viajesRealizadosDetalles = false;
      this.encomiendasRealizadasDetalles = false;
      //console.log('Fecha capturada Seleccionada >>>>>> ', this.fecha_salida);
      this._messageService.getReceivedMessagesListadoSecretaria(this._userService.getToken(), this.fecha_salida).subscribe(
        response => {
          this.messages = response.messagess;
          // console.log('estos son mis viajes que estan realizados en una fecha sin filtrar por chofer>>>', this.messages);
          this.calcularTotalViajes();
        },
        error => {
          //  console.log(error);
        }
      );



    } else {
      //alert("Debe llenar todos los datos antes de continuar");
    }
  }

  actualizarVectorEncomiendasClickChofer() {
    if (this.fecha_salida != null && this.fecha_salida != "" && this._idConductor != null && this._idConductor != "") {
      //this.verListadoFecha = true;
      this.cabecera = true;
      this.viajesRealizadosDetalles = false;
      this.encomiendasRealizadasDetalles = false;
      //console.log('Fecha capturada Seleccionada >>>>>> ', this.fecha_salida);
      this._messageService.getReceivedMessagesEncoListadoSecretaria(this._userService.getToken(), this.fecha_salida).subscribe(
        response => {
          this.messagesE = response.messagess;
          this.calcularTotalViajes();
          //console.log('NUEVAS ENCOMIENDAS >>>>>>>', this.messagesE);
        },
        error => {
          //console.log(error);
        }
      );



    } else {
      //alert("Debe llenar todos los datos antes de continuar");
    }
  }



  guardarCuentas() {

    var guardarCuentaChofer =
    {
      idChoferS: this._idConductor,
      fechaS: this.fecha_salida.formatted,
      peajeS: this.peaje,
      gasolinaS: this.gasolina,
      lunchS: this.lunch,
      variosS: this.varios
    }

    console.log('guardatio >>>> ', guardarCuentaChofer);
    this._cuentaService.saveCuentas(this._userService.getToken(), guardarCuentaChofer).subscribe(
      response => {
        // this.messagesE = response.messagess;
        console.log('juardatito de regreso', response.message);
      },
      error => {
        console.log(error);
      }
    );
  }

}

/*

  guardarCuentas() {

    var dia = this.fecha_salida.date.day;
    var mes = this.fecha_salida.date.month;
    var anio = this.fecha_salida.date.year;

    var guardarCuentaChofer =
    {
      idChoferS: this._idConductor,
      diaS: dia,
      mesS: mes,
      anioS: anio,
      peajeS: this.peaje,
      gasolinaS: this.gasolina,
      lunchS: this.lunch,
      variosS: this.varios
    }

    alert('guardatio >>>> ' + JSON.stringify(guardarCuentaChofer));
    this._cuentaService.saveCuentas(this._userService.getToken(), guardarCuentaChofer).subscribe(
      response => {
        this.messagesE = response.messagess;
        //console.log('NUEVAS ENCOMIENDAS >>>>>>>', this.messagesE);
      },
      error => {
        //console.log(error);
      }
    );
  }

*/
