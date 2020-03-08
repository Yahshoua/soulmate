import { NavController } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matchclose',
  templateUrl: './matchclose.page.html',
  styleUrls: ['./matchclose.page.scss'],
})
export class MatchclosePage implements OnInit {
  personne
  constructor(private service: monservice, private navCtrl: NavController) { }

  ngOnInit() {
    this.service.matchingSubscriber.subscribe((e: any)=> {
      this.personne = e
      var user = e.filter(i=> {
          return e.reponse == 0
      })
      console.log('uuuuuser ', user)
      if(user >=1) {
        this.navCtrl.navigateRoot('users/match/route/matching')
      }
    
    })
    this.service.matchingsubscription()
    console.log('tableau matching ', this.personne)
  }
  getSize(i) {
    console.log('modulo ', i%2)
    if(i%2 == 0) {
      return 6
    } else {
      return 12
    }
  }
  route(id) {
    this.navCtrl.navigateForward('/voirplus/route/main', {queryParams: {id: id, route: 'portail/users/match'}})
    console.log('myyyyyy  route ',  this.service.myroutes)
  }
}
