import { NavController } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var $, moment
@Component({
  selector: 'app-voirplus',
  templateUrl: './voirplus.page.html',
  styleUrls: ['./voirplus.page.scss'],
})
export class VoirplusPage implements OnInit {
  personne
  slide
  pages = false
  myroute = 'portail'
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  @ViewChild('loopSlider', {static: true}) loopSlider;
  constructor(public router:ActivatedRoute, private service: monservice, private navCtrl: NavController) { }

  ngOnInit() {
    console.log(this.router.snapshot.queryParams)
    var index = this.router.snapshot.queryParams.id
    this.slide = this.router.snapshot.queryParams.slide
    this.personne = this.service.personnes.find(res=> {
      return res.index == index
    })
  }
  goBack() {
    var e = this.service.myroute
    if(e == true) {
      this.navCtrl.navigateRoot(['voirplus/route/main'], {queryParams: {slide: this.slide, id: this.router.snapshot.queryParams.id}})
      
      this.service.setMyroute(false)
    } else {
      this.navCtrl.navigateBack(this.myroute, {relativeTo: this.router, queryParams: {slide: this.slide}})
    }
      
  }
}
