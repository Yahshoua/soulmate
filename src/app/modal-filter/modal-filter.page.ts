import { monservice } from './../services/monserice';
import { NavController, ModalController, Platform, AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-modal-filter',
  templateUrl: './modal-filter.page.html',
  styleUrls: ['./modal-filter.page.scss'],
})
export class ModalFilterPage implements OnInit {
  age = {
    lower: this.service.ageMin,
    upper: this.service.ageMax
  }
  distances = this.service.kilometreVoulu
  gps = this.service.gps
  avertissement
  ObjFilter = {}
  constructor(private navCtrl: NavController, private modalController: ModalController, private platform: Platform,private service: monservice, public alertController: AlertController,public toastController: ToastController) { }

  ngOnInit() {
    this.platform.backButton.subscribe(() => {
      this.modalController.dismiss({
        component: ModalFilterPage
      })
    });
  }

  back() {
    this.modalController.dismiss({
      component: ModalFilterPage
    })
  }
  ages() {
    var ageMin =  this.age.lower
    var ageMax =  this.age.upper
  }

  localization() {
    console.log('GPS ', this.gps, 'avertissement ', this.avertissement)
    if(this.avertissement == undefined && this.gps == false) {
      this.alertCtrl()
    }
  }
   filter() {
    console.log('age ', this.age, 'distance ', this.distances, ' gps ', this.gps)
    if(this.age !== undefined) {
        this.service.ageMin = this.age.lower
        this.service.ageMax = this.age.upper
        console.log(' Max ', this.age.upper, ' Min ', this.age.lower)
        this.service.getAllUser().then(e=> {
          console.log('nouvelles personnes ', e)
        })
        this.presentToast()
    }
    if(this.distances !== undefined) {
      this.service.kilometreVoulu = this.distances
      this.service.getAllUser().then(e=> {
        console.log('nouvelles personnes ', e)
      })
      this.presentToast()
    }
    if(this.gps !== undefined) {
        this.service.gps = this.gps
        this.service.getAllUser().then(e=> {
          console.log('nouvelles personnes ', e)
        })
        this.presentToast()
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: "Tes filtres ont été appliqués",
      duration: 5000,
      cssClass: 'myToast2',
      color: 'success'
    });
    toast.present();
  }
  async alertCtrl() {
    const alert = await this.alertController.create({
      header: 'Avertissement',
      message: 'En desactivant le Gps, l\'application ne pourra plus reperer des personnes à proximité de vous. Continuez ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Continuer',
          handler: () => {
            this.avertissement = true
          }
        }
      ]
    });
        await alert.present();
  }
}
