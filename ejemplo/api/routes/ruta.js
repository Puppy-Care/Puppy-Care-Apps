'use strict'


var express = require('express');
var rutaController = require('../controllers/ruta');
var api = express.Router();

api.get('/ruta', rutaController.probar);
api.post('/guardar', rutaController.guardarRuta);



module.exports = api;