import { NavController } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var $, moment

@Component({
  selector: 'app-voirpersonne',
  templateUrl: './voirpersonne.page.html',
  styleUrls: ['./voirpersonne.page.scss'],
})
export class VoirpersonnePage implements OnInit {
  @Input() user
  personne: any
  slide
  pages = false
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  @ViewChild('loopSlider', {static: true}) loopSlider;
  constructor(public router:ActivatedRoute, private service: monservice, private navCtrl: NavController, private route: Router) { }
  monstyle(al) {
    let style=  {
        'background-image': 'url('+al.photo+')', 
      'height': $('app-voirplus').height()/2 + 'px', 
      'background-size': 'cover',
      'width': '100%'
     }
     // console.log('taille ', $('app-proposition').height())
     return style
  }
  ngOnInit() {
    console.log('useeer ', this.personne)
    console.log(this.router.snapshot.queryParams)
    var index = this.router.snapshot.queryParams.id
    this.slide = this.router.snapshot.queryParams.slide
    this.personne = this.service.personnes.find(res=> {
      return res.index == index
    })
    console.log('album ', this.personne.album)
    var i = this.personne.album.find(e=> {
      return e.image == this.personne.photo
    })
    console.log('iiii ', i)
    if(i == undefined) {
     var k =  this.personne.album.push({id: this.personne.album.length+1,image: this.personne.photo})
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
    console.log('personne ', this.personne, 'taille album ', this.personne.album.length)
    
    this.loopSlider.lockSwipes(true)
    if(this.personne.album.length > 1 ) {
      this.pages = true
      this.loopSlider.lockSwipes(false)
    }
  }
  tap() {
    this.service.setMyroute(true)
    this.loopSlider.getActiveIndex().then(index=> {
      this.route.navigate(['voirplus/route/diapo'], {queryParamsHandling: "merge", queryParams: {slide2: index, index: this.personne.index}})
    })
  }
}
