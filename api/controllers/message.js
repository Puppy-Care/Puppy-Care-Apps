'use strict'
var moment = require('moment');
var path = require('path');
var fs = require('fs');

var Viaje = require('../models/viaje');

function probando(req, res) {
  res.status(200).send({
    message: 'hola comoe stas mensajes privados'
  });
}

function saveMessage(req, res) {
  //console.log("Estoy guardadno mensjae no guarda latitud", req.body);
  var params = req.body;

  if (!req.user.sub || !params.receiver) {
    //console.log("entre dentro jaja huevadas");
    return res.status(200).send({
      message: 'Enviar todos los datos necesarios'
    });
  }

  var viaje = new Viaje();

  viaje.emitter = req.user.sub;
  viaje.receiver = params.receiver;
  viaje.fech_solicitud = params.fech_solicitud;
  viaje.hora_solicitud = params.hora_solicitud;
  viaje.fech_salida = params.fechaSalida;
  viaje.horarioR = params.horarioR;
  viaje.horarioE = params.horarioE;
  viaje.latitud_salida = params.latitud_salida;
  viaje.longitud_salida = params.longitud_salida,
  viaje.latitud_llegada = params.latitud_llegada;
  viaje.longitud_llegada = params.longitud_llegada;
  viaje.precio = params.precio;
  viaje.tipoPago=params.tipoPago;
  viaje.raza = params.raza;
  viaje.estado = params.estado;
  viaje.num_edad = params.num_edad;
  viaje.informacion = params.informacion;
  viaje._id_chofer = params._id_chofer;
  viaje._id_taxi = params._id_taxi;
 

  viaje.save((err, messageStored) => {
    if (err) {
      return res.status(500).send({
        message: 'Error al asignar viaje'
      });

    }

    if (!messageStored) {
      return res.status(400).send({
        message: 'No se asignado correctamente el viaje'
      });
    }
    //console.log("message guardado" + messageStored);
    return res.status(200).send({
      viaje: messageStored
    });
  });
}


function getReceivedMessages(req, res) {
  //console.log("estoy trayedo mensajes");
  var userId = req.user.sub;

  var message = Viaje.find({ '$and': [ {'$or':[{ estado:0 },{estado:1},{estado:2},{estado:3},{estado:4}]},{
    receiver: userId
  }]}, (err, messagess) => {
    if (err) {
      return res.status(500).send({
        message: 'No se ha podido obtener los viajes'
      });
    }

    if (!messagess) {
      return res.status(200).send({
        message: 'No tiene mensajes'
      });
    }

    return res.status(200).send({
      messagess
    });
  });
}

function getReceivedMessagesCancelados(req, res) {
  //console.log("estoy trayedo mensajes");
  var userId = req.user.sub;

  var message = Viaje.find({ '$or':[{estado:2},{estado:3}]}).populate({
    path: '_id_chofer'
  }).populate({
    path: 'receiver'
  }).exec((err, messagess) =>{
    if (err) {
      return res.status(500).send({
        message: 'No se ha podido obtener los viajes'
      });
    }

    if (!messagess) {
      return res.status(200).send({
        message: 'No tiene mensajes'
      });
    }

    return res.status(200).send({
      messagess
    });
  });
}


function getReceivedMessagesMios(req, res) {
 // console.log("estoy trayedo mensajes mios VANESSA VANESSA");
  var solicitudId = req.params._id;

  var message = Viaje.find({
    _id: solicitudId
  }).populate({
    path: '_id_chofer'
  }).populate({
    path: '_id_taxi'
  }).exec((err, messagess) => {
    if (err) {
      return res.status(500).send({
        message: 'No se han podido obtener sus Viajes'
      });
    }

    if (!messagess) {
      return res.status(200).send({
        message: 'No tiene viajes'
      });
    }

    return res.status(200).send({
      messagess
    });
  });
}



function getReceivedMessagesChofer(req, res) {
  //console.log("estoy trayedo mensajes Chofer");
  var userId = req.user.sub;
  var estadoListar = req.params.estadoListar;
  console.log("estado listar", estadoListar, "user id chofer",userId);
  var message = Viaje.find({ '$and': [{'$or': [{ estado: estadoListar },{estado:'2'},{estado:'3'},{estado:'4'}]}, { _id_chofer: userId }] }).populate({ path: 'receiver' }).exec((err, messagess) => {
    if (err) {
      return res.status(500).send({
        message: 'No se han podido obtener sus Viajes'
      });
    }

    if (!messagess) {
      return res.status(200).send({
        message: 'No tiene Viajes'
      });
    }

    return res.status(200).send({
      messagess
    });
  });
}


function getReceivedMessagesListadoSecretaria(req, res) {
  //console.log("estoy trayedo mensajes Chofer");
 
  var dia= req.params.dia;
  var mes= req.params.mes;
  var ano= req.params.ano;

  var _fech_salida=dia+'/'+mes+'/'+ano;

  //console.log("estado fecha salida", _fech_salida);
  var message = Viaje.find({ '$and': [ {'$or':[{ estado: '1' },{estado: '0'}]}, { fech_salida: _fech_salida }] }).populate({
    path: '_id_chofer'}).populate({
      path: 'receiver'}).populate({path: '_id_taxi'}).populate({path: 'emitter'}).exec((err, messagess) => {
    if (err) {
      return res.status(500).send({
        message: 'No se han podido obtener los Viajes'
      });
    }

    if (!messagess) {
      return res.status(200).send({
        message: 'No tiene Viajes'
      });
    }
  
    return res.status(200).send({
      messagess
    });
  });
}



function getReceivedMessagesChoferHoy(req, res) {
  //console.log("estoy trayedo mensajes Chofer  Hoy......tefo");
  var fechaHoy = moment().format().split("T");
  var FechaFinal = fechaHoy[0].split("-");
  //console.log("fecha hoy", FechaFinal[2] + "/" + FechaFinal[1] + "/" + FechaFinal[0]);
  var fechaEstaSi=FechaFinal[2] + "/" + FechaFinal[1] + "/" + FechaFinal[0];
  var estadoListar = req.params.estadoListar;
  //console.log('estado listar y la fecha hoy....', estadoListar);
  var message = Viaje.find({ '$and': [{ estado: estadoListar }, { fech_salida: fechaEstaSi }] }).populate({ path: 'receiver' }).exec((err, messagess) => {
    if (err) {
      return res.status(500).send({
        message: 'No se ha podido obtener sus Viajes para hoy'
      });
    }

    if (!messagess) {
      return res.status(200).send({
        message: 'No tiene Viajes para hoy'
      });
    }
   
    return res.status(200).send({
      messagess
    });

    //console.log(messagess);
  });
}


function updateMessageChofer(req, res) {
  var update = req.body;
  var messageId = req.params._id;  // en este caso e sparametro de ruta es decir el id para todo lo demas req.body
  
  Viaje.findByIdAndUpdate(messageId, update, (err, viajeUpdate) => {

      if (err) {
          res.status(500).send({ message: "Error al actualizar Viaje" });

      } else {
          if (!viajeUpdate) {
              res.status(404).send({ message: "El viaje no ha podido actualizarse" });
          } else {
              res.status(200).send({ viaje: viajeUpdate });
          }
      }

  });
}


function updateMessageDenuncia(req, res) {
  var update = req.body;
  var messageId = req.params._id;  // en este caso e sparametro de ruta es decir el id para todo lo demas req.body

  //console.log("este es el ide del mensaje", messageId,"lo que hay que actualizar", update);



 
  Viaje.findByIdAndUpdate(messageId, update, (err, viajeUpdate) => {

      if (err) {
          res.status(500).send({ message: "Error al asignar Denuncia" });

      } else {
          if (!viajeUpdate) {
              res.status(404).send({ message: "No se asignado la Denuncia" });
          } else {
              res.status(200).send({ viaje: viajeUpdate });
          }
      }

  });
}



function updateMessageCancelacion(req, res) {

  console.log("Estoy en cancelacion dle viaje");
  var update = req.body;
  var messageId = req.params._id;  // en este caso e sparametro de ruta es decir el id para todo lo demas req.body

  //console.log("este es el ide del mensaje", messageId,"lo que hay que actualizar", update);



 
  Viaje.findByIdAndUpdate(messageId, update, (err, viajeUpdate) => {

      if (err) {
          res.status(500).send({ message: "Error al cancelar Viaje" });

      } else {
          if (!viajeUpdate) {
              res.status(404).send({ message: "No se ha Cancelado el Viaje" });
          } else {
              res.status(200).send({ viaje: viajeUpdate });
          }
      }

  });
}



module.exports = {
  probando,
  saveMessage,
  getReceivedMessages,
  getReceivedMessagesMios,
  getReceivedMessagesChofer,
  getReceivedMessagesChoferHoy,
  updateMessageChofer,
  updateMessageDenuncia,
  getReceivedMessagesListadoSecretaria,
  updateMessageCancelacion,
  getReceivedMessagesCancelados
};