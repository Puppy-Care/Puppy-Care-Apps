'use strcit'
var moment = require('moment');
var path = require('path');

var SolicitudViaje = require('../models/solicitudViaje');

function saveMessageSolicitudViaje(req, res) {
  //  console.log("Estoy guardadno mensjae");
    var params = req.body;
   // console.log(params.identity);

    if (!params.identity) {
       // console.log("entre dentro jaja huevadas");
        return res.status(200).send({ message: 'Envie todos los datos necesarios' });
    }
    var solicitudViaje = new SolicitudViaje();

    solicitudViaje.tipo = params.tipo;
    solicitudViaje.estado = params.estado;
    solicitudViaje.ruta = params.ruta;
    solicitudViaje.horario = params.horario;
    solicitudViaje.fechaSalida = params.fechaSalida.formatted;
    solicitudViaje.num_maleta = params.num_maleta;
    solicitudViaje.informacion = params.informacion;
    solicitudViaje.latitud_salida = params.latitud_salida;
    solicitudViaje.longitud_salida = params.longitud_salida;
    solicitudViaje.latitud_llegada = params.latitud_llegada;
    solicitudViaje.longitud_llegada = params.longitud_llegada;
    //solicitudViaje.asiento = params.asiento;
    solicitudViaje.user = params.identity;
    solicitudViaje.socketId = params.socketId;
    solicitudViaje.p1 = params.p1;
    solicitudViaje.p2 = params.p2;
    solicitudViaje.p3 = params.p3;
    solicitudViaje.p4 = params.p4;
    solicitudViaje.estadoLleno = params.estadoLleno;

    //console.log("viaje" + JSON.stringify(solicitudViaje));



    solicitudViaje.save((err, messageStored) => {
        if (err) {
            return res.status(500).send({ message: 'Error al realizar Solicitud de Viaje' });

        }

        if (!messageStored) {
            return res.status(200).send({ message: 'Error al Solicitar Viaje' });
        }
       // console.log("message guardado" + messageStored);
        return res.status(200).send({ solicitudViaje: messageStored });
    });
}



function getSolicitudesViaje(req, res) {
    console.log("estoy trayedo mensajes");
    var estado = req.params.estado;
    console.log("estoy trayedo estado",estado);

    var solicitudviaje = SolicitudViaje.find({ estado: estado }).populate({ path: 'user' }).exec((err, solicitudviajes) => {
        if (err) {
            return res.status(500).send({ message: 'Error al obtener Solicitudes de Viaje' });
        }

        if (!solicitudviajes) {
            return res.status(200).send({ message: 'No tiene Viajes' });
        }
       // console.log(solicitudviajes);
        return res.status(200).send({ solicitudviajes });
    });
}


function getSolicitudesViajesMios(req, res) {

    var id = req.params._id;
   // console.log("estoy trayedo mensajes Mios ", id);


    var solicitudviajemio = SolicitudViaje.find({ user: id }, (err, solicitudviajesmios) => {
        if (err) {
            return res.status(500).send({ message: 'Error al obtener sus Solicitudes de Viaje' });
        }

        if (!solicitudviajesmios) {
            return res.status(200).send({ message: 'No tiene solicitudes de Viaje'});
        }
       // console.log("solicitudes mios" + solicitudviajesmios);
        return res.status(200).send({ solicitudviajesmios });
    });
}


function updateSolicitudViaje(req, res) {
    var solicitudId = req.params._id;  // en este caso e sparametro de ruta es decir el id para todo lo demas req.body

    var update = req.body;



    SolicitudViaje.findByIdAndUpdate(solicitudId, update, (err, solicitudUpdate) => {

        if (err) {
            res.status(500).send({ message: "Error al actualizar Solicitud de Viaje" });

        } else {
            if (!solicitudUpdate) {
                res.status(404).send({ message: "La Solicitud de Viaje no ha podido actualizarse" });
            } else {
                res.status(200).send({ solicitudViaje: solicitudUpdate });
            }
        }

    });
}


function getTodasSolicitudesViajes(req, res) {

    var params = req.body;
   // console.log("estoy trayedo mensajes todos fechaaaa ", params);

    var solicitudviajetodo = SolicitudViaje.find({ '$and': [ {'$or':[{estado:'0'},{estado:'1'}]},{ estadoLleno: '0' }, { ruta: params.rura }, { horario: params.hora }, {fechaSalida:params.fecha}] }, (err, solicitudviajesTodos) => {
        if (err) {
            return res.status(500).send({ message: 'Error  al obtener las solicitudes de Viaje' });
        }

        if (!solicitudviajesTodos) {
            return res.status(200).send({ message: 'No tiene Viajes' });
        }
       // console.log(solicitudviajesTodos);
        return res.status(200).send({ solicitudviajesTodos });
    });
}



function updateConjuntosolicitudViaje(req, res) {
    var update = req.body;
    // en este caso e sparametro de ruta es decir el id para todo lo demas req.body
    var rutaupdate = req.body.ruta;
    var horarioupdate = req.body.horario;
    var fech_salida_update = req.body.fech_salida;
    //console.log("viaje lleno", update);

    SolicitudViaje.updateMany( {ruta: rutaupdate, horario: horarioupdate, fechaSalida: fech_salida_update},{'$set': { estadoLleno: "1" }}, (err, solicitudViajeUpdate) => {

        if (err) {
            res.status(500).send({ message: "Error al actualizar Solicitudes de Viaje" });

        } else {
            if (!solicitudViajeUpdate) {
                res.status(404).send({ message: "Las solicitudes de viaje no han podido actualizarse" });
            } else {
                //console.log(solicitudViajeUpdate);
                res.status(200).send({ solicitudviaje: solicitudViajeUpdate });

            }
        }

    });
}


function updateSolicitudViajeCancelacion(req, res) {
    var update = req.body;
    var messageId = req.params._id;  // en este caso e sparametro de ruta es decir el id para todo lo demas req.body
  
    //console.log("este es el ide del mensaje", messageId,"lo que hay que actualizar", update);
  
  
  
   
    SolicitudViaje.findByIdAndUpdate(messageId, update, (err, viajeUpdate) => {
  
        if (err) {
            res.status(500).send({ message: "Error al cancelar Solicitudes de Viaje" });
  
        } else {
            if (!viajeUpdate) {
                res.status(404).send({ message: "La cancelacion de Solicitudes de Viaje no se ha realizado" });
            } else {
                res.status(200).send({ viaje: viajeUpdate });
            }
        }
  
    });
  }
  



module.exports =
    {
        saveMessageSolicitudViaje,
        getSolicitudesViaje,
        getSolicitudesViajesMios,
        updateSolicitudViaje,
        getTodasSolicitudesViajes,
        updateConjuntosolicitudViaje,
        updateSolicitudViajeCancelacion
    };