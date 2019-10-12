'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ViajeSchema = Schema({
    fech_solicitud: String,
    hora_solicitud: String,
    fech_salida: String,
    horarioE: String,
    horarioR: String,
    latitud_salida: String,
    longitud_salida:String,
    latitud_llegada:String,
    longitud_llegada:String,
    precio: String,
    estado: String,
    num_edad: String,
    raza: String,
    informacion: String,
    denuncia:String,
    tipoPago:String,
    //created_at:String,
    emitter: { type: Schema.ObjectId, ref: "Secretaria" },
    receiver: { type: Schema.ObjectId, ref: "User" },
    _id_chofer: { type: Schema.ObjectId, ref: 'Chofer'},
   
});

module.exports = mongoose.model('Viaje', ViajeSchema);