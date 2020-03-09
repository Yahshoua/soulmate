import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabprofil',
  templateUrl: './tabprofil.page.html',
  styleUrls: ['./tabprofil.page.scss'],
})
export class TabprofilPage implements OnInit {
  myvalue = 'favorite'
  switch = true
  constructor(private router: Router, private service: monservice) { }

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
 
  ionViewWillEnter(){
    console.log('this.router.url', this.router.url);
    var route = this.router.url
    if(route == "/portail/users/profil/route") {
        this.service.setSubscriptionFavoris(true, "Mes favoris")
    }
  }
}
