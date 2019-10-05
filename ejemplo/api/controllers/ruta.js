'use strict'



var Ruta = require("../models/ruta");

function probar(req, res) {
    res
        .status(200)
        .send({ message: "Metodo getruta del controlador rutaSalida.js" });
}

function guardarRuta(req, res) {
    var ruta = new Ruta();
    var params = req.body; // cuerpo de la peticion post de la direccion http por post
   // console.log("Parametros de entrada:", params);

    ruta.latitud = params.latitud;
    ruta.longitud = params.longitud;

    ruta.save(); //  save es un metodo de mongoose

    res.status(200).send({ message: 'Latitud y Longitud almacenada correctamente' });
}

module.exports = {
    probar,
    guardarRuta
};