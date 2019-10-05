import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ChoferService } from './services/chofer.service';

import { HomePage } from '../pages/home/home';
import { PrincipalPage } from '../pages/principal/principal';



@Component({
  templateUrl: 'app.html'
})

export class MyApp implements OnInit {
  @ViewChild('NAV') nav: Nav;
  rootPage: any = HomePage;

  public pages: Array<{ titulo: string, component: any, icon: string }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private _choferService: ChoferService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    if (_choferService.getIdentity()) {
      this.rootPage = PrincipalPage;
    } else {
      this.rootPage = HomePage;
    }
  }

  ngOnInit() {
    this.pages = [
      { titulo: 'Menú Principal', component: PrincipalPage, icon: 'inicio.png' }
      //{ titulo: 'Mi Cuenta', component: MiCuenta, icon: 'contactoCorreo.png' },
      //{ titulo: 'Encuéntranos', component: Encuentranos, icon: 'encuentranos.png' },
      //{ titulo: 'Contáctenos', component: ContactosPage, icon: 'contactoTC.png' }
    ];
  }

  goToPage(page) {
    this.nav.setRoot(page);
  }

  Logout() {
    this._choferService.logout();
    this.nav.setRoot(HomePage);
  }
}

