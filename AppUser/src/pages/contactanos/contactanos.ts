import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../app/services/user.services';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';

@Component({
  selector: 'page-contacto',
  templateUrl: 'contactanos.html',
  providers: [UserService]

})

export class ContactosPage {
  public identity;
  constructor(private _userService: UserService, private callNumber: CallNumber,private emailComposer: EmailComposer ) {
    this.identity = this._userService.getIdentity();
    
  }

  /*itemSelected(item: string) {
     console.log("Selected Item", item);*/

  llama() {
    this.callNumber.callNumber("0984210047", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  enviarEmail() {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        //Now we know we can send
      }
    });
   

    let email = {
      to: 'patitas@gmail.com',
      cc: '',
      subject: 'Solicitud de Viaje DOGI',
      body: 'Necesito solicitar un DOGI a: ',
      isHtml: true
    };
    this.emailComposer.open(email);
  }

}
