import { monservice } from './../services/monserice';
import { NavController, ModalController, Platform, AlertController, ToastController, LoadingController } from '@ionic/angular';
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
  online = this.service.online
  avertissement
  ObjFilter = {}
  loading
  constructor(private navCtrl: NavController, private modalController: ModalController, private platform: Platform,private service: monservice, public alertController: AlertController,public toastController: ToastController, public loadingController: LoadingController) { }

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
  async checkGps() {
    console.log('gpd ', this.gps)
    if(this.gps == false) {
        const alert = await this.alertController.create({
          header: 'Gps desactivé',
          message: 'Vous avez desactivé le Gps. Reactivez-Le pour filtrer la distance',
          backdropDismiss: false,
          buttons: [
            {
              text: 'Retour',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
              }
            }, {
              text: 'Activer le Gps',
              handler: () => {
                this.gps = true
              }
            }
          ]
        });
            await alert.present();
    }
  }
   async filter() {
    this.loading = await this.loadingController.create({
      message: 'Mise à jour de vos critères...'
    });
    console.log('age ', this.age, 'distance ', this.distances, ' gps ', this.gps)
    if(this.age !== undefined) {
      this.loading.present()
        this.service.ageMin = this.age.lower
        this.service.ageMax = this.age.upper
        console.log(' Max ', this.age.upper, ' Min ', this.age.lower)
        this.service.getAllUser().then(e=> {
          console.log('nouvelles personnes ', e)
          this.loading.dismiss()
          this.presentToast()
        })
    }
    if(this.distances !== undefined) {
      this.loading.present()
      this.service.kilometreVoulu = this.distances
      this.service.getAllUser().then(e=> {
        this.loading.dismiss()
        console.log('nouvelles personnes ', e)
        this.presentToast()
      })
    }
    if(this.gps !== undefined) {
      this.loading.present()
       // this.service.gps = this.gps
        this.service.setGps(this.gps)
        this.service.getAllUser().then(e=> {
          this.loading.dismiss()
          console.log('nouvelles personnes ', e)
          this.presentToast()
        })
    }
    if(this.online !== undefined) {
      this.loading.present()
      this.service.setEnligne(this.online)
      this.service.getAllUser().then(e=> {
        this.loading.dismiss()
        console.log('nouvelles personnes ', e)
        this.presentToast()
      })
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
