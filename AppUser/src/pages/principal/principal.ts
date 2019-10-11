import { Component } from "@angular/core";
import { NavController, AlertController, MenuController } from "ionic-angular";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: "page-principal",
  templateUrl: "principal.html"
})

export class PrincipalPage {
 //Primera Pagina de solicitar Patita
  public VarPatita = true;
  public menuprincipal = true;

  //Activar Pedido
  activaV() {
    this.VarPatita = false;
  }


}
