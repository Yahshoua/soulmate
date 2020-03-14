import { ModalFilterPage } from './../modal-filter/modal-filter.page';
import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
declare var moment
@Component({
  selector: 'app-portail',
  templateUrl: './portail.page.html',
  styleUrls: ['./portail.page.scss'],
})
export class PortailPage implements OnInit {
  image
  favoris
  titre
  loading
  utilisateur
  all
  random
  constructor(private menu: MenuController, private service: monservice, private router: Router, private navCtl: NavController, private modalController: ModalController, public loadingController: LoadingController, private alertCtrl: AlertController) { }

   ngOnInit() {
    this.service.allperSub.subscribe((e: any)=> {
      this.all = e
    })
    this.service.subsciberAllperso()
    this.presentLoading()
  }
  refresh() {
    this.service.getAllUser()
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Chargement des profil...'
    });
    this.service.getAllUser().then(async (e)=> {
      console.log('utilisateur dans portail ', this.service.utilisateur, ' storage ', this.service.getStorageUser().user)
      this.loading.dismiss()
      this.service.subsciberAllperso()
      this.utilisateur = e.find(i=> {
        return i.id == this.service.utilisateur.id
      })
      
      this.image = this.service.utilisateur.images
      this.randoms()
    }).catch(async (err)=> {
      console.log('erreur ', err)
      if(err.readyState == 0) {
          this.alert("Problème de connexion internet")
      } else {
        this.alert("Une erreur du serveur sans doute")
      }
      this.loading.dismiss()
    })
    await this.loading.present();
    // this.role =  loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  async alert(message) {
    this.loading.dismiss()
    const alert = await this.alertCtrl.create({
      header: 'Erreur',
      subHeader: "Impossible de continuer.",
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  flote(i) {
     if(i%2!==0) {
       return 'right'
     }
     return 'left'
  }
  randoms() {
    var r = this.all.filter((x, y)=> {
      return y < 11
    })
    this.random = r.sort(() => Math.random() - 0.5)
    console.log('random ', this.random)
  }
  getAge(age) {
    return moment().format('Y') - moment(age).format('Y') + ' ans'
  }
  disconnecte() {
    this.menu.close('first');
    this.service.logout()
    setTimeout(e=> {
        this.navCtl.navigateBack('home')
    }, 1500)
    
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalFilterPage
    });
    return await modal.present();
  }
  ionViewWillEnter(){
    this.service.favoriSub.subscribe(e=> {
      this.favoris = e
    })
    this.service.titreSub.subscribe(t=> {
      this.titre = t
    })
    this.service.favoriSybscriber()
  }
  ionViewDidEnter(){
    console.log('this.router.url', this.router.url);
  }
  seemore(id) {
    this.navCtl.navigateForward('/voirplus/route/main', {queryParams: {id: id, route: this.router.url}})
  }
      openmenu() {
    this.menu.enable(true, 'first');
      this.menu.open('first');
  }
  goBack() {
    this.navCtl.navigateRoot('/portail/users/profil/route/accueil')
  }
}
