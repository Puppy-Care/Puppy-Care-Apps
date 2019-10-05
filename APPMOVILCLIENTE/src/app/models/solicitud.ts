export class Solicitud {
  constructor(
    public latitud: String,
    public longitud: String
  ) {}

   verDatos() {
     return console.log("COMUN: solicitud: ", this.latitud, " ::: longitud: ", this.longitud);
  }
}
