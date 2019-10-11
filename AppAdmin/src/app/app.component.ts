import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {

  rootPage: any;


  public token;
  public identity;
  public bander = true;
  constructor(private _userService: UserService) {



  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    console.log("las vaibles del Storage");
    console.log(this.identity + this.token);


  }




}
