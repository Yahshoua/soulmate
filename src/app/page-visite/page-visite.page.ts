import { monservice } from './../services/monserice';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-page-visite',
  templateUrl: './page-visite.page.html',
  styleUrls: ['./page-visite.page.scss'],
})
export class PageVisitePage implements OnInit {
  label
  title
  personne
  visiteType
  message
  constructor(private routes: ActivatedRoute, private navCtrl: NavController, private service: monservice) { }

  ngOnInit() {
    this.label = this.routes.snapshot.queryParams.label
    this.title = this.routes.snapshot.queryParams.title
    console.log('title ', this.title, ' label ', this.label)
    this.service.allperSub.subscribe((e: any)=> {
      this.personne = e.filter((res: any)=> {
          if(this.label == 'receipt') {
            this.message = "Tu n'as pas encore reçu de visite !"
            return res.ma_visite == true
        } else {
          this.message = "Tu n'as pas encore fait de visite !"
          return res.jai_visite == true
        }
      })
  })
  this.service.subsciberAllperso()
  }
  ionViewWillEnter(){
    this.service.getAllUser()
    this.service.setSubscriptionFavoris(true, this.title)
  }
  ionViewWillLeave(){
   this.service.setSubscriptionFavoris(false, this.title)
  }
  route(id) {
    this.navCtrl.navigateForward('/voirplus/route/main', {queryParams: {id: id, route: 'portail/users/profil/route/visite'}})
  }
}
