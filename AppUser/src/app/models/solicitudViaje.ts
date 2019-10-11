
export class SolicitudViaje {
    constructor(
        public tipo: String,
        public estado: String,
        public raza: String,
        public num_edad: String,
        public fechaSalida: String,
        public horarioR: String,
        public horarioE: String,
        public informacion: String,
        public latitud_salida: String,
        public longitud_salida: String,
        public latitud_llegada: String,
        public longitud_llegada: String,
        public asiento: String,
        public identity: String
    ) { }
}