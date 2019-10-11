import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar'; 
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { RegistroPage } from '../pages/registro/registro';
import { MiCuenta } from '../pages/mi_cuenta/mi_cuenta';
import { PrincipalPage } from '../pages/principal/principal';
import { UbicacionInicioPage } from '../pages/ubicacion-inicio/ubicacion-inicio';
import { UbicacionFinalPage } from '../pages/ubicacion-final/ubicacion-final';

import { UserService } from './services/user.services';
import { MessageService } from './services/message.services';
import { NotificacionesService } from './services/notificaciones.services';

//plugin de la geolicalizacion
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core';
//validacion de campos
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

//Datapicker
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistroPage,
    MiCuenta,
    PrincipalPage,
    UbicacionInicioPage,
    UbicacionFinalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyARuGaeV-rD_M_ZP2uZT6d8SzFmywzAbRk',
      libraries: ["places"]
    }),
    FormsModule,
    CustomFormsModule,
    MyDatePickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistroPage,
    MiCuenta,
    PrincipalPage, 
    UbicacionInicioPage,
    UbicacionFinalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    MessageService,
    NotificacionesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation
  ]
})
export class AppModule {}
