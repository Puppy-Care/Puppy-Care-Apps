export class Encomienda {
    constructor(
        public receiver,
        public _id_chofer,
        public _id_secretaria,
        public _id_taxi,
        public tipo,
        public ruta,
        public horario,
        public fechaSalida,
        public latitud_salida,
        public longitud_salida,
        public latitud_llegada,
        public longitud_llegada,
        public precio,
        public detalle_paquete,
        public destinatario,
        public estado,
        public fech_solicitud,
        public hora_solicitud,
        public sockett,
        public tipoPago
    ) { }
}