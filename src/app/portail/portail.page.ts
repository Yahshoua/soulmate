import { ModalFilterPage } from './../modal-filter/modal-filter.page';
import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
declare var moment, $
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
  users
  toto
  senderID: any;
  picker
  constructor(private menu: MenuController, private service: monservice, private router: Router, private navCtl: NavController, private modalController: ModalController, public loadingController: LoadingController, private alertCtrl: AlertController,  private push: Push, private imagePicker: ImagePicker) { }

   ngOnInit() {
    // this.imagePicker.hasReadPermission().then(e=> {
    //   console.log('has read ', e)
    // })
    // /**
    //  * Request permission to read images
    //  * @returns {Promise<any>}
    //  */
    // this.imagePicker.requestReadPermission().then(e=> {
    //   console.log('request ReadPermission ', e)
    // })
    this.service.allperSub.subscribe((e: any)=> {
      console.log('eeeee ', e)
    })
    this.service.subsciberAllperso()
    this.presentLoading()
      //
          // Return a list of currently configured channels
          this.push.listChannels().then((channels) => console.log('List of channels', channels))
          // to initialize push notifications
        // Marche pas :(
        const options: PushOptions = {
          android: {
            senderID:"982951809785",
            icon: 'https://kazimo.ga/Zela/logo-cash.PNG',
            vibrate: true,
            forceShow: true,
            messageKey: 'Hey bonhomme !',
            titleKey: 'Qui t\'a dit que c\'est difficile ? '
          },
          ios: {
              alert: 'true',
              badge: true,
              sound: 'false'
          },
          windows: {},
          browser: {
              pushServiceURL: 'http://push.api.phonegap.com/v1/push'
          }
        }
  
        //fin
      const pushObject: PushObject = this.push.init(options);
      pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
       // Marche, le numero de registration est l'id du phone qui reçoit le push notif
    pushObject.on('registration').subscribe((registration: any) =>{
      console.log('Device registered', registration)
          this.senderID = registration.registrationId
          this.service.setToken(this.senderID)
    });
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
      //
  }
  refresh() {
    this.service.getAllUser()
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Chargement des profil...'
    });
    
    this.service.getAllUser()
    .then(async (e)=> {
      this.all = this.service.Allpersonnes
      this.user()
      console.log('utilisateur dans portail ', this.service.utilisateur, ' storage ', this.service.getStorageUser().user)
      this.loading.dismiss()
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
  user() {
    this.users = this.all.find(e=> {
      return e.id == this.service.utilisateur.id
    })
     console.log('user ', this.users, 'all ', this.all, ' ', this.service.utilisateur)
      this.toto = this.users.nom
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
