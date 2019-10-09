'use stric'


var express = require('express');
var ChoferController = require('../controllers/chofer');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 

var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/choferes'
});

//api.get('/probando-controlador', md_auth.ensureAuth ,UserController.pruebas); // esta direccion le indica que es loq ue va hacer
api.post('/registerChofer', ChoferController.saveChofer);
api.post('/loginChofer', ChoferController.loginChofer);
api.put('/update-chofer/:id', md_auth.ensureAuth, ChoferController.updateChofer);
api.get('/choferes/:busqueda', md_auth.ensureAuth, ChoferController.getChoferes);
api.post('/upload-image-chofer/:id', [md_upload], ChoferController.uploadImage);
api.get('/get-image-chofer/:imageFile', ChoferController.getImageFile);
// borrar despues
//api.get('/pruebaServicio', UserController.pruebaServicio);
module.exports = api; // exportamos el router de express para que las routas funcionen por todo el back end