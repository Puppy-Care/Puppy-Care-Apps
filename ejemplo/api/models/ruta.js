'use strict'


var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RutaSalidaSchema = Schema({
    latitud: String,
    longitud: String,
    user: { type: Schema.ObjectId, ref: "User" }
});

module.exports = mongoose.model("rutasalida", RutaSalidaSchema);