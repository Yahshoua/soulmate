import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { monservice } from '../services/monserice';
declare var $, moment
@Component({
  selector: 'app-voirdiapo',
  templateUrl: './voirdiapo.page.html',
  styleUrls: ['./voirdiapo.page.scss'],
})
export class VoirdiapoPage implements OnInit {

  personne
  slide
  pages = false
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  @ViewChild('loopSlider', {static: true}) loopSlider;
  constructor(public router:ActivatedRoute, private service: monservice, private navCtrl: NavController, private routes: Router) { }
  monstyle2(al) {
    let style=  {
      'background-image': 'url('+al.image+')', 
      'height': $('app-voirdiapo').height() + 'px', 
      'background-size': 'cover',
      'width': '100%'
     }
     // console.log('taille ', $('app-proposition').height())
     return style
  }
  ngOnInit() {
    console.log(this.router.snapshot.queryParams)
    var index = this.router.snapshot.queryParams.index
    this.slide = this.router.snapshot.queryParams.slide2
    this.slideOpts.initialSlide = this.slide
    this.personne = this.service.personnes.find(res=> {
      return res.index == index
    })
    // this.personne.album.push({image: this.personne.photo})
    this.loopSlider.lockSwipes(true)
    if(this.personne.album.length > 1 ) {
      this.pages = true
      this.loopSlider.lockSwipes(false)
    }
  }

  goBack() {
      this.navCtrl.back()
  }
}
