'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ViajeSchema = Schema({
    fech_solicitud: String,
    hora_solicitud: String,
    fech_salida: String,
    horario: String,
    latitud_salida: String,
    longitud_salida:String,
    latitud_llegada:String,
    longitud_llegada:String,
    precio: String,
    ruta: String,
    estado: String,
    num_maleta: String,
    informacion: String,
    p1:String,
    p2:String,
    p3:String,
    p4:String,
    denuncia:String,
    tipoPago:String,
    //created_at:String,
    emitter: { type: Schema.ObjectId, ref: "Secretaria" },
    receiver: { type: Schema.ObjectId, ref: "User" },
    _id_chofer: { type: Schema.ObjectId, ref: 'Chofer'},
   _id_taxi: { type: Schema.ObjectId, ref: 'Taxi'}
});

module.exports = mongoose.model('Viaje', ViajeSchema);