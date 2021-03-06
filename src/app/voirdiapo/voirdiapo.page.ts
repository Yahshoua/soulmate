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
      'background-image': 'url('+al.photo+')', 
      'height': $('app-voirdiapo').height() + 'px', 
      'background-size': 'cover',
      'background-position': 'center',
      'width': '100%'
     }
     // console.log('taille ', $('app-proposition').height())
     return style
  }
  ngOnInit() {
    console.log(this.router.snapshot.queryParams)
    var id = this.router.snapshot.queryParams.id
    this.slide = this.router.snapshot.queryParams.slide2
    this.slideOpts.initialSlide = this.slide
    this.personne = this.service.Allpersonnes.find(res=> {
      return res.id == id
    })
    var i = this.personne.album.find(e=> {
      return e.photo == this.personne.images
    })
    console.log('iiii ', i)
        if(i == undefined) {
        var k =  this.personne.album.push({id: this.personne.album.length+1,photo: this.personne.images})
          this.personne.album = this.personne.album.sort((a, b)=> {
            if (a.id < b.id ) {
            return 1;
          }
          if (a.id > b.id ) {
            return -1;
          }
          return 0;
      })
    }
    this.service.subsciberAllperso()
    console.log('personne ', this.personne)
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
