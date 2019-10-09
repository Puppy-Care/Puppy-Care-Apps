import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserService } from '../services/user.services';
import { MessageService } from '../services/message.services';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MyDatePickerModule } from '../../node_modules/mydatepicker';
import { NotificacionesService } from '../services/notificaciones.services';
import { LoadingModule } from 'ngx-loading';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    MyDatePickerModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    LoadingModule,
    /*AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpvyrZXYTUxsVOnNQQS9zNCxN9Ti9azP0'
    })*/
  ],
  providers: [UserService, MessageService,NotificacionesService],
  bootstrap: [AppComponent],
})
export class AppModule { }
