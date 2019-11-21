import { Component, OnInit, DoCheck } from "@angular/core";
import { NavController, LoadingController, AlertController, MenuController, Loading  } from "ionic-angular";
import { UserService } from "../../app/services/user.services";
import { HomePage } from '../home/home';

@Component({
  selector: "page-home1",
  templateUrl: "home1.html",
  providers: [UserService]
})

export class Home1Page implements OnInit , DoCheck{

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController
  ) {
  
  }
 
  ngDoCheck(){
 
    }
  
  ngOnInit() {
    setTimeout(() => {
      this.navCtrl.push(HomePage);
   }, 3000);
    
  }



  
 
}