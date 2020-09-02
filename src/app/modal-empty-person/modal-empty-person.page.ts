import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { ModalFilterPage } from './../modal-filter/modal-filter.page';

@Component({
  selector: 'app-modal-empty-person',
  templateUrl: './modal-empty-person.page.html',
  styleUrls: ['./modal-empty-person.page.scss'],
})
export class ModalEmptyPersonPage implements OnInit {
  loading: HTMLIonLoadingElement;
  GPS2;
  kilometre
  constructor(public loadingController: LoadingController, public service: monservice, public modalController: ModalController, public navparam: NavParams) { }

  ngOnInit() {
    this.service.gpsSubscr.subscribe(e=> {
      console.log('GPS ', e)
      this.GPS2 = e
    })
    this.service.SubscriptionGps()
    
  }
  ionViewWillEnter(){
    console.log('kilometre ', this.navparam.get('kilometre'))
    this.kilometre =  this.navparam.get('kilometre')
  }
  async  localization() {
    this.service.setGps(this.GPS2)
    this.loading = await this.loadingController.create({
      message: 'Recherche des personnes en cours...'
    });
    this.loading.present()
    console.log('GPS', this.GPS2, 'GPS servce ', this.service.gps)
        this.service.getAllUser().then(e=> {
          console.log('nouvelles personnes ', e)
          this.service.userSubscription()
          this.loading.dismiss()
          if(this.service.personnes.length >= 1) {
            this.modaldismis()
          }
        })
  }
  async modaldismis() {
    this.modalController.dismiss({
      component: ModalEmptyPersonPage
    })
  }
  async goFilter() {
    this.modalController.dismiss({
      component: ModalEmptyPersonPage
    })
    const modal = await this.modalController.create({
      component: ModalFilterPage
    })
    return await modal.present()
  }
}
