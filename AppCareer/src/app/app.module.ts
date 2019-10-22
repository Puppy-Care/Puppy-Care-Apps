
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AgmCoreModule } from '@agm/core';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PrincipalPage } from '../pages/principal/principal';
import { DetallesPage } from '../pages/detalles/detalles';
import { ChoferService } from './services/chofer.service';
import { CallNumber } from '@ionic-native/call-number';
import { MessageService } from "../app/services/message.services";
import { EnvioEmail } from '../app/services/correo.service';
@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    PrincipalPage,
    DetallesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyARuGaeV-rD_M_ZP2uZT6d8SzFmywzAbRk'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PrincipalPage,
    DetallesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ChoferService,
    CallNumber,
    MessageService,
    EnvioEmail,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
