import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Header } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { Encuentranos } from '../pages/page_menu/encuentranos/encuentranos';
import { MiCuenta } from '../pages/page_menu/mi_cuenta/mi_cuenta';
import { ContactosPage } from '../pages/contactanos/contactanos';

import { RegistroPage } from '../pages/registro/registro';
import { PrincipalPage } from '../pages/principal/principal';
import { UserService } from './services/user.services';
import { MessageService } from './services/message.services';
import { PayPal } from './services/paypal.service';

import {ViajellenoService} from './services/viajelleno.service';
import { UbicacionInicioPage } from '../pages/ubicacion-inicio/ubicacion-inicio';
import { UbicacionFinalPage } from '../pages/ubicacion-final/ubicacion-final';
import { UserAsientos } from '../pages/user_asientos/user_asientos';
import { ConfirmacionPage } from '../pages/confirmacion/confirmacion';
import { ConfirmacionEncPage } from '../pages/confirmacionEnc/confirmacionEnc';
import { HistorialPage } from '../pages/historial/historial';
import { SolicitudesPage } from '../pages/solicitudes/solicitudes';
import { NotificacionesService } from './services/notificaciones.services';
import { ContrasenaPage } from '../pages/contrasena/contrasena';

import { CardsolicitudPage } from '../pages/cardsolicitud/cardsolicitud';
import { CardsolicitudEncPage } from '../pages/cardsolicitudEnc/cardsolicitudEnc';
import {TerminosPage} from '../pages/terminos/terminos';

import { PagoOnlinePage } from '../pages/pagoOnline/pagoOnline';

//plugin de la geolicalizacion
import { Geolocation } from '@ionic-native/geolocation';
//mapa de google
import { AgmCoreModule } from '@agm/core';

// call number
import { CallNumber } from '@ionic-native/call-number';
// e-mail
import { EmailComposer } from '@ionic-native/email-composer';

//validacion de campos
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

//Datapicker
import { MyDatePickerModule } from 'mydatepicker';
import { HttpClientModule } from '@angular/common/http';
// abrir browser
import { InAppBrowser } from '@ionic-native/in-app-browser';
//import { Socket } from 'ngx-socket-io';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

 const config: SocketIoConfig = { url: 'http://www.appmontecarlotransvip.com:8988', options: {} };
//const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistroPage,
    PrincipalPage,
    Encuentranos,
    MiCuenta,
    ContactosPage,
    UbicacionInicioPage,
    UbicacionFinalPage,
    UserAsientos,
    ConfirmacionPage,
    ConfirmacionEncPage,
    ContrasenaPage,
    CardsolicitudPage,
    CardsolicitudEncPage,
    HistorialPage,
    SolicitudesPage,
    TerminosPage,
    PagoOnlinePage
  ],
  imports: [
    SocketIoModule.forRoot(config),
    BrowserModule,
  
    MyDatePickerModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpvyrZXYTUxsVOnNQQS9zNCxN9Ti9azP0',
      libraries: ["places"]
    }),
    FormsModule,
    CustomFormsModule,
 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistroPage,
    PrincipalPage,
    Encuentranos,
    MiCuenta,
    ContactosPage,
    UbicacionInicioPage,
    UbicacionFinalPage,
    UserAsientos,
    ConfirmacionPage,
    ConfirmacionEncPage,
    CardsolicitudPage,
    CardsolicitudEncPage,
    HistorialPage,
    SolicitudesPage,
    TerminosPage,
    ContrasenaPage,
    PagoOnlinePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    MessageService,
    NotificacionesService,
    ViajellenoService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Geolocation,
    CallNumber,
    EmailComposer,
    PayPal,
    InAppBrowser
   
  ]
})
export class AppModule { }
