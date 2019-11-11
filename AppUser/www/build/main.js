webpackJsonp([0],{

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registro_registro__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_user_services__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__principal_principal__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__terminos_terminos__ = __webpack_require__(407);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { User } from "../../app/models/user";

//import { ContactosPage } from "../contactanos/contactanos";

var HomePage = (function () {
    function HomePage(navCtrl, _userService, alertCtrl, loadingCtrl, menuCtrl) {
        this.navCtrl = navCtrl;
        this._userService = _userService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.isActiveToggleTextPassword = true;
        this.splash = true;
        this.obj = {
            email: null,
            password: null
        };
        //this.user = new User("", "", "", "", "", "", "", "","");
    }
    HomePage.prototype.ngDoCheck = function () {
        this.error;
    };
    HomePage.prototype.ngOnInit = function () {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        console.log("las vaibles del Storage");
        console.log(this.identity + this.token);
        //  if(this.identity == null){
        //    this.menuCtrl.enable(false, 'myMenu');
        //  }else{
        //    this.menuCtrl.enable(true, 'myMenu');
        //  }
    };
    /*ionViewDidLoad() {
      //this.tabBarElement.style.display = 'none';
      setTimeout(() => {
        this.splash = false;
      }, 4000);
      //this.tabBarElement.style.display = 'none';
    }*/
    HomePage.prototype.onCLick = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__registro_registro__["a" /* RegistroPage */]);
    };
    HomePage.prototype.onCLickTerminos = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__terminos_terminos__["a" /* TerminosPage */]);
    };
    // onContactanos() {
    //   this.navCtrl.push(ContactosPage);
    // }
    HomePage.prototype.onSubmit = function () {
        var _this = this;
        //conseguir losdatos del usuario
        //animacion de carga del sistema
        this.verificarUsuario();
        this._userService.singup(this.obj, "").subscribe(function (response) {
            console.log(response + "esto viene en la respuesta");
            var identity = response.user;
            _this.identity = identity;
            console.log(identity);
            if (!_this.identity._id) {
                console.log("el usuario no se ha logueado correctamente");
                // aqui la alerta
            }
            else {
                // crear local storage
                localStorage.setItem("identity", JSON.stringify(identity));
                _this._userService.singup(_this.obj, "true").subscribe(function (response) {
                    var token = response.token;
                    _this.token = token;
                    if (_this.token.length <= 0) {
                        // aqui mensaje
                        console.log("el token nose ha generado");
                    }
                    else {
                        localStorage.setItem("Token", token);
                        setTimeout(function () {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__principal_principal__["a" /* PrincipalPage */]);
                        }, 2000);
                    }
                }, function (error) {
                    var errorMessage = error;
                    if (errorMessage) {
                        try {
                            var body = JSON.parse(error._body);
                            errorMessage = body.message;
                        }
                        catch (e) {
                            errorMessage = "No hay conexión intentelo más tarde.";
                        }
                        setTimeout(function () {
                            _this.error = errorMessage;
                        }, 2000);
                        console.log(errorMessage);
                    }
                });
                //fin
            }
        }, function (error) {
            var errorMessage = error;
            if (errorMessage) {
                try {
                    var body = JSON.parse(error._body);
                    errorMessage = body.message;
                }
                catch (e) {
                    errorMessage = "No hay conexión intentelo más tarde";
                }
                setTimeout(function () {
                    _this.error = errorMessage;
                }, 3000);
                console.log(errorMessage);
            }
        });
    };
    HomePage.prototype.verificarUsuario = function () {
        var loading = this.loadingCtrl.create({
            content: "Verficando sus datos"
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 3000);
    };
    HomePage.prototype.toggleTextPassword = function () {
        this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
    };
    HomePage.prototype.getType = function () {
        return this.isActiveToggleTextPassword ? 'password' : 'text';
    };
    HomePage.prototype.showAlert = function (errorr) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: errorr,
            buttons: ['OK']
        });
        alert.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "page-home",template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\home\home.html"*/`<!--<div id="custom-overlay" [style.display]="splash ? \'flex\': \'none\'">\n\n  <div class="flb">\n\n    <div class="Aligner-item Aligner-item--top"></div>\n\n    <img src="assets/imgs/portada.png">\n\n    <div class="Aligner-item Aligner-item--bottom"></div>\n\n  </div>\n\n</div>-->\n\n\n\n<!-- ESTO VA EN ANDROID-->\n\n<ion-content>\n\n\n\n\n\n  <br><br><br><br>\n\n  <div class="Aligner-item Aligner-item--top"></div>\n\n  <img id="imganeTitulo" src="assets/imgs/titulo.png" style=" width: 30vh;margin-top: -5%">\n\n  <div class="Aligner-item Aligner-item--bottom"></div>\n\n  <br>\n\n\n\n  <form #Formulario="ngForm" (ngSubmit)="onSubmit()">\n\n    <div id="formLogin">\n\n      <div style="top:0; bottom: 0;" class="item item-block">\n\n        <ion-icon item-left style="  max-width:0.02%; margin-top:0%; margin-bottom:0; margin-right:5% ">\n\n          <img style=" max-width:90%;left: 0;right: 0; " src="assets/imgs/Recurso3.png">\n\n        </ion-icon>\n\n        <input type="email" #email="ngModel" [(ngModel)]="obj.email" name="email" class="form-control"\n\n          style="font-size:110%">\n\n      </div>\n\n      <br>\n\n      <div style="top:0; bottom: 0; " class="item item-block">\n\n        <ion-icon item-left style="  max-width:0.02%; margin-top:0%; margin-bottom:0; margin-right:5% ">\n\n          <img style=" max-width:90%;left: 0;right: 0; " src="assets/imgs/Recurso2.png">\n\n        </ion-icon>\n\n        <input [type]="getType()" #password="ngModel" [(ngModel)]="obj.password" name="password" class="form-control"\n\n          style="font-size:110%">\n\n      </div>\n\n      <br>\n\n      <!-- prueba de mostra contrase -->\n\n      <div class="checkbox" style="margin-left:10%">\n\n        <label>\n\n          <input type="checkbox" (click)="toggleTextPassword()"> Mostrar Contraseña</label>\n\n      </div>\n\n      <br>\n\n      <input type="submit" value="Ingresar"\n\n        style="background-color: #D79357; padding-top:2%; padding-bottom:2%; font-size: 100%; font-weight: bold; justify-content: center;"\n\n        class="form-control">\n\n\n\n        <ion-item *ngIf="this.error">\n\n          <ion-icon name="alert" item-start color="danger"></ion-icon>\n\n          <p ion-text color="danger">{{this.error}}</p>\n\n          \n\n        </ion-item>\n\n  \n\n  \n\n\n\n \n\n    <!-- <input type="submit" src="assets/imgs/btnFaceboock.png" type="image" style="left:0; right:0;max-width:100%;  "> -->\n\n    <button (click)="onCLick()" style="background: transparent; border: none; font-size: 110%; font-weight: bold "\n\n      class="form-control">\n\n      Registrarse\n\n    </button>\n\n    <br>\n\n    <button (click)="onCLickTerminos()"\n\n      style="background: transparent; border: none; font-size: 110%; font-weight: bold " class="form-control">\n\n      Términos y condiciones\n\n    </button>\n\n    <br>\n\n\n\n  </div>\n\n    \n\n</form>  \n\n</ion-content>`/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\home\home.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__app_services_user_services__["a" /* UserService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__app_services_user_services__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistorialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_user_services__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_message_services__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_confirmacion_confirmacion__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__principal_principal__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { DetallesPage } from "../detalles/detalles"; crear una pagina detalle




var HistorialPage = (function () {
    function HistorialPage(navCtrl, _userService, _messageservice) {
        this.navCtrl = navCtrl;
        this._userService = _userService;
        this._messageservice = _messageservice;
        this.viaje = true;
        this.encomienda = false;
        this.c = 0;
        // remover de las solicitudes
        localStorage.removeItem('objSolicitudViaje');
        this.identity = this._userService.getIdentity();
        //this.vectorViajes = JSON.parse(localStorage.getItem("vectorViajes"));
        //this.vectorEncomiendas = JSON.parse(localStorage.getItem("vectorEncomiendas"));
        this.historial();
        console.log(this.vectorViajes);
    }
    HistorialPage.prototype.aparecerViaje = function () {
        console.log('es mi metodo aparecerviaje');
        this.historial();
        this.viaje = true;
        this.encomienda = false;
    };
    HistorialPage.prototype.historial = function () {
        var _this = this;
        this.vectorViajes = null;
        // trae todos los viajes
        this._messageservice.getMessages(this._userService.getToken()).subscribe(function (response) {
            if (response.messagess[0] != undefined) {
                _this.vectorViajes = response.messagess;
                console.log('mi vector de viajes antes de dar la vuelta', _this.vectorViajes);
                _this.darvuelta();
                console.log('mi vector de viajes DESPUES de dar la vuelta', _this.vectorViajes);
                //localStorage.setItem("vectorViajes", JSON.stringify(this.vectorViajes));
            }
        }, function (err) { console.log("Existen COmplicaciones Intente mas tarde", err); });
    };
    HistorialPage.prototype.darvuelta = function () {
        var _this = this;
        //this.vectorViajes=JSON.parse(localStorage.getItem("vectorViajes"));
        this.aux;
        this.vectorViajes.forEach(function () {
            _this.c += 1;
        });
        this.medio = (this.c) / 2;
        this.up = (this.c) - 1;
        /*By Jhonatan Choto*/
        for (var i = 0; i < this.medio; i++) {
            this.aux = this.vectorViajes[i];
            this.vectorViajes[i] = this.vectorViajes[this.up];
            this.vectorViajes[this.up] = this.aux;
            this.up--;
        }
        this.c = 0;
    };
    HistorialPage.prototype.darvueltaencomienda = function () {
        var _this = this;
        this.aux;
        this.vectorEncomiendas.forEach(function () {
            _this.c += 1;
        });
        this.medio = (this.c) / 2;
        this.up = (this.c) - 1;
        /*By Jhonatan Choto*/
        for (var i = 0; i < this.medio; i++) {
            this.aux = this.vectorEncomiendas[i];
            this.vectorEncomiendas[i] = this.vectorEncomiendas[this.up];
            this.vectorEncomiendas[this.up] = this.aux;
            this.up--;
        }
        this.c = 0;
    };
    HistorialPage.prototype.irDetalles = function (listado) {
        var _this = this;
        console.log('Este es mi listado ejejjeje >>>', listado._id);
        this._messageservice.getMessagesId(this._userService.getToken(), listado._id).subscribe(function (response) {
            console.log("loq ue vien por el socket mi pecs", response.messagess);
            localStorage.setItem("confirmacion1", JSON.stringify(response.messagess));
            localStorage.setItem('Dirige', '1');
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_confirmacion_confirmacion__["a" /* ConfirmacionPage */]);
        }, function (err) { console.log("Existen COmplicaciones Intente mas tarde", err); });
    };
    HistorialPage.prototype.goBack = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__principal_principal__["a" /* PrincipalPage */]);
    };
    HistorialPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "historial",template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\historial\historial.html"*/`<ion-header>\n\n  <ion-navbar hideBackButton color="colorapp">\n\n\n\n    <ion-buttons left>\n\n      <button class="back-button disable-hover bar-button bar-button-md back-button-md bar-button-default bar-button-default-md show-back-button"\n\n        (click)="goBack();" style="padding: 0;">\n\n        <ion-icon style="font-size: 170%; color:rgb(255, 255, 255);" name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    <!-- IOS //////////////////////////////////////////// -->\n\n      <ion-title style="padding-right: 0; padding-left: 20px;"><label left>Notificaciones</label>\n\n      <!-- <button (click)="aparecerViaje()" style="background: transparent; left:0; right:0; max-width:50%; float: right; margin-right: 5%; display: block; max-height:100%;">\n\n        <ion-icon name="ios-car" style="cursor:pointer; font-size: 140%; color:rgb(255, 255, 255);"></ion-icon>\n\n      </button> -->\n\n    </ion-title> -\n\n    \n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content style="background-image: url(\'assets/imgs/Registro.png\')" class="getstarContactos">\n\n  <div id="solicituViaje" *ngIf="viaje">\n\n    <br>\n\n    <div style="text-align: center;">\n\n      <h3>\n\n        <font style="font-size: 90%">NOTIFICACIONES RECIBIDAS</font>\n\n      </h3>\n\n      <h3>\n\n        <font style="font-size: 90%">Paseos</font>\n\n      </h3>\n\n    </div>\n\n    <hr>\n\n    <div style="text-align: left;">\n\n      <h4>\n\n        <font>&nbsp;Notificaciones</font>\n\n      </h4>\n\n    </div>\n\n    <ion-list>\n\n      <ion-item *ngFor=" let listado of  vectorViajes">\n\n        <!-- <ion-thumbnail item-start>\n\n          <ion-icon name="ios-car" style="cursor:pointer; font-size: 400%; color: #4266AE;   margin-left: auto;margin-right: auto; display: block; margin-top: 10px;"></ion-icon>\n\n\n\n        </ion-thumbnail> -->\n\n        <p>\n\n          <b>Raza: </b> {{listado.raza}}</p>\n\n        <p>\n\n          <b>Fecha de Salida: </b> {{listado.fech_salida}}</p>\n\n        <p>\n\n          <b>Hora de Recogida: </b> {{listado.horarioR}}</p>\n\n          <p>\n\n            <b>Hora de Entrega: </b> {{listado.horarioE}}</p>  \n\n        <p>\n\n          <b>Recibida: </b> {{listado.fech_solicitud}}</p>\n\n          <button ion-button clear item-end color="danger" *ngIf="listado.estado == \'2\' || listado.estado == \'3\'|| listado.estado == \'4\'">Cancelado</button>\n\n          <button ion-button clear item-end (click)="irDetalles(listado)">Ver</button>\n\n      </ion-item>\n\n    </ion-list>\n\n  </div>\n\n</ion-content>\n\n`/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\historial\historial.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__app_services_user_services__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_3__app_services_message_services__["a" /* MessageService */]])
    ], HistorialPage);
    return HistorialPage;
}());

//# sourceMappingURL=historial.js.map

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SolicitudesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_user_services__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_notificaciones_services__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_cardsolicitud_cardsolicitud__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__principal_principal__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SolicitudesPage = (function () {
    function SolicitudesPage(navCtrl, _userService, _notificacionesservice) {
        this.navCtrl = navCtrl;
        this._userService = _userService;
        this._notificacionesservice = _notificacionesservice;
        this.viaje = true;
        this.c = 0;
        // remover de las solicitudes
        localStorage.removeItem('objSolicitudViaje');
        this.identity = this._userService.getIdentity();
        //this.vectorViajes=JSON.parse(localStorage.getItem("vectorViajesMios"));
        // this.vectorEncomiendas=JSON.parse(localStorage.getItem("vectorEncomiendasMios"));
        this.solicitudes();
        this.viene = localStorage.getItem('viene');
    }
    SolicitudesPage.prototype.aparecerViaje = function () {
        this.solicitudes();
        // this.vectorViajes=JSON.parse(localStorage.getItem("vectorViajesMios"));
        this.viaje = true;
    };
    SolicitudesPage.prototype.solicitudes = function () {
        var _this = this;
        console.log("entre a silicitudes");
        this._notificacionesservice.getSolicitudesViajes(this._userService.getToken(), this._userService.getIdentity()).subscribe(function (response) {
            if (response.solicitudviajesmios[0] != undefined) {
                _this.vectorViajes = response.solicitudviajesmios;
                _this.darvuelta();
                console.log("viajes mios", _this.vectorViajes);
                //localStorage.setItem("vectorViajesMios", JSON.stringify(this.vectorViajes));
            }
        }, function (err) { console.log("Existen COmplicaciones Intente mas tarde", err); });
    };
    SolicitudesPage.prototype.darvuelta = function () {
        var _this = this;
        //this.vectorViajes=JSON.parse(localStorage.getItem("vectorViajes"));
        this.aux;
        this.vectorViajes.forEach(function () {
            _this.c += 1;
        });
        this.medio = (this.c) / 2;
        this.up = (this.c) - 1;
        /*By Jhonatan Choto*/
        for (var i = 0; i < this.medio; i++) {
            this.aux = this.vectorViajes[i];
            this.vectorViajes[i] = this.vectorViajes[this.up];
            this.vectorViajes[this.up] = this.aux;
            this.up--;
        }
        this.c = 0;
    };
    SolicitudesPage.prototype.irDetalles = function (listado) {
        console.log("Listado de Viaje..... Solicitudes recibidas", listado);
        localStorage.setItem("recibi", JSON.stringify(listado));
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_cardsolicitud_cardsolicitud__["a" /* CardsolicitudPage */]);
    };
    SolicitudesPage.prototype.goBack = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__principal_principal__["a" /* PrincipalPage */]);
    };
    SolicitudesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "solicitudes",template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\solicitudes\solicitudes.html"*/`<ion-header>\n\n  <ion-navbar hideBackButton color="colorapp">\n\n\n\n    <ion-buttons left>\n\n      <button\n\n        class="back-button disable-hover bar-button bar-button-md back-button-md bar-button-default bar-button-default-md show-back-button"\n\n        (click)="goBack();">\n\n        <ion-icon style="font-size: 170%; color:rgb(255, 255, 255);" name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n\n\n    <!-- IOS //////////////////////////////////////////// -->\n\n    <ion-title style="padding-right: 0; padding-left: 20px;"><label left>Solicitud</label>\n\n      <!-- <button (click)="aparecerViaje()" style="background: transparent; left:0; right:0; max-width:50%; float: right; margin-right: 5%; display: block; max-height:100%;">\n\n        <ion-icon name="ios-car" style="cursor:pointer; font-size: 140%; color:rgb(255, 255, 255);"></ion-icon>\n\n      </button> -->\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content style="background-image: url(\'assets/imgs/Registro.png\')" class="getstarContactos">\n\n  <div id="solicituViaje" *ngIf="viaje">\n\n    <br>\n\n    <div style="text-align: center;">\n\n      <h3>\n\n        <font style="font-size: 90%"> SOLICITUDES REALIZADAS</font>\n\n      </h3>\n\n      <h3>\n\n        <font style="font-size: 90%">Recorridos</font>\n\n      </h3>\n\n    </div>\n\n    <hr>\n\n    <div style="text-align: left;">\n\n      <h4>\n\n        <font>&nbsp;Notificaciones</font>\n\n      </h4>\n\n    </div>\n\n    <ion-list>\n\n      <ion-item *ngFor=" let listado of vectorViajes">\n\n        <!-- <ion-thumbnail item-start>\n\n          <ion-icon name="ios-car" style="cursor:pointer; font-size: 400%; color: #4266AE;   margin-left: auto;margin-right: auto; display: block; margin-top: 10px;"></ion-icon>\n\n\n\n        </ion-thumbnail> -->\n\n        <p>\n\n          <b>Raza: </b> {{listado.raza}}</p>\n\n        <p>\n\n          <b>Fecha Salida: </b> {{listado.fechaSalida}}</p>\n\n        <p>\n\n          <b>Hora Recogida: </b> {{listado.horarioR}}</p>\n\n        <p>\n\n          <b>Hora Entrega: </b> {{listado.horarioE}}</p>\n\n        <button ion-button clear item-end (click)="irDetalles(listado)">Ver</button>\n\n      </ion-item>\n\n    </ion-list>\n\n  </div>\n\n</ion-content>`/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\solicitudes\solicitudes.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__app_services_user_services__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_3__app_services_notificaciones_services__["a" /* NotificacionesService */]])
    ], SolicitudesPage);
    return SolicitudesPage;
}());

//# sourceMappingURL=solicitudes.js.map

/***/ }),

/***/ 209:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 209;

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_solicitud__ = __webpack_require__(506);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserService = (function () {
    function UserService(_http, geolocation) {
        this._http = _http;
        this.geolocation = geolocation;
        this.url = __WEBPACK_IMPORTED_MODULE_3__global__["a" /* GLOBAL */].url;
        this._solicitud = new __WEBPACK_IMPORTED_MODULE_5__models_solicitud__["a" /* Solicitud */]("", "");
    }
    UserService.prototype.singup = function (user_to_login, getHash) {
        if (getHash) {
            console.log("aqui va el hash");
            user_to_login.getHash = getHash;
            console.log(user_to_login.getHash);
        }
        var json = JSON.stringify(user_to_login);
        var params = json;
        console.log(params);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json" });
        return this._http
            .post(this.url + "login", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.register = function (user_to_register) {
        var json = JSON.stringify(user_to_register);
        var params = json;
        console.log(params);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json" });
        return this._http
            .post(this.url + "register", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.update_user = function (user_to_update, estadoContrasena) {
        console.log("estadoCOntrasena", estadoContrasena);
        user_to_update.estadoContrasena = estadoContrasena;
        var json = JSON.stringify(user_to_update);
        var params = json;
        console.log(params);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": this.getToken() });
        return this._http
            .put(this.url + "update-user/" + user_to_update._id, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.getIdentity = function () {
        var identity = JSON.parse(localStorage.getItem("identity"));
        if (identity != "undefined") {
            this.identity = identity;
        }
        else {
            this.identity = null;
        }
        return this.identity;
    };
    UserService.prototype.getToken = function () {
        var token = localStorage.getItem("Token");
        console.log("este es el falso token" + token);
        if (token != "undefined") {
            this.token = token;
        }
        else {
            this.token = null;
        }
        return this.token;
    };
    UserService.prototype.logout = function () {
        localStorage.removeItem("identity");
        localStorage.removeItem("Token");
        localStorage.removeItem("posicion");
        localStorage.clear();
        this.identity = null;
        this.token = null;
    };
    //NUEVO SERVICIO PARA LA UBICACION
    UserService.prototype.iniciarGeolocalizacion = function () {
        var _this = this;
        this.geolocation
            .getCurrentPosition()
            .then(function (resp) {
            console.log(resp.coords);
            ////////////////////////////////
            _this.latitudUS = resp.coords.latitude;
            _this.longitudUS = resp.coords.longitude;
            var posicion = { latitud: _this.latitudUS, longitud: _this.longitudUS };
            localStorage.setItem("posicion", JSON.stringify(posicion));
            ///////////////////////////////
            _this._solicitud.latitud = resp.coords.latitude.toString();
            _this._solicitud.longitud = resp.coords.longitude.toString();
            _this._solicitud.verDatos();
            console.log("tefo dice que mandas en la solicitud" + _this._solicitud);
            /*this.registerSolicitud(this._solicitud).subscribe(
              response => {
                console.log("Que procede:", response);
              },
              err => {
                var errorMessage = <any>err;
                if (!errorMessage) {
                  console.log(errorMessage);
                }
              }
            );
    
            /*let watch = this.geolocation.watchPosition();
            watch.subscribe(data => {
              console.log("Watch: ", data.coords);
              ////////////////////////////////
              this.latitudUS = resp.coords.latitude;
              this.longitudUS = resp.coords.longitude;
              ///////////////////////////////
              this._solicitud.latitud = data.coords.latitude.toString();
              this._solicitud.longitud = data.coords.longitude.toString();
              this._solicitud.verDatos();
              console.log("tefo dice que mandas en la solicitud" + this._solicitud);
              this.registerSolicitud(this._solicitud).subscribe(
                response => {
                  console.log("Que procede:", response);
                },
                err => {
                  var errorMessage = <any>err;
                  if (!errorMessage) {
                    console.log(errorMessage);
                  }
                }
              );
            });*/
        })
            .catch(function (error) {
            console.log("Error getting location", error);
        });
    };
    //REGISTRO DE LA UBICACION
    UserService.prototype.registerSolicitud = function (solicitud_to_register) {
        var json = JSON.stringify(solicitud_to_register);
        var params = json;
        console.log("JSON DEL WATCH: ", params);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json" });
        return this._http
            .post(this.url + "guardar", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */]])
    ], UserService);
    return UserService;
}());

//# sourceMappingURL=user.services.js.map

/***/ }),

/***/ 253:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 253;

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_global__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_services_user_services__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_models_user__ = __webpack_require__(507);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//import { PrincipalPage } from "../principal/principal";
var RegistroPage = (function () {
    function RegistroPage(navCtrl, _userService, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this._userService = _userService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.verificarPassword = "";
        this.url2 = 'assets/imgs/tituloRegistro.png';
        this.url = __WEBPACK_IMPORTED_MODULE_2__app_services_global__["a" /* GLOBAL */].url;
        this.miModelo = {};
        this.user_register = new __WEBPACK_IMPORTED_MODULE_5__app_models_user__["a" /* User */]("", "", "", "", "", "", "", "", "", "");
    }
    RegistroPage.prototype.verificarContrasenas = function () {
        console.log('contrasena >>', this.user_register.contrasena);
        console.log('contrasena a verificar>>', this.verificarPassword);
        if ((this.user_register.contrasena == this.verificarPassword) && this.user_register.contrasena != '' && this.verificarPassword != '') {
            //son correctas
            console.log('las contrasenas son CORRECTAS');
            return true;
        }
        else {
            //son incorrectas
            console.log('las contrasenas son INCORRECTAS');
            return false;
        }
    };
    RegistroPage.prototype.onRegister = function () {
        var _this = this;
        try {
            if (!this.validarCampos() && this.verificarContrasenas() == false) {
                console.log("mi JSON esta incorrecto");
                this.presentAlert();
            }
            else {
                this.verificarUsuario();
                this.user_register.estado = "0";
                this._userService.register(this.user_register).subscribe(function (response) {
                    if (_this.filesToUpload) {
                        console.log("nombre de archivo" + _this.filesToUpload[0].name);
                        _this.makeFileRequest(_this.url + 'upload-image-user/' + response.user._id, [], _this.filesToUpload).then(function (result) {
                            _this.user_register.image = result.image;
                        });
                    }
                    setTimeout(function () {
                        _this.showAlertCorrecto("El Usuario ha sido Registrado satisfactoriamente. Ingrese su correo y contraseña");
                    }, 3000);
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */]);
                }, function (err) {
                    var errorMessage = err;
                    if (errorMessage) {
                        console.log(errorMessage);
                        try {
                            var body = JSON.parse(err._body);
                            errorMessage = body.message;
                        }
                        catch (error) {
                            errorMessage = "No hay conexión intentelo más tarde";
                        }
                        setTimeout(function () {
                            _this.showAlert(errorMessage);
                        }, 3000);
                        console.log(errorMessage);
                    }
                });
            }
        }
        catch (error) {
            this.showAlert("Verifique que la información sea correcta, debe llenar toda la información.");
        }
    };
    RegistroPage.prototype.showAlert = function (errorr) {
        var alert = this.alertCtrl.create({
            subTitle: "Error",
            message: errorr,
            buttons: ["OK"]
        });
        alert.present();
    };
    RegistroPage.prototype.showAlertCorrecto = function (corec) {
        var alert = this.alertCtrl.create({
            title: "Correcto",
            subTitle: corec,
            buttons: ["OK"]
        });
        alert.present();
    };
    RegistroPage.prototype.verificarUsuario = function () {
        var loading = this.loadingCtrl.create({
            content: "Verficando sus datos"
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 3000);
    };
    RegistroPage.prototype.presentAlert = function () {
        var alert = this.alertCtrl.create({
            title: "Atención",
            subTitle: "Verifique que la información sea correcta antes de continuar",
            buttons: ["Aceptar"]
        });
        alert.present();
    };
    RegistroPage.prototype.presentAlertCedula = function () {
        var alert = this.alertCtrl.create({
            subTitle: "Atención",
            message: "La cédula ingresada es incorrecta",
            buttons: ["Aceptar"]
        });
        alert.present();
    };
    RegistroPage.prototype.presentAlertCaracteresEspeciales = function () {
        var alert = this.alertCtrl.create({
            subTitle: "Atención",
            message: "El campo posee caractéres especiales",
            buttons: ["Corregir"]
        });
        alert.present();
    };
    RegistroPage.prototype.validarCampos = function () {
        var bool_nombres = this.soloLetras(this.user_register.nombre);
        var bool_apellidos = this.soloLetras(this.user_register.apellido);
        var bool_celular = this.soloNumeros(this.user_register.tel_celular);
        var bool_telefono = this.soloNumeros(this.user_register.tel_convencional);
        //var bool_cedula = this.validarCedula();
        //var confirmarContrasenia = JSON.parse(this.miModelo.confirmContrasena);
        // console.log("valor de miModelo: ", confirmarContrasenia);
        if (this.user_register.nombre == "" ||
            this.user_register.apellido == "" ||
            this.user_register.correo == "" ||
            this.user_register.contrasena == "" ||
            this.user_register.tel_celular == "" ||
            this.user_register.tel_convencional == "" ||
            bool_nombres ||
            bool_apellidos ||
            bool_celular ||
            bool_telefono ||
            (this.user_register.contrasena != this.verificarPassword) ||
            this.verificarPassword == null) {
            console.log('retorno falso');
            return false;
        }
        else {
            console.log('retorno verdadero');
            return true;
        }
    };
    /*validarCedula() {
      var cad: any = this.user_register.cedula;
      var i;
  
      var total = 0;
      var longitud = cad.length;
      var longcheck = longitud - 1;
      if (cad !== "" && longitud === 10) {
        for (i = 0; i < longcheck; i++) {
          if (i % 2 === 0) {
            var aux = cad.charAt(i) * 2;
            if (aux > 9) aux -= 9;
            total += aux;
          } else {
            total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
          }
        }
        total = total % 10 ? 10 - total % 10 : 0;
  
        if (cad.charAt(longitud - 1) == total) {
          return true;
        } else {
          this.presentAlertCedula();
          this.user_register.cedula = "";
          return false;
        }
      }
    }*/
    RegistroPage.prototype.soloLetras = function (string) {
        //solo letras
        //Se añaden las letras validas
        var filtro = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ "; //Caracteres validos
        var ct = 0;
        for (var i = 0; i < string.length; i++) {
            if (filtro.indexOf(string.charAt(i)) == -1) {
                ct = ct + 1;
            }
        }
        if (ct > 0) {
            return true; //Posee caracteres especiales
        }
        else {
            return false; //NO Posee caracteres especiales
        }
    };
    RegistroPage.prototype.soloNumeros = function (string) {
        //solo letras
        //Se añaden las letras validas
        var filtro = "0123456789 "; //Caracteres validos
        var ct = 0;
        for (var i = 0; i < string.length; i++) {
            if (filtro.indexOf(string.charAt(i)) == -1) {
                ct = ct + 1;
            }
        }
        if (ct > 0) {
            return true; //Posee caracteres especiales
        }
        else {
            return false; //NO Posee caracteres especiales
        }
    };
    RegistroPage.prototype.goBack = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */]);
    };
    RegistroPage.prototype.readUrl = function (event) {
        var _this = this;
        this.filesToUpload = event.target.files;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                _this.url2 = event.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    RegistroPage.prototype.makeFileRequest = function (url, params, files) {
        // var token = this.tpken;
        return new Promise(function (resolve, reject) {
            var fromData = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                fromData.append('image', files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open('POST', url, true);
            // xhr.setRequestHeader('Authorization', token);
            xhr.send(fromData);
        });
    };
    RegistroPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "page-registro",template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\registro\registro.html"*/`<!-- EL HEADER NO VA EN ANDROID -->\n\n <ion-header>\n\n    <ion-navbar color="colorapp">\n\n      <ion-title >Registro</ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n\n\n<ion-content padding style="background-image: url(\'assets/imgs/Registro.png\')" class="getstar">\n\n  <!-- ESTO ACTIVAR PARA ANDROID  \n\n    <button (click)="goBack();" style="border:0;" class="back-button disable-hover bar-button bar-button-md back-button-md bar-button-default bar-button-default-md show-back-button">\n\n    <ion-icon style="font-size: 190%; color: #4266AE;" name="arrow-back"></ion-icon>\n\n  </button>   -->\n\n  <!-- HASTA AQUI  -->\n\n\n\n\n\n  <div class="Aligner-item Aligner-item--top"></div>\n\n\n\n  \n\n  <label class=" form-control fileContainer" style="border: none; ">\n\n    <img id="imganeTitulo" [src]="url2" style="display: block; width: 40%; ">\n\n    <input type=\'file\' id="nuestroinput" class="btn btn-primary" (change)="readUrl($event)" />\n\n    <p id="Titulo">Seria genial una foto con tus mascotas</p>\n\n  </label>\n\n  <div class="Aligner-item Aligner-item--bottom"></div>\n\n\n\n  <form #FormularioRegistro="ngForm" id="formRegistro">\n\n    <div id="formRegister">\n\n      <div style="top:0; bottom: 0;" class="item item-block">\n\n\n\n        <ion-grid>\n\n          <ion-row>\n\n            <ion-item >\n\n              <ion-icon item-left style="  max-width:10%; margin-top:3%; margin-bottom:0; margin-right:0% ">\n\n                <img style=" max-width:90%;left: 0;right: 0; " src="assets/imgs/registroNombre.png">\n\n              </ion-icon>\n\n              <ion-input id="A1" type="text" [(ngModel)]="user_register.nombre" name="nombres" #nombres="ngModel" placeholder="Nombres" pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*"\n\n                required></ion-input>\n\n              <!-- (keyup)="convertirMayuscula(user_register.nombre)"  -->\n\n            </ion-item>\n\n            <ion-item *ngIf="nombres.errors && (nombres.dirty || nombres.touched)">\n\n              <ion-icon name="alert" item-start color="danger"></ion-icon>\n\n              <p ion-text color="danger" [hidden]="!nombres.errors.pattern">Ingrese sólo caracteres alfabéticos</p>\n\n              <p ion-text color="danger" [hidden]="!nombres.errors.required">Campo requerido</p>\n\n            </ion-item>\n\n          </ion-row>\n\n          <ion-row>\n\n            <ion-item>\n\n              <ion-icon item-left style="  max-width:10%; margin-top:3%; margin-bottom:0; margin-right:0% ">\n\n                <img style=" max-width:90%;left: 0;right: 0; " src="assets/imgs/registroNombre.png">\n\n              </ion-icon>\n\n              <ion-input id="A1" placeholder="Apellidos" #apellidos="ngModel" [(ngModel)]="user_register.apellido" name="apellidos" pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ  ]*"\n\n                required></ion-input>\n\n            </ion-item>\n\n            <ion-item *ngIf="apellidos.errors && (apellidos.dirty || apellidos.touched)">\n\n              <ion-icon name="alert" item-start color="danger"></ion-icon>\n\n              <p ion-text color="danger" [hidden]="!apellidos.errors.pattern">Ingrese sólo caracteres alfabéticos</p>\n\n              <p ion-text color="danger" [hidden]="!apellidos.errors.required">Campo requerido</p>\n\n            </ion-item>\n\n          </ion-row>\n\n\n\n          <ion-row>\n\n            <ion-item>\n\n              <ion-icon item-left style="  max-width:10%; margin-top:3%; margin-bottom:0; margin-right:0% ">\n\n                <img style=" max-width:90%;left: 0;right: 0; " src="assets/imgs/cedulaRegistro.png">\n\n              </ion-icon>\n\n\n\n              <ion-input id="A1"  placeholder="Cédula/DNI" #cedula="ngModel" [(ngModel)]="user_register.cedula" name="cedula"  digits \n\n                ></ion-input>\n\n            </ion-item>\n\n            \n\n\n\n          </ion-row>\n\n\n\n          <ion-row>\n\n            <ion-item>\n\n\n\n              <ion-icon item-left style="  max-width:10%; margin-top:3%; margin-bottom:0; margin-right:0% ">\n\n                <img style=" max-width:90%;left: 0;right: 0; " src="assets/imgs/correroRegistro.png">\n\n              </ion-icon>\n\n\n\n              <ion-input id="A1"  placeholder="Correo" #correo="ngModel" [(ngModel)]="user_register.correo" name="correo" required email pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"></ion-input>\n\n            </ion-item>\n\n            <ion-item *ngIf="correo.errors && (correo.dirty || correo.touched)">\n\n              <ion-icon name="alert" item-start color="danger"></ion-icon>\n\n              <p ion-text color="danger" [hidden]="!correo.errors.required">Campo requerido &nbsp;</p>\n\n              <p ion-text color="danger" [hidden]="!correo.errors.email">Correo inválido</p>\n\n              <p ion-text color="danger" [hidden]="!correo.errors.pattern">Caracteres invalidos</p>\n\n            </ion-item>\n\n          </ion-row>\n\n\n\n\n\n          <ion-row>\n\n            <ion-item>\n\n              <ion-icon item-left style="  max-width:10%; margin-top:3%; margin-bottom:0; margin-right:0% ">\n\n                <img style=" max-width:90%;left: 0;right: 0; " src="assets/imgs/contrasenaRegistro.png">\n\n              </ion-icon>\n\n              <ion-input id="A1"  type="password" placeholder="Contraseña" #contrasena="ngModel" [(ngModel)]="user_register.contrasena" name="contrasena"\n\n                required minlength="6"></ion-input>\n\n            </ion-item>\n\n            <ion-item *ngIf="contrasena.errors && (contrasena.dirty || contrasena.touched)">\n\n              <ion-icon name="alert" item-start color="danger"></ion-icon>\n\n              <p ion-text color="danger" [hidden]="!contrasena.errors.required">Campo requerido &nbsp;</p>\n\n              <p ion-text color="danger" [hidden]="!contrasena.errors.minlength">Contraseña minima de 6 caracteres</p>\n\n            </ion-item>\n\n          </ion-row>\n\n\n\n          <ion-row>\n\n            <ion-item>\n\n              <ion-icon item-left style="  max-width:10%; margin-top:3%; margin-bottom:0; margin-right:0% ">\n\n                <img style=" max-width:90%;left: 0;right: 0; " src="assets/imgs/contrasenaRegistro.png">\n\n              </ion-icon>\n\n              <ion-input id="A1"  type="password" placeholder="Confirmar Contraseña" #confirmContrasena="ngModel" [(ngModel)]="verificarPassword"\n\n                name="confirmContrasena" required [equalTo]="contrasena"></ion-input>\n\n            </ion-item>\n\n            <ion-item *ngIf="confirmContrasena.errors && (confirmContrasena.dirty || confirmContrasena.touched)">\n\n              <ion-icon name="alert" item-start color="danger"></ion-icon>\n\n              <p ion-text color="danger" [hidden]="!confirmContrasena.errors.required">Campo requerido &nbsp;</p>\n\n              <p ion-text color="danger" [hidden]="!confirmContrasena.errors.equalTo">La contraseña no coincide</p>\n\n            </ion-item>\n\n          </ion-row>\n\n\n\n          <ion-row>\n\n            <ion-item>\n\n              <ion-icon item-left style="  max-width:10%; margin-top:3%; margin-bottom:0; margin-right:0% ">\n\n                <img style=" max-width:90%;left: 0;right: 0; " src="assets/imgs/telefonoCelRegistro.png">\n\n              </ion-icon>\n\n              <ion-input id="A1"  placeholder="Celular" #telefonoCel="ngModel" [(ngModel)]="user_register.tel_celular" name="telefonoCel" required\n\n                digits pattern="[0-9]*" minlength="10" maxlength="10"></ion-input>\n\n            </ion-item>\n\n            <ion-item *ngIf="telefonoCel.errors && (telefonoCel.dirty || telefonoCel.touched)">\n\n              <ion-icon name="alert" item-start color="danger"></ion-icon>\n\n              <p ion-text color="danger" [hidden]="!telefonoCel.errors.pattern">Ingrese sólo números</p>\n\n              <p ion-text color="danger" [hidden]="!telefonoCel.errors.minlength">Ingrese una número válido</p>\n\n              <p ion-text color="danger" [hidden]="!telefonoCel.errors.required">Campo requerido</p>\n\n            </ion-item>\n\n          </ion-row>\n\n\n\n          <ion-row>\n\n            <ion-item>\n\n              <ion-icon item-left style="  max-width:10%; margin-top:3%; margin-bottom:0; margin-right:0% ">\n\n                <img style=" max-width:90%;left: 0;right: 0; " src="assets/imgs/telefonoCelRegistro.png">\n\n              </ion-icon>\n\n              <ion-input id="A1"  placeholder="Convencional" #convencional="ngModel" [(ngModel)]="user_register.tel_convencional" name="convencional"\n\n                 digits pattern="[0-9]*" minlength="6" maxlength="10"></ion-input>\n\n            </ion-item>\n\n            <ion-item *ngIf="convencional.errors && (convencional.dirty || convencional.touched)">\n\n              <ion-icon name="alert" item-start color="danger"></ion-icon>\n\n              <p ion-text color="danger" [hidden]="!convencional.errors.pattern">Ingrese sólo números</p>\n\n              <p ion-text color="danger" [hidden]="!convencional.errors.minlength">Ingrese un número válido</p>\n\n             \n\n            </ion-item>\n\n          </ion-row>\n\n        </ion-grid>\n\n      </div>\n\n      <br>\n\n      <button (click)="onRegister()" style="max-width: 100%; padding:0%; position:relative"><img src="assets/imgs/btnRegistro.png"\n\n        /></button>\n\n    </div>\n\n  </form>\n\n\n\n</ion-content>`/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\registro\registro.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__app_services_user_services__["a" /* UserService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__app_services_user_services__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* LoadingController */]])
    ], RegistroPage);
    return RegistroPage;
}());

//# sourceMappingURL=registro.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UbicacionInicioPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agm_core__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_services_user_services__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ubicacion_final_ubicacion_final__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_models_paths_maps__ = __webpack_require__(401);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var UbicacionInicioPage = (function () {
    function UbicacionInicioPage(navCtrl, mapsAPILoader, ngZone, alertCtrl, ruta) {
        //this.zoom = 16;
        this.navCtrl = navCtrl;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.alertCtrl = alertCtrl;
        this.ruta = ruta;
        this.contador = 0;
        //rutas en el mapa
        this.paths1 = this.ruta.paths1;
        this.paths2 = this.ruta.paths2;
        this.paths3 = this.ruta.paths3;
        this.paths4 = this.ruta.paths4;
        this.paths5 = this.ruta.paths5;
        this.paths6 = this.ruta.paths6;
        this.paths6_1 = this.ruta.paths6_1;
        //crear el formulario de autocompletado
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]();
        // establecer la posición actual
        //this.setCurrentPosition();
        //establecer la posicion por la opcion elegida en el menu pirncipal
        this.setUbicacionPorSeleccion();
    }
    UbicacionInicioPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //mensaje de inicio
        if (this.contador == 0) {
            this.contador = 1;
            this.showAlert();
        }
        //set google maps defaults
        this.zoom;
        this.latitude;
        this.longitude;
        this.animation = 1;
        //crear el formulario de autocompletado
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]();
        // establecer la posición actual
        //this.setCurrentPosition();
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var nativeHomeInputBox = document
                .getElementById("txtHome")
                .getElementsByTagName("input")[0];
            var autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = autocomplete.getPlace();
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    _this.latitude = place.geometry.location.lat();
                    _this.longitude = place.geometry.location.lng();
                    _this.zoom = 16;
                    console.log("Autocompletando...");
                    console.log("Latitud: ", _this.latitude, " Longitud:", _this.longitude);
                });
            });
        });
    };
    UbicacionInicioPage.prototype.setCurrentPosition = function () {
        var _this = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                console.log("Geolocalizando...");
                console.log("Latitud: ", _this.latitude, " Longitud:", _this.longitude);
                console.log("{ lat:", _this.latitude, ", lng:", _this.longitude, "},");
                _this.zoom = 16;
            });
        }
    };
    UbicacionInicioPage.prototype.setUbicacionPorSeleccion = function () {
        console.log("QUITO");
        this.latitude = -0.1806532;
        this.longitude = -78.46783820000002;
        this.zoom = 14;
    };
    UbicacionInicioPage.prototype.markerDragEnd = function ($event) {
        this.animation = 3;
        //console.log("Arrastrando...");
        this.object = $event;
        this.latitude = this.object.coords.lat;
        this.longitude = this.object.coords.lng;
        //console.log("Latitud: ", this.latitude, " Longitud:", this.longitude);
        console.log("{ lat:", this.latitude, ", lng:", this.longitude, "},");
    };
    UbicacionInicioPage.prototype.mapClicked = function ($event) {
        this.animation = 3;
        //console.log("Clickeando...");
        this.object = $event;
        this.latitude = this.object.coords.lat;
        this.longitude = this.object.coords.lng;
        //console.log("Latitud: ", this.latitude, " Longitud:", this.longitude);
        console.log("{ lat:", this.latitude, ", lng:", this.longitude, "},");
    };
    ////////////////////////////////////////
    UbicacionInicioPage.prototype.centrarMapa = function ($event) {
        this.object = $event;
        //this.latitude = this.object.lat;
        //this.longitude = this.object.lng;
        //console.log("Evento de centrarMapa: ",  this.object);
    };
    /////////////////////////////////////
    UbicacionInicioPage.prototype.polygonClicked = function ($event) {
        this.showAlertPoligono();
        //console.log("Clickeando el poligono...");
    };
    UbicacionInicioPage.prototype.detectarUbicacionInicio = function () {
        try {
            this.setCurrentPosition();
            this.animation = 1;
            this.zoom = 16;
            this.ionViewDidLoad();
        }
        catch (error) {
            console.log(error);
        }
    };
    UbicacionInicioPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: "<center><h3>Selecciona tu lugar de salida</h3></center>",
            subTitle: "<br>Puedes elegir tu ubicación actual, ingresar una dirección o seleccionar una ubicación específica tocando el mapa o arrastrando el marcador al lugar deseado.",
            buttons: ["Entendido"]
        });
        alert.present();
    };
    UbicacionInicioPage.prototype.showAlertPoligono = function () {
        var alert = this.alertCtrl.create({
            title: "Alerta",
            subTitle: "Actualmente no se realizan viajes por esta zona.",
            buttons: ["Entendido"]
        });
        alert.present();
    };
    //1 viaje 2 encomienda
    UbicacionInicioPage.prototype.irUbicacionFinal = function () {
        this.objSolicitudViaje = JSON.parse(localStorage.getItem("objSolicitudViaje"));
        this.objSolicitudViaje.latitud_salida = this.latitude;
        this.objSolicitudViaje.longitud_salida = this.longitude;
        localStorage.setItem("objSolicitudViaje", JSON.stringify(this.objSolicitudViaje));
        console.log('es mi objeto ' + JSON.stringify(this.objSolicitudViaje));
        console.log("boton final");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__ubicacion_final_ubicacion_final__["a" /* UbicacionFinalPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("search"),
        __metadata("design:type", Object)
    ], UbicacionInicioPage.prototype, "searchElementRef", void 0);
    UbicacionInicioPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "page-ubicacion-inicio",template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\ubicacion-inicio\ubicacion-inicio.html"*/`<ion-header>\n\n  <ion-navbar color="colorapp">\n\n    <ion-title>\n\n      Lugar de Salida\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content style="background-image: url(\'assets/imgs/fondo2.png\')" class="getstarUbicacionIn">\n\n\n\n  <br>\n\n\n\n  <ion-item (click)="detectarUbicacionInicio()" class="css-itemSelec">\n\n    <ion-icon name="locate"></ion-icon> Detectar Ubicación\n\n  </ion-item>\n\n\n\n  <ion-item class="css-txtAutocomplete">\n\n    <!-- <ion-label floating>Bus.car una dirección específica</ion-label> -->\n\n    <ion-input class="css-inputAutocomplete" id="txtHome" type="text" placeholder="¿Buscas una dirección en específico?" style="text-align: center;justify-content: center;"></ion-input>\n\n  </ion-item>\n\n\n\n  <agm-map [latitude]="latitude" [longitude]="longitude" [scrollwheel]="true" [zoom]="zoom" [zoomControl]="true" [mapTypeControl]="true"\n\n    (mapClick)="mapClicked($event)" (mapRightClick)="mapClicked($event)" (centerChange)="centrarMapa($event)">\n\n\n\n    <agm-marker [latitude]="latitude" [longitude]="longitude" [markerDraggable]="true" [animation]="animation" (dragEnd)="markerDragEnd($event)">\n\n    </agm-marker>\n\n\n\n    <agm-polygon *ngIf="poligonoVer" fillColor="#6E6E6E" [fillOpacity]=0.6 [paths]="paths1" strokeColor="#6E6E6E" [strokeOpacity]="0.6" [strokeWeight]="0"\n\n      [visible]="true" [zIndex]="1" (polyClick)="polygonClicked($event)">\n\n    </agm-polygon>\n\n\n\n    <agm-polygon *ngIf="poligonoVer" fillColor="#6E6E6E" [fillOpacity]=0.6 [paths]="paths2" strokeColor="#6E6E6E" [strokeOpacity]="0.6" [strokeWeight]="0"\n\n      [visible]="true" [zIndex]="1" (polyClick)="polygonClicked($event)">\n\n    </agm-polygon>\n\n\n\n    <agm-polygon *ngIf="poligonoVer" fillColor="#6E6E6E" [fillOpacity]=0.6 [paths]="paths3" strokeColor="#6E6E6E" [strokeOpacity]="0.6" [strokeWeight]="0"\n\n      [visible]="true" [zIndex]="1" (polyClick)="polygonClicked($event)">\n\n    </agm-polygon>\n\n\n\n    <agm-polygon *ngIf="poligonoVer" fillColor="#6E6E6E" [fillOpacity]=0.6 [paths]="paths4" strokeColor="#6E6E6E" [strokeOpacity]="0.6" [strokeWeight]="0"\n\n      [visible]="true" [zIndex]="1" (polyClick)="polygonClicked($event)">\n\n    </agm-polygon>\n\n\n\n    <agm-polygon *ngIf="poligonoVer" fillColor="#6E6E6E" [fillOpacity]=0.6 [paths]="paths5" strokeColor="#6E6E6E" [strokeOpacity]="0.6" [strokeWeight]="0"\n\n      [visible]="true" [zIndex]="1" (polyClick)="polygonClicked($event)">\n\n    </agm-polygon>\n\n\n\n    <agm-polygon *ngIf="poligonoVer" fillColor="#6E6E6E" [fillOpacity]=0.6 [paths]="paths6" strokeColor="#6E6E6E" [strokeOpacity]="0.6" [strokeWeight]="0"\n\n      [visible]="true" [zIndex]="1" (polyClick)="polygonClicked($event)">\n\n    </agm-polygon>\n\n\n\n\n\n    <agm-polygon *ngIf="poligonoVer" fillColor="#6E6E6E" [fillOpacity]=0.6 [paths]="paths6_1" strokeColor="#6E6E6E" [strokeOpacity]="0.6" [strokeWeight]="0"\n\n      [visible]="true" [zIndex]="1" (polyClick)="polygonClicked($event)">\n\n    </agm-polygon>\n\n\n\n  </agm-map>\n\n  <button ion-button color="colorapp" class="btnContinuar" (click)="irUbicacionFinal()">CONTINUAR</button>\n\n</ion-content>\n\n`/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\ubicacion-inicio\ubicacion-inicio.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__app_services_user_services__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_6__app_models_paths_maps__["a" /* PathsMaps */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__agm_core__["b" /* MapsAPILoader */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__app_models_paths_maps__["a" /* PathsMaps */]])
    ], UbicacionInicioPage);
    return UbicacionInicioPage;
}());

//# sourceMappingURL=ubicacion-inicio.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UbicacionFinalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agm_core__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_services_user_services__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_models_paths_maps__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__principal_principal__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_services_notificaciones_services__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UbicacionFinalPage = (function () {
    function UbicacionFinalPage(navCtrl, mapsAPILoader, ngZone, alertCtrl, ruta, _notificacionesService, _userService) {
        //this.zoom = 16;
        this.navCtrl = navCtrl;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.alertCtrl = alertCtrl;
        this.ruta = ruta;
        this._notificacionesService = _notificacionesService;
        this._userService = _userService;
        this.contador = 0;
        this.poligonoVer = false;
        //rutas en el mapa
        this.paths1 = this.ruta.paths1;
        this.paths2 = this.ruta.paths2;
        this.paths3 = this.ruta.paths3;
        this.paths4 = this.ruta.paths4;
        this.paths5 = this.ruta.paths5;
        this.paths6 = this.ruta.paths6;
        this.paths6_1 = this.ruta.paths6_1;
        //crear el formulario de autocompletado
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]();
        // establecer la posición actual
        //this.setCurrentPosition();
        //establecer la posicion por la opcion elegida en el menu pirncipal
        this.setUbicacionPorSeleccion();
    }
    UbicacionFinalPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //mensaje de inicio
        if (this.contador == 0) {
            this.contador = 1;
            this.showAlert();
        }
        //set google maps defaults
        this.zoom;
        this.latitude;
        this.longitude;
        this.animation = 1;
        //crear el formulario de autocompletado
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]();
        // establecer la posición actual
        //this.setCurrentPosition();
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var nativeHomeInputBox = document
                .getElementById("txtHome1")
                .getElementsByTagName("input")[0];
            var autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = autocomplete.getPlace();
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    _this.latitude = place.geometry.location.lat();
                    _this.longitude = place.geometry.location.lng();
                    _this.zoom = 16;
                    console.log("Autocompletando...");
                    console.log("Latitud: ", _this.latitude, " Longitud:", _this.longitude);
                });
            });
        });
    };
    UbicacionFinalPage.prototype.setCurrentPosition = function () {
        var _this = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                console.log("Geolocalizando...");
                console.log("Latitud: ", _this.latitude, " Longitud:", _this.longitude);
                _this.zoom = 16;
            });
        }
    };
    UbicacionFinalPage.prototype.setUbicacionPorSeleccion = function () {
        console.log('QUITO');
        this.latitude = -0.1806532;
        this.longitude = -78.46783820000002;
        this.zoom = 14;
    };
    UbicacionFinalPage.prototype.markerDragEnd = function ($event) {
        this.animation = 3;
        console.log("Arrastrando...");
        this.object = $event;
        this.latitude = this.object.coords.lat;
        this.longitude = this.object.coords.lng;
        console.log("Latitud: ", this.latitude, " Longitud:", this.longitude);
    };
    UbicacionFinalPage.prototype.mapClicked = function ($event) {
        this.animation = 3;
        console.log("Clickeando...");
        this.object = $event;
        this.latitude = this.object.coords.lat;
        this.longitude = this.object.coords.lng;
        console.log("Latitud: ", this.latitude, " Longitud:", this.longitude);
    };
    UbicacionFinalPage.prototype.detectarUbicacionInicio = function () {
        try {
            this.setCurrentPosition();
            this.animation = 1;
            this.zoom = 16;
            this.ionViewDidLoad();
        }
        catch (error) {
            console.log(error);
        }
    };
    UbicacionFinalPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: "<center><h3>Selecciona tu lugar de llegada</h3></center>",
            subTitle: "<br>Puedes elegir tu ubicación actual, ingresar una dirección o seleccionar una ubicación específica tocando el mapa o arrastrando el marcador al lugar deseado.",
            buttons: ["Entendido"]
        });
        alert.present();
    };
    UbicacionFinalPage.prototype.showAlertConfirmado = function () {
        localStorage.removeItem('objSolicitudViaje');
        var alert = this.alertCtrl.create({
            title: "<center><h3>IMPORTANTE</h3></center>",
            subTitle: "DOGI. Su petición ha sido atendida satisfactoriamente. Recuerda el precio variará entre $5.00 y $10.00 dependiendo la raza y edad de su mascota.",
            message: '<p align="justify">Esta solicitud puede ser cancelada antes de su confirmación. Para más información comunicate con nosotros.</p>',
            buttons: ["OK"],
            cssClass: 'customLoader'
        });
        alert.present();
    };
    UbicacionFinalPage.prototype.showAlertEnviarViaje = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '<center><h3>IMPORTANTE</h3></center>',
            subTitle: '<center>¿Desea enviar la solicitud?</center>',
            message: '<p align="justify">Para más información comunicate con nosotros.</p>',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Solicitud Cancelada');
                    }
                },
                {
                    text: 'OK',
                    handler: function (data) {
                        _this.objSolicitudViaje = JSON.parse(localStorage.getItem("objSolicitudViaje"));
                        _this.objSolicitudViaje.latitud_llegada = _this.latitude;
                        _this.objSolicitudViaje.longitud_llegada = _this.longitude;
                        localStorage.setItem("objSolicitudViaje", JSON.stringify(_this.objSolicitudViaje));
                        console.log('es mi objeto ' + JSON.stringify(_this.objSolicitudViaje));
                        _this._notificacionesService.saveSolicituViaje(_this._userService.getToken(), _this.objSolicitudViaje).subscribe(function (response) {
                            console.log("hola" + response);
                            // this.socket.emit('create notification', { a: this.objSolicitudViaje });
                            _this.showAlertConfirmado();
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__principal_principal__["a" /* PrincipalPage */]);
                        }, function (error) {
                            console.log(error);
                        });
                        //AQUI VA EL SIGUIENTE PASO DE LOS VIAJES
                    }
                }
            ],
            cssClass: 'customLoader'
        });
        alert.present();
    };
    UbicacionFinalPage.prototype.polygonClicked = function ($event) {
        this.showAlertPoligono();
    };
    UbicacionFinalPage.prototype.showAlertPoligono = function () {
        var alert = this.alertCtrl.create({
            title: "Alerta",
            subTitle: "Actualmente no se realizan viajes por esta zona",
            buttons: ["Entendido"]
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("search"),
        __metadata("design:type", Object)
    ], UbicacionFinalPage.prototype, "searchElementRef", void 0);
    UbicacionFinalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "page-ubicacion-final",template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\ubicacion-final\ubicacion-final.html"*/`<ion-header>\n\n  <ion-navbar color="colorapp">\n\n    <ion-title>\n\n      Lugar de Llegada\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content style="background-image: url(\'assets/imgs/fondo2.png\')" class="getstarUbicacionIn">\n\n\n\n  <br>\n\n  <ion-item (click)="detectarUbicacionInicio()" class="css-itemSelec">\n\n    <ion-icon name="locate"></ion-icon> Detectar Ubicación\n\n  </ion-item>\n\n\n\n\n\n  <ion-item class="css-txtAutocomplete">\n\n    <!-- <ion-label floating>Buscar una dirección específica</ion-label> -->\n\n    <ion-input class="css-inputAutocomplete" id="txtHome1" type="text" placeholder="¿Buscas una dirección en específico?" style="text-align: center;justify-content: center;"></ion-input>\n\n  </ion-item>\n\n\n\n\n\n\n\n  <agm-map [latitude]="latitude" [longitude]="longitude" [scrollwheel]="true" [zoom]="zoom" [zoomControl]="true" (mapClick)="mapClicked($event)">\n\n    <agm-marker [latitude]="latitude" [longitude]="longitude" [markerDraggable]="true" (dragEnd)="markerDragEnd($event)" [animation]="animation">\n\n    </agm-marker>\n\n\n\n    <agm-polygon *ngIf="poligonoVer" fillColor="#6E6E6E" [fillOpacity]=0.6 [paths]="paths1" strokeColor="#6E6E6E" [strokeOpacity]="0.6"\n\n      [strokeWeight]="0" [visible]="true" [zIndex]="1" (polyClick)="polygonClicked($event)">\n\n    </agm-polygon>\n\n\n\n    <agm-polygon *ngIf="poligonoVer" fillColor="#6E6E6E" [fillOpacity]=0.6 [paths]="paths2" strokeColor="#6E6E6E" [strokeOpacity]="0.6"\n\n      [strokeWeight]="0" [visible]="true" [zIndex]="1" (polyClick)="polygonClicked($event)">\n\n    </agm-polygon>\n\n\n\n    <agm-polygon *ngIf="poligonoVer" fillColor="#6E6E6E" [fillOpacity]=0.6 [paths]="paths3" strokeColor="#6E6E6E" [strokeOpacity]="0.6"\n\n      [strokeWeight]="0" [visible]="true" [zIndex]="1" (polyClick)="polygonClicked($event)">\n\n    </agm-polygon>\n\n\n\n    <agm-polygon *ngIf="poligonoVer" fillColor="#6E6E6E" [fillOpacity]=0.6 [paths]="paths4" strokeColor="#6E6E6E" [strokeOpacity]="0.6"\n\n      [strokeWeight]="0" [visible]="true" [zIndex]="1" (polyClick)="polygonClicked($event)">\n\n    </agm-polygon>\n\n\n\n    <agm-polygon *ngIf="poligonoVer" fillColor="#6E6E6E" [fillOpacity]=0.6 [paths]="paths5" strokeColor="#6E6E6E" [strokeOpacity]="0.6"\n\n      [strokeWeight]="0" [visible]="true" [zIndex]="1" (polyClick)="polygonClicked($event)">\n\n    </agm-polygon>\n\n\n\n    <agm-polygon *ngIf="poligonoVer" fillColor="#6E6E6E" [fillOpacity]=0.6 [paths]="paths6" strokeColor="#6E6E6E" [strokeOpacity]="0.6"\n\n      [strokeWeight]="0" [visible]="true" [zIndex]="1" (polyClick)="polygonClicked($event)">\n\n    </agm-polygon>\n\n\n\n\n\n    <agm-polygon *ngIf="poligonoVer" fillColor="#6E6E6E" [fillOpacity]=0.6 [paths]="paths6_1" strokeColor="#6E6E6E" [strokeOpacity]="0.6"\n\n      [strokeWeight]="0" [visible]="true" [zIndex]="1" (polyClick)="polygonClicked($event)">\n\n    </agm-polygon>\n\n\n\n  </agm-map>\n\n\n\n  <button ion-button color="colorapp" class="btnContinuar" (click)="showAlertEnviarViaje()">RESERVAR</button>\n\n</ion-content>`/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\ubicacion-final\ubicacion-final.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__app_services_user_services__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_5__app_models_paths_maps__["a" /* PathsMaps */], __WEBPACK_IMPORTED_MODULE_7__app_services_notificaciones_services__["a" /* NotificacionesService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__agm_core__["b" /* MapsAPILoader */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__app_models_paths_maps__["a" /* PathsMaps */],
            __WEBPACK_IMPORTED_MODULE_7__app_services_notificaciones_services__["a" /* NotificacionesService */],
            __WEBPACK_IMPORTED_MODULE_4__app_services_user_services__["a" /* UserService */]])
    ], UbicacionFinalPage);
    return UbicacionFinalPage;
}());

//# sourceMappingURL=ubicacion-final.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PathsMaps; });
var PathsMaps = (function () {
    function PathsMaps() {
        this.paths1 = [
            { lat: -0.22599110262492106, lng: -78.5347912408555 },
            { lat: -0.22634381036246276, lng: -78.53495217339639 },
            { lat: -0.2265785018180622, lng: -78.53497363106851 },
            { lat: -0.22681319326984495, lng: -78.53495217339639 },
            { lat: -0.22710152847684234, lng: -78.53485561387185 },
            { lat: -0.22750787994482854, lng: -78.53471613900308 },
            { lat: -0.22791423140137743, lng: -78.5345766641343 },
            { lat: -0.2279839682838689, lng: -78.53459812180643 },
            { lat: -0.22831588901796027, lng: -78.53454984204416 },
            { lat: -0.22843323473020072, lng: -78.5345766641343 },
            { lat: -0.22880739990911783, lng: -78.53459812180643 },
            { lat: -0.22822650150116686, lng: -78.53586410620841 },
            { lat: -0.22796364710064054, lng: -78.5369799051586 },
            { lat: -0.22748621766700416, lng: -78.53835319617423 },
            { lat: -0.2274808532912537, lng: -78.54071354010733 },
            { lat: -0.22781880895951273, lng: -78.54217266181143 },
            { lat: -0.22871465966083426, lng: -78.54187225440177 },
            { lat: -0.23038298027875329, lng: -78.5415718469921 },
            { lat: -0.23226587566106363, lng: -78.5421297464672 },
            { lat: -0.23414877079253002, lng: -78.54307388404044 },
            { lat: -0.23624624056993118, lng: -78.54328846076163 },
            { lat: -0.23778581537144347, lng: -78.54388927558097 },
            { lat: -0.2367504915690607, lng: -78.54513382056388 },
            { lat: -0.23554350776403638, lng: -78.54637836554679 },
            { lat: -0.23240534938313456, lng: -78.54732250312003 },
            { lat: -0.23145585517109396, lng: -78.5488674555126 },
            { lat: -0.23123591582476313, lng: -78.55036949256095 },
            { lat: -0.23221759629540306, lng: -78.55148529151114 },
            { lat: -0.23371425655379685, lng: -78.55247234442862 },
            { lat: -0.2352109166527049, lng: -78.5534593973461 },
            { lat: -0.23576881141559838, lng: -78.55296587088736 },
            { lat: -0.2367102587772481, lng: -78.55223631003531 },
            { lat: -0.23763024858743703, lng: -78.5512063417736 },
            { lat: -0.23867898325260187, lng: -78.55105613806876 },
            { lat: -0.239963750163036, lng: -78.55086301901969 },
            { lat: -0.2412485169528126, lng: -78.55066989997061 },
            { lat: -0.2414624223226662, lng: -78.55084125880398 },
            { lat: -0.24238241181383277, lng: -78.55073397044339 },
            { lat: -0.24323802880638784, lng: -78.55094854716458 },
            { lat: -0.24396490087971978, lng: -78.55165665034451 },
            { lat: -0.24458448553115636, lng: -78.55277244929471 },
            { lat: -0.24477613502718173, lng: -78.55303225036062 },
            { lat: -0.24528843226416544, lng: -78.55331120009816 },
            { lat: -0.24640153875853682, lng: -78.55331120009816 },
            { lat: -0.24779359229166925, lng: -78.55328974242605 },
            { lat: -0.2493143904930154, lng: -78.5530107926885 },
            { lat: -0.24995543236307408, lng: -78.55384764190114 },
            { lat: -0.24935194106367778, lng: -78.55511364455617 },
            { lat: -0.2479974382688484, lng: -78.55642256255544 },
            { lat: -0.24690042501261528, lng: -78.55792459960378 },
            { lat: -0.24726251986271636, lng: -78.55925497527517 },
            { lat: -0.24859020089516354, lng: -78.56037077422536 },
            { lat: -0.25021828634258403, lng: -78.56167969222463 },
            { lat: -0.251889286517557, lng: -78.56316027160085 },
            { lat: -0.25336716931885417, lng: -78.56483397002614 },
            { lat: -0.2549308817907326, lng: -78.56570078133427 },
            { lat: -0.25696665812038455, lng: -78.56477810143315 },
            { lat: -0.2582183668996394, lng: -78.56536677542613 },
            { lat: -0.25941639910470626, lng: -78.56536677542613 },
            { lat: -0.25987639322746064, lng: -78.5652165717213 },
            { lat: -0.2604651320365197, lng: -78.56501272383616 },
            { lat: -0.2615795783172613, lng: -78.56513074103282 },
            { lat: -0.26270477109403473, lng: -78.56612852737805 },
            { lat: -0.2633431301131552, lng: -78.56672934219739 },
            { lat: -0.2639385742107602, lng: -78.56750181839368 },
            { lat: -0.26461984805324423, lng: -78.56870344803235 },
            { lat: -0.265172377205098, lng: -78.5705488078346 },
            { lat: -0.26615405515191687, lng: -78.57196501419446 },
            { lat: -0.26735030740769716, lng: -78.57183626816175 },
            { lat: -0.2686753041648011, lng: -78.5708921305885 },
            { lat: -0.27042944944801156, lng: -78.57106379196546 },
            { lat: -0.2725269133528493, lng: -78.57136419937513 },
            { lat: -0.2745814620411051, lng: -78.57265165970227 },
            { lat: -0.2758206283117901, lng: -78.57462576553723 },
            { lat: -0.27628732726344934, lng: -78.57711485550305 },
            { lat: -0.27623904806240157, lng: -78.57968977615735 },
            { lat: -0.275203727370614, lng: -78.58222178146741 },
            { lat: -0.2735246837780228, lng: -78.58479670212171 },
            { lat: -0.272661022285774, lng: -78.58784369156263 },
            { lat: -0.2737714441929678, lng: -78.58998945877454 },
            { lat: -0.276126396592531, lng: -78.59093359634778 },
            { lat: -0.2787817523831197, lng: -78.59059027359388 },
            { lat: -0.28160876687970143, lng: -78.58964613602063 },
            { lat: -0.284392865875207, lng: -78.58900240585706 },
            { lat: -0.28721987900430285, lng: -78.58870199844739 },
            { lat: -0.2872716517721838, lng: -78.5899043573462 },
            { lat: -0.28791000947610673, lng: -78.5904622568213 },
            { lat: -0.28872002634306837, lng: -78.59007601872315 },
            { lat: -0.2894871283559296, lng: -78.58938937321534 },
            { lat: -0.2904688042827019, lng: -78.58827357426514 },
            { lat: -0.29089258785316646, lng: -78.58638529911866 },
            { lat: -0.2909730530862691, lng: -78.58423953190675 },
            { lat: -0.29139683663780297, lng: -78.58243708744874 },
            { lat: -0.2922926828271388, lng: -78.58312373295655 },
            { lat: -0.2935318471987782, lng: -78.58282332554688 },
            { lat: -0.2947710114330939, lng: -78.58170752659669 },
            { lat: -0.2963105789260351, lng: -78.58119254246583 },
            { lat: -0.29815054955149894, lng: -78.58243708744874 },
            { lat: -0.3005913264370085, lng: -78.58411078587403 },
            { lat: -0.30341833546625485, lng: -78.58591323033204 },
            { lat: -0.30637408794971, lng: -78.5858703149878 },
            { lat: -0.3086861188162115, lng: -78.58423953190675 },
            { lat: -0.30983945189139556, lng: -78.58175044194093 },
            { lat: -0.3107352965655278, lng: -78.57913260594239 },
            { lat: -0.31124490877140487, lng: -78.57617144718995 },
            { lat: -0.31248407097975817, lng: -78.57535605564942 },
            { lat: -0.31415238004227675, lng: -78.57531314030518 },
            { lat: -0.3161210916800976, lng: -78.5763431085669 },
            { lat: -0.3184331204020147, lng: -78.57797389164796 },
            { lat: -0.3208738926199966, lng: -78.5800338281714 },
            { lat: -0.32352923755829105, lng: -78.58252291813722 },
            { lat: -0.3245109103598503, lng: -78.58509783879151 },
            { lat: -0.32579520681334806, lng: -78.58742041804788 },
            { lat: -0.32793021044665527, lng: -78.59025283076761 },
            { lat: -0.3300652136246343, lng: -78.59265609004495 },
            { lat: -0.333573484181715, lng: -78.5910253069639 },
            { lat: -0.33768255789128676, lng: -78.58853621699808 },
            { lat: -0.3419632881851162, lng: -78.58536048152445 },
            { lat: -0.3465015039303383, lng: -78.58252806880472 },
            { lat: -0.3512972047307577, lng: -78.58098311641214 },
            { lat: -0.3563503901589079, lng: -78.58029647090433 },
            { lat: -0.3620043756624515, lng: -78.5774640581846 },
            { lat: -0.3676583576407956, lng: -78.57463164546488 },
            { lat: -0.3684308178999823, lng: -78.57424540736673 },
            { lat: -0.3711719784171814, lng: -78.5739879153013 },
            { lat: -0.3735269082028609, lng: -78.57437415339945 },
            { lat: -0.3760964094585641, lng: -78.57351584651468 },
            { lat: -0.3768205902606174, lng: -78.57295794703958 },
            { lat: -0.37780225747391666, lng: -78.57274337031839 },
            { lat: -0.37904100059050294, lng: -78.56999694184663 },
            { lat: -0.3817767934854322, lng: -78.56767951325776 },
            { lat: -0.3858858454901864, lng: -78.56476126984955 },
            { lat: -0.3900807242099341, lng: -78.56029807404877 },
            { lat: -0.3936748002230409, lng: -78.55446158723237 },
            { lat: -0.3916900121676106, lng: -78.55120002107026 },
            { lat: -0.3909926540904898, lng: -78.54716597871186 },
            { lat: -0.39057423921640655, lng: -78.54592143372895 },
            { lat: -0.39067884293687066, lng: -78.54523478822114 },
            { lat: -0.39089073252051665, lng: -78.54433356599213 },
            { lat: -0.3916638388454959, lng: -78.54241847991943 },
            { lat: -0.3912534704442971, lng: -78.54130268096924 },
            { lat: -0.39052124442370645, lng: -78.53864192962646 },
            { lat: -0.389316960463642, lng: -78.53716135025024 },
            { lat: -0.3882244796884979, lng: -78.53601003822632 },
            { lat: -0.3874064246788043, lng: -78.53534485039063 },
            { lat: -0.3871107178894587, lng: -78.53506590065308 },
            { lat: -0.38636466453573215, lng: -78.53446537706702 },
            { lat: -0.3854621216751816, lng: -78.53417569849341 },
            { lat: -0.3845166643412813, lng: -78.53387529108375 },
            { lat: -0.3839145219562945, lng: -78.53328520510047 },
            { lat: -0.3836986089749585, lng: -78.532480542396 },
            { lat: -0.38326812407044614, lng: -78.53181535456031 },
            { lat: -0.38225829491049435, lng: -78.53159004900306 },
            { lat: -0.38153379879660837, lng: -78.53149322146339 },
            { lat: -0.38049696236328284, lng: -78.53125153727626 },
            { lat: -0.3799544975350447, lng: -78.53114424891567 },
            { lat: -0.3790097101324071, lng: -78.53091894335842 },
            { lat: -0.37760359270720634, lng: -78.53065072245693 },
            { lat: -0.3758327024839059, lng: -78.53031276412105 },
            { lat: -0.37363830299826256, lng: -78.52993434562154 },
            { lat: -0.37072950869254395, lng: -78.52926915778585 },
            { lat: -0.3686454756697645, lng: -78.52886146201558 },
            { lat: -0.3663897842937665, lng: -78.52845376624532 },
            { lat: -0.3646919805408511, lng: -78.52939790381856 },
            { lat: -0.36318729163904995, lng: -78.53081411017843 },
            { lat: -0.361682602486761, lng: -78.53238052024312 },
            { lat: -0.3601779130850148, lng: -78.53414004935689 },
            { lat: -0.3596334353970992, lng: -78.53455847396322 },
            { lat: -0.35920898417203834, lng: -78.53467649115987 },
            { lat: -0.3588301295864158, lng: -78.5345906604714 },
            { lat: -0.35852402848056325, lng: -78.53448873652883 },
            { lat: -0.35820719873809137, lng: -78.5343760837502 },
            { lat: -0.35792791917824146, lng: -78.53409445180364 },
            { lat: -0.3576486396098804, lng: -78.53377258672185 },
            { lat: -0.35742836748334733, lng: -78.53341853513189 },
            { lat: -0.35735561397920157, lng: -78.53308057679601 },
            { lat: -0.3573150463568231, lng: -78.53270506753393 },
            { lat: -0.3572259615883787, lng: -78.53182033598262 },
            { lat: -0.3571662835975352, lng: -78.53112296163874 },
            { lat: -0.35704759815391, lng: -78.53027001917201 },
            { lat: -0.356832355057337, lng: -78.52939025461512 },
            { lat: -0.3565205543010354, lng: -78.52839783727961 },
            { lat: -0.35608000998865824, lng: -78.5273678690179 },
            { lat: -0.355564365249258, lng: -78.5262520700677 },
            { lat: -0.35499507733056523, lng: -78.52509335577327 },
            { lat: -0.35425949559810116, lng: -78.52417604029017 },
            { lat: -0.3535829212821478, lng: -78.52358058988887 },
            { lat: -0.35280442490714103, lng: -78.5231192499383 },
            { lat: -0.35206884300113317, lng: -78.52289394438105 },
            { lat: -0.3514029971601633, lng: -78.52287248670893 },
            { lat: -0.35073178695419327, lng: -78.5229207664712 },
            { lat: -0.35005521238220527, lng: -78.52297977506953 },
            { lat: -0.34810125938022757, lng: -78.52329091131526 },
            { lat: -0.3469090394016989, lng: -78.52344111502009 },
            { lat: -0.345641718787401, lng: -78.52361277639704 },
            { lat: -0.34449241306819633, lng: -78.52354840338069 },
            { lat: -0.3436649665077211, lng: -78.52318362295466 },
            { lat: -0.34317614269560387, lng: -78.52295295297938 },
            { lat: -0.34263903995965606, lng: -78.52269009649592 },
            { lat: -0.3420858442263634, lng: -78.52241114675837 },
            { lat: -0.34158092736559265, lng: -78.52212146818476 },
            { lat: -0.34078912589087773, lng: -78.52172360937112 },
            { lat: -0.33999453549294995, lng: -78.52129982034677 },
            { lat: -0.339317960157438, lng: -78.5209994129371 },
            { lat: -0.33851264098976563, lng: -78.52072046319955 },
            { lat: -0.3377341433794187, lng: -78.52058098833078 },
            { lat: -0.33686445217683425, lng: -78.52043078462594 },
            { lat: -0.33606449713166386, lng: -78.52026985208505 },
            { lat: -0.3353771928703693, lng: -78.52011964838022 },
            { lat: -0.33474889615219705, lng: -78.51997480909341 },
            { lat: -0.33417424266181434, lng: -78.51987824956888 },
            { lat: -0.33362104644620966, lng: -78.51979778329843 },
            { lat: -0.33305175721729374, lng: -78.51971731702798 },
            { lat: -0.3324824679555164, lng: -78.51963685075754 },
            { lat: -0.331196619467502, lng: -78.5193673913393 },
            { lat: -0.3301224126458298, lng: -78.51910989927387 },
            { lat: -0.32871561726948323, lng: -78.51905625509357 },
            { lat: -0.32745902294781215, lng: -78.51900261091328 },
            { lat: -0.32579282025368583, lng: -78.51939147831649 },
            { lat: -0.32443389014609036, lng: -78.51983842202912 },
            { lat: -0.3225732846166952, lng: -78.5203692212886 },
            { lat: -0.3199453103636572, lng: -78.52126560698883 },
            { lat: -0.3185049864782127, lng: -78.5214995627914 },
            { lat: -0.317215489001515, lng: -78.52176952207213 },
            { lat: -0.31511401521924537, lng: -78.52197572700993 },
            { lat: -0.3131805526879489, lng: -78.52232519689471 },
            { lat: -0.31050609802055734, lng: -78.52207251201912 },
            { lat: -0.3066899652817108, lng: -78.52180524493406 },
            { lat: -0.3050060148547218, lng: -78.52164050186894 },
            { lat: -0.3028153220271212, lng: -78.52162502841873 },
            { lat: -0.3004258411014719, lng: -78.5211529596321 },
            { lat: -0.2983211648464661, lng: -78.52080648884623 },
            { lat: -0.29712923976591415, lng: -78.52067237839549 },
            { lat: -0.29596325734145085, lng: -78.5203806873825 },
            { lat: -0.2951740278402811, lng: -78.52016611066131 },
            { lat: -0.2927088650889175, lng: -78.51968811808848 },
            { lat: -0.29122179273372656, lng: -78.51958242559346 },
            { lat: -0.2898586302200967, lng: -78.51962128249625 },
            { lat: -0.28892389230154797, lng: -78.51971784202078 },
            { lat: -0.28797525089438214, lng: -78.5197417948429 },
            { lat: -0.28686885359708947, lng: -78.51928045489234 },
            { lat: -0.2858482858134495, lng: -78.51890494563025 },
            { lat: -0.2848706327529983, lng: -78.51844360567969 },
            { lat: -0.28395735183558535, lng: -78.51795007922095 },
            { lat: -0.2829367837940787, lng: -78.5174350950901 },
            { lat: -0.2818947582503971, lng: -78.5169308397953 },
            { lat: -0.2803592120734602, lng: -78.51596524454993 },
            { lat: -0.2790275111647823, lng: -78.51496746279639 },
            { lat: -0.27769581010538424, lng: -78.51380874850196 },
            { lat: -0.27668597022916414, lng: -78.51282169558448 },
            { lat: -0.27554738572381293, lng: -78.51165225245398 },
            { lat: -0.27423714170023145, lng: -78.51048280932349 },
            { lat: -0.2725621212402374, lng: -78.50893785693091 },
            { lat: -0.27189559982338535, lng: -78.50850870348853 },
            { lat: -0.2709286743222996, lng: -78.50811173655433 },
            { lat: -0.26990810515908764, lng: -78.5077469561283 },
            { lat: -0.2689197220639471, lng: -78.50759675242347 },
            { lat: -0.2677167645118349, lng: -78.50744654871863 },
            { lat: -0.26657817916149934, lng: -78.50745727755469 },
            { lat: -0.2654717798686122, lng: -78.50750019289893 },
            { lat: -0.2644941251383189, lng: -78.50691010691565 },
            { lat: -0.2631284815257488, lng: -78.50549293301447 },
            { lat: -0.26117317162063514, lng: -78.50416255734308 },
            { lat: -0.259217861411346, lng: -78.50278926632745 },
            { lat: -0.258348834554614, lng: -78.50253177426202 },
            { lat: -0.2580727129920485, lng: -78.5024686902301 },
            { lat: -0.2578256169907106, lng: -78.50254647429153 },
            { lat: -0.25668503986973434, lng: -78.50333033975494 },
            { lat: -0.2558884317617196, lng: -78.50421010431182 },
            { lat: -0.2554351429508819, lng: -78.50500403818023 },
            { lat: -0.2554312827941686, lng: -78.50445985794067 },
            { lat: -0.254720504448933, lng: -78.50643396377563 },
            { lat: -0.2543745029006449, lng: -78.50720643997192 },
            { lat: -0.25366372449716695, lng: -78.50810766220093 },
            { lat: -0.25285638747077394, lng: -78.51001739501953 },
            { lat: -0.25287516275103533, lng: -78.51104736328125 },
            { lat: -0.2523789589066249, lng: -78.51261377334595 },
            { lat: -0.2518827550432838, lng: -78.51460933685303 },
            { lat: -0.2510432317071608, lng: -78.51651906967163 },
            { lat: -0.24964581414966558, lng: -78.51711988449097 },
            { lat: -0.248966024674634, lng: -78.5175890173436 },
            { lat: -0.24791326753318588, lng: -78.51796452660568 },
            { lat: -0.24837612402380935, lng: -78.5204898617061 },
            { lat: -0.24685130243844955, lng: -78.52281801913102 },
            { lat: -0.245132022305813, lng: -78.52318279955705 },
            { lat: -0.24394917890377288, lng: -78.52414839480241 },
            { lat: -0.24270196295910237, lng: -78.52352612231095 },
            { lat: -0.24145474689942298, lng: -78.52238886568864 },
            { lat: -0.23956380620379478, lng: -78.52296822283586 },
            { lat: -0.2386813671230797, lng: -78.52412693713029 },
            { lat: -0.23780965672940202, lng: -78.52550022814592 },
            { lat: -0.23725042095552298, lng: -78.5259293815883 },
            { lat: -0.23609037545330516, lng: -78.52680914614518 },
            { lat: -0.2353801914849505, lng: -78.52718068670515 },
            { lat: -0.23497719297536795, lng: -78.52750791620497 },
            { lat: -0.2345795588272234, lng: -78.52803899358992 },
            { lat: -0.23402635784348377, lng: -78.52863980840925 },
            { lat: -0.23344097059693378, lng: -78.5293318183351 },
            { lat: -0.23285558332602074, lng: -78.52995409082655 },
            { lat: -0.23228092477869605, lng: -78.53046907495741 },
            { lat: -0.2310422173664314, lng: -78.53092925696285 },
            { lat: -0.23046027737117192, lng: -78.53150367032089 },
            { lat: -0.2293515968374874, lng: -78.5318578996334 },
            { lat: -0.2284121606258271, lng: -78.53190617939566 },
            { lat: -0.22753138579693852, lng: -78.532101875237 },
            { lat: -0.22690844765176005, lng: -78.5324076470647 },
            { lat: -0.22639279700322, lng: -78.53274024098255 },
            { lat: -0.22592006134702, lng: -78.53344297974445 },
            { lat: -0.22557070633448012, lng: -78.53421009152271 },
            { lat: -0.22519155052797632, lng: -78.53493688156686 },
            { lat: -0.25809200741964544, lng: -78.5029149055481 },
            { lat: -0.256919270597676, lng: -78.50281364271268 },
            { lat: -0.25638216363103067, lng: -78.50303894826993 },
            { lat: -0.25592015774530497, lng: -78.5032857114993 },
            { lat: -0.2553294070892443, lng: -78.50355393240079 },
            { lat: -0.2544060657711246, lng: -78.50395626375303 },
            { lat: -0.2537241208336129, lng: -78.50426739999875 },
            { lat: -0.25319774246493676, lng: -78.50428349325284 },
            { lat: -0.25261235605020355, lng: -78.50422984907254 },
            { lat: -0.25220935805635436, lng: -78.50411183187589 },
            { lat: -0.25174735202142245, lng: -78.50397235700711 },
            { lat: -0.2512317023056373, lng: -78.50372022935971 },
            { lat: -0.2508126111692446, lng: -78.5034841949664 },
            { lat: -0.25035060508491236, lng: -78.5031784231387 },
            { lat: -0.24977058290957288, lng: -78.50281364271268 },
            { lat: -0.24939440666425133, lng: -78.50246495554074 },
            { lat: -0.2487768338745487, lng: -78.50207335302457 },
            { lat: -0.24802515186242727, lng: -78.50160664865598 },
            { lat: -0.24716081807762103, lng: -78.50135452100858 },
            { lat: -0.24648423713155973, lng: -78.50120431730375 },
            { lat: -0.24573791935833586, lng: -78.50105411359891 },
            { lat: -0.24519008319458116, lng: -78.5010165626727 },
            { lat: -0.2445510527328874, lng: -78.5008717233859 },
            { lat: -0.2440032165206229, lng: -78.50073761293515 },
            { lat: -0.24353347312326998, lng: -78.50053313788209 },
            { lat: -0.24326994846547412, lng: -78.50037756975922 },
            { lat: -0.24284012833828822, lng: -78.50103739317689 },
            { lat: -0.24231374953676402, lng: -78.5018152337912 },
            { lat: -0.24163180397623255, lng: -78.5026252609137 },
            { lat: -0.2408532997104223, lng: -78.50349429663453 },
            { lat: -0.2400318804325653, lng: -78.50434187468323 },
            { lat: -0.23936066350032006, lng: -78.50498560484681 },
            { lat: -0.23854997287601562, lng: -78.50574198778901 },
            { lat: -0.23811478822837676, lng: -78.50614431914124 },
            { lat: -0.2375030898782486, lng: -78.50677580905284 },
            { lat: -0.2369974978134789, lng: -78.50750000548686 },
            { lat: -0.236632049956757, lng: -78.50798280310954 },
            { lat: -0.2363417033040931, lng: -78.50837977004375 },
            { lat: -0.23599234854768963, lng: -78.50883574557628 },
            { lat: -0.23562690066451825, lng: -78.50935072970714 },
            { lat: -0.23532582524530302, lng: -78.50988717151012 },
            { lat: -0.2348155392749842, lng: -78.50968332362498 },
            { lat: -0.23448764197279287, lng: -78.50940437388743 },
            { lat: -0.23418296137343475, lng: -78.5088501141937 },
            { lat: -0.23337696427375074, lng: -78.5086677239807 },
            { lat: -0.23264606836138232, lng: -78.5086140798004 },
            { lat: -0.2321082898769118, lng: -78.50829221471861 },
            { lat: -0.2321069487834099, lng: -78.50724078878477 },
            { lat: -0.23224508141355651, lng: -78.50577093824461 },
            { lat: -0.23227592656379442, lng: -78.50517012342527 },
            { lat: -0.23178106305839466, lng: -78.50440837606504 },
            { lat: -0.23092142207704988, lng: -78.50423671468809 },
            { lat: -0.23050165976927073, lng: -78.5049233601959 },
            { lat: -0.2302750149398076, lng: -78.50583531126097 },
            { lat: -0.23025225396733198, lng: -78.50638802798022 },
            { lat: -0.23028410494216178, lng: -78.50655432493915 },
            { lat: -0.23057881027426236, lng: -78.50680108816852 },
            { lat: -0.23084401154059414, lng: -78.5070505336069 },
            { lat: -0.23087586251408812, lng: -78.50753869564761 },
            { lat: -0.23070386725634023, lng: -78.50817437918414 },
            { lat: -0.23054528293302592, lng: -78.50876714737643 },
            { lat: -0.23044042778704255, lng: -78.50926949013126 },
            { lat: -0.2302791376390711, lng: -78.50958069420722 },
            { lat: -0.23008032050025543, lng: -78.5099562034693 },
            { lat: -0.22969643242505167, lng: -78.51027002192404 },
            { lat: -0.22940105652785472, lng: -78.5104604587641 },
            { lat: -0.22879660005353084, lng: -78.51072588475256 },
            { lat: -0.22850776421073857, lng: -78.51096091182382 },
            { lat: -0.22834649767535772, lng: -78.51106283576638 },
            { lat: -0.22808867237907657, lng: -78.51115134866387 },
            { lat: -0.22775574581931193, lng: -78.51124790818841 },
            { lat: -0.22733930039495293, lng: -78.51158471093731 },
            { lat: -0.22709186855896069, lng: -78.51192266927319 },
            { lat: -0.22676571146997418, lng: -78.5122868149478 },
            { lat: -0.22662053804334661, lng: -78.5123941033084 },
            { lat: -0.22633225467077758, lng: -78.51271033287048 },
            { lat: -0.2251337582894284, lng: -78.51360319919763 },
            { lat: -0.22461810757796424, lng: -78.51379095382867 },
            { lat: -0.2241775581260397, lng: -78.51413964100061 },
            { lat: -0.22396231249859758, lng: -78.51469217605768 },
            { lat: -0.2236826943423287, lng: -78.5154163724917 },
            { lat: -0.22325287361691865, lng: -78.51609765358148 },
            { lat: -0.22296252669233005, lng: -78.51655899353204 },
            { lat: -0.22227224347577434, lng: -78.5175351513617 },
            { lat: -0.22163857635066753, lng: -78.51828616988587 },
            { lat: -0.2208278847193613, lng: -78.51929468047547 },
            { lat: -0.2200708368285374, lng: -78.52015298736023 },
            { lat: -0.2195065604206353, lng: -78.52073197296289 },
            { lat: -0.2188782575566772, lng: -78.52098410061029 },
            { lat: -0.21778312101178393, lng: -78.52192310228048 },
            { lat: -0.21679473409752237, lng: -78.5226097477883 },
            { lat: -0.21622476875125396, lng: -78.52343050374685 },
            { lat: -0.21600415862913408, lng: -78.52366117372213 },
            { lat: -0.2148078275986604, lng: -78.52391002053201 },
            { lat: -0.21438473313084982, lng: -78.52476160085757 },
            { lat: -0.214212402407023, lng: -78.52524976289828 },
            { lat: -0.21391132654637224, lng: -78.52561990774234 },
            { lat: -0.2134600480181231, lng: -78.5260812476929 },
            { lat: -0.2128853887141063, lng: -78.52654258764346 },
            { lat: -0.212128340426769, lng: -78.52721313989719 },
            { lat: -0.21171997689766628, lng: -78.52778176820834 },
            { lat: -0.21168712006151552, lng: -78.52880637205203 },
            { lat: -0.211927846675728, lng: -78.530061645871 },
            { lat: -0.21216857328618743, lng: -78.53169242895206 },
            { lat: -0.21184548048098104, lng: -78.5342643074357 },
            { lat: -0.21192594620120464, lng: -78.53671048205729 },
            { lat: -0.2126099048061784, lng: -78.53862021487589 },
            { lat: -0.2135513536599408, lng: -78.54044411700602 },
            { lat: -0.2147288351935635, lng: -78.54168866198893 },
            { lat: -0.2160565192741525, lng: -78.54136679690714 },
            { lat: -0.2182639614378658, lng: -78.54020808261271 },
            { lat: -0.21966942869793338, lng: -78.5395214371049 },
            { lat: -0.22124484807693637, lng: -78.53952349216127 },
            { lat: -0.22246524402982676, lng: -78.5401243069806 },
            { lat: -0.22338419602740217, lng: -78.54066074878358 },
            { lat: -0.22473333684591698, lng: -78.54108990222596 },
            { lat: -0.22638288260773337, lng: -78.54166925937318 },
            { lat: -0.22751744812042463, lng: -78.54239882022523 },
            { lat: -0.22807534318618325, lng: -78.54194820911073 },
            { lat: -0.2427093520291453, lng: -78.53263557941102 },
            { lat: -0.25120651124950427, lng: -78.5261124470868 },
            { lat: -0.25669962135219304, lng: -78.516241917912 },
            { lat: -0.2576222919596742, lng: -78.51077021152162 },
            { lat: -0.2581587283286797, lng: -78.50699366122865 },
            { lat: -0.25923160099875414, lng: -78.50401104480409 },
            { lat: -0.2593388882607694, lng: -78.50319565326356 },
            { lat: -0.2226524114176885, lng: -78.5331813308519 },
            { lat: -0.22805970296376094, lng: -78.5397902938646 },
            { lat: -0.25852932231324555, lng: -78.5057155105394 },
            { lat: -0.24960301848010907, lng: -78.5057155105394 }
        ];
        this.paths2 = [
            { lat: -0.219050644277108, lng: -78.42515751686204 },
            { lat: -0.21931418513729828, lng: -78.42415698988816 },
            { lat: -0.2194737754036865, lng: -78.4235508106508 },
            { lat: -0.2197621107546231, lng: -78.42275151236436 },
            { lat: -0.2198787859880747, lng: -78.42199512942216 },
            { lat: -0.22019930760169446, lng: -78.42139967902085 },
            { lat: -0.2207773193644879, lng: -78.42091151698014 },
            { lat: -0.22097982464034033, lng: -78.41990837080857 },
            { lat: -0.22104285608324767, lng: -78.41889449580094 },
            { lat: -0.22110588752590057, lng: -78.41788062079331 },
            { lat: -0.22142640911308356, lng: -78.41672727091691 },
            { lat: -0.2221438946492312, lng: -78.41546663267991 },
            { lat: -0.22299012520875877, lng: -78.41418453677079 },
            { lat: -0.22370761066884026, lng: -78.4128166101732 },
            { lat: -0.22436072357115192, lng: -78.41114827616593 },
            { lat: -0.22450958502941265, lng: -78.4101344011583 },
            { lat: -0.22455115894992947, lng: -78.40894886477372 },
            { lat: -0.22427087025778714, lng: -78.40809592230698 },
            { lat: -0.22416863879848362, lng: -78.40769181520079 },
            { lat: -0.2239590928215287, lng: -78.4072237697277 },
            { lat: -0.22364192402509595, lng: -78.40634668737982 },
            { lat: -0.22278863777271787, lng: -78.40455055552582 },
            { lat: -0.2216377215663555, lng: -78.40096326635864 },
            { lat: -0.2208196539149876, lng: -78.39717598722962 },
            { lat: -0.22008741627410047, lng: -78.39313121603516 },
            { lat: -0.21896894332473554, lng: -78.39018078611878 },
            { lat: -0.21791484284282542, lng: -78.38770242498902 },
            { lat: -0.2168821998055476, lng: -78.38488074110535 },
            { lat: -0.21614996197278397, lng: -78.38255258368042 },
            { lat: -0.1439858444406881, lng: -78.39653209041217 },
            { lat: -0.1432637385100067, lng: -78.39808222645394 },
            { lat: -0.14401207247357217, lng: -78.39850065106026 },
            { lat: -0.14506081286143271, lng: -78.39911219471566 },
            { lat: -0.1455945707384121, lng: -78.40053912991158 },
            { lat: -0.14617124380736857, lng: -78.40190169209114 },
            { lat: -0.1471341536894851, lng: -78.40141889446846 },
            { lat: -0.14874079153385086, lng: -78.40153691166512 },
            { lat: -0.14936037971978697, lng: -78.4023630320417 },
            { lat: -0.15064515343486518, lng: -78.40273854130379 },
            { lat: -0.15167243591249835, lng: -78.40332862728707 },
            { lat: -0.15248514238116367, lng: -78.40466973179451 },
            { lat: -0.15351242477124255, lng: -78.40553876751534 },
            { lat: -0.15466845267596985, lng: -78.40636488789193 },
            { lat: -0.15535241347165876, lng: -78.40753433102242 },
            { lat: -0.15640115331535184, lng: -78.40844628208748 },
            { lat: -0.15622681037819988, lng: -78.41081735485665 },
            { lat: -0.1572970077694989, lng: -78.411600559889 },
            { lat: -0.15883927208388834, lng: -78.41259834164254 },
            { lat: -0.15971221909044453, lng: -78.41318724405824 },
            { lat: -0.16060270900441917, lng: -78.41365931284486 },
            { lat: -0.16145564810251067, lng: -78.41346619379578 },
            { lat: -0.1627806540517993, lng: -78.41301558268128 },
            { lat: -0.1636765082273298, lng: -78.41256497156678 },
            { lat: -0.16487276853103297, lng: -78.4129297519928 },
            { lat: -0.1663694349083814, lng: -78.41286537897645 },
            { lat: -0.16795193149212007, lng: -78.4125864292389 },
            { lat: -0.16970608857246583, lng: -78.41222164881287 },
            { lat: -0.17055902727892927, lng: -78.41310141336976 },
            { lat: -0.17115447503273457, lng: -78.41372368586121 },
            { lat: -0.1736381893372859, lng: -78.41151354563294 },
            { lat: -0.17492027931525975, lng: -78.41029045832215 },
            { lat: -0.17619700481299558, lng: -78.40896008265076 },
            { lat: -0.17756492489203238, lng: -78.40838072550355 },
            { lat: -0.17944782648217483, lng: -78.40711472284852 },
            { lat: -0.1815023883949862, lng: -78.40580580484925 },
            { lat: -0.18364278032220951, lng: -78.40466854822694 },
            { lat: -0.1848390393580545, lng: -78.4054195667511 },
            { lat: -0.18568818987053873, lng: -78.40543092634834 },
            { lat: -0.18765155644913548, lng: -78.40478719618477 },
            { lat: -0.18961492280737066, lng: -78.40405763533272 },
            { lat: -0.19157828894296702, lng: -78.40349973585762 },
            { lat: -0.19371331525030866, lng: -78.40337098982491 },
            { lat: -0.19464671862699282, lng: -78.40444387343086 },
            { lat: -0.19506514081356569, lng: -78.40689004805245 },
            { lat: -0.19642769504125276, lng: -78.40967954542793 },
            { lat: -0.19856272073336062, lng: -78.41392816450752 },
            { lat: -0.19871367247892555, lng: -78.4157754867777 },
            { lat: -0.19967792079235608, lng: -78.41615636045782 },
            { lat: -0.1999984428200459, lng: -78.41686982805578 },
            { lat: -0.20056572656083047, lng: -78.41752965147344 },
            { lat: -0.20155143230475892, lng: -78.41772813494055 },
            { lat: -0.20245130783658488, lng: -78.4181519239649 },
            { lat: -0.2032331668646949, lng: -78.41900486643164 },
            { lat: -0.203950653246552, lng: -78.42040497953741 },
            { lat: -0.20424971765423372, lng: -78.42091459925024 },
            { lat: -0.2045273245209505, lng: -78.42126328642217 },
            { lat: -0.2049229478251259, lng: -78.42151541406957 },
            { lat: -0.20485723412442838, lng: -78.4267779081568 },
            { lat: -0.2041893683347445, lng: -78.42884857351629 },
            { lat: -0.20485186974068836, lng: -78.43076903517095 },
            { lat: -0.20753137919531683, lng: -78.43140203649847 },
            { lat: -0.20905218165721956, lng: -78.43370873625128 },
            { lat: -0.2102082060051071, lng: -78.43635875875799 },
            { lat: -0.2113427727412814, lng: -78.43954522306768 },
            { lat: -0.2106105346444045, lng: -78.44281751806585 },
            { lat: -0.20942768841530926, lng: -78.4451671331629 },
            { lat: -0.21002581701854242, lng: -78.44979126150457 }
        ];
        this.paths3 = [
            { lat: -0.41303866242186105, lng: -78.54771762171208 },
            { lat: -0.4123922668193074, lng: -78.54646234789311 },
            { lat: -0.41170295692805425, lng: -78.54520707407414 },
            { lat: -0.41088490425605567, lng: -78.5437586812061 },
            { lat: -0.40914419517711653, lng: -78.54306130686223 },
            { lat: -0.4073176572013615, lng: -78.54242830553471 },
            { lat: -0.4055769473502218, lng: -78.5416880158466 },
            { lat: -0.40486617973779343, lng: -78.54015379229008 },
            { lat: -0.40454164054308206, lng: -78.53915601053654 },
            { lat: -0.4043673013009077, lng: -78.53796510973393 },
            { lat: -0.4041929620549675, lng: -78.53673129358708 },
            { lat: -0.40371822285863684, lng: -78.53532581606328 },
            { lat: -0.40255685510335265, lng: -78.53370576181828 },
            { lat: -0.40103071570010823, lng: -78.53268652239262 },
            { lat: -0.39668228700667485, lng: -78.52737268234756 },
            { lat: -0.39513200720706176, lng: -78.52284511353042 },
            { lat: -0.3909639524737182, lng: -78.51921876694229 },
            { lat: -0.388426641434891, lng: -78.51584991241958 },
            { lat: -0.3872625893923301, lng: -78.51243814255264 },
            { lat: -0.3858839653379571, lng: -78.50851138855484 },
            { lat: -0.3834753959290997, lng: -78.50608667160537 },
            { lat: -0.38033728109530934, lng: -78.50336154724624 },
            { lat: -0.3778428813105254, lng: -78.50110849167373 },
            { lat: -0.37659299899819226, lng: -78.49855502869156 },
            { lat: -0.37624431935117264, lng: -78.49621614243057 },
            { lat: -0.37618814720340366, lng: -78.49318711181832 },
            { lat: -0.3753700910485323, lng: -78.49158851524544 },
            { lat: -0.3742516338211835, lng: -78.48956076523018 },
            { lat: -0.37278986097098704, lng: -78.48759738823128 },
            { lat: -0.3716284889738734, lng: -78.48548380752754 },
            { lat: -0.37093917573012475, lng: -78.48337022682381 },
            { lat: -0.370421520223852, lng: -78.48134247680855 },
            { lat: -0.3699253219122327, lng: -78.47914306541634 },
            { lat: -0.36897852181367796, lng: -78.47700802704048 },
            { lat: -0.36753820532329023, lng: -78.47590295692635 },
            { lat: -0.365604372202935, lng: -78.47434727569771 },
            { lat: -0.3633272228214457, lng: -78.47292034050179 },
            { lat: -0.36087841489572636, lng: -78.47095696350289 },
            { lat: -0.35913769560765196, lng: -78.4695729436512 },
            { lat: -0.35698928814038494, lng: -78.46786705871773 },
            { lat: -0.35493570874614216, lng: -78.46612915336789 },
            { lat: -0.35255127037797546, lng: -78.46435889541806 },
            { lat: -0.35018828867056156, lng: -78.46248134910763 },
            { lat: -0.3479540500270006, lng: -78.46049651443661 },
            { lat: -0.34713215005845444, lng: -78.45943425004884 },
            { lat: -0.34629397508770093, lng: -78.45806632345125 },
            { lat: -0.3456167296571913, lng: -78.45691297357484 },
            { lat: -0.34505749923560053, lng: -78.45498714750215 },
            { lat: -0.3458122797421589, lng: -78.45240522832188 },
            { lat: -0.3463648047192929, lng: -78.44903637379917 },
            { lat: -0.3464452695191021, lng: -78.44553877324375 },
            { lat: -0.3465686488774874, lng: -78.44392944783482 },
            { lat: -0.3466920282342569, lng: -78.44232012242588 },
            { lat: -0.3468154075894234, lng: -78.44071079701695 },
            { lat: -0.3460375811930315, lng: -78.44026018590245 },
            { lat: -0.3451457629187021, lng: -78.44010461777958 },
            { lat: -0.34469381888909223, lng: -78.43963791341099 },
            { lat: -0.3445422768209503, lng: -78.43908537835392 },
            { lat: -0.3447662372216911, lng: -78.4385221144608 },
            { lat: -0.3450438408248789, lng: -78.43778718919071 },
            { lat: -0.3443451380207396, lng: -78.43767453641209 },
            { lat: -0.3436142492360706, lng: -78.43798030823979 },
            { lat: -0.3417645716678424, lng: -78.43792548844499 },
            { lat: -0.3397109568084175, lng: -78.43805500575661 },
            { lat: -0.3374739579635664, lng: -78.43854316779732 },
            { lat: -0.3367108827055978, lng: -78.43883821078896 },
            { lat: -0.335435612130757, lng: -78.43956597762161 },
            { lat: -0.3344454417497189, lng: -78.44041228136439 },
            { lat: -0.33297427505856325, lng: -78.44112574896235 },
            { lat: -0.3312576637317517, lng: -78.4420810040491 },
            { lat: -0.33053240601972206, lng: -78.44270318903517 },
            { lat: -0.3298784228388608, lng: -78.44320196067741 },
            { lat: -0.3291009691148419, lng: -78.44364382877347 },
            { lat: -0.3303347648321087, lng: -78.44281770839689 },
            { lat: -0.328475148000362, lng: -78.44396782577547 },
            { lat: -0.3276767443689785, lng: -78.44444139134674 },
            { lat: -0.3268127749762128, lng: -78.44558666506322 },
            { lat: -0.3258234311260088, lng: -78.44619238797623 },
            { lat: -0.32532387776211225, lng: -78.44663495246368 },
            { lat: -0.32475458805954815, lng: -78.44693804208237 },
            { lat: -0.3241101976743843, lng: -78.44716602984863 },
            { lat: -0.3235999155608952, lng: -78.4473940176149 },
            { lat: -0.32312718375085087, lng: -78.44801360789734 },
            { lat: -0.3226329945868964, lng: -78.44873512212234 },
            { lat: -0.3222997353949398, lng: -78.44894701663452 },
            { lat: -0.31991179596701114, lng: -78.44851521400761 },
            { lat: -0.31863355689204126, lng: -78.4492543153342 },
            { lat: -0.3185142004358919, lng: -78.45008580012882 },
            { lat: -0.31676408594831623, lng: -78.45029501243198 },
            { lat: -0.31525000198838304, lng: -78.45049349589908 },
            { lat: -0.31433672360312415, lng: -78.45057396216953 },
            { lat: -0.31236671754579254, lng: -78.45083908548895 },
            { lat: -0.30643754909909127, lng: -78.4513869827556 },
            { lat: -0.3022287373859929, lng: -78.45384141192244 },
            { lat: -0.3005926125262903, lng: -78.4564807055931 },
            { lat: -0.2976261297794258, lng: -78.45976372942732 },
            { lat: -0.2932434585130056, lng: -78.46274634585188 },
            { lat: -0.2903198885975487, lng: -78.46178075060652 },
            { lat: -0.28889833597972686, lng: -78.46038600191878 },
            { lat: -0.2856314464609581, lng: -78.45907708391951 },
            { lat: -0.2823645560135946, lng: -78.4571673511009 },
            { lat: -0.28042802446049664, lng: -78.45474263415144 },
            { lat: -0.2781910887221759, lng: -78.45296164736556 },
            { lat: -0.27436630313392907, lng: -78.45336934313582 },
            { lat: -0.2707346332176977, lng: -78.45315476641463 },
            { lat: -0.2679639419215945, lng: -78.45232864603804 },
            { lat: -0.2560574571216118, lng: -78.45344537441713 },
            { lat: -0.2486605053615815, lng: -78.45015071134628 },
            { lat: -0.2414400647375236, lng: -78.44701789121689 },
            { lat: -0.23979896595118708, lng: -78.44484723382521 },
            { lat: -0.23756202304250937, lng: -78.44104922586013 },
            { lat: -0.23412346021655897, lng: -78.43982613854934 },
            { lat: -0.23214400635005655, lng: -78.4376589136653 },
            { lat: -0.23205281199178876, lng: -78.43523419671584 },
            { lat: -0.22882882283226408, lng: -78.43336737924147 },
            { lat: -0.2259481530365809, lng: -78.43180096917678 },
            { lat: -0.2230674826697337, lng: -78.42976249032546 },
            { lat: -0.22057304698008784, lng: -78.4265652971797 },
            { lat: -0.22018144736060294, lng: -78.42508471780349 },
            { lat: -0.22193559900030457, lng: -78.42253125482131 },
            { lat: -0.22214480973247083, lng: -78.41950572305251 },
            { lat: -0.22263565028477122, lng: -78.41747797303725 },
            { lat: -0.22409207871250336, lng: -78.41525710397292 },
            { lat: -0.2249262393122101, lng: -78.4133795576625 },
            { lat: -0.22580331487528837, lng: -78.41049350076247 },
            { lat: -0.22573626017048798, lng: -78.40850866609145 },
            { lat: -0.22508985280046725, lng: -78.40628779702712 },
            { lat: -0.22416449780181982, lng: -78.4034017401271 },
            { lat: -0.22328687040585057, lng: -78.40052548470277 },
            { lat: -0.22220863053022258, lng: -78.39471045555848 },
            { lat: -0.22057249524538697, lng: -78.38906708779115 },
            { lat: -0.21743433362310555, lng: -78.38213625969667 },
            { lat: -0.21601813739477588, lng: -78.38288727822084 },
            { lat: -0.14598064942966005, lng: -78.39816514076966 },
            { lat: -0.14134580682293843, lng: -78.39833680214662 },
            { lat: -0.1222914444971784, lng: -78.37636414589662 },
            { lat: -0.12257579809687515, lng: -78.37491061767287 },
            { lat: -0.12394372152903083, lng: -78.37278630813307 },
            { lat: -0.12595537350657138, lng: -78.37036159118361 },
            { lat: -0.12736621200100115, lng: -78.36742189010329 },
            { lat: -0.12946369418241288, lng: -78.36431052764601 },
            { lat: -0.13177575234493083, lng: -78.36210038741774 },
            { lat: -0.1353752670604249, lng: -78.36040523132033 },
            { lat: -0.13785898554746925, lng: -78.35991170486159 },
            { lat: -0.1412010080696344, lng: -78.35911777099318 },
            { lat: -0.14312682821405823, lng: -78.35866715987868 },
            { lat: -0.14522430902299702, lng: -78.35774447997755 },
            { lat: -0.14792260246244168, lng: -78.356564308011 },
            { lat: -0.15049214998558477, lng: -78.3552124746675 },
            { lat: -0.15374834025271356, lng: -78.35334565719313 },
            { lat: -0.15644663263534894, lng: -78.35113551696486 },
            { lat: -0.15798621481390338, lng: -78.34974076827712 },
            { lat: -0.15750878341876803, lng: -78.34744479736037 },
            { lat: -0.1536839674680175, lng: -78.3466937788362 },
            { lat: -0.1382314395591519, lng: -78.3488093483005 },
            { lat: -0.09600283000572946, lng: -78.3488093483005 },
            { lat: -0.09238292871185122, lng: -78.34867480293076 },
            { lat: -0.08834352695998102, lng: -78.3480525304393 },
            { lat: -0.08644988959853542, lng: -78.34609988227646 },
            { lat: -0.08481374392684786, lng: -78.34393265739243 },
            { lat: -0.06507270256216423, lng: -78.3392978002147 },
            { lat: -0.06284110605223306, lng: -78.32951310172837 },
            { lat: -0.059327215572087366, lng: -78.32515981665244 },
            { lat: -0.05536827704995196, lng: -78.32056787481895 },
            { lat: -0.05304012066703318, lng: -78.31348684301963 },
            { lat: -0.05225691596534623, lng: -78.30503252020469 },
            { lat: -0.05095872732878016, lng: -78.29580572119346 },
            { lat: -0.0494030466968429, lng: -78.2852056311666 },
            { lat: -0.051280592282454796, lng: -78.27941205969444 },
            { lat: -0.05350146041820061, lng: -78.27464845648399 },
            { lat: -0.057868094631120935, lng: -78.27288892737022 },
            { lat: -0.061296481126749486, lng: -78.27181663492695 },
            { lat: -0.06858135612725015, lng: -78.27074375132099 },
            { lat: -0.07492209326324452, lng: -78.26958503702656 },
            { lat: -0.08160615188878502, lng: -78.2685121534206 },
            { lat: -0.08837603999019322, lng: -78.26743926981464 },
            { lat: -0.09548924913660779, lng: -78.26713886240498 },
            { lat: -0.09728096222327294, lng: -78.26812591532246 },
            { lat: -0.1029350501940852, lng: -78.27185955027119 },
            { lat: -0.10627171264744166, lng: -78.2756790159084 },
            { lat: -0.11705367364951562, lng: -78.27661561711773 },
            { lat: -0.13383353296958908, lng: -78.2778172467564 },
            { lat: -0.14786680809714106, lng: -78.28279542668804 },
            { lat: -0.16430332389404506, lng: -78.28846025212749 },
            { lat: -0.18314307332992663, lng: -78.29515504582866 },
            { lat: -0.2036994059764019, lng: -78.30184983952984 },
            { lat: -0.22356907213821356, lng: -78.30202150090679 },
            { lat: -0.2365723165805358, lng: -78.30219316228374 },
            { lat: -0.27051802100501504, lng: -78.31472444280132 },
            { lat: -0.2921041788466417, lng: -78.32382249577984 },
            { lat: -0.3184967406347897, lng: -78.33635377629741 },
            { lat: -0.34042611885812657, lng: -78.34991502507671 },
            { lat: -0.3465629027974792, lng: -78.35969972356304 },
            { lat: -0.3695221635214333, lng: -78.39832353337749 },
            { lat: -0.3818386025326804, lng: -78.41669130071148 },
            { lat: -0.3965582259626128, lng: -78.44192552312359 },
            { lat: -0.4136810202191936, lng: -78.47162294133648 },
            { lat: -0.4160413022787784, lng: -78.49342393620952 },
            { lat: -0.41599838806580147, lng: -78.51282167180523 },
            { lat: -0.4238516851292992, lng: -78.53290605290874 },
            { lat: -0.42389459929916057, lng: -78.53736924870952 },
            { lat: -0.41847668348194333, lng: -78.54333448155865 },
            { lat: -0.41829429813163055, lng: -78.5469822858189 }
        ];
        this.paths4 = [
            { lat: -0.002034522269828024, lng: -78.4532374314199 },
            { lat: 0.0006369579085644908, lng: -78.44332398690085 },
            { lat: 0.004424237033203429, lng: -78.43366803444724 },
            { lat: 0.019369505299643076, lng: -78.42538537300925 },
            { lat: 0.02298512280415032, lng: -78.42843236245017 },
            { lat: 0.023253343683804235, lng: -78.43079270638327 },
            { lat: 0.02386488728749207, lng: -78.43323888100485 },
            { lat: 0.02421893884629384, lng: -78.4362000397573 },
            { lat: 0.02380051427670947, lng: -78.43916119850974 },
            { lat: 0.02372541243075191, lng: -78.4416932038198 },
            { lat: 0.02176203558663504, lng: -78.44499768532614 },
            { lat: 0.018682859829693022, lng: -78.44813050545554 },
            { lat: 0.01534619196275262, lng: -78.45126332558493 },
            { lat: 0.015528582169161788, lng: -78.45534028328757 },
            { lat: 0.01682677128059739, lng: -78.45967473305564 },
            { lat: 0.01924075927423577, lng: -78.4625500611196 },
            { lat: 0.013329170846822695, lng: -78.46911610878806 },
            { lat: 0.01242977140834671, lng: -78.46871569587898 },
            { lat: 0.012024757856322895, lng: -78.46838310196114 },
            { lat: 0.010847268122263344, lng: -78.46762135460091 },
            { lat: 0.009498117009069088, lng: -78.46679523422432 },
            { lat: 0.007762727796180411, lng: -78.46569016411019 },
            { lat: 0.0060273385761800136, lng: -78.46449926330757 },
            { lat: 0.0043563223668222715, lng: -78.46322253181648 },
            { lat: 0.0034148670047798643, lng: -78.4617312236042 },
            { lat: 0.002194461904499699, lng: -78.45996096565437 },
            { lat: 0.0015104986060704624, lng: -78.45812633468819 },
            { lat: 0.0011269427170304057, lng: -78.45616295768929 },
            { lat: 0.0007863021721888034, lng: -78.45415666534615 },
            { lat: 0.0004016744232444305, lng: -78.45300785058532 },
            { lat: -0.0004941833877236567, lng: -78.45247140878234 },
            { lat: -0.001862109984989241, lng: -78.45184913629089 },
            { lat: -0.0022429836648634326, lng: -78.45204225533996 }
        ];
        this.paths5 = [
            { lat: -0.06492094886824687, lng: -78.45308841616793 },
            { lat: -0.06722764708704097, lng: -78.45257343203707 },
            { lat: -0.06970600644712789, lng: -78.45240177066012 },
            { lat: -0.07312850249088296, lng: -78.45223010928316 },
            { lat: -0.07698015133090634, lng: -78.45188678652926 },
            { lat: -0.07791355921536522, lng: -78.45154346377535 },
            { lat: -0.0788469670791505, lng: -78.45154346377535 },
            { lat: -0.07902858135621824, lng: -78.4495496749878 },
            { lat: -0.07861820376529015, lng: -78.44789743423462 },
            { lat: -0.07831451704709581, lng: -78.44600984385096 },
            { lat: -0.07831451704709581, lng: -78.445838182474 },
            { lat: -0.08964415573766547, lng: -78.44635316660487 },
            { lat: -0.102003757568992, lng: -78.44909974863612 },
            { lat: -0.08191940243826855, lng: -78.41476747324549 },
            { lat: -0.08466598156704164, lng: -78.40772935679041 },
            { lat: -0.07797119461249237, lng: -78.40498277475916 },
            { lat: -0.07436630888251422, lng: -78.40463945200526 },
            { lat: -0.07110474534896687, lng: -78.4041244678744 },
            { lat: -0.06509660140228754, lng: -78.40395280649744 },
            { lat: -0.061320053408102655, lng: -78.3989746265658 },
            { lat: -0.057103623089215336, lng: -78.40163537790858 },
            { lat: -0.05590199403487056, lng: -78.40326616098963 },
            { lat: -0.051943055282920994, lng: -78.40575525095545 },
            { lat: -0.04789828562455385, lng: -78.4096176319369 },
            { lat: -0.04325270108173626, lng: -78.41339418222987 },
            { lat: -0.03800630156950924, lng: -78.41665574839197 },
            { lat: -0.03310322443581884, lng: -78.42086145212733 },
            { lat: -0.03377233597818858, lng: -78.42601713056075 },
            { lat: -0.03410492983768466, lng: -78.43013700360763 },
            { lat: -0.03761325854151336, lng: -78.43520101422774 },
            { lat: -0.043953999043145245, lng: -78.44026502484786 },
            { lat: -0.04737649665861592, lng: -78.44180997724044 },
            { lat: -0.048653227701368935, lng: -78.44421323651778 },
            { lat: -0.05107794373234649, lng: -78.44615515584456 },
            { lat: -0.05146284057189069, lng: -78.44668086881148 },
            { lat: -0.05301718004989553, lng: -78.44775375241744 },
            { lat: -0.054421315852002515, lng: -78.44919141644942 },
            { lat: -0.05571816331165984, lng: -78.4497815024327 },
            { lat: -0.05750853695503482, lng: -78.45091875905501 },
            { lat: -0.05919162223902686, lng: -78.45181998128402 },
            { lat: -0.06092835162192428, lng: -78.4526997458409 },
            { lat: -0.06184968988969329, lng: -78.45294650907027 },
            { lat: -0.06369259959394684, lng: -78.45312861576275 },
            { lat: -0.06411907056204158, lng: -78.45319298877911 },
            { lat: -0.0659402893100326, lng: -78.45293549671368 },
            { lat: -0.06681737106930212, lng: -78.45287112369732 },
            { lat: -0.06778028344138586, lng: -78.45248488559918 },
            { lat: -0.06970879033489932, lng: -78.45261363163189 }
        ];
        this.paths6 = [
            { lat: -0.20012914808592772, lng: -78.45615150415813 },
            { lat: -0.1986700352180487, lng: -78.45718147241985 },
            { lat: -0.19853592557297242, lng: -78.45885517084514 },
            { lat: -0.19788683487546463, lng: -78.46044303858196 },
            { lat: -0.19740940451149055, lng: -78.46215965235149 },
            { lat: -0.19766153066046097, lng: -78.46421958887493 },
            { lat: -0.19714118519987556, lng: -78.46627952539836 },
            { lat: -0.19567670768241308, lng: -78.46516372644817 },
            { lat: -0.19528510744541713, lng: -78.46404792749797 },
            { lat: -0.19485059210328592, lng: -78.46254589044963 },
            { lat: -0.1943302465553625, lng: -78.46104385340129 },
            { lat: -0.19415858616489684, lng: -78.46031429254924 },
            { lat: -0.19349071994170336, lng: -78.45928432428752 },
            { lat: -0.192415160225819, lng: -78.4587049671403 },
            { lat: -0.191790209038043, lng: -78.45761062586223 },
            { lat: -0.19248586712058185, lng: -78.45430509636657 },
            { lat: -0.19091410143538393, lng: -78.45406906197326 },
            { lat: -0.18863691847311484, lng: -78.45415489266173 },
            { lat: -0.18653139568094984, lng: -78.45394031594054 },
            { lat: -0.18521980237463787, lng: -78.45252410958068 },
            { lat: -0.18362926066850369, lng: -78.45091478417174 },
            { lat: -0.18163102510373677, lng: -78.45123664925353 },
            { lat: -0.18036234656995034, lng: -78.4518803794171 },
            { lat: -0.18031674924255808, lng: -78.45245973656432 },
            { lat: -0.1805501002697605, lng: -78.45325367043273 },
            { lat: -0.18101948451078745, lng: -78.45406906197326 },
            { lat: -0.18142449604614877, lng: -78.45499174187438 },
            { lat: -0.18090683229404628, lng: -78.45574276039855 },
            { lat: -0.1794879507424951, lng: -78.455463810661 },
            { lat: -0.1782621871962779, lng: -78.45503465721862 },
            { lat: -0.17605696267229343, lng: -78.45418687769768 },
            { lat: -0.17472391103768925, lng: -78.45337148615715 },
            { lat: -0.17311191084621985, lng: -78.45234151789543 },
            { lat: -0.17147845294171746, lng: -78.45094676920769 },
            { lat: -0.16928709786594198, lng: -78.44929452845452 },
            { lat: -0.16758926689629497, lng: -78.4481572718322 },
            { lat: -0.16589143577949006, lng: -78.44762083002922 },
            { lat: -0.16410777418078254, lng: -78.44787832209465 },
            { lat: -0.1625601458677165, lng: -78.44809289881584 },
            { lat: -0.16049753533216923, lng: -78.44706293055413 },
            { lat: -0.15839200940840464, lng: -78.44641920039055 },
            { lat: -0.15660834715265817, lng: -78.44637628504631 },
            { lat: -0.15491051512006976, lng: -78.44650503107903 },
            { lat: -0.15351308928497745, lng: -78.44719167658684 },
            { lat: -0.1527164760520713, lng: -78.44837184855339 },
            { lat: -0.15239192991167735, lng: -78.44959493586418 },
            { lat: -0.15208884136292097, lng: -78.45081802317497 },
            { lat: -0.1514209736608459, lng: -78.45169778773186 },
            { lat: -0.15006646279633862, lng: -78.45122571894524 },
            { lat: -0.1494200526313991, lng: -78.4501742930114 },
            { lat: -0.1489023880457623, lng: -78.4491657824218 },
            { lat: -0.1480628594432133, lng: -78.44811435648796 },
            { lat: -0.14722333080888414, lng: -78.44702001520989 },
            { lat: -0.14634088693873715, lng: -78.44590421625969 },
            { lat: -0.14578298927646274, lng: -78.44545360514519 },
            { lat: -0.1449560014923241, lng: -78.44470361852206 },
            { lat: -0.14338691418608998, lng: -78.44365219258822 },
            { lat: -0.1419465724102798, lng: -78.44330886983431 },
            { lat: -0.14078517944188626, lng: -78.44446758412874 },
            { lat: -0.13996710814765098, lng: -78.44545463704623 },
            { lat: -0.13898253244467396, lng: -78.44653893853166 },
            { lat: -0.1383696494799451, lng: -78.44696809197404 },
            { lat: -0.13729542787780272, lng: -78.44723631287553 },
            { lat: -0.13638213831290685, lng: -78.44740797425249 },
            { lat: -0.13428090508697976, lng: -78.44605626194226 },
            { lat: -0.13320266000049635, lng: -78.44455422489392 },
            { lat: -0.1331972955969733, lng: -78.44270886509167 },
            { lat: -0.13327776164984476, lng: -78.44069184391248 },
            { lat: -0.13314365156156452, lng: -78.43833149997937 },
            { lat: -0.13275205009960972, lng: -78.43584241001355 },
            { lat: -0.1322746181718587, lng: -78.43335332004773 },
            { lat: -0.1317167201772418, lng: -78.43135775654065 },
            { lat: -0.1307699028789598, lng: -78.42818202106702 },
            { lat: -0.13081013590936486, lng: -78.42511357395398 },
            { lat: -0.13102202986841086, lng: -78.42294634906995 },
            { lat: -0.1313197542888385, lng: -78.42028559772717 },
            { lat: -0.13161747870572937, lng: -78.4176248463844 },
            { lat: -0.13152091943577493, lng: -78.41707767574536 },
            { lat: -0.11754141403799502, lng: -78.41519578921674 },
            { lat: -0.1162423939709885, lng: -78.4192394217535 },
            { lat: -0.11546455494680216, lng: -78.42151393499813 },
            { lat: -0.11503003796540037, lng: -78.42464675512753 },
            { lat: -0.11446677520189098, lng: -78.42825164404354 },
            { lat: -0.11261605461561355, lng: -78.43052615728817 },
            { lat: -0.1107653339118337, lng: -78.43219985571346 },
            { lat: -0.10685468022088764, lng: -78.43297233190975 },
            { lat: -0.10517562025188758, lng: -78.43185653295956 },
            { lat: -0.10463381493904082, lng: -78.42857350912533 },
            { lat: -0.10450238691619082, lng: -78.42722167578182 },
            { lat: -0.10495031507343029, lng: -78.42421760168514 },
            { lat: -0.10462576832541046, lng: -78.42224349585018 },
            { lat: -0.1035072890111195, lng: -78.42102040853939 },
            { lat: -0.10316128461092978, lng: -78.4203552207037 },
            { lat: -0.10382378915683173, lng: -78.41973294821224 },
            { lat: -0.10455066659811303, lng: -78.41883172598324 },
            { lat: -0.10525608638666467, lng: -78.41790904608212 },
            { lat: -0.10539556101977368, lng: -78.41757645216427 },
            { lat: -0.10619888125022685, lng: -78.41665377226315 },
            { lat: -0.10715240490232432, lng: -78.41562380400143 },
            { lat: -0.1077555718030051, lng: -78.41508037006048 },
            { lat: -0.10871848312119296, lng: -78.41450101291326 },
            { lat: -0.11021783522391225, lng: -78.41402894412664 },
            { lat: -0.11184593303885598, lng: -78.41336375629095 },
            { lat: -0.1134740307634847, lng: -78.41269856845526 },
            { lat: -0.11510212839648798, lng: -78.41203338061956 },
            { lat: -0.11542399282698682, lng: -78.41203338061956 },
            { lat: -0.11694614331332895, lng: -78.4119153634229 },
            { lat: -0.11844683609087463, lng: -78.41144329463629 },
            { lat: -0.11917505427274346, lng: -78.41062790309576 },
            { lat: -0.11876601827976593, lng: -78.40914732371954 },
            { lat: -0.11776689755019146, lng: -78.40746289645818 },
            { lat: -0.11699442297498466, lng: -78.40656167422918 },
            { lat: -0.11604760515068982, lng: -78.4055746213117 },
            { lat: -0.11570160089535529, lng: -78.40441590701727 },
            { lat: -0.11584912209000992, lng: -78.4027636662641 },
            { lat: -0.11694077890647267, lng: -78.4010899678388 },
            { lat: -0.11844013058266685, lng: -78.39948064242986 },
            { lat: -0.11996093980285387, lng: -78.39827901279119 },
            { lat: -0.12176877205662043, lng: -78.39950312173738 },
            { lat: -0.1236355852500395, lng: -78.40156305826082 },
            { lat: -0.12567405927679737, lng: -78.40362299478426 },
            { lat: -0.12739066886025788, lng: -78.40379465616121 },
            { lat: -0.129686633999096, lng: -78.40302217996492 },
            { lat: -0.12967590519052322, lng: -78.40061892068758 },
            { lat: -0.13069514198513088, lng: -78.399073968295 },
            { lat: -0.1326585137989588, lng: -78.4019922117032 },
            { lat: -0.13479354635952537, lng: -78.40370882547273 },
            { lat: -0.13598444383731148, lng: -78.40551126993074 },
            { lat: -0.13726117169867014, lng: -78.40808619058504 },
            { lat: -0.13836623861610847, lng: -78.40920198953523 },
            { lat: -0.13850571307777287, lng: -78.41021050012483 },
            { lat: -0.13876052218828844, lng: -78.41033924615755 },
            { lat: -0.1391011617317642, lng: -78.40965260064974 },
            { lat: -0.13875515778599942, lng: -78.40842951333894 },
            { lat: -0.13836623861610847, lng: -78.40720642602815 },
            { lat: -0.13811947610501257, lng: -78.40664852655306 },
            { lat: -0.1373456610400368, lng: -78.40510357416048 },
            { lat: -0.1371833878603206, lng: -78.4036122659482 },
            { lat: -0.13785796148448268, lng: -78.40367663896455 },
            { lat: -0.13885439922832707, lng: -78.40410579240694 },
            { lat: -0.13996885377496135, lng: -78.4046207765378 },
            { lat: -0.1413837147656483, lng: -78.40513576066866 },
            { lat: -0.14235869475366217, lng: -78.40621937311067 },
            { lat: -0.1432156578727815, lng: -78.40767849481477 },
            { lat: -0.14414772257472475, lng: -78.40897668397798 },
            { lat: -0.1443931439215578, lng: -78.40829003847017 },
            { lat: -0.14444544683120114, lng: -78.40707767999544 },
            { lat: -0.14479815619306485, lng: -78.4056829313077 },
            { lat: -0.14595552565743608, lng: -78.4053586073083 },
            { lat: -0.14739184387856408, lng: -78.405304963128 },
            { lat: -0.14877451800766942, lng: -78.40594869329158 },
            { lat: -0.14961002328331488, lng: -78.40719323827449 },
            { lat: -0.14890058140602414, lng: -78.40837341024104 },
            { lat: -0.14777271629517286, lng: -78.40969305707637 },
            { lat: -0.146312258296116, lng: -78.4110127039117 },
            { lat: -0.1459890531613134, lng: -78.41174226476375 },
            { lat: -0.14570742212719967, lng: -78.41453176213923 },
            { lat: -0.1447606053867361, lng: -78.41665607167903 },
            { lat: -0.143835246211257, lng: -78.4185228891534 },
            { lat: -0.14518439305450573, lng: -78.4185228891534 },
            { lat: -0.14651208221530568, lng: -78.41966014577571 },
            { lat: -0.14779685609601442, lng: -78.42084031774226 },
            { lat: -0.14805166510320014, lng: -78.41878038121882 },
            { lat: -0.1487999989073944, lng: -78.41603379918757 },
            { lat: -0.1508357885899564, lng: -78.41545444204036 },
            { lat: -0.1524638837591239, lng: -78.41706376744929 },
            { lat: -0.1533409629838221, lng: -78.41927390767756 },
            { lat: -0.15217957060827125, lng: -78.42172008229915 },
            { lat: -0.15037445023316956, lng: -78.42347961141292 },
            { lat: -0.14824746570674543, lng: -78.4253678865594 },
            { lat: -0.14702170025616473, lng: -78.42732053472224 },
            { lat: -0.14626800199163, lng: -78.4286830969018 },
            { lat: -0.14595083180688512, lng: -78.42901569081965 },
            { lat: -0.14573558523077262, lng: -78.42963796331111 },
            { lat: -0.14568663507453977, lng: -78.4303031511468 },
            { lat: -0.14570205772651365, lng: -78.43098979665461 },
            { lat: -0.1457872175872276, lng: -78.43169253541652 },
            { lat: -0.14588847064952884, lng: -78.43255084230128 },
            { lat: -0.14598972371139754, lng: -78.43340914918605 },
            { lat: -0.1460289766457353, lng: -78.43368108372607 },
            { lat: -0.14616275138546447, lng: -78.43435700039782 },
            { lat: -0.14623751771834725, lng: -78.43510533671298 },
            { lat: -0.1462881442485437, lng: -78.43591536383548 },
            { lat: -0.14626242145562543, lng: -78.4365800969785 },
            { lat: -0.14618128489714668, lng: -78.43696097065862 },
            { lat: -0.14616988554593224, lng: -78.43756178547795 },
            { lat: -0.14602974058053073, lng: -78.4383449905103 },
            { lat: -0.14569647719038187, lng: -78.43924084832128 },
            { lat: -0.14539540019987088, lng: -78.44026008774694 },
            { lat: -0.14527134843201103, lng: -78.44085553814824 },
            { lat: -0.14487907662105948, lng: -78.4412632339185 },
            { lat: -0.14487840607094987, lng: -78.44154754807408 },
            { lat: -0.1451566843648969, lng: -78.4413705222791 },
            { lat: -0.14539204744939918, lng: -78.44102183510716 },
            { lat: -0.1456595969356385, lng: -78.4406141393369 },
            { lat: -0.14596469722307953, lng: -78.44020107914861 },
            { lat: -0.14626979750638583, lng: -78.43978801896031 },
            { lat: -0.1463073483101956, lng: -78.43977997233327 },
            { lat: -0.14658059746104377, lng: -78.439551984567 },
            { lat: -0.14692090161357804, lng: -78.43931058575566 },
            { lat: -0.1471405067536095, lng: -78.43898335625585 },
            { lat: -0.14733597209015314, lng: -78.43860784699376 },
            { lat: -0.14759312802773503, lng: -78.43822697331365 },
            { lat: -0.14789319916365512, lng: -78.4378407352155 },
            { lat: -0.14821204569581234, lng: -78.43738744189199 },
            { lat: -0.1485550320233915, lng: -78.43691805531438 },
            { lat: -0.14850110634532385, lng: -78.43635203586325 },
            { lat: -0.1496376057070529, lng: -78.4333796108067 },
            { lat: -0.15237344940024947, lng: -78.43063302877545 },
            { lat: -0.15262021175558724, lng: -78.42762895467877 },
            { lat: -0.15424026019186632, lng: -78.42445321920513 },
            { lat: -0.15860688019375027, lng: -78.42436738851666 },
            { lat: -0.16374597233089758, lng: -78.42453904989361 },
            { lat: -0.16451844535763224, lng: -78.42453904989361 },
            { lat: -0.16546257901635114, lng: -78.42410989645123 },
            { lat: -0.16597756099310268, lng: -78.42333742025494 },
            { lat: -0.1667393051424246, lng: -78.42204995992779 },
            { lat: -0.168874334361246, lng: -78.4212774837315 },
            { lat: -0.17100936334557143, lng: -78.42050500753521 },
            { lat: -0.17314439209242394, lng: -78.41938920858502 },
            { lat: -0.17579440231285154, lng: -78.41861673238873 },
            { lat: -0.17784360024196033, lng: -78.41741510275006 },
            { lat: -0.178347853100722, lng: -78.41561265829205 },
            { lat: -0.17833712431663945, lng: -78.41338106039166 },
            { lat: -0.18012883117196188, lng: -78.41338106039166 },
            { lat: -0.1823496891251746, lng: -78.41338106039166 },
            { lat: -0.18499969801493443, lng: -78.41338106039166 },
            { lat: -0.1856756111504251, lng: -78.415784319669 },
            { lat: -0.18617986379022466, lng: -78.41904588583111 },
            { lat: -0.1858258140659032, lng: -78.42230745199322 },
            { lat: -0.18487095265287634, lng: -78.42556901815533 },
            { lat: -0.18494605411419032, lng: -78.42848726156353 },
            { lat: -0.18579362772698851, lng: -78.43123384359478 },
            { lat: -0.187413673379926, lng: -78.43398042562603 },
            { lat: -0.1898061908578701, lng: -78.43715616109967 },
            { lat: -0.19237036841513253, lng: -78.4403318965733 },
            { lat: -0.1929282647365614, lng: -78.44153352621197 },
            { lat: -0.19489699487817513, lng: -78.44458051565289 },
            { lat: -0.19476288520276905, lng: -78.44745584371685 },
            { lat: -0.19505792648722992, lng: -78.45058866384625 },
            { lat: -0.19591086398954807, lng: -78.45372148397564 },
            { lat: -0.19672088635720272, lng: -78.45698305013775 },
            { lat: -0.19723050305845033, lng: -78.46011587026715 },
            { lat: -0.19774011974408776, lng: -78.46324869039654 },
            { lat: -0.1977830348326841, lng: -78.46374221685528 },
            { lat: -0.19775889509536457, lng: -78.46586652639508 },
            { lat: -0.19814244869537215, lng: -78.46659608724713 },
            { lat: -0.1970915897407889, lng: -78.46604761814251 },
            { lat: -0.1969950307872615, lng: -78.46176681255474 },
            { lat: -0.19836294924326126, lng: -78.46191165184155 },
            { lat: -0.1980786367891409, lng: -78.46580085491314 },
            { lat: -0.19767094345018535, lng: -78.46637484764233 },
            { lat: -0.1971237760585084, lng: -78.46624073719158 },
            { lat: -0.1973735011041196, lng: -78.46161391045604 },
            { lat: -0.19853220848302836, lng: -78.46168901230845 },
            { lat: -0.19787775339933789, lng: -78.4642371108726 },
            { lat: -0.19774364374784956, lng: -78.4644516875938 },
            { lat: -0.197217933903575, lng: -78.46196259762797 },
            { lat: -0.1971589256547131, lng: -78.46168901230845 },
        ];
        this.paths6_1 = [
            { lat: -0.2014318628256037, lng: -78.45635741075245 },
            { lat: -0.20057087902992432, lng: -78.45704405626026 },
            { lat: -0.19981718289746805, lng: -78.4580954821941 },
            { lat: -0.1994497224929284, lng: -78.45936148484913 },
            { lat: -0.19925392242001413, lng: -78.46064894517627 },
            { lat: -0.19892937708854974, lng: -78.4619149478313 },
            { lat: -0.19892937708854974, lng: -78.46230118592945 },
            { lat: -0.19802816026690534, lng: -78.46227972825733 },
            { lat: -0.1968265377618697, lng: -78.46062748750415 },
            { lat: -0.1972341033777388, lng: -78.45901688486299 },
            { lat: -0.19748891172245314, lng: -78.45826586633882 },
            { lat: -0.19787246532872005, lng: -78.45715006738862 },
            { lat: -0.19868516979376316, lng: -78.45590552240571 },
            { lat: -0.19964807701249593, lng: -78.4546609774228 },
            { lat: -0.20058952663422236, lng: -78.45500430017671 },
            { lat: -0.20110182540849536, lng: -78.45605572611055 }
        ];
    }
    return PathsMaps;
}());

//# sourceMappingURL=paths_maps.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmacionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_global__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__historial_historial__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_services_message_services__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_services_user_services__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_services_paypal_service__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_services_correo_service__ = __webpack_require__(405);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//import { PagoOnlinePage } from '../pagoOnline/pagoOnline';



var ConfirmacionPage = (function () {
    function ConfirmacionPage(iab, navCtrl, alertCtrl, _messageservice, _userservice, _paypalservice, _envioEmail) {
        this.iab = iab;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this._messageservice = _messageservice;
        this._userservice = _userservice;
        this._paypalservice = _paypalservice;
        this._envioEmail = _envioEmail;
        this.dirige = false;
        this.url = __WEBPACK_IMPORTED_MODULE_2__app_services_global__["a" /* GLOBAL */].url;
        this.inf_viaje = JSON.parse(localStorage.getItem("confirmacion1"));
        console.log('contexto info viaje', this.inf_viaje);
        console.log("par que me sakga indefinido", this.inf_viaje["0"].num_maleta);
        //VISUALIZAR EN CARTILLA
        this.nombreChofer = this.inf_viaje["0"]._id_chofer.nombre + ' ' + this.inf_viaje["0"]._id_chofer.apellido;
        this.celChofer = this.inf_viaje["0"]._id_chofer.tel_celular; //poner cual corresponde
        this.raza = this.inf_viaje["0"].raza;
        this.num_edad = this.inf_viaje["0"].num_edad;
        this.fechaSalida = this.inf_viaje["0"].fech_salida;
        this.horarioR = this.inf_viaje["0"].horarioR;
        this.horarioE = this.inf_viaje["0"].horarioE;
        this.num_edad = this.inf_viaje["0"].num_edad;
        this.estado = this.inf_viaje["0"].estado;
        this.precio = this.inf_viaje["0"].precio;
        this.url2 = this.url + 'get-image-chofer/' + this.inf_viaje["0"]._id_chofer.image;
        var direccion = localStorage.getItem('Dirige');
        if (direccion == '1') {
            if (this.estado == 2 || this.estado == 3 || this.estado == 4) {
                this.dirige = false;
                localStorage.removeItem('Dirige');
            }
            else {
                this.dirige = true;
                localStorage.removeItem('Dirige');
            }
        }
    }
    ConfirmacionPage.prototype.calificar = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '<center>Denuncia</center>',
            subTitle: '<center><img src="assets/imgs/denuncia1.png"></center>',
            inputs: [
                {
                    name: 'denuncia',
                    placeholder: 'Describa su denuncia.',
                    type: ''
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'OK',
                    handler: function (data) {
                        _this.inf_viaje["0"].denuncia = data.denuncia;
                        _this._messageservice.updateMessageDenunciayCancelar(_this._userservice.getToken(), _this.inf_viaje["0"]).subscribe(function (response) {
                            console.log("se puso la denuncia ");
                        }, function (error) {
                            console.log("error al posytear denunciaa ");
                            console.log(error);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    ConfirmacionPage.prototype.pago = function () {
        var _this = this;
        var data = {
            amount: this.precio,
            idViaje: this.inf_viaje["0"]._id,
            pagoDe: 'Viaje'
        };
        console.log("Info viaje", this.inf_viaje["0"]._id);
        this._paypalservice.payment(data).subscribe(function (response) {
            console.log("response for server", response.links[1].href);
            var browser = _this.iab.create(response.links[1].href);
        }, function (error) { });
        //this.navCtrl.push(PagoOnlinePage);
    };
    ConfirmacionPage.prototype.confirmarPagoViaje = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Atención',
            message: 'Si elige esta opción podrá pagar por medio de la plataforma PAYPAL. Caso contrario cancele y espere pagar en efectivo',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        console.log('Boton cancelar');
                    }
                },
                {
                    text: 'Ok',
                    handler: function () {
                        console.log('Boton continuar');
                        _this.pago();
                    }
                }
            ]
        });
        confirm.present();
    };
    ConfirmacionPage.prototype.cancelarViaje = function () {
        //alert('El viaje se ha cancelado correctamente');
        console.log('ESTOY EN CANCELAR VIAJE DEL DETALLE DE VIAJES REALIZADOS');
        this._messageservice.UpdateEstadoMessage(this._userservice.getToken(), this.inf_viaje["0"]).subscribe(function (response) {
            console.log("Seactualizo el estado", response);
            //location.reload(true);
        }, function (error) {
            console.log(error);
        });
        var cancelarViaje = {
            obj: this.inf_viaje["0"],
            variable: 'CVU',
            usuario: this._userservice.getIdentity()
        };
        console.log("este es el objeto que cancela el viaje desde el usuario", cancelarViaje);
        //aqui va el envio del correo
        this._envioEmail.envioEmail(this._userservice.getToken(), cancelarViaje).subscribe(function (response) {
            console.log("Se envio el correo electronico ", response);
            //location.reload(true);
        }, function (error) {
            console.log(error);
        });
    };
    ConfirmacionPage.prototype.showAlertCancelar = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '<center><h3>IMPORTANTE</h3></center>',
            subTitle: '<center>¿Desea cancelar la solicitud?</center>',
            message: '<p align="justify">Para más información comunicate con nosotros.</p>',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Solicitud Cancelada');
                    }
                },
                {
                    text: 'OK',
                    handler: function (data) {
                        _this.cancelarViaje();
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__historial_historial__["a" /* HistorialPage */]);
                    }
                }
            ],
            cssClass: 'customLoader'
        });
        alert.present();
    };
    ConfirmacionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "page-confirmacion",template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\confirmacion\confirmacion.html"*/`<ion-header>\n\n  <ion-navbar color="colorapp">\n\n    <ion-title style="text-align: center;">\n\n      Confirmación de Paseo\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content style="background-image: url(\'assets/imgs/fondo2.png\')" class="principal">\n\n  <br>\n\n  <div class="container" style="width: 90%;">\n\n    <form class="form-principal">\n\n      <div>\n\n        <div>\n\n          <div class="col-lg-12 padre">\n\n            <img class="imagenes" [src]="url2">\n\n          </div>\n\n        </div>\n\n\n\n        <div class="princ_datos">\n\n\n\n          <div class="datos_chofer">\n\n            <ion-item style="padding: 0; margin: 0; ">\n\n              <ion-label style="font-size: 13px; font-weight: bold;">PASEADOR</ion-label>\n\n            </ion-item>\n\n\n\n            <hr style="padding: 0; margin: 0; border: 1px;">\n\n\n\n            <ion-list style="font-size: 13px; display:flex; width:100%; padding: 0; margin: 0;">\n\n              <ion-item style="float: left; width:100%; background-color: transparent;">\n\n                <div style="width: 30%; font-size: 13px; color: #777777;">\n\n                  <label style="padding: 0; margin: 0;">Nombre:</label>\n\n                </div>\n\n                <div item-content style="text-align: right; float: left; width: 65%; font-size: 13px; color: #777777;">\n\n                  <label style="padding: 0; margin: 0; margin-top: 10px; margin-bottom: 10px;">{{nombreChofer}}</label>\n\n                </div>\n\n              </ion-item>\n\n            </ion-list>\n\n            <hr style="padding: 0; margin: 0;">\n\n\n\n            <ion-item-divider style="font-size: 13px; background-color: transparent;">\n\n              Celular:\n\n              <div item-content style="padding-right: 5%;">\n\n                <label>{{celChofer}}</label>\n\n              </div>\n\n            </ion-item-divider>\n\n          </div>\n\n\n\n          <div class="datos_General">\n\n            <ion-item style="padding: 0; margin: 0; ">\n\n              <ion-label style="font-size: 13px; font-weight: bold;">DATOS GENERALES</ion-label>\n\n            </ion-item>\n\n            <hr style="padding: 0; margin: 0; border: 1px;">\n\n\n\n            <ion-list style="font-size: 13px; background-color: transparent; display:flex; width:100%; margin: 0; padding: 0;">\n\n              <ion-item style="float: left; width:100%; background-color: transparent;">\n\n                <div style="width: 30%; font-size: 13px; color: #777777;">\n\n                  <label style="padding: 0; margin: 0;">Nombre y Raza:</label>\n\n                </div>\n\n                <div item-content style="text-align: right; float: left; width: 65%; font-size: 13px; color: #777777;">\n\n                  <label style="padding: 0; margin: 0; margin-top: 10px; margin-bottom: 10px;">{{raza}}</label>\n\n                </div>\n\n              </ion-item>\n\n            </ion-list>\n\n            <hr style="padding: 0; margin: 0;">\n\n\n\n            \n\n            <ion-list style="font-size: 13px; background-color: transparent; display:flex; width:100%; margin: 0; padding: 0;">\n\n              <ion-item style="float: left; width:100%; background-color: transparent;">\n\n                <div style="width: 30%; font-size: 13px; color: #777777;">\n\n                  <label style="padding: 0; margin: 0;">Edad:</label>\n\n                </div>\n\n                <div item-content style="text-align: right; float: left; width: 65%; font-size: 13px; color: #777777;">\n\n                  <label style="padding: 0; margin: 0; margin-top: 10px; margin-bottom: 10px;">{{num_edad}}</label>\n\n                </div>\n\n              </ion-item>\n\n            </ion-list>\n\n            <hr style="padding: 0; margin: 0;">\n\n\n\n            <ion-list style="font-size: 13px; background-color: transparent; display:flex; width:100%; margin: 0; padding: 0;">\n\n              <ion-item style="float: left; width:100%; background-color: transparent;">\n\n                <div style="width: 30%; font-size: 13px; color: #777777;">\n\n                  <label style="padding: 0; margin: 0;">Fecha Salida:</label>\n\n                </div>\n\n                <div item-content style="text-align: right; float: left; width: 65%; font-size: 13px; color: #777777;">\n\n                  <label style="padding: 0; margin: 0; margin-top: 10px; margin-bottom: 10px;">{{fechaSalida}}</label>\n\n                </div>\n\n              </ion-item>\n\n            </ion-list>\n\n            <hr style="padding: 0; margin: 0;">\n\n\n\n            <ion-list style="font-size: 13px; background-color: transparent; display:flex; width:100%; margin: 0; padding: 0;">\n\n              <ion-item style="float: left; width:100%; background-color: transparent;">\n\n                <div style="width: 30%; font-size: 13px; color: #777777;">\n\n                  <label style="padding: 0; margin: 0;">Hora Recogida:</label>\n\n                </div>\n\n                <div item-content style="text-align: right; float: left; width: 65%; font-size: 13px; color: #777777;">\n\n                  <label style="padding: 0; margin: 0; margin-top: 10px; margin-bottom: 10px;">{{horarioR}}</label>\n\n                </div>\n\n              </ion-item>\n\n            </ion-list>\n\n            <hr style="padding: 0; margin: 0;">\n\n\n\n            <ion-list style="font-size: 13px; background-color: transparent; display:flex; width:100%; margin: 0; padding: 0;">\n\n              <ion-item style="float: left; width:100%; background-color: transparent;">\n\n                <div style="width: 30%; font-size: 13px; color: #777777;">\n\n                  <label style="padding: 0; margin: 0;">Hora Entrega:</label>\n\n                </div>\n\n                <div item-content style="text-align: right; float: left; width: 65%; font-size: 13px; color: #777777;">\n\n                  <label style="padding: 0; margin: 0; margin-top: 10px; margin-bottom: 10px;">{{horarioE}}</label>\n\n                </div>\n\n              </ion-item>\n\n            </ion-list>\n\n            <hr style="padding: 0; margin: 0;">\n\n\n\n            <ion-list style="font-size: 13px; background-color: transparent; display:flex; width:100%; margin: 0; padding: 0;">\n\n              <ion-item style="float: left; width:100%; background-color: transparent;">\n\n                <div style="width: 30%; font-size: 13px; color: #777777;">\n\n                  <label style="padding: 0; margin: 0;">Precio:</label>\n\n                </div>\n\n                <div item-content style="text-align: right; float: left; width: 65%; font-size: 13px; color: #777777;">\n\n                  <label style="padding: 0; margin: 0; margin-top: 10px; margin-bottom: 10px;">{{precio}}</label>\n\n                </div>\n\n              </ion-item>\n\n            </ion-list>\n\n            <hr style="padding: 0; margin: 0;">\n\n\n\n            <!-- <ion-item-divider style="font-size: 13px; background-color: transparent;">\n\n              Precio:\n\n              <div item-content style="padding-right: 5%;">\n\n                <label>$ {{precio}}</label>\n\n              </div>\n\n            </ion-item-divider>\n\n            <hr style="padding: 0; margin: 0;"> -->\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </form>\n\n  </div>\n\n\n\n\n\n    <ion-row style="margin-left: 1%">\n\n      <ion-col  text-center>\n\n        <!-- <ion-note>Denunciar</ion-note> -->\n\n        <button style="padding: 5%; font-size: 80%"ion-button *ngIf=\'dirige\' (click)="calificar();" color="colorapp">\n\n          <ion-icon name=\'megaphone\'></ion-icon>&nbsp;&nbsp;&nbsp;Denunciar\n\n        </button>\n\n      </ion-col>\n\n      <ion-col  text-center>\n\n        <!-- <ion-note>Pago Online</ion-note> -->\n\n        <button style="padding: 5%; font-size: 80%" ion-button *ngIf=\'dirige\' (click)="confirmarPagoViaje();" color="colorapp">\n\n          <ion-icon name=\'cash\'></ion-icon>&nbsp;&nbsp;&nbsp;Pagar\n\n        </button>\n\n      </ion-col>\n\n      <ion-col  text-center>\n\n        <!-- <ion-note>Pago Online</ion-note> -->\n\n        <button  style=" padding: 5%; font-size: 80%" ion-button *ngIf=\'dirige\' (click)="showAlertCancelar();" color="colorapp">\n\n          <ion-icon name=\'close\'></ion-icon>&nbsp;&nbsp;&nbsp;Cancelar\n\n        </button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-content>\n\n`/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\confirmacion\confirmacion.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__app_services_message_services__["a" /* MessageService */], __WEBPACK_IMPORTED_MODULE_5__app_services_user_services__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_6__app_services_paypal_service__["a" /* PayPal */], __WEBPACK_IMPORTED_MODULE_8__app_services_correo_service__["a" /* EnvioEmail */]])
    ], ConfirmacionPage);
    return ConfirmacionPage;
}());

//# sourceMappingURL=confirmacion.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PayPal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PayPal = (function () {
    function PayPal(_http) {
        this._http = _http;
        this.url = __WEBPACK_IMPORTED_MODULE_3__global__["a" /* GLOBAL */].url;
    }
    PayPal.prototype.payment = function (data) {
        var json = JSON.stringify(data);
        var params = json;
        console.log(params);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Accept": "application/json" });
        return this._http.post(this.url + "createPayment", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    PayPal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], PayPal);
    return PayPal;
}());

//# sourceMappingURL=paypal.service.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnvioEmail; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EnvioEmail = (function () {
    function EnvioEmail(_http) {
        this._http = _http;
        this.url = __WEBPACK_IMPORTED_MODULE_3__global__["a" /* GLOBAL */].url;
    }
    EnvioEmail.prototype.envioEmail = function (token, user_to_email) {
        var json = JSON.stringify(user_to_email);
        var params = json;
        console.log(params);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http
            .post(this.url + "email", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    EnvioEmail = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], EnvioEmail);
    return EnvioEmail;
}());

//# sourceMappingURL=correo.service.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardsolicitudPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_solicitudes_solicitudes__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_message_services__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_services_user_services__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_services_notificaciones_services__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CardsolicitudPage = (function () {
    function CardsolicitudPage(navCtrl, alertCtrl, _messageservice, _userservice, _notifiacionesservice) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this._messageservice = _messageservice;
        this._userservice = _userservice;
        this._notifiacionesservice = _notifiacionesservice;
        this.cancelarV = false;
        this.inf_viaje = JSON.parse(localStorage.getItem("recibi"));
        console.log('contexto info viaje', this.inf_viaje);
        this.raza = this.inf_viaje.raza;
        this.num_edad = this.inf_viaje.num_edad;
        this.fechaSalida = this.inf_viaje.fechaSalida;
        this.horarioR = this.inf_viaje.horarioR;
        this.horarioE = this.inf_viaje.horarioE;
        this.informacion = this.inf_viaje.informacion;
        this.estado = this.inf_viaje.estado;
        if (this.inf_viaje.estado == '0') {
            this.estado = 'En progreso';
        }
        else {
            if (this.inf_viaje.estado == '1') {
                this.estado = 'Aceptado';
                this.cancelarV = true;
            }
            else {
                if (this.inf_viaje.estado == '2') {
                    this.estado = 'Cancelado';
                    this.cancelarV = true;
                }
            }
        }
    }
    CardsolicitudPage.prototype.opciones = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_solicitudes_solicitudes__["a" /* SolicitudesPage */]);
    };
    CardsolicitudPage.prototype.CancelarSolicitud = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "<center><h3>INFORMACIÓN</h3></center>",
            message: '<p align="justify">¿Está seguro que desea cancelar la solicitud de viaje realizada?<p>',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Solicitud Cancelada');
                    }
                },
                {
                    text: 'OK',
                    handler: function (data) {
                        console.log("cancelar solciitud");
                        _this.inf_viaje.estado = '2';
                        _this._notifiacionesservice.updateSolicitudesViajesCancelar(_this._userservice.getToken(), _this.inf_viaje).subscribe(function (response) {
                            console.log('La solicitud ha sido cancelada.');
                            //   this.socket.emit('create notification', { a: this.inf_viaje });
                            //localStorage.setItem("vectorViajes", JSON.stringify(this.vectorViajes));
                        }, function (err) { console.log("Error al cancelar la solicitud.", err); });
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_solicitudes_solicitudes__["a" /* SolicitudesPage */]);
                    }
                }
            ],
            cssClass: 'customLoader'
        });
        alert.present();
    };
    CardsolicitudPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "page-cardsolicitud",template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\cardsolicitud\cardsolicitud.html"*/`<ion-header>\n\n  <ion-navbar color="colorapp">\n\n    <ion-title style="text-align: center;">\n\n      Paseos Realizados\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding style="background-image: url(\'assets/imgs/fondo2.png\');" class="principal">\n\n  <div class="Aligner-item Aligner-item--top"></div>\n\n  <img id="imganeTitulo" src="assets/imgs/titulo.png" style=" width: 60%;">\n\n  <div class="Aligner-item Aligner-item--bottom"></div>\n\n  <ion-card>\n\n    <ion-list style="font-size: 13px; display:flex; width:100%; padding: 0; margin: 0;">\n\n      <ion-item style="float: left; width:100%; background-color: transparent;">\n\n        <div style="width: 30%; font-size: 13px;">\n\n          <label style="padding: 0; margin: 0;">Nombre y Raza:</label>\n\n        </div>\n\n        <div item-content style="text-align: right; float: left; width: 65%; font-size: 13px; color: #777777;">\n\n          <label style="padding: 0; margin: 0; margin-top: 10px; margin-bottom: 10px;">{{raza}}</label>\n\n        </div>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <ion-list style="font-size: 13px; display:flex; width:100%; padding: 0; margin: 0;">\n\n      <ion-item style="float: left; width:100%; background-color: transparent;">\n\n        <div style="width: 30%; font-size: 13px;">\n\n          <label style="padding: 0; margin: 0;">Edad:</label>\n\n        </div>\n\n        <div item-content style="text-align: right; float: left; width: 65%; font-size: 13px; color: #777777;">\n\n          <label style="padding: 0; margin: 0; margin-top: 10px; margin-bottom: 10px;">{{num_edad}}</label>\n\n        </div>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <ion-list style="font-size: 13px; display:flex; width:100%; padding: 0; margin: 0;">\n\n      <ion-item style="float: left; width:100%; background-color: transparent;">\n\n        <div style="width: 30%; font-size: 13px;">\n\n          <label style="padding: 0; margin: 0;">Fecha Salida:</label>\n\n        </div>\n\n        <div item-content style="text-align: right; float: left; width: 65%; font-size: 13px; color: #777777;">\n\n          <label style="padding: 0; margin: 0; margin-top: 10px; margin-bottom: 10px;">{{fechaSalida}}</label>\n\n        </div>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <ion-list style="font-size: 13px; display:flex; width:100%; padding: 0; margin: 0;">\n\n      <ion-item style="float: left; width:100%; background-color: transparent;">\n\n        <div style="width: 30%; font-size: 13px;">\n\n          <label style="padding: 0; margin: 0;">Hora Recogida:</label>\n\n        </div>\n\n        <div item-content style="text-align: right; float: left; width: 65%; font-size: 13px; color: #777777;">\n\n          <label style="padding: 0; margin: 0; margin-top: 10px; margin-bottom: 10px;">{{horarioR}}</label>\n\n        </div>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <ion-list style="font-size: 13px; display:flex; width:100%; padding: 0; margin: 0;">\n\n      <ion-item style="float: left; width:100%; background-color: transparent;">\n\n        <div style="width: 30%; font-size: 13px;">\n\n          <label style="padding: 0; margin: 0;">HorA Entrega:</label>\n\n        </div>\n\n        <div item-content style="text-align: right; float: left; width: 65%; font-size: 13px; color: #777777;">\n\n          <label style="padding: 0; margin: 0; margin-top: 10px; margin-bottom: 10px;">{{horarioE}}</label>\n\n        </div>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <ion-list style="font-size: 13px; display:flex; width:100%; padding: 0; margin: 0;">\n\n      <ion-item style="float: left; width:100%; background-color: transparent;">\n\n        <div style="width: 30%; font-size: 13px;">\n\n          <label style="padding: 0; margin: 0;">Estado:</label>\n\n        </div>\n\n        <div item-content style="text-align: right; float: left; width: 65%; font-size: 13px; color: #777777;">\n\n          <label style="padding: 0; margin: 0; margin-top: 10px; margin-bottom: 10px;">{{estado}}</label>\n\n        </div>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <ion-list style="font-size: 13px; display:flex; width:100%; padding: 0; margin: 0;">\n\n      <ion-item style="float: left; width:100%; background-color: transparent;">\n\n        <div style="width: 30%; font-size: 13px;">\n\n          <label style="padding: 0; margin: 0;">Información:</label>\n\n        </div>\n\n        <div item-content style="text-align: justify; float: left; width: 65%; font-size: 13px; color: #777777;">\n\n          <label style="padding: 0; margin: 0; margin-top: 10px; margin-bottom: 10px;">{{informacion}}</label>\n\n        </div>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <ion-row>\n\n      <ion-col>\n\n        <button ion-button icon-start clear small>\n\n          <ion-icon name="checkmark"></ion-icon>\n\n          <div (click)="opciones();">Aceptar</div>\n\n        </button>\n\n      </ion-col>\n\n      <ion-col>\n\n        <button [disabled]="cancelarV" ion-button icon-start clear small>\n\n          <ion-icon name="close"></ion-icon>\n\n          <div (click)="CancelarSolicitud()">Cancelar Solicitud</div>\n\n        </button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-card>\n\n</ion-content>\n\n`/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\cardsolicitud\cardsolicitud.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__app_services_message_services__["a" /* MessageService */], __WEBPACK_IMPORTED_MODULE_4__app_services_user_services__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_5__app_services_notificaciones_services__["a" /* NotificacionesService */]])
    ], CardsolicitudPage);
    return CardsolicitudPage;
}());

//# sourceMappingURL=cardsolicitud.js.map

/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TerminosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TerminosPage = (function () {
    function TerminosPage() {
    }
    TerminosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-terminos',template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\terminos\terminos.html"*/`<ion-header>\n\n  <ion-navbar color="colorapp">\n\n    <button *ngIf="identity" ion-button menuToggle icon-only>\n\n      <ion-icon name=\'menu\'></ion-icon>\n\n    </button>\n\n    <ion-title style="text-align: center">Términos y condiciones</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<!-- prueba -->\n\n<ion-content class="getstarContactos">\n\n  <br>\n\n  <div class="container">\n\n    <p align="justify">\n\n      Dogi es un servicio encargado en paseos caninos.\n\n      Se caracteriza por la comodidad, seguridad y puntualidad que ofrecemos a nuestros usuarios y sus mascotas.\n\n      El principal objetivo es ejecutar satisfacción a los requerimientos de nuestros usuarios, cumpliendo con las\n\n      reservas establecidas,\n\n      optimización de tiempo y seguridad, y así generar una imagen de confianza. Léalo con atención\n\n    </p>\n\n    <br>\n\n    <h3>Generales</h3>\n\n\n\n    <br>\n\n    <h4>Datos de identificación</h4>\n\n\n\n    <br>\n\n\n\n    <dl align="justify">\n\n      <dd>\n\n        <strong>1.</strong> Para la utilización del servicio es necesario que el usuario se registre e inicie sesión.\n\n        Debe de llenarse con la cédula de identidad válida. </dd>\n\n      <dd>\n\n        <strong>2.</strong> El usuario está en total libertad de reservar su viaje de acuerdo a sus preferencias bajo\n\n        las opciones de horarios, rutas y cupos disponibles.</dd>\n\n      <dd>\n\n        <strong>3.</strong> El usuario tendrá un buzón de sugerencias en la cual podrá dejar sus observaciones o quejas\n\n        para ser atendidas de forma directa</dd>\n\n      <dd>\n\n        <strong>4.</strong> El mapa previsto para su reserva está delimitado, asegúrese que su ruta esté dentro de los\n\n        límites establecidos. </dd>\n\n      <dd>\n\n        <strong>5.</strong> Al momento de realizar la petición se encontrará un aviso de precios aproximados por hora de\n\n        paseo.</dd>\n\n      <dd>\n\n        <strong>6.</strong> El usuario deberá de llenar la información adicional sobre su mascota solicitada en su\n\n        perfil: enfermedades,\n\n        IMPORTANTE: la mascota debe de tener una placa con su nombre (mascota) y número de contacto.\n\n      </dd>\n\n    </dl>\n\n    <br>\n\n\n\n    <h3>Precio, duración y forma de pago </h3>\n\n\n\n    <br>\n\n\n\n    <dl align="justify">\n\n      <dd>\n\n        <strong>1.</strong> Si el usuario desea realizar una reserva a una hora específica deberá de reservar con\n\n        máximo una hora de anterioridad.</dd>\n\n      <dd>\n\n        <strong>&nbsp;&nbsp;1.1.</strong> De igual manera el usuario puede reservar las veces necesite el paseo de su\n\n        mascota.\n\n        Pues los servidores lograrán agendar el paseo para el día y la hora indicada.</dd>\n\n      <dd><strong>&nbsp;&nbsp;1.2.</strong> Si el usuario necesita el paseo el mismo día que solicita\n\n        se tendrá que efectuar con una hora de anterioridad.</dd>\n\n      <dd>\n\n        <strong>2.</strong> El pago del servicio podrá ser efectuado en efectivo o podrá utilizar medios\n\n        electrónicos como tarjeta de crédito/ débito mediante la cuenta PayPal.</dd>\n\n      <dd><strong>&nbsp;&nbsp;2.1.</strong> El usuario debe de crearse una cuenta en PayPal.com para el pago inmediato\n\n        vía\n\n        electrónica y asumir que se cobrará un dólar y veinte y cinco centavos de dólares americanos (1,25 $) adicional\n\n      </dd>\n\n      <dd>\n\n        <strong>3.</strong> La duración mínima de paseo es de una hora.</dd>\n\n    </dl>\n\n\n\n    <br>\n\n\n\n    <h3>Responsabilidades </h3>\n\n    <h4>Garantías</h4>\n\n\n\n    <br>\n\n\n\n    <dl align="justify">\n\n      <dd>\n\n        <strong>- Siniestros</strong><br>\n\n        Dogi garantiza la seguridad de su mascota desde el momento de su recogida\n\n        hasta su momento de llegada, sin embargo, no garantizamos la seguridad en\n\n        siniestros fortuitos como: terremotos, diluvios, explosiones, accidentes\n\n        de tránsito, robo, hurto incendios, lesiones.\n\n      </dd>\n\n\n\n      <dd>\n\n        <strong>- Paseadores:</strong>Dogers</dd>\n\n      <dd>\n\n        <strong>- </strong> [ ] Dogi garantiza el seguimiento de la ruta y duración establecida por el usuario,\n\n        además del estado del paseador psicológicamente. Dogi selecciona a los mejores perfiles de paseadores\n\n        para llevar seguro y confiable a su mascota en todo momento. Dogi utiliza métodos psicológicos para evaluar el\n\n        desempeño de nuestros dogers.\n\n        Además de una entrevista personalizada.\n\n      </dd>\n\n\n\n      <dd>\n\n        <strong>- </strong>Dogi verifica que los paseadores no hayan tenido antecedentes penales o haber tenido algún\n\n        inconveniente\n\n        relacionado con maltrato animal.\n\n      </dd>\n\n\n\n    </dl>\n\n\n\n\n\n  </div>\n\n  <br>\n\n  <br>\n\n</ion-content>`/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\terminos\terminos.html"*/,
        }),
        __metadata("design:paramtypes", [])
    ], TerminosPage);
    return TerminosPage;
}());

//# sourceMappingURL=terminos.js.map

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MiCuenta; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_user_services__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_global__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MiCuenta = (function () {
    function MiCuenta(navCtrl, alertCtrl, _userService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this._userService = _userService;
        this.loadingCtrl = loadingCtrl;
        this.estadoContrasena = '0';
        this.disableTextbox = true;
        this.disableCedula = true;
        this.identity = _userService.getIdentity();
        console.log(this.identity);
        this.url = __WEBPACK_IMPORTED_MODULE_3__app_services_global__["a" /* GLOBAL */].url;
        if (this.identity.image == undefined) {
            this.url2 = 'assets/imgs/tituloRegistro.png';
        }
        else {
            this.url2 = this.url + 'get-image-user/' + this.identity.image;
            console.log("este es la iamgen" + this.identity.image);
        }
    }
    MiCuenta.prototype.toggleDisable = function () {
        this.disableTextbox = !this.disableTextbox;
    };
    MiCuenta.prototype.validarCedula = function () {
        var cad = this.identity.cedula;
        var i;
        var total = 0;
        var longitud = cad.length;
        var longcheck = longitud - 1;
        if (cad !== "" && longitud === 10) {
            for (i = 0; i < longcheck; i++) {
                if (i % 2 === 0) {
                    var aux = cad.charAt(i) * 2;
                    if (aux > 9)
                        aux -= 9;
                    total += aux;
                }
                else {
                    total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
                }
            }
            total = total % 10 ? 10 - total % 10 : 0;
            if (cad.charAt(longitud - 1) == total) {
                return true;
            }
            else {
                this.presentAlertCedula();
                this.identity.cedula = "";
                return false;
            }
        }
    };
    MiCuenta.prototype.presentAlertCedula = function () {
        var alert = this.alertCtrl.create({
            subTitle: "Atención",
            message: "La cédula ingresada es incorrecta",
            buttons: ["Aceptar"]
        });
        alert.present();
    };
    MiCuenta.prototype.onUpdate = function () {
        var _this = this;
        try {
            if (!this.validarCampos()) {
                console.log("mi JSON esta vacio");
                this.presentAlert();
            }
            else {
                this.verificarUpdate();
                this._userService.update_user(this.identity, this.estadoContrasena).subscribe(function (response) {
                    if (!response.user) {
                        var errorMessage = "El usuario no se actualizo";
                    }
                    else {
                        if (_this.filesToUpload) {
                            console.log("nombre de archivo" + _this.filesToUpload[0].name);
                            _this.makeFileRequest(_this.url + 'upload-image-user/' + response.user._id, [], _this.filesToUpload).then(function (result) {
                                _this.identity.image = result.image;
                                _this.url2 = _this.url + 'get-image-user/' + _this.identity.image;
                                _this.identity = _this._userService.getIdentity();
                            });
                        }
                        setTimeout(function () {
                            _this.showAlertCorrecto("Sus datos han sido actualizados correctamente");
                        }, 3000);
                        localStorage.setItem('identity', JSON.stringify(_this.identity));
                    }
                }, function (err) {
                    var errorMessage = err;
                    if (errorMessage) {
                        console.log(errorMessage);
                        try {
                            var body = JSON.parse(err._body);
                            errorMessage = body.message;
                        }
                        catch (error) {
                            errorMessage = "No hay conexión intentelo más tarde";
                        }
                        setTimeout(function () {
                            _this.showAlert(errorMessage);
                        }, 3000);
                    }
                });
            }
        }
        catch (error) {
            //this.showAlert("Verifique que la información sea correcta");
        }
    };
    MiCuenta.prototype.presentAlert = function () {
        var alert = this.alertCtrl.create({
            title: "Atención",
            subTitle: "Verifique que la información sea correcta antes de continuar",
            buttons: ["Aceptar"]
        });
        alert.present();
    };
    MiCuenta.prototype.validarCampos = function () {
        var bool_nombres = this.soloLetras(this.identity.nombre);
        var bool_apellidos = this.soloLetras(this.identity.apellido);
        var bool_celular = this.soloNumeros(this.identity.tel_celular);
        var bool_telefono = this.soloNumeros(this.identity.tel_convencional);
        //var bool_cedula = this.validarCedula();
        if (this.identity.cedula == "" ||
            this.identity.nombre == "" ||
            this.identity.apellido == "" ||
            this.identity.correo == "" ||
            this.identity.tel_celular == "" ||
            this.identity.tel_convencional == "" ||
            // !bool_cedula||
            bool_nombres ||
            bool_apellidos ||
            bool_celular ||
            bool_telefono) {
            return false;
        }
        else {
            return true;
        }
    };
    MiCuenta.prototype.soloNumeros = function (string) {
        //solo letras
        //Se añaden las letras validas
        var filtro = "0123456789"; //Caracteres validos
        var ct = 0;
        for (var i = 0; i < string.length; i++) {
            if (filtro.indexOf(string.charAt(i)) == -1) {
                ct = ct + 1;
            }
        }
        if (ct > 0) {
            console.log("VALOR TRUE");
            return true; //Posee caracteres especiales
        }
        else {
            console.log("VALOR FALSE");
            return false; //NO Posee caracteres especiales
        }
    };
    MiCuenta.prototype.soloLetras = function (string) {
        //solo letras
        //Se añaden las letras validas
        var filtro = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ "; //Caracteres validos
        var ct = 0;
        for (var i = 0; i < string.length; i++) {
            if (filtro.indexOf(string.charAt(i)) == -1) {
                ct = ct + 1;
            }
        }
        if (ct > 0) {
            return true; //Posee caracteres especiales
        }
        else {
            return false; //NO Posee caracteres especiales
        }
    };
    MiCuenta.prototype.showAlertCorrecto = function (corec) {
        var alert = this.alertCtrl.create({
            title: "Correcto",
            subTitle: corec,
            buttons: ["OK"]
        });
        alert.present();
    };
    MiCuenta.prototype.verificarUpdate = function () {
        var loading = this.loadingCtrl.create({
            content: "Verficando sus datos"
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 3000);
    };
    MiCuenta.prototype.showAlert = function (errorr) {
        var alert = this.alertCtrl.create({
            subTitle: "Error",
            message: errorr,
            buttons: ["OK"]
        });
        alert.present();
    };
    MiCuenta.prototype.readUrl = function (event) {
        var _this = this;
        this.filesToUpload = event.target.files;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                _this.url2 = event.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    MiCuenta.prototype.makeFileRequest = function (url, params, files) {
        // var token = this.tpken;
        return new Promise(function (resolve, reject) {
            var fromData = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                fromData.append('image', files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open('POST', url, true);
            // xhr.setRequestHeader('Authorization', token);
            xhr.send(fromData);
        });
    };
    MiCuenta = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-mi_cuenta',template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\mi_cuenta\mi_cuenta.html"*/`<ion-header>\n\n  <ion-navbar color="colorapp">\n\n    <button ion-button menuToggle icon-only>\n\n      <ion-icon name=\'menu\'></ion-icon>\n\n    </button>\n\n    <ion-title style="float: left;">\n\n      Mi Cuenta\n\n    </ion-title>\n\n\n\n    <button (click)="toggleDisable()"\n\n    style="background: transparent; left:0; right:0; max-width:40px; float: right; margin-right: 15%; display: block; max-height:100%;">\n\n    <ion-icon  style="cursor:pointer; font-size: 140%; color:rgb(255, 255, 255);">  <img src="assets/imgs/lapizEditar.png"></ion-icon>\n\n  </button>\n\n\n\n\n\n    <!-- <button (click)="toggleDisable()" style="background: transparent; left:0; right:0; max-width:10%; float: right; margin-right: 5%; display: block; max-height:100%; display: flex;\n\n      align-items: center; justify-content: center;">\n\n      <ion-icon item-left>\n\n         <img src="assets/imgs/lapizEditar.png"> -->\n\n      <!-- </ion-icon> -->\n\n    <!--</button> -->\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content style="background-image: url(\'assets/imgs/Registro.png\')" class="getstarCuenta">\n\n  <br>\n\n  <h1 style="text-align: center">Mi cuenta</h1>\n\n  <br>\n\n  <label class=" form-control fileContainer" style="border: none; ">\n\n    <img id="imganeTitulo" [src]="url2" style="display: block; width: 40%; ">\n\n    <input type=\'file\' id="nuestroinput" class="btn btn-primary" (change)="readUrl($event)" />\n\n    \n\n  </label>\n\n  <form #FormularioUpdate="ngForm" (ngSubmit)="onUpdate()" id="formUpdate">\n\n\n\n\n\n    <ion-list>\n\n\n\n      <ion-item>\n\n        <ion-label fixed>Nombres:</ion-label>\n\n        <ion-input [disabled]=\'disableTextbox\' style="text-align: center;" #nombres="ngModel" [(ngModel)]="identity.nombre" name="nombres"\n\n          type="text" value="" pattern="[a-zA-Z ]*" required></ion-input>\n\n      </ion-item>\n\n      <ion-item *ngIf="nombres.errors && (nombres.dirty || nombres.touched)">\n\n        <ion-icon name="alert" item-start color="danger"></ion-icon>\n\n        <p ion-text color="danger" [hidden]="!nombres.errors.pattern">Ingrese sólo caracteres alfabéticos</p>\n\n        <p ion-text color="danger" [hidden]="!nombres.errors.required">Campo requerido</p>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label fixed>Apellidos:</ion-label>\n\n        <ion-input [disabled]=\'disableTextbox\' #apellidos="ngModel" [(ngModel)]="identity.apellido" name="apellidos" type="text"\n\n          value="" pattern="[a-zA-Z ]*" required></ion-input>\n\n      </ion-item>\n\n      <ion-item *ngIf="apellidos.errors && (apellidos.dirty || apellidos.touched)">\n\n        <ion-icon name="alert" item-start color="danger"></ion-icon>\n\n        <p ion-text color="danger" [hidden]="!apellidos.errors.pattern">Ingrese sólo caracteres alfabéticos</p>\n\n        <p ion-text color="danger" [hidden]="!apellidos.errors.required">Campo requerido</p>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label fixed>Cedula:</ion-label>\n\n        <ion-input [disabled]=\'disableCedula\' #cedula="ngModel" [(ngModel)]="identity.cedula" name="cedula" type="text" value=""\n\n          required digits pattern="[0-9]*" (keyup)="validarCedula()" minlength="10" maxlength="10"></ion-input>\n\n      </ion-item>\n\n      <ion-item *ngIf="cedula.errors && (cedula.dirty || cedula.touched)">\n\n        <ion-icon name="alert" item-start color="danger"></ion-icon>\n\n        <p ion-text color="danger" [hidden]="!cedula.errors.pattern">Ingrese sólo números</p>\n\n        <p ion-text color="danger" [hidden]="!cedula.errors.minlength">Ingrese una cedula válida</p>\n\n        <p ion-text color="danger" [hidden]="!cedula.errors.required">Campo requerido</p>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label fixed>Correo:</ion-label>\n\n        <ion-input [disabled]=\'disableTextbox\' #correo="ngModel" [(ngModel)]="identity.correo" name="correo" type="text" value="" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"\n\n          required email></ion-input>\n\n      </ion-item>\n\n      <ion-item *ngIf="correo.errors && (correo.dirty || correo.touched)">\n\n        <ion-icon name="alert" item-start color="danger"></ion-icon>\n\n        <p ion-text color="danger" [hidden]="!correo.errors.required">Campo requerido &nbsp;</p>\n\n        <p ion-text color="danger" [hidden]="!correo.errors.email">Correo invalido</p>\n\n        <p ion-text color="danger" [hidden]="!correo.errors.pattern">Correo no mayusculas</p>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label fixed>Celular:</ion-label>\n\n        <ion-input [disabled]=\'disableTextbox\' #celular="ngModel" [(ngModel)]="identity.tel_celular" name="celular" type="text" value=""\n\n          required digits pattern="[0-9]*" minlength="10" maxlength="10"></ion-input>\n\n      </ion-item>\n\n      <ion-item *ngIf="celular.errors && (celular.dirty || celular.touched)">\n\n        <ion-icon name="alert" item-start color="danger"></ion-icon>\n\n        <p ion-text color="danger" [hidden]="!celular.errors.pattern">Ingrese sólo números</p>\n\n        <p ion-text color="danger" [hidden]="!celular.errors.minlength">Ingrese una número válido</p>\n\n        <p ion-text color="danger" [hidden]="!celular.errors.required">Campo requerido</p>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label fixed>Convencional:</ion-label>\n\n        <ion-input [disabled]=\'disableTextbox\' #convencional="ngModel" [(ngModel)]="identity.tel_convencional" name="convencional"\n\n          type="text" value="" required digits pattern="[0-9]*" minlength="6" maxlength="10"></ion-input>\n\n      </ion-item>\n\n      <ion-item *ngIf="convencional.errors && (convencional.dirty || convencional.touched)">\n\n        <ion-icon name="alert" item-start color="danger"></ion-icon>\n\n        <p ion-text color="danger" [hidden]="!convencional.errors.pattern">Ingrese sólo números</p>\n\n        <p ion-text color="danger" [hidden]="!convencional.errors.minlength">Ingrese un número válido</p>\n\n        <p ion-text color="danger" [hidden]="!convencional.errors.required">Campo requerido</p>\n\n      </ion-item>\n\n    </ion-list>\n\n    <input type="submit" src="assets/imgs/btnGuardarCambios.png" type="image" style="margin: auto; display: block ;max-width: 75%; display: block">\n\n  </form>\n\n</ion-content>`/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\mi_cuenta\mi_cuenta.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__app_services_user_services__["a" /* UserService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__app_services_user_services__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_services_user_services__["a" /* UserService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]) === "function" && _d || Object])
    ], MiCuenta);
    return MiCuenta;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=mi_cuenta.js.map

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_services_user_services__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__ = __webpack_require__(411);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ContactosPage = (function () {
    function ContactosPage(_userService, callNumber, emailComposer) {
        this._userService = _userService;
        this.callNumber = callNumber;
        this.emailComposer = emailComposer;
        this.identity = this._userService.getIdentity();
    }
    /*itemSelected(item: string) {
       console.log("Selected Item", item);*/
    ContactosPage.prototype.llama = function () {
        this.callNumber.callNumber("0987791602", true)
            .then(function (res) { return console.log('Launched dialer!', res); })
            .catch(function (err) { return console.log('Error launching dialer', err); });
    };
    ContactosPage.prototype.enviarEmail = function () {
        this.emailComposer.isAvailable().then(function (available) {
            if (available) {
                //Now we know we can send
            }
        });
        var email = {
            to: 'dogipaseoscaninosec@gmail.com',
            cc: '',
            subject: 'Contáctanos DOGI',
            body: 'Saludos : ',
            isHtml: true
        };
        this.emailComposer.open(email);
    };
    ContactosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-contacto',template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\contactanos\contactanos.html"*/`<!-- <ion-header>\n\n  <ion-navbar color="colorapp">\n\n    <button *ngIf="identity" ion-button menuToggle icon-only>\n\n      <ion-icon name=\'menu\'></ion-icon>\n\n    </button>\n\n    <ion-title style="text-align: center;">Contáctanos</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n\n\n<ion-header>\n\n  <ion-navbar color="colorapp">\n\n      <button ion-button menuToggle icon-only>\n\n          <ion-icon name=\'menu\'></ion-icon>\n\n      </button>\n\n      <ion-title style="text-align: center;">Contáctanos</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content style="background-image: url(\'assets/imgs/Registro.png\')" class="getstarContactos">\n\n  <br>\n\n  <br>\n\n  <ion-list>\n\n    <button ion-item class="btn-cb" (click)="llama()">\n\n      <img src="assets/imgs/contactoTcel.png" style="width: 17% ;padding-right: 5%"> 0987791602\n\n    </button>\n\n   \n\n\n\n    \n\n    <button   (click)="enviarEmail()" ion-item class="btn-cb">\n\n      <img   src="assets/imgs/contactoCorreo.png" style="width: 17% ;padding-right: 5%"> E-mail\n\n    </button>\n\n  </ion-list>\n\n</ion-content>`/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\contactanos\contactanos.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_1__app_services_user_services__["a" /* UserService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__app_services_user_services__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__["a" /* EmailComposer */]])
    ], ContactosPage);
    return ContactosPage;
}());

//# sourceMappingURL=contactanos.js.map

/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContrasenaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_user_services__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContrasenaPage = (function () {
    function ContrasenaPage(_userService, alertCtrl, loadingCtrl) {
        this._userService = _userService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.isActiveToggleTextPassword = true;
        this.estadoContrasena = '1';
    }
    ContrasenaPage.prototype.toggleTextPassword = function () {
        this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
    };
    ContrasenaPage.prototype.getType = function () {
        return this.isActiveToggleTextPassword ? 'password' : 'text';
    };
    ContrasenaPage.prototype.verificarContrasenas = function () {
        if ((this.contrasenaNueva == this.confirmarContrasenaNueva) && this.contrasenaNueva != null && this.contrasenaNueva != "" && this.confirmarContrasenaNueva != null && this.confirmarContrasenaNueva != "") {
            return true;
        }
        else {
            return false;
        }
    };
    ContrasenaPage.prototype.onUpdate = function () {
        var _this = this;
        var validacion = this.verificarContrasenas();
        if (validacion == true) {
            this.verificarUpdate();
            var user = this._userService.getIdentity();
            user.contrasena = this.contrasenaNueva;
            try {
                this._userService.update_user(user, this.estadoContrasena).subscribe(function (response) {
                    if (!response.user) {
                        var errorMessage = "El usuario no se actualizo";
                    }
                    else {
                        setTimeout(function () {
                            _this.showAlertCorrecto("Sus datos han sido actualizados correctamente");
                        }, 3000);
                        localStorage.setItem('identity', JSON.stringify(response.user));
                        console.log("esta e sla nueva identiti de actualizar contrasena", response.user);
                    }
                }, function (err) {
                    var errorMessage = err;
                    if (errorMessage) {
                        console.log(errorMessage);
                        try {
                            var body = JSON.parse(err._body);
                            errorMessage = body.message;
                        }
                        catch (error) {
                            errorMessage = "No hay conexión intentelo más tarde";
                        }
                        setTimeout(function () {
                            _this.showAlert(errorMessage);
                        }, 3000);
                    }
                });
            }
            catch (error) {
                //this.showAlert("Verifique que la información sea correcta");
            }
        }
        else {
            this.showAlert('Verifique que los datos sean correctos');
        }
    };
    ContrasenaPage.prototype.showAlertCorrecto = function (corec) {
        var alert = this.alertCtrl.create({
            title: "Correcto",
            subTitle: corec,
            buttons: ["OK"]
        });
        alert.present();
    };
    ContrasenaPage.prototype.verificarUpdate = function () {
        var loading = this.loadingCtrl.create({
            content: "Verficando sus datos"
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 3000);
    };
    ContrasenaPage.prototype.showAlert = function (errorr) {
        var alert = this.alertCtrl.create({
            subTitle: "Error",
            message: errorr,
            buttons: ["OK"]
        });
        alert.present();
    };
    ContrasenaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-contrasena',template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\contrasena\contrasena.html"*/`<ion-header>\n\n    <ion-navbar color="colorapp">\n\n        <button ion-button menuToggle icon-only>\n\n            <ion-icon name=\'menu\'></ion-icon>\n\n        </button>\n\n        <ion-title style="text-align: center;">Cambiar contraseña</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content style=" background-image: url(\'assets/imgs/Registro.png\')" class="getstarContactos">\n\n    <form #FormularioRegistro="ngForm" id="formRegistro">\n\n        <div class="container" id="padre">\n\n            <div style="padding: 10%;" id="hijo">\n\n <!-- srsrtfsgsfs -->\n\n                <div class="Aligner-item Aligner-item--top"></div>\n\n                <img id="imganeTitulo" src="assets/imgs/titulo.png" style="width: 70%;">\n\n                <div style="margin-top: 40px;" class="Aligner-item Aligner-item--bottom"></div>\n\n                <ion-row>\n\n                    <ion-item>\n\n                        <ion-icon item-left style="  max-width:10%; margin-top:3%; margin-bottom:0; margin-right:0% ">\n\n                            <img style=" max-width:90%;left: 0;right: 0; " src="assets/imgs/contrasenaRegistro.png">\n\n                        </ion-icon>\n\n                        <ion-input [type]="getType()" #ContrasenaNueva="ngModel" [(ngModel)]="contrasenaNueva" type="password" placeholder="Contraseña nueva"\n\n                            name="contrasena" required minlength="6"></ion-input>\n\n                    </ion-item>\n\n                    <ion-item *ngIf="ContrasenaNueva.errors && (ContrasenaNueva.dirty || ContrasenaNueva.touched)">\n\n                        <ion-icon name="alert" item-start color="danger"></ion-icon>\n\n                        <p ion-text color="danger" [hidden]="!ContrasenaNueva.errors.required">Campo requerido &nbsp;</p>\n\n                        <p ion-text color="danger" [hidden]="!ContrasenaNueva.errors.minlength">Contraseña minima de 6 caracteres</p>\n\n                    </ion-item>\n\n                </ion-row>\n\n                <ion-row>\n\n                    <ion-item>\n\n                        <ion-icon item-left style="  max-width:10%; margin-top:3%; margin-bottom:0; margin-right:0% ">\n\n                            <img style=" max-width:90%;left: 0;right: 0; " src="assets/imgs/contrasenaRegistro.png">\n\n                        </ion-icon>\n\n                        <ion-input type="password" placeholder="Confirmar Contraseña nueva" name="confirmarContrasena" #ConfirmarContrasenaNueva="ngModel"\n\n                            [(ngModel)]="confirmarContrasenaNueva" required [equalTo]="ContrasenaNueva"></ion-input>\n\n                    </ion-item>\n\n                    <ion-item *ngIf="ConfirmarContrasenaNueva.errors && (ConfirmarContrasenaNueva.dirty || ConfirmarContrasenaNueva.touched)">\n\n                        <ion-icon name="alert" item-start color="danger"></ion-icon>\n\n                        <p ion-text color="danger" [hidden]="!ConfirmarContrasenaNueva.errors.required">Campo requerido &nbsp;</p>\n\n                        <p ion-text color="danger" [hidden]="!ConfirmarContrasenaNueva.errors.equalTo">La contraseña no coincide</p>\n\n                    </ion-item>\n\n                </ion-row>\n\n                <div class="checkbox">\n\n                    <label style="margin-top: 30px;">\n\n                        <input type="checkbox" (click)="toggleTextPassword()"> Mostrar Contraseña\n\n                    </label>\n\n                </div>\n\n\n\n            </div>\n\n        </div>\n\n        <button (click)="onUpdate()" type="submit" style="margin: auto; display: block; max-width: 75%; display: block; background-color: transparent;"><img\n\n                src="assets/imgs/btnGuardarCambios.png"></button>\n\n    </form>\n\n</ion-content>`/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\contrasena\contrasena.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__app_services_user_services__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], ContrasenaPage);
    return ContrasenaPage;
}());

//# sourceMappingURL=contrasena.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GLOBAL; });
var GLOBAL = {
    //url: "http://www.appmontecarlotransvip.com:3977/api/"
    // url:"http://localhost:3977/api/"
    // url:"http://192.168.100.22:3977/api/"
    url: "http://www.dogipaseoscaninos.com:3977/api/"
};
//# sourceMappingURL=global.js.map

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(462);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_registro_registro__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_mi_cuenta_mi_cuenta__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_principal_principal__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_ubicacion_inicio_ubicacion_inicio__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_ubicacion_final_ubicacion_final__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_historial_historial__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_solicitudes_solicitudes__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_cardsolicitud_cardsolicitud__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_confirmacion_confirmacion__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_terminos_terminos__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_contrasena_contrasena__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_contactanos_contactanos__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__services_user_services__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_message_services__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_notificaciones_services__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__services_paypal_service__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_correo_service__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_geolocation__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__agm_core__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__angular_forms__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_ng2_validation__ = __webpack_require__(790);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_ng2_validation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_28_ng2_validation__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_mydatepicker__ = __webpack_require__(879);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_in_app_browser__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_call_number__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_email_composer__ = __webpack_require__(411);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























//plugin de la geolicalizacion


//validacion de campos


//Datapicker

// abrir browser

// call number

// e-mail

var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_registro_registro__["a" /* RegistroPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_mi_cuenta_mi_cuenta__["a" /* MiCuenta */],
                __WEBPACK_IMPORTED_MODULE_10__pages_principal_principal__["a" /* PrincipalPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_ubicacion_inicio_ubicacion_inicio__["a" /* UbicacionInicioPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_ubicacion_final_ubicacion_final__["a" /* UbicacionFinalPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_historial_historial__["a" /* HistorialPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_solicitudes_solicitudes__["a" /* SolicitudesPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_cardsolicitud_cardsolicitud__["a" /* CardsolicitudPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_confirmacion_confirmacion__["a" /* ConfirmacionPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_terminos_terminos__["a" /* TerminosPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_contrasena_contrasena__["a" /* ContrasenaPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_contactanos_contactanos__["a" /* ContactosPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_26__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyARuGaeV-rD_M_ZP2uZT6d8SzFmywzAbRk',
                    libraries: ["places"]
                }),
                __WEBPACK_IMPORTED_MODULE_27__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_28_ng2_validation__["CustomFormsModule"],
                __WEBPACK_IMPORTED_MODULE_29_mydatepicker__["MyDatePickerModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_registro_registro__["a" /* RegistroPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_mi_cuenta_mi_cuenta__["a" /* MiCuenta */],
                __WEBPACK_IMPORTED_MODULE_10__pages_principal_principal__["a" /* PrincipalPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_ubicacion_inicio_ubicacion_inicio__["a" /* UbicacionInicioPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_ubicacion_final_ubicacion_final__["a" /* UbicacionFinalPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_historial_historial__["a" /* HistorialPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_solicitudes_solicitudes__["a" /* SolicitudesPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_cardsolicitud_cardsolicitud__["a" /* CardsolicitudPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_confirmacion_confirmacion__["a" /* ConfirmacionPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_terminos_terminos__["a" /* TerminosPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_contrasena_contrasena__["a" /* ContrasenaPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_contactanos_contactanos__["a" /* ContactosPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_20__services_user_services__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_21__services_message_services__["a" /* MessageService */],
                __WEBPACK_IMPORTED_MODULE_22__services_notificaciones_services__["a" /* NotificacionesService */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_31__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_email_composer__["a" /* EmailComposer */],
                __WEBPACK_IMPORTED_MODULE_23__services_paypal_service__["a" /* PayPal */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_24__services_correo_service__["a" /* EnvioEmail */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 505:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_principal_principal__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_user_services__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_mi_cuenta_mi_cuenta__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_contactanos_contactanos__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_contrasena_contrasena__ = __webpack_require__(412);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// import { Encuentranos } from '../pages/page_menu/encuentranos/encuentranos';



// import { PagoOnlinePage } from '../pages/pagoOnline/pagoOnline';
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, _userService) {
        this._userService = _userService;
        //rootPage: any;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
        if (_userService.getIdentity()) {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_principal_principal__["a" /* PrincipalPage */];
        }
        else {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        }
    }
    MyApp.prototype.ngOnInit = function () {
        this.pages = [
            { titulo: 'Menú Principal', component: __WEBPACK_IMPORTED_MODULE_5__pages_principal_principal__["a" /* PrincipalPage */], icon: 'inicio.png' },
            { titulo: 'Mi Cuenta', component: __WEBPACK_IMPORTED_MODULE_7__pages_mi_cuenta_mi_cuenta__["a" /* MiCuenta */], icon: 'correroRegistro.png' },
            { titulo: 'Contáctenos', component: __WEBPACK_IMPORTED_MODULE_8__pages_contactanos_contactanos__["a" /* ContactosPage */], icon: 'contactoTC.png' },
            { titulo: 'Cambiar contraseña', component: __WEBPACK_IMPORTED_MODULE_9__pages_contrasena_contrasena__["a" /* ContrasenaPage */], icon: 'cambiarContrasena.png' }
        ];
    };
    MyApp.prototype.goToPage = function (page) {
        this.nav.setRoot(page);
    };
    MyApp.prototype.Logout = function () {
        this._userService.logout();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('NAV'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\app\app.html"*/`<ion-menu [content]="NAV" id=\'myMenu\'>\n\n    <ion-header>\n\n    </ion-header>\n\n    <ion-content style="background-image: url(\'assets/imgs/Registro.png\')" class="getstarToggle">\n\n      <img style="background: transparent; width: 120%;" src="assets/imgs/portadaToglle.png" alt="">\n\n      <br>\n\n      <br>\n\n      <ion-list>\n\n        <button class="btn-cb" ion-item *ngFor="let page of pages" (click)="goToPage(page.component)" menuClose>\n\n          <img src="assets/imgs/{{ page.icon }}" style="width: 17% ;padding-right: 5%"> {{ page.titulo }}\n\n        </button>\n\n  \n\n        <button class="btn-cb" ion-item (click)="Logout()" menuClose>\n\n          <img src="assets/imgs/salir.png" style="width: 17% ;padding-right: 5%"> Cerrar Sesión\n\n        </button>\n\n      </ion-list>\n\n    </ion-content>\n\n  </ion-menu>\n\n  \n\n  <ion-nav id="nav" #NAV [root]="rootPage"></ion-nav>\n\n  `/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\app\app.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_6__services_user_services__["a" /* UserService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_6__services_user_services__["a" /* UserService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Solicitud; });
var Solicitud = (function () {
    function Solicitud(latitud, longitud) {
        this.latitud = latitud;
        this.longitud = longitud;
    }
    Solicitud.prototype.verDatos = function () {
        return console.log("COMUN: solicitud: ", this.latitud, " ::: longitud: ", this.longitud);
    };
    return Solicitud;
}());

//# sourceMappingURL=solicitud.js.map

/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User(_id, cedula, nombre, apellido, correo, contrasena, tel_celular, tel_convencional, estado, image) {
        this._id = _id;
        this.cedula = cedula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contrasena = contrasena;
        this.tel_celular = tel_celular;
        this.tel_convencional = tel_convencional;
        this.estado = estado;
        this.image = image;
    }
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrincipalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_user_services__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_services_message_services__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_services_notificaciones_services__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ubicacion_inicio_ubicacion_inicio__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_historial_historial__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_solicitudes_solicitudes__ = __webpack_require__(189);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var PrincipalPage = (function () {
    function PrincipalPage(menuCtrl, formBuilder, alertCtrl, navCtrl, _ubicacionProv, _messageservice, _notificacionesservice) {
        this.menuCtrl = menuCtrl;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this._ubicacionProv = _ubicacionProv;
        this._messageservice = _messageservice;
        this._notificacionesservice = _notificacionesservice;
        this.displayMont = new Date().getMonth();
        this.displayDay = new Date().getDate();
        this.displayYear = new Date().getFullYear();
        //Datapicker
        this.myDatePickerOptions = {
            dateFormat: 'dd/mm/yyyy',
            dayLabels: { su: "Do", mo: "Lu", tu: "Ma", we: "Mi", th: "Ju", fr: "Vi", sa: "Sa" },
            monthLabels: { 1: "Ene", 2: "Feb", 3: "Mar", 4: "Abr", 5: "May", 6: "Jun", 7: "Jul", 8: "Ago", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dic" },
            todayBtnTxt: "Hoy",
            firstDayOfWeek: "mo",
            sunHighlight: false,
            markCurrentDay: true,
            minYear: this.displayYear - 1,
            height: '40px',
            disableUntil: { year: this.displayYear, month: this.displayMont + 1, day: this.displayDay - 1 }
        };
        //Primera Pagina de solicitar Patita
        this.VarPatita = true;
        this.menuprincipal = true;
        this.bander = false;
        this.solicita = false;
        //Objeto con la solicitud
        this.objSolicitudViaje = {
            tipo: 'Viaje',
            estado: "0",
            raza: null,
            num_edad: null,
            fechaSalida: null,
            horarioR: null,
            horarioE: null,
            informacion: null,
            latitud_salida: null,
            longitud_salida: null,
            latitud_llegada: null,
            longitud_llegada: null,
            identity: null,
            estadoLleno: '0'
        };
        this.aparecer = true;
    }
    //Activar Pedido
    PrincipalPage.prototype.activaV = function () {
        this.VarPatita = false;
        this.bander = true;
        this.solicita = true;
        this.menuprincipal = false;
    };
    PrincipalPage.prototype.irUbicacionInicio = function () {
        this.aparecer = false;
        this.objSolicitudViaje.raza = this.Raza;
        this.objSolicitudViaje.num_edad = this.num_edad;
        this.objSolicitudViaje.fechaSalida = this.fecha_salida;
        this.objSolicitudViaje.horarioR = this.horarioR;
        this.objSolicitudViaje.horarioE = this.horarioE;
        this.objSolicitudViaje.informacion = this.inf_adicional;
        this.objSolicitudViaje.identity = JSON.parse(localStorage.getItem("identity"));
        console.log(this.objSolicitudViaje);
        localStorage.setItem("objSolicitudViaje", JSON.stringify(this.objSolicitudViaje));
        if (this.Raza != null && this.Raza != "" && this.num_edad != null && this.num_edad != "" && this.fecha_salida != "" && this.fecha_salida != null && this.horarioE != "" && this.horarioE != null && this.horarioR != "" && this.horarioR != null) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__ubicacion_inicio_ubicacion_inicio__["a" /* UbicacionInicioPage */]);
        }
        else {
            this.nolleno();
        }
    };
    PrincipalPage.prototype.nolleno = function () {
        var alert = this.alertCtrl.create({
            title: "<center><h3>INFORMACIÓN</h3></center>",
            message: '<p align="justify">Ingrese todos los datos requeridos, existen campos vacíos.<p>',
            buttons: ["OK"],
            cssClass: 'customLoader'
        });
        alert.present();
    };
    PrincipalPage.prototype.historial = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__pages_historial_historial__["a" /* HistorialPage */]);
    };
    PrincipalPage.prototype.solicitudes = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__pages_solicitudes_solicitudes__["a" /* SolicitudesPage */]);
    };
    PrincipalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "page-principal",template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\principal\principal.html"*/`<ion-header>\n\n  <ion-navbar hideBackButton color="colorapp">\n\n    <button ion-button menuToggle icon-only>\n\n      <ion-icon name=\'menu\'></ion-icon>\n\n    </button>\n\n\n\n    <!-- es es ios  ////////////// -->\n\n    <ion-title style="padding-right: 0%;"><label left>Menú Principal</label>\n\n       <button (click)="solicitudes()"\n\n        style="background: transparent; left:0; right:0; max-width:2%; float: right; margin-right: 15%; display: block; max-height:100%;">\n\n        <ion-icon name="calendar" style="cursor:pointer; font-size: 140%; color:rgb(255, 255, 255);"></ion-icon>\n\n      </button>\n\n\n\n      <button (click)="historial()"\n\n        style="background: transparent; left:0; right:0; max-width:2%; float: right; margin-right: 15%; display: block; max-height:100%;">\n\n        <ion-icon name="notifications" style="cursor:pointer; font-size: 150%; color:rgb(255, 255, 255);"></ion-icon>\n\n      </button>\n\n    </ion-title>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content style="background-image: url(\'assets/imgs/fondo2.png\')" class="getstarPrincipal">\n\n  <br>\n\n  <form #myForm="ngForm" novalidate class="form_princi">\n\n\n\n    <!-- ESTE ES EL PEDIDO PATITA -->\n\n    <div id="page_principal" *ngIf="menuprincipal">\n\n      <div id="hijo">\n\n        <ion-item class="css-btn" *ngIf="VarPatita">\n\n            <br><br><br><br>\n\n          <div id="icon-item" *ngIf="VarPatita" value="VIAJES" (click)="activaV()">\n\n            <ion-icon style="cursor:pointer; font-size: 780%;">\n\n              <img src="assets/imgs/patita.png" style=" margin: 0; padding: 0;">\n\n            </ion-icon>\n\n          </div>\n\n          <input type="button" class="btn1" *ngIf="VarPatita" value="SOLICITAR" (click)="activaV()">\n\n        </ion-item>\n\n      </div>\n\n    </div>\n\n\n\n    <ion-list class="Lista_Menu_Viaje">\n\n      <!-- AQUI EMPIEZA LA SOLICITUD -->\n\n      <div class="list_1" *ngIf="bander">\n\n        <ion-label class="title_menu">Nombre y Raza:</ion-label>\n\n        <ion-item class="css-itemSelec">\n\n          <ion-input placeholder="ej. Bobby - Bulldog" #raza="ngModel" [(ngModel)]="Raza" name="raza" required></ion-input>\n\n        </ion-item>\n\n      </div>\n\n      <hr *ngIf="bander" />\n\n\n\n      <div class="list_1" *ngIf="bander">\n\n        <ion-label class="title_menu">Edad:</ion-label>\n\n        <ion-item class="css-itemSelec">\n\n          <ion-input placeholder="Edad: ej. 1 mes" #edad="ngModel" [(ngModel)]="num_edad" name="edad" required></ion-input>\n\n        </ion-item>\n\n      </div>\n\n      <hr *ngIf="bander" />\n\n\n\n      <div class="list_3" *ngIf="bander">\n\n        <ion-label class="title_menu">Fecha Salida:</ion-label>\n\n        <div class="picker">\n\n          <my-date-picker required placeholder="Fecha Salida" [options]="myDatePickerOptions" name="mydate"\n\n            #mydate="ngModel" [(ngModel)]="fecha_salida" required></my-date-picker>\n\n        </div>\n\n      </div>\n\n      <hr *ngIf="bander" />\n\n\n\n      <div class="list_2" *ngIf="bander">\n\n        <ion-label class="title_menu">Hora Recogida:</ion-label>\n\n        <ion-item class="css-itemSelec css-datetime">\n\n          <ion-datetime required placeholder="Seleccione hora de recogida" displayFormat="hh:mm A" #dateR="ngModel"\n\n            [(ngModel)]="horarioR" name="dateE"></ion-datetime>\n\n        </ion-item>\n\n      </div>\n\n      <hr *ngIf="bander" />\n\n\n\n      <div class="list_2" *ngIf="bander">\n\n        <ion-label class="title_menu">Hora Entrega:</ion-label>\n\n        <ion-item class="css-itemSelec css-datetime">\n\n          <ion-datetime required placeholder="Seleccione hora de entrega" displayFormat="hh:mm A" #dateE="ngModel"\n\n            [(ngModel)]="horarioE" name="dateE"></ion-datetime>\n\n        </ion-item>\n\n      </div>\n\n      <hr *ngIf="bander" />\n\n\n\n      <div class="DetalleEnc" *ngIf="bander">\n\n        <ion-label class="title_menu">Información Adicional:</ion-label>\n\n        <ion-item class="css-TextArea">\n\n          <ion-textarea required rows="8" class="textare" #informacion="ngModel" [(ngModel)]="inf_adicional"\n\n            name="informacion"\n\n            placeholder="Detalle toda la información adicional que usted desee proporcionar, como enfermedades.">\n\n          </ion-textarea>\n\n        </ion-item>\n\n      </div>\n\n\n\n      <br *ngIf="solicita">\n\n      <button *ngIf="solicita" class="rutasGeol" style="background: transparent;" (click)="irUbicacionInicio();">\n\n        <img src="assets/imgs/solicitar.png" style=" margin: 0; padding: 0;">\n\n      </button>\n\n      <br *ngIf="solicita">\n\n    </ion-list>\n\n  </form>\n\n</ion-content>`/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\Puppy-Care-App-User\AppUser\src\pages\principal\principal.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__app_services_user_services__["a" /* UserService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__app_services_user_services__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_4__app_services_message_services__["a" /* MessageService */], __WEBPACK_IMPORTED_MODULE_5__app_services_notificaciones_services__["a" /* NotificacionesService */]])
    ], PrincipalPage);
    return PrincipalPage;
}());

//# sourceMappingURL=principal.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__global__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { Http } from "@angular/http";
var MessageService = (function () {
    function MessageService(_http) {
        this._http = _http;
        this.url = __WEBPACK_IMPORTED_MODULE_4__global__["a" /* GLOBAL */].url;
    }
    MessageService.prototype.addMessage = function (token, message) {
        var params = JSON.stringify(message);
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpHeaders */]().
            set('Content-Type', 'application/json').set('Authorization', token);
        return this._http.post(this.url + 'message' + params, { headers: headers });
    };
    MessageService.prototype.getMessages = function (token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.get(this.url + "my-messages", { headers: headers })
            .map(function (res) { return res.json(); });
    };
    MessageService.prototype.getMessagesEnco = function (token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.get(this.url + "my-messagesEnco", { headers: headers })
            .map(function (res) { return res.json(); });
    };
    MessageService.prototype.getMessagesId = function (token, idSolicitud) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.get(this.url + "my-messagesMio/" + idSolicitud, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    MessageService.prototype.getMessagesEncoId = function (token, idSolicitud) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.get(this.url + "my-messagesEncoMio/" + idSolicitud, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    MessageService.prototype.updateMessageDenunciayCancelar = function (token, viaje) {
        console.log(" entre al metodo de Menssage denuncia y cancelar", viaje);
        var json = JSON.stringify(viaje);
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.put(this.url + "updateMessageDenuncia/" + viaje._id, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    MessageService.prototype.updateMessageEncoDenunciayCancelar = function (token, encomeinda) {
        var json = JSON.stringify(encomeinda);
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.put(this.url + "updateMessageEncoDenuncia/" + encomeinda._id, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    MessageService.prototype.UpdateEstadoMessage = function (token, obj) {
        obj.estado = "2";
        var params = obj;
        console.log("objeto finalizado", obj._id);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.put(this.url + "updateMessageCancelacion/" + obj._id, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    MessageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], MessageService);
    return MessageService;
}());

//# sourceMappingURL=message.services.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificacionesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { Http } from "@angular/http";
var NotificacionesService = (function () {
    function NotificacionesService(_http) {
        this._http = _http;
        this.url = __WEBPACK_IMPORTED_MODULE_3__global__["a" /* GLOBAL */].url;
    }
    NotificacionesService.prototype.saveSolicituViaje = function (token, solicitud) {
        console.log("entre a solicitud viaje");
        var params = JSON.stringify(solicitud);
        console.log("entre a solicitud viaje a  ver el json", params);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.post(this.url + "saveSolicitudViaje", params, { headers: headers });
    };
    NotificacionesService.prototype.saveSolicituEncomienda = function (token, solicitud) {
        console.log("entre a solicitud viaje");
        var params = JSON.stringify(solicitud);
        console.log("entre a solicitud Encomienda a  ver el json", params);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.post(this.url + "saveSolicitudEncomienda", params, { headers: headers });
    };
    NotificacionesService.prototype.getSolicitudesViajes = function (token, identity) {
        console.log("zorro choto", identity._id);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.get(this.url + "getSolitudesViajeMio/" + identity._id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    NotificacionesService.prototype.getSolicitudesEnco = function (token, identity) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.get(this.url + "getSolitudesEncomiendaMio/" + identity._id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    NotificacionesService.prototype.getSolicitudesViajesTodos = function (token, busqueda) {
        var params = busqueda;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.post(this.url + "getSolitudesViajeTodas", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    NotificacionesService.prototype.updateSolicitudesViajesCancelar = function (token, solicitudViaje) {
        console.log("antes de mandar la solicitud para cancelar", solicitudViaje);
        var json = JSON.stringify(solicitudViaje);
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.put(this.url + "update-MessageCancelacion/" + solicitudViaje._id, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    NotificacionesService.prototype.updateSolicitudesEncoCancelar = function (token, solicitudEncomienda) {
        console.log("antes de mandar la solicitud para cancelar", solicitudEncomienda);
        var json = JSON.stringify(solicitudEncomienda);
        var params = json;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.put(this.url + "update-SolicitudEncoCancelacion/" + solicitudEncomienda._id, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    NotificacionesService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], NotificacionesService);
    return NotificacionesService;
}());

//# sourceMappingURL=notificaciones.services.js.map

/***/ })

},[457]);
//# sourceMappingURL=main.js.map