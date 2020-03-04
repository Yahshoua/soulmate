import { NavController } from '@ionic/angular';
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
  myroute = 'portail'
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  @ViewChild('loopSlider', {static: true}) loopSlider;
  constructor(public router:ActivatedRoute, private service: monservice, private navCtrl: NavController, public toastController: ToastController) { }

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
    this.presentToast('XXX Ajouté à tes favoris')
  }
  flash() {
    this.presentToast('Ton coup de coeur a été envoyé')
  }
}
