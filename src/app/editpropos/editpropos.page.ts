import { monservice } from './../services/monserice';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
declare var $
@Component({
  selector: 'app-editpropos',
  templateUrl: './editpropos.page.html',
  styleUrls: ['./editpropos.page.scss'],
})
export class EditproposPage implements OnInit {
  personne
  constructor(private navCtrl: NavController, private service: monservice) { }

  ngOnInit() {
    
  }
  ngAfterContentInit() {
    $('ion-textarea').css("height", $('ion-content').height() - $('.col-text').height() + 'px')
    this.personne = this.service.Allpersonnes.find(e=> {
      return e.id == this.service.utilisateur.id
    })
  }
  goBack() {
    this.navCtrl.back()
  }
  apply() {
      this.service.updatePropos(this.personne)
      this.navCtrl.back({animated: true})
  }
}
