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
    this.personne = this.service.matching
    console.log('tableau matching ', this.personne)
    if(this.personne.length >=1) {
          this.navCtrl.navigateBack('users/match/route/matching')
        }
      console.log('personnes ', this.personne)
      this.service.userSubscription() 
  }
  getSize(i) {
    console.log('modulo ', i%2)
    if(i%2 == 0) {
      return 6
    } else {
      return 12
    }
  }
}
