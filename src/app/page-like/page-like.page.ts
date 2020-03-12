import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { monservice } from '../services/monserice';

@Component({
  selector: 'app-page-like',
  templateUrl: './page-like.page.html',
  styleUrls: ['./page-like.page.scss'],
})
export class PageLikePage implements OnInit {
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
            this.message = "Tu n'as pas encore reçu de likes !"
            return res.il_ma_flasher == true
        } else {
          this.message = "Tu n'as pas encore fait de like !"
          return res.jai_flasher == true
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
    this.navCtrl.navigateForward('/voirplus/route/main', {queryParams: {id: id, route: 'portail/users/profil/route/like'}})
  }
}
