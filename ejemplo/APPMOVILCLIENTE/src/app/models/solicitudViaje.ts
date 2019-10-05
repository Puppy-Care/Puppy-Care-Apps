
export class SolicitudViaje {
    constructor(
        public tipo: String,
        public estado: String,
        public ruta: String,
        public horario: String,
        public fechaSalida: String,
        public num_maleta: String,
        public informacion: String,
        public latitud_salida: String,
        public longitud_salida: String,
        public latitud_llegada: String,
        public longitud_llegada: String,
        public asiento: String,
        public identity: String,
        public socketId: String
    ) { }
}