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
  goBlacklist() {
    this.navCtrl.navigateRoot('portail/users/profil/route/blacklist')
  }
  goMatch() {
    this.navCtrl.navigateRoot('portail/users/profil/route/matchs')
  }
  goVisite(label, title) {
    this.navCtrl.navigateRoot('portail/users/profil/route/visite', {queryParams: {title: title, label: label}} )
  }
  goLike(label, title) {
    this.navCtrl.navigateRoot('portail/users/profil/route/like', {queryParams: {title: title, label: label}})
  }
  goSug(label, title) {
    this.navCtrl.navigateRoot('portail/users/profil/route/suggetions', {queryParams: {title: title, label: label}})
  }
}
