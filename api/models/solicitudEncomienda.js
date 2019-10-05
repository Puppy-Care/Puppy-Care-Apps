
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var solicitudEncomiendaSchema = Schema({
    tipo: String,
    estado: String,
    ruta: String,
    horario: String,
    fechaSalida: String,
    latitud_salida: String,
    longitud_salida: String,
    latitud_llegada: String,
    longitud_llegada: String,
    detalle_paquete: String,
    destinatario: String,
    user: { type: Schema.ObjectId, ref: "User" },
    socketId: String
});


module.exports = mongoose.model('solicitudEncomienda', solicitudEncomiendaSchema);