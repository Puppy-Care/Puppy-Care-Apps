'use stric'


var express = require('express');
var UserController= require('../controllers/user');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 

api.get('/probando-controlador', md_auth.ensureAuth ,UserController.pruebas); // esta direccion le indica que es loq ue va hacer
api.post('/register',UserController.saveUser);
api.post('/login',UserController.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth,UserController.updateUser);
api.get('/allusers',md_auth.ensureAuth,UserController.getUsers); // esta direccion le indica que es loq ue va hacer

// borrar despues
api.get('/pruebaServicio',md_auth.ensureAuth, UserController.pruebaServicio);

module.exports =api;// exportamos el router de express para que las routas funcionen por todo el back end