export class Viaje {
    constructor(
        public receiver,
        public _id_chofer,
        public _id_secretaria,
        public tipo,
        public estado,
        public raza,
        public fechaSalida,
        public num_edad,
        public informacion,
        public latitud_salida,
        public longitud_salida,
        public latitud_llegada,
        public longitud_llegada,
        public horarioR,
        public horarioE,
        public fech_solicitud,
        public hora_solicitud,
        public precio,
        public tipoPago

    ) { }
}
