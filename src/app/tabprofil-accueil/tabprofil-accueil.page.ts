import { monservice } from './../services/monserice';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabprofil-accueil',
  templateUrl: './tabprofil-accueil.page.html',
  styleUrls: ['./tabprofil-accueil.page.scss'],
})
export class TabprofilAccueilPage implements OnInit {
  personne
  constructor(private navCtrl: NavController, private service: monservice) { }
  myvalue = 'favorite'
  switch = true
  ngOnInit() {
    
  }
  setSwitch(event) {
    console.log('event ', event)
    if(event.detail.value == 'map') {
      this.switch = false
      this.myvalue = 'map'
    } else {
      this.switch = true
    this.myvalue = 'favorite'
    }
  }
  goFavoris() {
   this.navCtrl.navigateRoot('portail/users/profil/route/favoris')
  }
}
