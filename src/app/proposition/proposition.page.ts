import { NavController, ModalController } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActivatedRoute } from '@angular/router';
import { ModalFilterPage } from '../modal-filter/modal-filter.page';
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
  Allperson
  GPS
  texte = "Recherche des personnes à proximité ..."
  slideOpts = {
    initialSlide: this.curentSlide,
  };
  monStyle(i) {
    let style=  {
        'background-image': 'url('+i.images+')', 
      'height': $('app-proposition').height() + 'px', 
      'background-size': 'cover',
      'background-position': 'center',
      'width': '100%'
     }
     // console.log('taille ', $('app-proposition').height())
     return style
  }
    
  constructor(private service: monservice, private geolocation: Geolocation, private navCtrl: NavController, public router:ActivatedRoute, private modalController: ModalController) { }
  
  ngOnInit() {
    moment.locale('fr')
    this.GPS = this.service.gps
     this.service.userSubscriber.subscribe((res: any)=> {
        this.personnes = res.sort(() => Math.random() - 0.5)
        console.log('ooook', this.personnes)
        if(this.personnes.length <= 0) {
           var km = this.service.kilometreVoulu
            this.texte = `Nous n'avons trouvé de personne d\'au moins ${km} Km de vous`
        }
    })
    this.service.getGenres()
    this.service.getMyPosition().then(e=> {
      console.log('my position ', e)
    })
     // 
    console.log('les personnes ', this.personnes)
    console.log('snap ', this.router.snapshot.queryParams.slide)
    if(this.router.snapshot.queryParams.slide !== undefined) {
      this.slideOpts.initialSlide = this.router.snapshot.queryParams.slide
    }
    this. getMyPosi()
    this.getalluser()
}
async presentModal() {
  const modal = await this.modalController.create({
    component: ModalFilterPage
  });
  return await modal.present();
}
ionViewWillEnter(){
  this.service.setSubscriptionFavoris(false, "")
  this.service.userSubscription()
}
ionViewWillLeave(){
  this.getalluser()
}
  localization() {
    this.service.gps = this.GPS
    console.log('GPS', this.GPS, 'GPS servce ', this.service.gps)
        this.service.getAllUser().then(e=> {
          console.log('nouvelles personnes ', e)
          this.service.userSubscription()
        })
  }
  getalluser() {
    this.service.getAllUser().then(e=> {
      console.log('tous les users ', e)
      this.Allperson = e
    })
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
  getDistance(kms) {
    var KM = Math.floor(kms)
    if(KM <=1) {
      return "< 1"
    }
    return KM
  }
  seemore(id) {
    this.loopSlider.getActiveIndex().then(index=> {
      console.log('index ', index)
      this.curentSlide = index
    this.navCtrl.navigateForward('voirplus', {queryParams: {id: id, slide:  this.curentSlide, route: 'portail/users/proposition'}})
    })
    
  }
}