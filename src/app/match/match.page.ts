import { NavController } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

declare var $
@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {
  personne
  constructor(private service: monservice, private navCtrl: NavController) {}
  ngOnInit() {
    
  }
  ionViewWillEnter(){
    console.log('match..')
    this.service.getAllUser()
    this.service.setSubscriptionFavoris(false)
  }
}
