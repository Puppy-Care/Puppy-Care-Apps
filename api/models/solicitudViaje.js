'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var solicitudViajeSchema = Schema({
    tipo: String,
    estado: String,
    raza: String,
    num_edad: String,
    fechaSalida: String,
    horarioR: String,
    horarioE: String,
    informacion: String,
    latitud_salida: String,
    longitud_salida: String,
    latitud_llegada: String,
    longitud_llegada: String,
    user: { type: Schema.ObjectId, ref: "User" }



});


module.exports = mongoose.model('solicitudViaje', solicitudViajeSchema);