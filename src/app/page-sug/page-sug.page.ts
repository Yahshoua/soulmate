import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { monservice } from '../services/monserice';

@Component({
  selector: 'app-page-sug',
  templateUrl: './page-sug.page.html',
  styleUrls: ['./page-sug.page.scss'],
})
export class PageSugPage implements OnInit {
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
    this.service.personneSub.subscribe((e: any)=> {
      this.personne = e.filter((res: any)=> {
          if(this.label == 'receipt') {
            this.message = "Tu n'as pas encore fait des suggetions !"
            return res.il_ma_suggerer.etat == true
        } else {
          this.message = "Tu n'as pas encore reçu de suggetions !"
          return res.jai_suggerer.etat == true
        }
      })
  })
  this.service.personneSubscription()
  console.log('personnes suggestion ', this.personne)
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
  getIcon(pers) {
    if(this.label == 'receipt') {
       var type = pers.il_ma_suggerer.type
       if(type == 2) {
         return "chatbubble-ellipses-outline"
       } else {
        return "images-outline"
       }
    } else {
      var type = pers.jai_suggerer.type
       if(type == 2) {
         return "chatbubble-ellipses-outline"
       } else {
        return "images-outline"
       }
    }
  }
}
