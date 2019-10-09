export class Viaje {
    constructor(
        public receiver,
        public _id_chofer,
        public _id_secretaria,
        public _id_taxi,
        public tipo,
        public ruta,
        public horario,
        public fechaSalida,
        public num_maleta,
        public informacion,
        public latitud_salida,
        public longitud_salida,
        public latitud_llegada,
        public longitud_llegada,
        public p1,
        public p2,
        public p3,
        public p4,
        public fech_solicitud,
        public hora_solicitud,
        public precio,
        public estado,
        public sockett,
        public tipoPago

    ) { }
}
