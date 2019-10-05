'use stric'


var express = require('express');
var CuentasController = require('../controllers/cuentas');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 

//api.get('/probando-controlador', md_auth.ensureAuth ,UserController.pruebas); // esta direccion le indica que es loq ue va hacer
api.post('/registerCuentas', CuentasController.saveCuentas);
api.get('/thisCuentas/:dia/:mes/:ano/:idChofer', CuentasController.getCuentas);
api.get('/allcuentas/:dia/:mes/:ano', CuentasController.getCuentasAll);



// borrar despues
//api.get('/pruebaServicio', UserController.pruebaServicio);
module.exports = api; // exportamos el router de express para que las routas funcionen por todo el back end