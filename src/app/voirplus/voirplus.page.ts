import { NavController, Platform } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
  myroute
  favoris
  mycolor
  timer
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  @ViewChild('loopSlider', {static: true}) loopSlider;
  constructor(public router:ActivatedRoute, private service: monservice, private navCtrl: NavController, public toastController: ToastController, private platform: Platform) { }

  ngOnInit() {
    console.log(this.router.snapshot.queryParams, 'router ', this.router)
    var index = this.router.snapshot.queryParams.id
    this.slide = this.router.snapshot.queryParams.slide
    this.myroute = this.router.snapshot.queryParams.route
    this.personne = this.service.Allpersonnes.find(res=> {
      return res.id == index
    })
    console.log('myyy route ', this.myroute)
    var preloadImg: any = this.personne.album
    let tab = []
    if(preloadImg.length >= 1) {
      for(let i =0;i < preloadImg.length;i++) {
          tab.push(preloadImg[i].photo)
      }
    }
    console.log('tableau de photo à preloader ', tab)
    // $.preload(tab, {
    //   onRequest: e=> {
    //     console.log('preload en cours', e)
    //   },
    //   onFinish: e=> {
    //     console.log('preload terminé ', e)
    //   }
    // })
    // this.platform.backButton.subscribe(() => {
    //   var e = this.personne.album.splice(0, 1)
    // });
    $.ajax({
      method: "POST",
      url: this.service.url21,
      data: {id: this.service.utilisateur.id, id_visite: this.personne.id},
      success: e=> {
        console.log('visite result ', e)
      }
    })
  }
  ngAfterViewInit() {
    this.favoris = this.personne.favoris
    this.mycolor = this.favoris == true?'warning':'medium'
    this.getTime()
  }
  getTime() {
    var time = this.personne.temps
    if(this.personne.temps == null) {
      time = this.personne.dateInscri
    }
    var today= moment().format('YYYYMMDD')
    var dates = moment(time).format('YYYYMMDD')
    // var today  = moment("20200401", "YYYYMMDD");
    // var dates = moment("20200330", "YYYYMMDD");
    var a = moment(today, 'YYYYMMDD');
    var b = moment(dates, 'YYYYMMDD');
    var diff = a.diff(b, 'days')
    console.log('temps personne ',this.personne.temps, 'dates', dates, 'today', today, 'difference ', diff)
    if(diff >= 7) {
      return
    }
    $.ajax({
      method: "POST",
      url: this.service.url20,
      data: {temps: time },
      success: e=> {
        console.log('temps ', e)
        var temps = JSON.parse(e)
        this.timer = 'En ligne '+ temps.temps
      }
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
  ionViewWillLeave() {
    console.log('route url ', this.router.url)
    if(this.myroute== 'portail/users/proposition') {
     // this.personne.album.splice(0, 1)
    }
  }
  Getfavoris() {
  if(this.favoris == false) {
    return 'Ajouter aux favoris'
  } else {
    return 'Enlever aux favoris'
  }
  }
  async presentToast(messages) {
    const toast = await this.toastController.create({
      message: messages,
      duration: 2000,
      position: 'bottom',
      cssClass: 'myToast'
    });
    toast.present();
  }
  addFav() {
    if(this.favoris == true) {
      this.presentToast(this.personne.nom+ " enlever à tes favoris")
      this.favoris = false
      this.mycolor = 'medium'
    } else {
      this.presentToast(this.personne.nom+ " ajouter à tes favoris")
      this.mycolor = 'warning'
      this.favoris = true
    }
    this.service.setFavoris({id: this.service.utilisateur.id, id_favoris: this.personne.id})
    this.service.sendNotification(this.personne.token, "Favoris", this.service.utilisateur.nom+" t'a ajouté à ses favoris")
  }
  flash() {
    this.presentToast('Ton coup de coeur a été envoyé')
    this.service.setFlash({id: this.service.utilisateur.id, id_pers: this.personne.id, chaine: this.personne.chaine_notif})
    this.service.sendNotification(this.personne.token, "Coup de foudre", this.service.utilisateur.nom+" a un coup de foudre pour toi")
  }
}
