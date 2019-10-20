import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserService } from '../services/user.services';
import { MessageService } from '../services/message.services';
import { ExcelService } from '../services/excel.service';
import { EnvioEmail } from '../services/correo.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DetalleSolicitudViajeComponent } from './pages/detalle-solicitud-viaje/detalle-solicitud-viaje.component';
import { ViajesRealizadosComponent } from './pages/viajes-realizados/viajes-realizados.component';
import { DetallesViajesRealizadosComponent } from './pages/detalles-viajes-realizados/detalles-viajes-realizados.component';
import { ReporteClientesComponent } from './pages/reporte-clientes/reporte-clientes.component';
import { MyDatePickerModule } from '../../node_modules/mydatepicker';
import { NotificacionesService } from '../services/notificaciones.services';
import { LoadingModule } from 'ngx-loading';
import { AgmCoreModule } from '@agm/core';
import { CuentasService } from '../services/cuentas.services';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DetalleSolicitudViajeComponent,
    ViajesRealizadosComponent,
    DetallesViajesRealizadosComponent,
    ReporteClientesComponent
  ],
  imports: [
    MyDatePickerModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    LoadingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyARuGaeV-rD_M_ZP2uZT6d8SzFmywzAbRk'
    })
  ],
  providers: [UserService, MessageService,NotificacionesService,EnvioEmail,ExcelService,CuentasService],
  bootstrap: [AppComponent],
})
export class AppModule { }
