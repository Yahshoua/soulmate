import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab-macth',
  templateUrl: './tab-macth.page.html',
  styleUrls: ['./tab-macth.page.scss'],
})
export class TabMacthPage implements OnInit {
  personne
  constructor(private service: monservice, public alertController: AlertController, private navCtrl: NavController) { }

  ngOnInit() {
    this.service.allperSub.subscribe((e: any)=> {
        this.personne = e.filter((res: any)=> {
          return res.match == true
        })
    })
    this.service.subsciberAllperso()
  }
  ionViewWillEnter(){
    this.service.getAllUser()
    this.service.setSubscriptionFavoris(true, "Mes matches")
  }
  ionViewWillLeave(){
   this.service.setSubscriptionFavoris(false, "Mes matches")
  }
  route(id) {
    this.navCtrl.navigateForward('/voirplus/route/main', {queryParams: {id: id, route: 'portail/users/profil/route/matchs'}})
  }
}
