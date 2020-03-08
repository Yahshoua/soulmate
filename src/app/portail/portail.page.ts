import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-portail',
  templateUrl: './portail.page.html',
  styleUrls: ['./portail.page.scss'],
})
export class PortailPage implements OnInit {
  image
  favoris
  constructor(private menu: MenuController, private service: monservice, private router: Router, private navCtl: NavController) { }

  ngOnInit() {
    this.image = this.service.photo 
    this.service.favoriSub.subscribe(e=> {
      this.favoris = e
    })
    this.service.favoriSybscriber()
  }
  ionViewDidEnter(){
    console.log('this.router.url', this.router.url);
  }
      openmenu() {
    this.menu.enable(true, 'first');
      this.menu.open('first');
  }
  goBack() {
    this.navCtl.navigateRoot('/portail/users/profil/route/accueil')
  }
}
