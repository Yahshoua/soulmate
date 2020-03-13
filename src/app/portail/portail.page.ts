import { ModalFilterPage } from './../modal-filter/modal-filter.page';
import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ModalController, LoadingController } from '@ionic/angular';
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
  constructor(private menu: MenuController, private service: monservice, private router: Router, private navCtl: NavController, private modalController: ModalController, public loadingController: LoadingController) { }

   ngOnInit() {
    this.presentLoading()
    this.image = this.service.photo
    this.service.allperSub.subscribe((e: any)=> {
      this.all = e
    }) 
    
   
  }
 
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Chargement des profil...'
    });
    this.service.getAllUser().then(async (e)=> {
      this.loading.dismiss()
      this.service.subsciberAllperso()
      this.utilisateur = this.all.find(i=> {
        return i.id == this.service.utilisateur.id
      })
    })
    await this.loading.present();

    // this.role =  loading.onDidDismiss();
    console.log('Loading dismissed!');
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
      openmenu() {
    this.menu.enable(true, 'first');
      this.menu.open('first');
  }
  goBack() {
    this.navCtl.navigateRoot('/portail/users/profil/route/accueil')
  }
}
