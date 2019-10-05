'use strict'


var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CuentasSchema= Schema({
    fecha: String,
    peaje: String,
    gasolina:String,
    lunch:String,
    varios:String,
    _id_chofer: { type: Schema.ObjectId, ref: 'Chofer'},
   
});

module.exports = mongoose.model("Cuentas", CuentasSchema);