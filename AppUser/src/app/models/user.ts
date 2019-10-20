export class User {
    constructor(
        public _id: String,
        public cedula: String,
        public nombre: String,
        public apellido: String,
        public correo: String,
        public contrasena: String,
        public tel_celular: String,
        public tel_convencional: String,
        public estado: String,
        public image: String
    ) { }
}