'use strcit'
var moment = require('moment');

var SolicitudEncomienda = require('../models/solicitudEncomienda');

function saveMessageSolicitudEncomienda(req, res) {
   // console.log("Estoy guardadno mensjae");
    var params = req.body;

    if (!params.identity) {
       // console.log("entre dentro con identity");
        return res.status(200).send({ message: 'Envie todos los datos necesarios' });
    }
    var solicitudEncomienda = new SolicitudEncomienda();

    solicitudEncomienda.tipo = params.tipo;
    solicitudEncomienda.estado = params.estado;
    solicitudEncomienda.ruta = params.ruta;
    solicitudEncomienda.horario = params.horario;
    solicitudEncomienda.fechaSalida = params.fechaSalida.formatted;
     solicitudEncomienda.latitud_salida = params.latitud_salida;
    solicitudEncomienda.longitud_salida = params.longitud_salida;
    solicitudEncomienda.latitud_llegada = params.latitud_llegada;
    solicitudEncomienda.longitud_llegada = params.longitud_llegada;
    solicitudEncomienda.detalle_paquete = params.detalle_paquete;
    solicitudEncomienda.destinatario=params.destinatario;
    solicitudEncomienda.user = params.identity;
    solicitudEncomienda.socketId = params.socketId;

   // console.log("encominda" + JSON.stringify(solicitudEncomienda));

    solicitudEncomienda.save((err, solicitudEncomiendaStored) => {
        if (err) {
            return res.status(500).send({ message: 'Error al realizar la solicitud Encomienda' });

        }

        if (!solicitudEncomiendaStored) {
            return res.status(200).send({ message: 'No se ha podido realizar la solicitud Encomienda' });
        }
        //console.log("message guardado" + solicitudEncomiendaStored);
        return res.status(200).send({ solicitudEncomienda: solicitudEncomiendaStored });
    });

}

function getSolicitudesEncomienda(req, res) {
   // console.log("estoy trayedo mensajes Encomienda");
     
    var estado = req.params.estado;
   

   
     var solicitudencomienda= SolicitudEncomienda.find({ estado: estado }).populate({path:'user'}).exec((err, solicitudencomiendas) => {
       if (err) {
         return res.status(500).send({ message: 'Error al obtener solicitudes de Encomienda' });
       }
   
       if (!solicitudencomiendas) {
         return res.status(200).send({ message: 'No tiene  Solicitudes de Encomienda' });
       }
       
       return res.status(200).send({ solicitudencomiendas });
     });
   }
   

   
   function getSolicitudesEncomiendasMios(req, res) {

    var id= req.params._id;
    //console.log("estoy trayedo mensajes Mios ", id);
     
   
     var solicitudencomiendamio= SolicitudEncomienda.find({user:id},(err, solicitudencomiendasmios) => {
       if (err) {
         return res.status(500).send({ message: 'Error al obtener las Solicitudes de Encomienda' });
       }
   
       if (!solicitudencomiendasmios) {
         return res.status(200).send({ message: 'No tiene Solicitudes de Encomienda' });
       }
      // console.log("solicitudes mios"+solicitudencomiendasmios);
       return res.status(200).send({ solicitudencomiendasmios});
     });
   }


   function updateSolicitudEncomienda(req, res) {
    var solicitudId = req.params._id;  // en este caso e sparametro de ruta es decir el id para todo lo demas req.body
   
    var update = req.body;

   

    SolicitudEncomienda.findByIdAndUpdate(solicitudId, update, (err, solicitudUpdate) => {

        if (err) {
            res.status(500).send({ message: "Error al actualizar Solicitud Encomienda" });

        } else {
            if (!solicitudUpdate) {
                res.status(404).send({ message: "La solicitud Encomienda no ha podido Actualizarse" });
            } else {
                res.status(200).send({ solicitudEncomienda: solicitudUpdate });
            }
        }

    });
}

function updateSolicitudEncoCancelacion(req, res) {
    var update = req.body;
    var messageId = req.params._id;  // en este caso e sparametro de ruta es decir el id para todo lo demas req.body
  
    //console.log("este es el ide del mensaje", messageId,"lo que hay que actualizar", update);
  
  
  
   
    SolicitudEncomienda.findByIdAndUpdate(messageId, update, (err, encomiendaUpdate) => {
  
        if (err) {
            res.status(500).send({ message: "Error en al cancelar Solicitud Encomienda" });
  
        } else {
            if (!encomiendaUpdate) {
                res.status(404).send({ message: "La cancelacion  de Solicitud Encomienda no ha podido realizarse" });
            } else {
                res.status(200).send({ encomienda: encomiendaUpdate });
            }
        }
  
    });
  }
module.exports =
    {
        saveMessageSolicitudEncomienda,
        getSolicitudesEncomienda,
        getSolicitudesEncomiendasMios,
        updateSolicitudEncomienda,
        updateSolicitudEncoCancelacion
    };



    
       
         
               
                   
                        
                            
                               
                                   