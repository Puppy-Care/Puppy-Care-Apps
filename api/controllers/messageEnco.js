'use strict'
var moment = require('moment');

var Encomienda = require('../models/encomienda');

function probando(req, res) {
  res.status(200).send({
    message: 'hola comoe stas mensajes privados'
  });
}

function saveMessage(req, res) {
  //console.log("Estoy guardadno mensjae Encomienda");
  var params = req.body;

  if (!req.user.sub || !params.receiver) {
    //console.log("entre dentro jaja huevadas ENC");
    return res.status(200).send({
      message: 'Envie todos los datos necesarios'
    });
  }

  var encomienda = new Encomienda();
  encomienda.emitter = req.user.sub;
  encomienda.receiver = params.receiver;
  encomienda.fech_solicitud = params.fech_solicitud;
  encomienda.hora_solicitud = params.hora_solicitud;
  encomienda.fech_salida = params.fechaSalida;
  encomienda.horario = params.horario;
  encomienda.latitud_salida = params.latitud_salida;
  encomienda.longitud_salida = params.longitud_salida;
  encomienda.latitud_llegada = params.latitud_llegada;
  encomienda.longitud_llegada = params.longitud_llegada
  encomienda.precio = params.precio;
  encomienda.ruta = params.ruta;
  encomienda.estado = params.estado;
  encomienda.detalle_paquete = params.detalle_paquete;
  encomienda.destinatario = params.destinatario;
  encomienda.tipoPago=params.tipoPago;
  encomienda._id_chofer = params._id_chofer;
  encomienda._id_taxi = params._id_taxi;


  // message.created_at= moment.unix();
  //console.log("encomienda" + JSON.stringify(encomienda));

  encomienda.save((err, messageStored) => {
    if (err) {
      return res.status(500).send({
        message: 'Error al solicitar encomienda'
      });

    }

    if (!messageStored) {
      return res.status(200).send({
        message: 'No se ha solicitado ninguna encomienda'
      });
    }
    //console.log("message guardado" + messageStored);
    return res.status(200).send({
      encomienda: messageStored
    });
  });
}

/////////////////////////////////////////////////teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
function getReceivedMessages(req, res) {
  //console.log("estoy trayedo mensajes Encomiendas" + req.user.sub);
  var userId = req.user.sub;
  //console.log("user Id" + userId);
  var message = Encomienda.find({'$and': [{'$or':[{ estado:0 },{estado:1}]},
    {receiver: userId
  }]}, (err, messagessEnco) => {
    if (err) {
     // console.log("Error");
      return res.status(500).send({
        message: 'Error al obtener las encomiendas'
      });
    }

    if (!messagessEnco) {
     // console.log("no trae encomienda");
      return res.status(200).send({
        message: 'No tiene encomiendas'
      });
    }
   // console.log("si regresa" + messagessEnco);
    return res.status(200).send({
      messagessEnco
    });
  });
}

function getReceivedMessagesMios(req, res) {
  //console.log("estoy trayedo mensajes mios Enc");
  var solicitudId = req.params._id;

  var message = Encomienda.find({
    _id: solicitudId
  }).populate({
    path: '_id_chofer'
  }).populate({
    path: '_id_taxi'
  }).exec((err, messagess) => {
    if (err) {
      return res.status(500).send({
        message: 'Error al obtener sus Encomiendas'
      });
    }

    if (!messagess) {
      return res.status(200).send({
        message: 'No tiene encomiendas'
      });
    }

    return res.status(200).send({
      messagess
    });
  });
}

function getReceivedMessagesMios(req, res) {
 // console.log("estoy trayedo mensajes Enco");
  var solicitudId = req.params._id;

  var message = Encomienda.find({ _id: solicitudId }).populate({ path: '_id_chofer' }).populate({ path: '_id_taxi' }).exec((err, messagess) => {
    if (err) {
      return res.status(500).send({ message: 'Error al obtener sus encomiendas' });
    }

    if (!messagess) {
      return res.status(200).send({ message: 'No tiene Encomiendas' });
    }

    return res.status(200).send({ messagess });
  });
}


function getReceivedMessagesEncoChofer(req, res) {
 // console.log("estoy trayedo mensajes Chofer Enco");
  var userId = req.user.sub;
  var estadoListar = req.params.estadoListar;
 // console.log("estado listar", estadoListar);
  var message = Encomienda.find({ '$and': [{ estado: estadoListar }, { _id_chofer: userId }] }).populate({ path: 'receiver' }).exec((err, messagess) => {
    if (err) {
      return res.status(500).send({
        message: 'Error al obtener sus Encomiendas'
      });
    }

    if (!messagess) {
      return res.status(200).send({
        message: 'No tiene Encomiendas'
      });
    }

    return res.status(200).send({
      messagess
    });
  });
}



function getReceivedMessagesEncoChoferHoy(req, res) {
  //console.log("estoy trayedo mensajes Chofer  Enco Hoy");
  var fechaHoy = moment().format().split("T");
  var FechaFinal = fechaHoy[0].split("-");
 // console.log("fecha hoy", FechaFinal[2] + "/" + FechaFinal[1] + "/" + FechaFinal[0]);
  var FechaEstaSi=FechaFinal[2] + "/" + FechaFinal[1] + "/" + FechaFinal[0];
  var estadoListar = req.params.estadoListar;
  var message = Encomienda.find({ '$and': [{ estado: estadoListar }, { fech_salida: FechaEstaSi }] }, (err, messagess) => {
    if (err) {
      return res.status(500).send({
        message: 'Error al obtener las Encoiendas para hoy'
      });
    }

    if (!messagess) {
      return res.status(200).send({
        message: 'No tiene Encomiendas'
      });
    }

    //console.log(messagess);

    return res.status(200).send({
    
      messagess
    });
  });
}


function updateMessageEncoChofer(req, res) {
  var update = req.body;
  var messageId = req.params._id;  // en este caso e sparametro de ruta es decir el id para todo lo demas req.body



  var update = req.body;

 
  Encomienda.findByIdAndUpdate(messageId, update, (err, encomiendaUpdate) => {

      if (err) {
          res.status(500).send({ message: "Error al actualizar Encomienda" });

      } else {
          if (!encomiendaUpdate) {
              res.status(404).send({ message: "La Encomienda no se ha actualizado" });
          } else {
              res.status(200).send({ encomienda: encomiendaUpdate });
          }
      }

  });
}




function updateMessageEncoDenuncia(req, res) {
  var update = req.body;
  var messageId = req.params._id;  // en este caso e sparametro de ruta es decir el id para todo lo demas req.body



  var update = req.body;

 
  Encomienda.findByIdAndUpdate(messageId, update, (err, encomiendaUpdate) => {

      if (err) {
          res.status(500).send({ message: "Error al asignar la Denuncia" });

      } else {
          if (!encomiendaUpdate) {
              res.status(404).send({ message: "La Denuncia no se asignado correctamente" });
          } else {
              res.status(200).send({ encomienda: encomiendaUpdate });
          }
      }

  });
}



function getReceivedMessagesEncoListadoSecretaria(req, res) {
 // console.log("estoy trayedo mensajes Chofer");
 
  var dia= req.params.dia;
  var mes= req.params.mes;
  var ano= req.params.ano;

  var _fech_salida=dia+'/'+mes+'/'+ano;

  //console.log("estado fecha salida", _fech_salida);
  var message = Encomienda.find({ '$and': [ {'$or':[{ estado: '1' },{estado: '0'}]}, { fech_salida: _fech_salida }] }).populate({
    path: '_id_chofer'}).populate({
      path: 'receiver'}).populate({path: '_id_taxi'}).populate({path: 'emitter'}).exec((err, messagess) => {
    if (err) {
      return res.status(500).send({
        message: 'Error al obtener Encomiendas'
      });
    }

    if (!messagess) {
      return res.status(200).send({
        message: 'No tiene Encomiendas'
      });
    }
  
    return res.status(200).send({
      messagess
    });
  });
}

function updateMessageEncoCancelacion(req, res) {

  console.log("Estoy en cancelacion dle viaje");
  var update = req.body;
  var messageId = req.params._id;  // en este caso e sparametro de ruta es decir el id para todo lo demas req.body

  //console.log("este es el ide del mensaje", messageId,"lo que hay que actualizar", update);



 
  Encomienda.findByIdAndUpdate(messageId, update, (err, viajeUpdate) => {

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
  getReceivedMessagesEncoChofer,
  getReceivedMessagesEncoChoferHoy,
  updateMessageEncoChofer,
  updateMessageEncoDenuncia,
  getReceivedMessagesEncoListadoSecretaria,
  updateMessageEncoCancelacion
};
