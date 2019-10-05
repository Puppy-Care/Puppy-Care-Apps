import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { ChoferService } from './services/chofer.service';
import { PrincipalPage } from '../pages/principal/principal';

//validacion de campos
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { DetallesPage } from '../pages/detalles/detalles';
import { AgmCoreModule } from '@agm/core';
import { DetallesEncomiendaPage } from '../pages/detalles-encomienda/detalles-encomienda';
import { CallNumber } from '@ionic-native/call-number';
// push notifications


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PrincipalPage,
    DetallesPage,
    DetallesEncomiendaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpvyrZXYTUxsVOnNQQS9zNCxN9Ti9azP0'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PrincipalPage,
    DetallesPage,
    DetallesEncomiendaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ChoferService,
    CallNumber,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }