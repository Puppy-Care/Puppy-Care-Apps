'use stric'


var express = require('express');
var SecreController= require('../controllers/secretaria');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 

//api.get('/probando-controlador', md_auth.ensureAuth ,UserController.pruebas); // esta direccion le indica que es loq ue va hacer
api.post('/registerSecre',SecreController.saveSecretaria);
api.post('/loginSecre',SecreController.loginSecretaria);
api.put('/update-secretaria/:id', md_auth.ensureAuth,SecreController.updateSecretaria);
api.get('/secretarias/:busqueda',md_auth.ensureAuth,SecreController.getSecretarias);

// borrar despues
//api.get('/pruebaServicio', UserController.pruebaServicio);
module.exports =api;// exportamos el router de express para que las routas funcionen por todo el back end