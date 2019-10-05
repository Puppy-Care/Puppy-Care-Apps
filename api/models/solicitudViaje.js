'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var solicitudViajeSchema = Schema({
    tipo: String,
    estado: String,
    ruta: String,
    horario: String,
    fechaSalida: String,
    num_maleta: String,
    informacion: String,
    latitud_salida: String,
    longitud_salida: String,
    latitud_llegada: String,
    longitud_llegada: String,
    p1:String,
    p2:String,
    p3:String,
    p4:String,
    estadoLleno: String,
    user: { type: Schema.ObjectId, ref: "User" },
    socketId: String
});


module.exports = mongoose.model('solicitudViaje', solicitudViajeSchema);