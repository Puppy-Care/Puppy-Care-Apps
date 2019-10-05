Montecarlo Transvip:
===========

Antes de compilar el proyecto ejecutar los siguientes comandos:
- rm -r node_modules
- npm install

Componentes:
===========
Install Geolocalización:
----------------
- npm install --save @ionic-native/geolocation

Install Angular Google Maps:
----------------
- npm install @agm/core --save

Install Google Maps:
----------------
- npm install @types/googlemaps --save-dev

Install Validaciones:
----------------
- npm install ng2-validation --save

Install Correo Electrónico:
----------------
- npm install --save @ionic-native/email-composer

Install Número Telefónico:
----------------
- npm install --save @ionic-native/call-number

Install Calendario:
----------------
- npm install mydatepicker --save

Install notificacion por Correo Electronico:
----------------
- npm install nodemailer

Install para abrir el navegador dentro de la APP:
----------------
- npm install --save @ionic-native/in-app-browser

Install pago con PAYPAL:
----------------
- npm install paypal-rest-sdk

Plugins:
===========
Correo Electrónico:
----------------
- ionic cordova plugin add cordova-plugin-email-composer

Número Telefónico:
----------------
- ionic cordova plugin add call-number

Correr por otro puerto:
----------------
- ionic serve -p 8101 -r 8102 --dev-logger-port 8103

Notificaciones:
----------------

npm install ng-socket-io

npm install rxjs-compat

Change polyfills.ts

Add this code in the first line of the file:
(window as any).global = window;






MODIFICACIONES DE IOS:
----------------

VARIABLE THEME
HOME.SCSS
HOME.HTML
REGISTRO.HTML
HOME.HTML

solicitudes.html
historial.html
principal.html


CAMBIAR EN ANDROID SOLO
REGISTRO
THEME
ION CONTEN
