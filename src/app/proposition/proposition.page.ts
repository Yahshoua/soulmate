import { NavController } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActivatedRoute } from '@angular/router';
declare var $, moment
@Component({
  selector: 'app-proposition',
  templateUrl: './proposition.page.html',
  styleUrls: ['./proposition.page.scss'],
})
export class PropositionPage implements OnInit {
  @ViewChild('loopSlider', {static: true}) loopSlider;
  curentSlide = 0
  personnes= []
  slideOpts = {
    initialSlide: this.curentSlide,
  };
  monStyle(i) {
    let style=  {
        'background-image': 'url('+i.photo+')', 
      'height': $('app-proposition').height() + 'px', 
      'background-size': 'cover',
      'width': '100%'
     }
     // console.log('taille ', $('app-proposition').height())
     return style
  }
    
  constructor(private service: monservice, private geolocation: Geolocation, private navCtrl: NavController, public router:ActivatedRoute) { }

  ngOnInit() {
    moment.locale('fr')
    this.personnes = this.service.personnes
    console.log('photo ', this.personnes)
    console.log('snap ', this.router.snapshot.queryParams.slide)
    if(this.router.snapshot.queryParams.slide !== undefined) {
      this.slideOpts.initialSlide = this.router.snapshot.queryParams.slide
    }
    this. getMyPosi()
}
  getAge(date) {
    var age = moment(date).format('Y')
     return moment().format('Y') - age
  }
  getMyPosi() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.service.myLat = resp.coords.latitude,
      this.service.myLong = resp.coords.longitude
  })
     
  }
  getDistance(lat, long) {
    return this.service.getKms(lat, long)
  }
  seemore(index) {
    this.loopSlider.getActiveIndex().then(index=> {
      console.log('index ', index)
      this.curentSlide = index
    this.navCtrl.navigateRoot('voirplus', {queryParams: {id: index, slide: index}})
    })
    
  }
}