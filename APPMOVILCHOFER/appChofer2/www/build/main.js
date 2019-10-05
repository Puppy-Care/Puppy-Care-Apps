webpackJsonp([0],{

/***/ 174:
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
webpackEmptyAsyncContext.id = 174;

/***/ }),

/***/ 220:
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
webpackEmptyAsyncContext.id = 220;

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_chofer_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__principal_principal__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
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
        //this.user = new User("", "", "", "", "", "", "", "");
    }
    HomePage.prototype.ngOnInit = function () {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        console.log("las vaibles del Storage");
        console.log(this.identity + this.token);
        //BLOQUEAR MENU
        if (this.identity == null) {
            this.menuCtrl.enable(false, 'myMenu');
        }
        else {
            this.menuCtrl.enable(true, 'myMenu');
        }
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //this.tabBarElement.style.display = 'none';
        setTimeout(function () {
            _this.splash = false;
        }, 4000);
        //this.tabBarElement.style.display = 'none';
    };
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
                localStorage.setItem("identityC", JSON.stringify(identity));
                _this._userService.singup(_this.obj, "true").subscribe(function (response) {
                    var token = response.token;
                    _this.token = token;
                    if (_this.token.length <= 0) {
                        // aqui mensaje
                        console.log("el token nose ha generado");
                    }
                    else {
                        localStorage.setItem("TokenC", token);
                        setTimeout(function () {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__principal_principal__["a" /* PrincipalPage */]);
                        }, 3000);
                    }
                }, function (error) {
                    var errorMessage = error;
                    if (errorMessage) {
                        try {
                            var body = JSON.parse(error._body);
                            errorMessage = body.message;
                        }
                        catch (_a) {
                            errorMessage = "NO hay conexion intentelo Ms Tarde";
                        }
                        setTimeout(function () {
                            _this.showAlert(errorMessage);
                        }, 3000);
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
                catch (_a) {
                    errorMessage = "No hay conexión intentelo más tarde";
                }
                setTimeout(function () {
                    _this.showAlert(errorMessage);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\montecarlo\APPMOVILCHOFER\appChofer2\src\pages\home\home.html"*/'<!-- activar en android -->\n\n <ion-content padding class="getstart">\n\n</ion-content> \n\n\n\n\n\n<div class=""></div>\n\n<img id="imganeTitulo1" src="assets/imgs/titulo.png">\n\n<img id="imganeTitulo" src="assets/imgs/chofer.png" style=" width: 30%;">\n\n<div class="Aligner-item Aligner-item--bottom"></div>\n\n<br>\n\n\n\n<form #Formulario="ngForm" (ngSubmit)="onSubmit()">\n\n  <div id="formLogin">\n\n    <div style="top:0; bottom: 0;" class="item item-block">\n\n      <ion-icon item-left style="  max-width:0.02%; margin-top:0%; margin-bottom:0; margin-right:5% ">\n\n        <img style="max-width:90%; left: 0; right: 0;" src="assets/imgs/Recurso3.png">\n\n      </ion-icon>\n\n      <input type="email" #email="ngModel" [(ngModel)]="obj.email" name="email" class="form-control" style="font-size:110%">\n\n    </div>\n\n    <br>\n\n    <div style="top:0; bottom: 0; " class="item item-block">\n\n      <ion-icon item-left style="max-width:0.02%; margin-top:0%; margin-bottom:0; margin-right:5% ">\n\n        <img style=" max-width:80%; left: 0; right: 0; " src="assets/imgs/Recurso2.png">\n\n      </ion-icon>\n\n      <input [type]="getType()" #password="ngModel" [(ngModel)]="obj.password" name="password" class="form-control" style="font-size:110%">\n\n    </div>\n\n    <br>\n\n    <!-- prueba de mostra contrase -->\n\n    <div class="checkbox" style="margin-left:10%">\n\n      <label>\n\n        <input type="checkbox" (click)="toggleTextPassword()"> Mostrar Contraseña</label>\n\n    </div>\n\n    <br>\n\n    <input type="submit" value="Ingresar" style="background-color: #ABCA4A; padding-top:2%; padding-bottom:2%; font-size: 100%; font-weight: bold"\n\n      class="form-control">\n\n  </div>\n\n</form>'/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\montecarlo\APPMOVILCHOFER\appChofer2\src\pages\home\home.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__app_services_chofer_service__["a" /* ChoferService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__app_services_chofer_service__["a" /* ChoferService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetallesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__principal_principal__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_chofer_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__ = __webpack_require__(141);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DetallesPage = /** @class */ (function () {
    function DetallesPage(navCtrl, callNumber, navParams, _choferservice) {
        this.navCtrl = navCtrl;
        this.callNumber = callNumber;
        this.navParams = navParams;
        this._choferservice = _choferservice;
        this.a1 = true;
        this.a2 = true;
        this.a3 = true;
        this.a4 = true;
        this.viajeDetalle = JSON.parse(localStorage.getItem("viaje"));
        this.animacion = JSON.parse(localStorage.getItem("opcionesAnimacion"));
        console.log('ANIMACION >>', this.animacion);
        if (this.animacion.tipoMostrar == "calendario") {
            this.btnEnviar = false;
        }
        else {
            this.btnEnviar = true;
        }
        this.latitud_salida = Number(this.viajeDetalle.latitud_salida);
        this.longitud_salida = Number(this.viajeDetalle.longitud_salida);
        this.latitud_llegada = Number(this.viajeDetalle.latitud_llegada);
        this.longitud_llegada = Number(this.viajeDetalle.longitud_llegada);
        console.log('mi LocalStorage de viaje en detalles >>> ', this.viajeDetalle);
        if (this.viajeDetalle.p1 == '12') {
            this.p1 = 'Seleccionado';
        }
        else {
            this.p1 = 'Libre';
        }
        if (this.viajeDetalle.p2 == '21') {
            this.p2 = 'Seleccionado';
        }
        else {
            this.p2 = 'Libre';
        }
        if (this.viajeDetalle.p3 == '22') {
            this.p3 = 'Seleccionado';
        }
        else {
            this.p3 = 'Libre';
        }
        if (this.viajeDetalle.p4 == '23') {
            this.p4 = 'Seleccionado';
        }
        else {
            this.p4 = 'Libre';
        }
        if (this.viajeDetalle.p1 != '12' && this.viajeDetalle.p2 != '21' && this.viajeDetalle.p3 != '22' && this.viajeDetalle.p4 != '23') {
            this.express = '- Viaje Express ';
            this.a1 = false;
            this.a2 = false;
            this.a3 = false;
            this.a4 = false;
        }
    }
    DetallesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetallesPage');
    };
    DetallesPage.prototype.envioNotificacion = function () {
        console.log('estoy en el botón envioNotificacion');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__principal_principal__["a" /* PrincipalPage */]);
    };
    DetallesPage.prototype.terminarEnvio = function () {
        this._choferservice.FinalizarUpdateMessageChofer(this._choferservice.getToken(), this.viajeDetalle).subscribe(function (response) {
        }, function (err) { console.log("Existen Complicaciones, intente más tarde", err); });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__principal_principal__["a" /* PrincipalPage */]);
    };
    DetallesPage.prototype.llama = function (telefonoLlamar) {
        console.log('este es mi telefono a llamar >>>', telefonoLlamar);
        this.callNumber.callNumber(telefonoLlamar, true)
            .then(function (res) { return console.log('Launched dialer!', res); })
            .catch(function (err) { return console.log('Error launching dialer', err); });
    };
    DetallesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detalles',template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\montecarlo\APPMOVILCHOFER\appChofer2\src\pages\detalles\detalles.html"*/'<ion-header>\n\n  <ion-navbar color="appcolr">\n\n    <ion-title>Detalles del Viaje</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="cards-bg social-cards">\n\n\n\n  <ion-card>\n\n\n\n    <ion-item>\n\n      <ion-avatar item-start>\n\n        <img src="../../assets/imgs/clienteFinal.png">\n\n      </ion-avatar>\n\n      <h2>\n\n        <b>Datos del Cliente</b>\n\n      </h2>\n\n      <p>{{viajeDetalle.receiver.nombre}} {{viajeDetalle.receiver.apellido}}</p>\n\n      <p (click)="llama(this.viajeDetalle.receiver.tel_celular)">\n\n        <ion-icon name=\'call\'></ion-icon>&nbsp;{{viajeDetalle.receiver.tel_celular}}\n\n      </p>\n\n      <p (click)="llama(this.viajeDetalle.receiver.tel_convencional)">\n\n        <ion-icon name=\'call\'></ion-icon>&nbsp;{{viajeDetalle.receiver.tel_convencional}}\n\n      </p>\n\n    </ion-item>\n\n\n\n    <h2 style="text-align: center">\n\n      <br>\n\n      <b>Lugar de Salida</b>\n\n    </h2>\n\n    <hr>\n\n    <agm-map [latitude]="latitud_salida" [longitude]="longitud_salida" [zoom]=15>\n\n      <agm-marker [latitude]="latitud_salida" [longitude]="longitud_salida"></agm-marker>\n\n    </agm-map>\n\n\n\n    <h2 style="text-align: center">\n\n      <br>\n\n      <b>Lugar de Llegada</b>\n\n    </h2>\n\n    <hr>\n\n    <agm-map [latitude]="latitud_llegada" [longitude]="longitud_llegada" [zoom]=15>\n\n      <agm-marker [latitude]="latitud_llegada" [longitude]="longitud_llegada"></agm-marker>\n\n    </agm-map>\n\n\n\n    <ion-card-content>\n\n      <h2 style="text-align: center">\n\n        <b>Datos del Viaje</b>\n\n      </h2>\n\n      <hr>\n\n      <p>\n\n        <b>Ruta:</b>{{viajeDetalle.ruta}}</p>\n\n      <p>\n\n        <b>Fecha de Salida: </b> {{viajeDetalle.fech_salida}}</p>\n\n      <p>\n\n        <b>Hora de Salida: </b> {{viajeDetalle.horario}}</p>\n\n      <p>\n\n        <b>Número de maletas:</b> {{viajeDetalle.num_maleta}} maletas</p>\n\n      <p>\n\n        <b>Precio: </b> {{viajeDetalle.precio}} dólares ($)</p>\n\n      <p>\n\n        <b>Asientos: </b> {{this.express}}</p>\n\n      <p *ngIf="a1" style="margin-left: 5%">\n\n        <b>Copiloto: </b> {{this.p1}}</p>\n\n      <p *ngIf="a2" style="margin-left: 5%">\n\n        <b>Izquierda: </b> {{this.p2}}</p>\n\n      <p *ngIf="a3" style="margin-left: 5%">\n\n        <b>Medio: </b> {{this.p3}}</p>\n\n      <p *ngIf="a4" style="margin-left: 5%">\n\n        <b>Derecha: </b> {{this.p4}}</p>\n\n\n\n    </ion-card-content>\n\n\n\n\n\n    <ion-row>\n\n      <ion-col align-self-center text-center>\n\n        <button (click)="envioNotificacion()" ion-button color="colorapp" clear small icon-start>\n\n          <ion-icon name=\'car\'></ion-icon>\n\n          Aceptar\n\n        </button>\n\n      </ion-col>\n\n      <ion-col align-self-center text-center *ngIf="btnEnviar">\n\n        <button (click)="terminarEnvio()" ion-button color="colorapp" clear small icon-start>\n\n          <ion-icon name=\'stopwatch\'></ion-icon>\n\n          Finalizar\n\n        </button>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n      <ion-col align-self-center text-center>\n\n        <ion-note style="text-align: center">Fecha y Hora de Solicitud</ion-note>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n      <ion-col align-self-center text-center>\n\n        <ion-note>{{viajeDetalle.fech_solicitud}}</ion-note>\n\n      </ion-col>\n\n      <ion-col align-self-center text-center>\n\n        <ion-note>{{viajeDetalle.hora_solicitud}}</ion-note>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n  </ion-card>\n\n\n\n\n\n</ion-content>\n\n<button ion-button color="primary" clear small icon-start></button>\n\n\n\n<style>\n\n  .social-cards ion-col {\n\n    padding: 0;\n\n  }\n\n</style>'/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\montecarlo\APPMOVILCHOFER\appChofer2\src\pages\detalles\detalles.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__["a" /* CallNumber */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__app_services_chofer_service__["a" /* ChoferService */]])
    ], DetallesPage);
    return DetallesPage;
}());

//# sourceMappingURL=detalles.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetallesEncomiendaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__principal_principal__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_chofer_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__ = __webpack_require__(141);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DetallesEncomiendaPage = /** @class */ (function () {
    function DetallesEncomiendaPage(navCtrl, callNumber, navParams, _choferservice) {
        this.navCtrl = navCtrl;
        this.callNumber = callNumber;
        this.navParams = navParams;
        this._choferservice = _choferservice;
        this.encomiendaDetalle = JSON.parse(localStorage.getItem("encomienda"));
        this.latitud_salida = Number(this.encomiendaDetalle.latitud_salida);
        this.longitud_salida = Number(this.encomiendaDetalle.longitud_salida);
        this.latitud_llegada = Number(this.encomiendaDetalle.latitud_llegada);
        this.longitud_llegada = Number(this.encomiendaDetalle.longitud_llegada);
        console.log('mi LocalStorage de encomienda en detalles>>> ', this.encomiendaDetalle);
        this.animacion = JSON.parse(localStorage.getItem("opcionesAnimacion"));
        console.log('ANIMACION >>', this.animacion);
        if (this.animacion.tipoMostrar == "calendario") {
            this.btnEnviar = false;
        }
        else {
            this.btnEnviar = true;
        }
    }
    DetallesEncomiendaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetallesEncomiendaPage');
    };
    DetallesEncomiendaPage.prototype.envioNotificacion = function () {
        console.log('estoy en el botón envioNotificacion');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__principal_principal__["a" /* PrincipalPage */]);
    };
    DetallesEncomiendaPage.prototype.terminarEnvio = function () {
        this._choferservice.FinalizarUpdateMessageEncoChofer(this._choferservice.getToken(), this.encomiendaDetalle).subscribe(function (response) {
        }, function (err) { console.log("Existen Complicaciones, intente más tarde", err); });
        location.reload();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__principal_principal__["a" /* PrincipalPage */]);
    };
    DetallesEncomiendaPage.prototype.llama = function (telefonoLlamar) {
        console.log('este es mi telefono a llamar >>>', telefonoLlamar);
        this.callNumber.callNumber(telefonoLlamar, true)
            .then(function (res) { return console.log('Launched dialer!', res); })
            .catch(function (err) { return console.log('Error launching dialer', err); });
    };
    DetallesEncomiendaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detalles-encomienda',template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\montecarlo\APPMOVILCHOFER\appChofer2\src\pages\detalles-encomienda\detalles-encomienda.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="appcolr">\n\n    <ion-title>Detalles de la Encomienda</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content class="cards-bg social-cards">\n\n\n\n  <ion-card>\n\n\n\n    <ion-item>\n\n      <ion-avatar item-start>\n\n        <img src="../../assets/imgs/clienteFinal.png">\n\n      </ion-avatar>\n\n      <h2>\n\n        <b>Datos del Emisor</b>\n\n      </h2>\n\n      <p>{{encomiendaDetalle.receiver.nombre}} {{encomiendaDetalle.receiver.apellido}}</p>\n\n      <p (click)="llama(this.encomiendaDetalle.receiver.tel_celular)">\n\n        <ion-icon name=\'call\'></ion-icon>&nbsp;{{encomiendaDetalle.receiver.tel_celular}}\n\n      </p>\n\n      <p (click)="llama(this.encomiendaDetalle.receiver.tel_convencional)">\n\n        <ion-icon name=\'call\'></ion-icon>&nbsp;{{encomiendaDetalle.receiver.tel_convencional}}\n\n      </p>\n\n    </ion-item>\n\n\n\n    <h2 style="text-align: center">\n\n      <br>\n\n      <b>Lugar de Salida</b>\n\n    </h2>\n\n    <hr>\n\n    <agm-map [latitude]="latitud_salida" [longitude]="longitud_salida" [zoom]=15>\n\n      <agm-marker [latitude]="latitud_salida" [longitude]="longitud_salida"></agm-marker>\n\n    </agm-map>\n\n\n\n    <h2 style="text-align: center">\n\n      <br>\n\n      <b>Lugar de Llegada</b>\n\n    </h2>\n\n    <hr>\n\n    <agm-map [latitude]="latitud_llegada" [longitude]="longitud_llegada" [zoom]=15>\n\n      <agm-marker [latitude]="latitud_llegada" [longitude]="longitud_llegada"></agm-marker>\n\n    </agm-map>\n\n\n\n    <ion-card-content>\n\n      <h2 style="text-align: center">\n\n        <b>Datos de la Encomienda</b>\n\n      </h2>\n\n      <hr>\n\n      <p>\n\n        <b>Ruta:</b>{{encomiendaDetalle.ruta}}</p>\n\n      <p>\n\n        <b>Destinatario: </b> {{encomiendaDetalle.destinatario}}</p>\n\n      <p>\n\n        <b>Hora de Salida: </b> {{encomiendaDetalle.horario}}</p>\n\n      <p>\n\n        <b>Fecha Salida: </b> {{encomiendaDetalle.fech_salida}}</p>\n\n      <p>\n\n        <b>Precio: </b> {{encomiendaDetalle.precio}} dólares ($)</p>\n\n      <p>\n\n        <b>Detalle del Paquete: </b> {{encomiendaDetalle.detalle_paquete}}</p>\n\n    </ion-card-content>\n\n\n\n\n\n    <ion-row>\n\n      <ion-col align-self-center text-center>\n\n        <button (click)="envioNotificacion()" ion-button color="colorapp" clear small icon-start>\n\n          <ion-icon name=\'car\'></ion-icon>\n\n          Aceptar\n\n        </button>\n\n      </ion-col>\n\n      <ion-col align-self-center text-center *ngIf="btnEnviar">\n\n        <button (click)="terminarEnvio()" ion-button color="colorapp" clear small icon-start>\n\n          <ion-icon name=\'stopwatch\'></ion-icon>\n\n          Finalizar\n\n        </button>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n      <ion-col align-self-center text-center>\n\n        <ion-note style="text-align: center">Fecha y Hora de Solicitud</ion-note>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n      <ion-col align-self-center text-center>\n\n        <ion-note>{{encomiendaDetalle.fech_solicitud}}</ion-note>\n\n      </ion-col>\n\n      <ion-col align-self-center text-center>\n\n        <ion-note>{{encomiendaDetalle.hora_solicitud}}</ion-note>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n  </ion-card>\n\n\n\n\n\n</ion-content>\n\n<button ion-button color="primary" clear small icon-start></button>\n\n\n\n<style>\n\n  .social-cards ion-col {\n\n    padding: 0;\n\n  }\n\n</style>'/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\montecarlo\APPMOVILCHOFER\appChofer2\src\pages\detalles-encomienda\detalles-encomienda.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__["a" /* CallNumber */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__app_services_chofer_service__["a" /* ChoferService */]])
    ], DetallesEncomiendaPage);
    return DetallesEncomiendaPage;
}());

//# sourceMappingURL=detalles-encomienda.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(373);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_chofer_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_principal_principal__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_detalles_detalles__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__agm_core__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_detalles_encomienda_detalles_encomienda__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_call_number__ = __webpack_require__(141);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














// push notifications
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_principal_principal__["a" /* PrincipalPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_detalles_detalles__["a" /* DetallesPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_detalles_encomienda_detalles_encomienda__["a" /* DetallesEncomiendaPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_11__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyBpvyrZXYTUxsVOnNQQS9zNCxN9Ti9azP0'
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_principal_principal__["a" /* PrincipalPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_detalles_detalles__["a" /* DetallesPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_detalles_encomienda_detalles_encomienda__["a" /* DetallesEncomiendaPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_8__services_chofer_service__["a" /* ChoferService */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_call_number__["a" /* CallNumber */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_chofer_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_principal_principal__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, _choferService) {
        this._choferService = _choferService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        if (_choferService.getIdentity()) {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_principal_principal__["a" /* PrincipalPage */];
        }
        else {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        }
    }
    MyApp.prototype.ngOnInit = function () {
        this.pages = [
            { titulo: 'Menú Principal', component: __WEBPACK_IMPORTED_MODULE_6__pages_principal_principal__["a" /* PrincipalPage */], icon: 'inicio.png' }
            //{ titulo: 'Mi Cuenta', component: MiCuenta, icon: 'contactoCorreo.png' },
            //{ titulo: 'Encuéntranos', component: Encuentranos, icon: 'encuentranos.png' },
            //{ titulo: 'Contáctenos', component: ContactosPage, icon: 'contactoTC.png' }
        ];
    };
    MyApp.prototype.goToPage = function (page) {
        this.nav.setRoot(page);
    };
    MyApp.prototype.Logout = function () {
        this._choferService.logout();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('NAV'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\montecarlo\APPMOVILCHOFER\appChofer2\src\app\app.html"*/'<ion-menu [content]="NAV" id=\'myMenu\'>\n\n    <ion-header>\n\n    </ion-header>\n\n    <ion-content style="background-image: url(\'assets/imgs/Registro.png\')" class="getstarToggle">\n\n        <img style="background: transparent; width: 120%;" src="assets/imgs/portadaToglle.png" alt="">\n\n        <br>\n\n        <br>\n\n        <ion-list>\n\n            <button class="btn-cb" ion-item *ngFor="let page of pages" (click)="goToPage(page.component)" menuClose>\n\n                <img src="assets/imgs/{{ page.icon }}" style="width: 17% ;padding-right: 5%"> {{ page.titulo }}\n\n            </button>\n\n\n\n            <button class="btn-cb" ion-item (click)="Logout()" menuClose>\n\n                <img src="assets/imgs/salir.png" style="width: 17% ;padding-right: 5%"> Cerrar Sesión\n\n            </button>\n\n        </ion-list>\n\n    </ion-content>\n\n</ion-menu>\n\n \n\n<ion-nav id="nav" #NAV [root]="rootPage"></ion-nav> '/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\montecarlo\APPMOVILCHOFER\appChofer2\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__services_chofer_service__["a" /* ChoferService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GLOBAL; });
var GLOBAL = {
    url: "http://www.appmontecarlotransvip.com:3977/api/"
    //url: "http://localhost:3977/api/"
    //url:"http://192.168.1.8:3977/api/"
};
//# sourceMappingURL=global.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChoferService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(416);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChoferService = /** @class */ (function () {
    function ChoferService(_http) {
        this._http = _http;
        this.url = __WEBPACK_IMPORTED_MODULE_3__global__["a" /* GLOBAL */].url;
    }
    ChoferService.prototype.singup = function (user_to_login, getHash) {
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
            .post(this.url + "loginChofer", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ChoferService.prototype.getIdentity = function () {
        var identity = JSON.parse(localStorage.getItem("identityC"));
        if (identity != "undefined") {
            this.identity = identity;
        }
        else {
            this.identity = null;
        }
        return this.identity;
    };
    ChoferService.prototype.getToken = function () {
        var token = localStorage.getItem("TokenC");
        if (token != "undefined") {
            this.token = token;
        }
        else {
            this.token = null;
        }
        return this.token;
    };
    ChoferService.prototype.logout = function () {
        localStorage.removeItem("identityC");
        localStorage.removeItem("TokenC");
        localStorage.removeItem("posicion");
        localStorage.clear();
        this.identity = null;
        this.token = null;
    };
    ChoferService.prototype.getMessagesMioChofer = function (token, estadoListar) {
        console.log("estado del listar antes de mandar", estadoListar);
        console.log("Entre mensajes mio chiofer");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.get(this.url + "getReceivedMessagesChofer/" + estadoListar, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ChoferService.prototype.getMessagesMioEncoChofer = function (token, estadoListar) {
        console.log("estado del listar antes de mandar", estadoListar);
        console.log("Entre mensajes mio chiofer");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.get(this.url + "getReceivedMessagesEncoChofer/" + estadoListar, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ChoferService.prototype.getMessagesMioChoferHoy = function (token, estadoListar) {
        console.log("estado del listar antes de mandar", estadoListar);
        console.log("Entre mensajes mio chiofer");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.get(this.url + "getReceivedMessagesChoferHoy/" + estadoListar, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ChoferService.prototype.getReceivedMessagesEncoChoferHoy = function (token, estadoListar) {
        console.log("estado del listar antes de mandar", estadoListar);
        console.log("Entre mensajes mio chiofer Enco");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.get(this.url + "getReceivedMessagesEncoChoferHoy/" + estadoListar, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ChoferService.prototype.FinalizarUpdateMessageChofer = function (token, objFinalizado) {
        objFinalizado.estado = "1";
        var params = objFinalizado;
        console.log("objeto finalizado", objFinalizado._id);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.put(this.url + "updateMessageChofer/" + objFinalizado._id, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ChoferService.prototype.FinalizarUpdateMessageEncoChofer = function (token, objFinalizado) {
        objFinalizado.estado = "1";
        var params = objFinalizado;
        console.log("objeto finalizado", objFinalizado._id);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Content-type": "application/json", "Authorization": token });
        return this._http.put(this.url + "updateMessageEncoChofer/" + objFinalizado._id, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ChoferService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], ChoferService);
    return ChoferService;
}());

//# sourceMappingURL=chofer.service.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrincipalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_chofer_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detalles_detalles__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__detalles_encomienda_detalles_encomienda__ = __webpack_require__(268);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PrincipalPage = /** @class */ (function () {
    function PrincipalPage(menuCtrl, navCtrl, _choferservice) {
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this._choferservice = _choferservice;
        this.cont = 0;
        //color de los botones
        this.clrBotonViaje = "appcolr";
        this.clrBotonEncomienda = "appcolr";
        this.checkmarkViaje = "none";
        this.checkmarkEncomienda = "none";
        //variables boleanas de los estados
        this.contenidoDinamico = false;
        this.contenidoDinamicoViaje = false;
        this.contenidoDinamicoEncomienda = false;
        this.btnFinalizarViaje = false;
        this.btnFinalizarEncomiendas = false;
        this.portada = true;
        this.c = 0;
        //json de animacion de peultima accion realizada
        this.objAnimacion = {
            estadoListar: null,
            tipoMostrar: null,
            boton: null
        };
        //BLOQUEAR MENU
        if (this._choferservice.getIdentity() == null) {
            this.menuCtrl.enable(false, 'myMenu');
        }
        else {
            this.menuCtrl.enable(true, 'myMenu');
        }
        this.btnFinalizarViaje = true;
        this.btnFinalizarEncomiendas = true;
        this.portada = true;
        this.datosChofer = localStorage.getItem("identityC");
        this.datosChoferInt = JSON.parse(this.datosChofer);
        console.log('datos chofer', this.datosChoferInt);
        this.animacionAcciones();
    }
    PrincipalPage_1 = PrincipalPage;
    PrincipalPage.prototype.historial = function (estadoListar, tipoMostrar) {
        this.vectorViajes = null;
        this.vectorEncomiendas = null;
        this.portada = false;
        if (tipoMostrar == 'campana') {
            this.objAnimacion.estadoListar = estadoListar;
            this.objAnimacion.tipoMostrar = tipoMostrar;
            console.log('campana');
            this.listarNotificacionesCampana(estadoListar);
        }
        if (tipoMostrar == 'reloj') {
            this.objAnimacion.estadoListar = estadoListar;
            this.objAnimacion.tipoMostrar = tipoMostrar;
            console.log('reloj');
            this.listarNotificacionesReloj(estadoListar);
        }
        if (tipoMostrar == 'calendario') {
            this.objAnimacion.estadoListar = estadoListar;
            this.objAnimacion.tipoMostrar = tipoMostrar;
            console.log('calendario');
            this.listarNotificacionesCalendario(estadoListar);
        }
        this.mostrarContenidoDinamico(tipoMostrar);
    };
    PrincipalPage.prototype.listarNotificacionesCampana = function (estadoListar) {
        var _this = this;
        //campana viajes
        this._choferservice.getMessagesMioChofer(this._choferservice.getToken(), estadoListar).subscribe(function (response) {
            if (response.messagess[0] != undefined) {
                _this.vectorViajes = response.messagess;
                _this.darvuelta();
            }
        }, function (err) { console.log("Existen Complicaciones, intente más tarde", err); });
        //campana encomiendas
        this._choferservice.getMessagesMioEncoChofer(this._choferservice.getToken(), estadoListar).subscribe(function (response) {
            if (response.messagess[0] != undefined) {
                _this.vectorEncomiendas = response.messagess;
                _this.darvueltaencomienda();
            }
        }, function (err) { console.log("Existen COmplicaciones Intente mas tarde", err); });
    };
    PrincipalPage.prototype.listarNotificacionesReloj = function (estadoListar) {
        var _this = this;
        // reloj viajes y encomiendas para hoy
        this._choferservice.getMessagesMioChoferHoy(this._choferservice.getToken(), estadoListar).subscribe(function (response) {
            if (response.messagess[0] != undefined) {
                _this.vectorViajes = response.messagess;
            }
        }, function (err) { console.log("Existen Complicaciones, intente más tarde", err); });
        // encomiendas para hoy
        this._choferservice.getReceivedMessagesEncoChoferHoy(this._choferservice.getToken(), estadoListar).subscribe(function (response) {
            if (response.messagess[0] != undefined) {
                _this.vectorEncomiendas = response.messagess;
            }
        }, function (err) { console.log("Existen Complicaciones, intente más tarde", err); });
    };
    PrincipalPage.prototype.listarNotificacionesCalendario = function (estadoListar) {
        var _this = this;
        //calendario
        this._choferservice.getMessagesMioChofer(this._choferservice.getToken(), estadoListar).subscribe(function (response) {
            if (response.messagess[0] != undefined) {
                _this.vectorViajes = response.messagess;
            }
        }, function (err) { console.log("Existen Complicaciones, intente más tarde", err); });
        //calendario
        this._choferservice.getMessagesMioEncoChofer(this._choferservice.getToken(), estadoListar).subscribe(function (response) {
            if (response.messagess[0] != undefined) {
                _this.vectorEncomiendas = response.messagess;
            }
        }, function (err) { console.log("Existen Complicaciones, intente más tarde", err); });
    };
    PrincipalPage.prototype.darvuelta = function () {
        var _this = this;
        this.aux;
        this.vectorViajes.forEach(function () {
            _this.c += 1;
        });
        this.medio = (this.c) / 2;
        this.up = (this.c) - 1;
        for (var i = 0; i < this.medio; i++) {
            this.aux = this.vectorViajes[i];
            this.vectorViajes[i] = this.vectorViajes[this.up];
            this.vectorViajes[this.up] = this.aux;
            this.up--;
        }
        this.c = 0;
    };
    PrincipalPage.prototype.darvueltaencomienda = function () {
        var _this = this;
        this.aux;
        this.vectorEncomiendas.forEach(function () {
            _this.c += 1;
        });
        this.medio = (this.c) / 2;
        this.up = (this.c) - 1;
        for (var i = 0; i < this.medio; i++) {
            this.aux = this.vectorEncomiendas[i];
            this.vectorEncomiendas[i] = this.vectorEncomiendas[this.up];
            this.vectorEncomiendas[this.up] = this.aux;
            this.up--;
        }
        this.c = 0;
    };
    PrincipalPage.prototype.ordenar = function (vector) {
        var _this = this;
        this.cont = 0;
        vector.forEach(function () {
            _this.cont += 1;
        });
        for (var k = 0; k < this.cont - 1; k++) {
            for (var f = 0; f < (this.cont - 1) - k; f++) {
                if (vector[f].fech_salida.localeCompare(vector[f + 1].fech_salida) > 0) {
                    var aux = void 0;
                    aux = vector[f];
                    vector[f] = vector[f + 1];
                    vector[f + 1] = aux;
                }
            }
        }
    };
    PrincipalPage.prototype.mostrarContenidoDinamico = function (tipoMostrar) {
        this.contenidoDinamico = true;
        this.checkmarkViaje = "none";
        this.checkmarkEncomienda = "none";
        this.clrBotonViaje = "appcolr";
        this.clrBotonEncomienda = "appcolr";
        this.contenidoDinamicoViaje = false;
        this.contenidoDinamicoEncomienda = false;
        if (tipoMostrar == 'campana') {
            this.titulo = "NOTIFICACIONES RECIBIDAS";
            this.btnFinalizarViaje = true;
            this.btnFinalizarEncomiendas = true;
        }
        else {
            if (tipoMostrar == 'calendario') {
                this.titulo = "HISTORIAL";
                this.btnFinalizarViaje = false;
                this.btnFinalizarEncomiendas = false;
            }
            else {
                if (tipoMostrar == 'reloj') {
                    this.titulo = "PARA HOY";
                    this.btnFinalizarViaje = true;
                    this.btnFinalizarEncomiendas = true;
                }
            }
        }
    };
    PrincipalPage.prototype.verViajes = function () {
        this.objAnimacion.boton = "viaje";
        this.clrBotonViaje = "btnPresionado";
        this.clrBotonEncomienda = "appcolr";
        this.checkmarkViaje = "checkmark";
        this.checkmarkEncomienda = "none";
        this.contenidoDinamicoViaje = true;
        this.contenidoDinamicoEncomienda = false;
    };
    PrincipalPage.prototype.verEncomiendas = function () {
        this.objAnimacion.boton = "encomienda";
        this.clrBotonViaje = "appcolr";
        this.clrBotonEncomienda = "btnPresionado";
        this.checkmarkViaje = "none";
        this.checkmarkEncomienda = "checkmark";
        this.contenidoDinamicoViaje = false;
        this.contenidoDinamicoEncomienda = true;
    };
    PrincipalPage.prototype.irDetalles = function (NotificacionIndividual, tipoEnviar) {
        localStorage.setItem("opcionesAnimacion", JSON.stringify(this.objAnimacion));
        console.log('ir a detaless >>>>', JSON.stringify(this.objAnimacion));
        if (tipoEnviar == 'viaje') {
            localStorage.setItem("viaje", JSON.stringify(NotificacionIndividual));
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__detalles_detalles__["a" /* DetallesPage */]);
        }
        else {
            if (tipoEnviar == 'encomienda') {
                localStorage.setItem("encomienda", JSON.stringify(NotificacionIndividual));
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__detalles_encomienda_detalles_encomienda__["a" /* DetallesEncomiendaPage */]);
            }
        }
    };
    PrincipalPage.prototype.animacionAcciones = function () {
        var jsonAnimacion = JSON.parse(localStorage.getItem('opcionesAnimacion'));
        console.log('jsonViene en animaciones acciones>>> ', jsonAnimacion);
        if (jsonAnimacion != null) {
            if (jsonAnimacion.estadoListar == "0" && jsonAnimacion.tipoMostrar == "campana" && jsonAnimacion.boton == "viaje") {
                this.historial('0', 'campana');
                this.verViajes();
                localStorage.removeItem('opcionesAnimacion');
            }
            if (jsonAnimacion.estadoListar == "0" && jsonAnimacion.tipoMostrar == "campana" && jsonAnimacion.boton == "encomienda") {
                this.historial('0', 'campana');
                this.verEncomiendas();
                localStorage.removeItem('opcionesAnimacion');
            }
            if (jsonAnimacion.estadoListar == "1" && jsonAnimacion.tipoMostrar == "calendario" && jsonAnimacion.boton == "viaje") {
                this.historial('1', 'calendario');
                this.verViajes();
                localStorage.removeItem('opcionesAnimacion');
            }
            if (jsonAnimacion.estadoListar == "1" && jsonAnimacion.tipoMostrar == "calendario" && jsonAnimacion.boton == "encomienda") {
                this.historial('1', 'calendario');
                this.verEncomiendas();
                localStorage.removeItem('opcionesAnimacion');
            }
            if (jsonAnimacion.estadoListar == "0" && jsonAnimacion.tipoMostrar == "reloj" && jsonAnimacion.boton == "viaje") {
                this.historial('0', 'reloj');
                this.verViajes();
                localStorage.removeItem('opcionesAnimacion');
            }
            if (jsonAnimacion.estadoListar == "0" && jsonAnimacion.tipoMostrar == "reloj" && jsonAnimacion.boton == "encomienda") {
                this.historial('0', 'reloj');
                this.verEncomiendas();
                localStorage.removeItem('opcionesAnimacion');
            }
        }
        else { }
    };
    PrincipalPage.prototype.irFinalizar = function (NotificacionIndividual, tipoEnviar) {
        var _this = this;
        if (tipoEnviar == 'viaje') {
            localStorage.setItem("opcionesAnimacion", JSON.stringify(this.objAnimacion));
            console.log('irFInalizar ?>>>>>>>>>', JSON.stringify(this.objAnimacion));
            this._choferservice.FinalizarUpdateMessageChofer(this._choferservice.getToken(), NotificacionIndividual).subscribe(function (response) {
                _this.navCtrl.push(PrincipalPage_1);
            }, function (err) { console.log("Existen Complicaciones, intente más tarde", err); });
        }
        else {
            if (tipoEnviar == 'encomienda') {
                this._choferservice.FinalizarUpdateMessageEncoChofer(this._choferservice.getToken(), NotificacionIndividual).subscribe(function (response) {
                    _this.navCtrl.push(PrincipalPage_1);
                }, function (err) { console.log("Existen Complicaciones, intente más tarde", err); });
            }
        }
    };
    PrincipalPage = PrincipalPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-principal",template:/*ion-inline-start:"C:\Users\sttef\Documents\GitHub\montecarlo\APPMOVILCHOFER\appChofer2\src\pages\principal\principal.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton color="appcolr">\n\n    <button ion-button menuToggle icon-only>\n\n      <ion-icon name=\'menu\'></ion-icon>\n\n    </button>\n\n\n\n    <!-- ANDROID ////////////////////////////////////////////////// -->\n\n    <ion-title>\n\n      Menú Principal\n\n\n\n    <!-- CALENDARIO -->\n\n    <button (click)="historial(\'1\',\'calendario\')" style="background: transparent; left:0; right:0; max-width:12%; float: right; margin-right: 3%; display: block; max-height:100%;">\n\n        <ion-icon item-left>\n\n          <img src="assets/imgs/calendar.png">\n\n        </ion-icon>\n\n      </button>\n\n\n\n    <!-- CAMPANA -->\n\n    <button (click)="historial(\'0\',\'campana\')" style="background: transparent; left:0; right:0; max-width:12%; float: right; margin-right: 3%; display: block; max-height:100%;">\n\n        <ion-icon item-left>\n\n          <img src="assets/imgs/notification.png">\n\n        </ion-icon>\n\n      </button>\n\n\n\n    <!-- RELOJ -->\n\n    <button (click)="historial(\'0\',\'reloj\')" style="background: transparent; left:0; right:0; max-width:12%; float: right; margin-right: 3%; display: block; max-height:100%;">\n\n        <ion-icon item-left>\n\n          <img src="assets/imgs/today.png">\n\n        </ion-icon>\n\n      </button>\n\n    </ion-title>\n\n\n\n    <!-- IOS ////////////////////////////////////////////////// -->\n\n    <!-- <ion-title style="padding-right: 0%;"><label left>Menú Principal</label> -->\n\n      <!-- CALENDARIO -->\n\n      <!-- <button (click)="historial(\'1\',\'calendario\')" style="background: transparent; left:0; right:0; max-width:2%; float: right; margin-right: 5%; display: block; max-height:100%;">\n\n        <ion-icon name="calendar" style="cursor:pointer; font-size: 140%; color:rgb(255, 255, 255);"></ion-icon>\n\n      </button> -->\n\n\n\n      <!-- CAMPANA -->\n\n      <!-- <button (click)="historial(\'0\',\'campana\')" style="background: transparent; left:0; right:0; max-width:2%; float: right; margin-right: 5%; display: block; max-height:100%;">\n\n        <ion-icon name="notifications" style="cursor:pointer; font-size: 150%; color:rgb(255, 255, 255);"></ion-icon>\n\n      </button> -->\n\n\n\n      <!-- RELOJ -->\n\n      <!-- <button (click)="historial(\'0\',\'reloj\')" style="background: transparent; left:0; right:0; max-width:10%; float: right; margin-right: 5%; display: block; max-height:100%;">\n\n        <ion-icon name="alarm" style="cursor:pointer; font-size: 130%; color:rgb(255, 255, 255);"></ion-icon>\n\n      </button>\n\n    </ion-title> -->\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content style="background-image: url(\'assets/imgs/fondo2.png\')" class="getstarPrincipal">\n\n  <br>\n\n  <ion-grid class="container-fluid" *ngIf="contenidoDinamico">\n\n    <h3 style="text-align: center">{{titulo}}</h3>\n\n    <h3 style="text-align: center">\n\n      <small>(Elija una opción)</small>\n\n    </h3>\n\n    <ion-row>\n\n      <ion-col style="justify-content: left;">\n\n        <div>\n\n          <button ion-button color={{clrBotonViaje}} (click)="verViajes()" style="float: right; width: 146px; max-width:146px;">\n\n            <ion-icon name="car"></ion-icon> &nbsp;Viajes&nbsp;\n\n            <ion-icon name={{checkmarkViaje}}></ion-icon>\n\n          </button>\n\n        </div>\n\n      </ion-col>\n\n      <ion-col style="display: flex; justify-content: right;">\n\n        <div>\n\n          <button ion-button color={{clrBotonEncomienda}} (click)="verEncomiendas()" style="width: 146px; max-width:146px;">\n\n            <ion-icon name="cube"></ion-icon>&nbsp;Encomiendas&nbsp;\n\n            <ion-icon name={{checkmarkEncomienda}}></ion-icon>\n\n          </button>\n\n        </div>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n  <!--  -->\n\n  <ion-list *ngIf="contenidoDinamicoViaje">\n\n    <ion-item *ngFor=" let listado of  vectorViajes">\n\n      <ion-thumbnail item-start style="margin-right: 0;">\n\n        <ion-icon name="ios-car" style="cursor:pointer; font-size: 400%; color:#4266AE; margin-left: 15%"></ion-icon>\n\n      </ion-thumbnail>\n\n      <p style="font-size: 12px;">\n\n        <b>Ruta: </b> {{listado.ruta}}</p>\n\n      <p style="font-size: 12px;">\n\n        <b>Fecha Salida: </b> {{listado.fech_salida}}</p>\n\n      <p style="font-size: 12px;">\n\n        <b>Horario: </b> {{listado.horario}}</p>\n\n      <button ion-button clear item-end (click)="irDetalles(listado,\'viaje\')">Ver</button>\n\n      <button ion-button clear item-end (click)="irFinalizar(listado,\'viaje\')" *ngIf="btnFinalizarViaje">Finalizar</button>\n\n    </ion-item>\n\n  </ion-list>\n\n  <!--  -->\n\n  <ion-list *ngIf="contenidoDinamicoEncomienda">\n\n    <ion-item *ngFor=" let listado of  vectorEncomiendas">\n\n      <ion-thumbnail item-start style="margin-right: 0;">\n\n        <ion-icon name="cube" style="cursor:pointer; font-size: 400%; color: #4266AE; margin-left: 15%;"></ion-icon>\n\n      </ion-thumbnail>\n\n      <p style="font-size: 12px;">\n\n        <b>Ruta: </b> {{listado.ruta}}</p>\n\n      <p style="font-size: 12px;">\n\n        <b>Fecha Salida: </b>{{listado.fech_salida}}</p>\n\n      <p style="font-size: 12px;">\n\n        <b>Horario: </b> {{listado.horario}}</p>\n\n      <button ion-button clear item-end (click)="irDetalles(listado,\'encomienda\')">Ver</button>\n\n      <button ion-button clear item-end (click)="irFinalizar(listado,\'encomienda\')" *ngIf="btnFinalizarEncomiendas">Finalizar</button>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <br>\n\n  <br>\n\n  <br>\n\n\n\n  <div style="align-content: center; text-align: center;" *ngIf="portada">\n\n    <img src="../../assets/imgs/principalchofer.png" />\n\n    <ion-card-content>\n\n      <p>\n\n        Hola, Bienvenido {{datosChoferInt.nombre}} {{datosChoferInt.apellido}}\n\n      </p>\n\n    </ion-card-content>\n\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\sttef\Documents\GitHub\montecarlo\APPMOVILCHOFER\appChofer2\src\pages\principal\principal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__app_services_chofer_service__["a" /* ChoferService */]])
    ], PrincipalPage);
    return PrincipalPage;
    var PrincipalPage_1;
}());

//# sourceMappingURL=principal.js.map

/***/ })

},[368]);
//# sourceMappingURL=main.js.map