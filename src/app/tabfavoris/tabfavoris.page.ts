import { NavController } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabfavoris',
  templateUrl: './tabfavoris.page.html',
  styleUrls: ['./tabfavoris.page.scss'],
})
export class TabfavorisPage implements OnInit {
  personnes
  constructor(private service: monservice, private router: Router, private navCtr: NavController) { }

  ngOnInit() {
     this.service.allperSub.subscribe((e:any)=> {
      this.personnes = e.filter(i=> {
            return i.favoris == true
          })
    })
    this.service.subsciberAllperso()
    console.log('mes favoris ', this.personnes)
  }
  ionViewWillEnter(){
    this.service.getAllUser()
    this.service.setSubscriptionFavoris(true)
  }
  ionViewWillLeave(){
   this.service.setSubscriptionFavoris(false)
  }
  route(id) {
    this.navCtr.navigateForward('/voirplus/route/main', {queryParams: {id: id, route: 'portail/users/profil/route/favoris'}})
    console.log('myyyyyy  route ',  this.service.myroutes)
  }
}
