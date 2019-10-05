'use strict'
var moment = require('moment');


var Viajelleno = require('../models/viajelleno');


function saveViajeLleno(req, res) {
   // console.log("Estoy guardadno viaje Lleno",req.body);
    var params = req.body;
  
   
    var viajelleno = new Viajelleno();
    viajelleno.fech_salida=params.fechaSalida.formatted;
    viajelleno.horario=params.horario;
    viajelleno.ruta=params.ruta;

  
    // message.created_at= moment.unix();
    //console.log("viaje" + JSON.stringify(viajelleno));
  
    viajelleno.save((err, messageStored) => {
      if (err) {
        return res.status(500).send({
          message: 'Error en la peticion de Viaje Lleno'
        });
  
      }
  
      if (!messageStored) {
        return res.status(400).send({
          message: 'No se ha registrado Viaje Lleno'
        });
      }
     // console.log("message guardado" + messageStored);
      return res.status(200).send({
       viajelleno: messageStored
      });

    });


  }

  function getViajesllenos(req, res) {
   // console.log("estoy trayedo mensajes  de vaijes llenos");
    
  
    var message = Viajelleno.find((err, messagess) => {
      if (err) {
        return res.status(500).send({
          message: 'Error al obtener Viajes Llenos'
        });
      }
  
      if (!messagess) {
        return res.status(200).send({
          message: 'No tiene Viajes Llenos'
        });
      }else
      {
        return res.status(200).send({
          messagess
        });
      }
  });
    
}

function dropViajeLleno(req, res) {

  //console.log("entro al drop",req.params._id);
  var viajellenoId = req.params._id;
  Viajelleno.findByIdAndRemove(viajellenoId, (err) => {

    if (err) {
        res.status(500).send({ message: "Error al actualizar Viaje Lleno" });

    } else {
        
         res.status(200).send({ message:"Se ha eliminado el Viaje LLeno"});
        
    }

  });

}

module.exports = { // para exportar todas las funcoones 
  saveViajeLleno,
  getViajesllenos,
  dropViajeLleno

};