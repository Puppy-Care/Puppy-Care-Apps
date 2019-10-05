'use strcit'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');


var Cuentas = require('../models/cuentas');
var jwt = require('../services/jwt');

function saveCuentas(req, res) {
  console.log("Estoy guardadno viaje Lleno", req.body);
  var params = req.body;


  var cuentas = new Cuentas();
  cuentas.fecha = params.fechaS;//fechaSalida.formatted;
  cuentas.peaje = params.peajeS;
  cuentas.gasolina = params.gasolinaS;
  cuentas.lunch = params.lunchS;
  cuentas.varios = params.variosS;
  cuentas._id_chofer = params.idChoferS;



  cuentas.save((err, messageStored) => {
    if (err) {
      return res.status(500).send({
        message: 'Error en la peticion de guardar Cuentas'
      });

    }

    if (!messageStored) {
      return res.status(400).send({
        message: 'No se han guardado las cuentas'
      });
    }
    // console.log("message guardado" + messageStored);
    return res.status(200).send({
      cuentas: messageStored
    });

  });




}

function getCuentas(req, res) {
  console.log("estoy trayedo cuentas", req.params);
  var idChofer = req.params.idChofer;
  var dia = req.params.dia;
  var mes = req.params.mes;
  var ano = req.params.ano;
  var fecha = dia + '/' + mes + '/' + ano;

  console.log("fecha que me llega papi", fecha);
  Cuentas.findOne({ '$and': [{ _id_chofer: idChofer }, { fecha: fecha }] }, (err, thiscuentas) => {
    if (err) {
      // console.log("Error");
      return res.status(500).send({
        message: 'Error al obtener las encomiendas'
      });
    }

    if (!thiscuentas) {
      // console.log("no trae encomienda");
      return res.status(200).send({
        message: 'No tiene encomiendas'
      });
    }
    // console.log("si regresa" + messagessEnco);
    return res.status(200).send({
      cuentas: thiscuentas
    });
  });
}

  ////
  function getCuentasAll(req, res) {
    console.log("estoy trayedo cuentas all",req.params);
    var idChofer= req.params.idChofer;
    var dia= req.params.dia;
    var mes= req.params.mes;
    var ano= req.params.ano;
    var fecha=dia+'/'+mes+'/'+ano;
    
    var message = Cuentas.find({ fecha: fecha },(err, allcuentas) => {
        if (err) {
          return res.status(500).send({
            message: 'No se ha podido obtener sus Viajes para hoy'
          });
        }
    
        if (!allcuentas) {
          return res.status(200).send({
            message: 'No tiene Viajes para hoy'
          });
        }
       
        return res.status(200).send({
            allcuentas
        });
    
        //console.log(messagess);
      });
  }


 

   module.exports = {
    saveCuentas,
    getCuentas,
    getCuentasAll
};