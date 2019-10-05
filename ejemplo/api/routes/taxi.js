'use stric'


var express = require('express');
var TaxiController= require('../controllers/taxi');
var md_auth = require('../middleware/authenticated');
var multipart= require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/taxis'});
var api = express.Router(); // esto sirve para crear las rutas 

//api.get('/probando-controlador', md_auth.ensureAuth ,UserController.pruebas); // esta direccion le indica que es loq ue va hacer
api.post('/registerTaxi',TaxiController.saveTaxi);
//api.post('/loginSecre',SecreController.loginSecretaria);
api.put('/update-taxi/:id',md_auth.ensureAuth,TaxiController.updateTaxi);
api.get('/taxis/:busqueda',md_auth.ensureAuth,TaxiController.getTaxis);
api.post('/upload-image-taxi/:id',[md_upload], TaxiController.uploadImage);
api.get('/get-image-taxi/:imageFile', TaxiController.getImageFile);
// borrar despues
//api.get('/pruebaServicio', UserController.pruebaServicio);
module.exports =api;// exportamos el router de express para que las routas funcionen por todo el back end