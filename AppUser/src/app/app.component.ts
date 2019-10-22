import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { PrincipalPage } from '../pages/principal/principal';
import { UserService } from './services/user.services';
// import { Encuentranos } from '../pages/page_menu/encuentranos/encuentranos';
 import { MiCuenta } from '../pages/mi_cuenta/mi_cuenta';
import { ContactosPage } from '../pages/contactanos/contactanos';
 import { ContrasenaPage } from '../pages/contrasena/contrasena';
// import { PagoOnlinePage } from '../pages/pagoOnline/pagoOnline';

@Component({
  templateUrl: 'app.html',
  providers: [UserService]
})

export class MyApp {
  //rootPage: any;
  rootPage:any = HomePage;
  @ViewChild('NAV') nav: Nav;
  public pages: Array<{ titulo: string, component: any, icon: string }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private _userService: UserService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    if (_userService.getIdentity()) {
      this.rootPage = PrincipalPage;
    } else {
      this.rootPage = HomePage;
    }
  }

   ngOnInit() {
     this.pages = [
       { titulo: 'Menú Principal', component: PrincipalPage, icon: 'inicio.png' },
       { titulo: 'Mi Cuenta', component: MiCuenta, icon: 'correroRegistro.png' },
       { titulo: 'Contáctenos', component: ContactosPage, icon: 'contactoTC.png' },
       { titulo: 'Cambiar contraseña', component: ContrasenaPage, icon: 'cambiarContrasena.png' }
     ];
 }

  goToPage(page) {
    this.nav.setRoot(page);
  }

  Logout() {
    this._userService.logout();
    this.nav.setRoot(HomePage);
  }
}