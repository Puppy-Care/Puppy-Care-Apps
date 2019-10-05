'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ViajellenoSchema = Schema({

fech_salida: String,
horario: String,
ruta: String,

});
module.exports = mongoose.model('Viajelleno', ViajellenoSchema);