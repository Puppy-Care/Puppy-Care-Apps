'use stric'


var express = require('express');
var UserController= require('../controllers/user');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 

var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/users'
});
api.get('/probando-controlador',UserController.pruebas); // esta direccion le indica que es loq ue va hacer
api.post('/register',UserController.saveUser);
api.post('/login',UserController.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth,UserController.updateUser);
api.get('/allusers',md_auth.ensureAuth,UserController.getUsers); // esta direccion le indica que es loq ue va hacer
api.post('/upload-image-user/:id', [md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);

module.exports =api;// exportamos el router de express para que las routas funcionen por todo el back end