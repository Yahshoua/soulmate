import { NavController, ModalController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActivatedRoute, Router } from '@angular/router';
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
  loading
  slideOpts = {
    initialSlide: this.curentSlide,
    speed: 300
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
    
  constructor(private service: monservice, private geolocation: Geolocation, private navCtrl: NavController, public router:ActivatedRoute, private modalController: ModalController, public loadingController: LoadingController, private alertCtrl: AlertController, private platform: Platform, private route: Router) { }
  
  ngOnInit() {
    moment.locale('fr')
    $.ajax({
      method: 'POST',
      url: this.service.url2,
      data: {email: this.service.utilisateur.email},
      dataType: 'Json',
      success: e=> {
        console.log('resultat ', e)
      }
    })
    this.GPS = this.service.gps
     this.service.userSubscriber.subscribe((res: any)=> {
       
        this.personnes = res.sort(() => Math.random() - 0.5)
        console.log('ooook', this.personnes)
        if(this.personnes.length <= 0) {
           var km = this.service.kilometreVoulu
            this.texte = `Nous n'avons pas trouvé de personne à moins de ${km} Km de vous`
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
    console.log('route url ', this.router.url)
    this.platform.backButton.subscribe(() => {
      var route  = this.route.url
      if(route == '/portail/users/proposition') {
        this.closeapp()
      }
    });
}
async closeapp() {
  const alert = await this.alertCtrl.create({
    header: 'Quitter soulmate ?',
    message: 'Voulez-vous fermer l\'application ?',
    backdropDismiss: false,
    buttons: [
      {
        text: 'Non',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Fermer',
        handler: () => {
          navigator["app"].exitApp();
          this.service.setOnline({id: this.service.utilisateur.id, etat: 0})
        }
      }
    ]
  });
      await alert.present();
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
 async  localization() {
    this.service.gps = this.GPS
    this.loading = await this.loadingController.create({
      message: 'Recherche des personnes en cours...'
    });
    this.loading.present()
    console.log('GPS', this.GPS, 'GPS servce ', this.service.gps)
        this.service.getAllUser().then(e=> {
          console.log('nouvelles personnes ', e)
          this.service.userSubscription()
          this.loading.dismiss()
        })
  }
  getalluser() {
    var allpers = this.service.Allpersonnes || []
    if(allpers.length >= 1) {
      return
    }
    this.service.getAllUser().then(e=> {
      console.log('tous les users ', e)
      this.Allperson = e
    })
  }
  getNbrePict(alb) {
      return alb.length 
  }
  getAge(date) {
    if(date == null) return
    var age = moment(date).format('Y')
     return moment().format('Y') - age + ' ans'
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