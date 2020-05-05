import { ModalVersionPage } from './../modal-version/modal-version.page';
import { PopoverPage } from './../popover/popover.page';
import { ModalFilterPage } from './../modal-filter/modal-filter.page';
import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ModalController, LoadingController, AlertController, PopoverController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
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
  titres
  versioncode
  versionNumber
  updated
  lastversion
  constructor(private menu: MenuController, private service: monservice, private router: Router, private navCtl: NavController, private modalController: ModalController, public loadingController: LoadingController, private alertCtrl: AlertController,  private push: Push, private imagePicker: ImagePicker, public popoverController: PopoverController, private platform: Platform, private appVersion: AppVersion) { }

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
    this.appVersion.getVersionCode().then(e=> {
      console.log('version code', e)
      this.versioncode = e
    })
  // version number
  this.appVersion.getVersionNumber().then(e=> {
    console.log('version number ', e)
    this.versionNumber = e
  })
    
      
  }
  async presentPopover() {
    const popover = await this.popoverController.create({
      component: PopoverPage,
    //  event: ev,
      cssClass: 'mypop',
      backdropDismiss: false,
      translucent: true
    });
    return await popover.present();
  }
  async refresh() {
    this.loading = await this.loadingController.create({
      message: 'Chargement des profil...'
    });
    this.loading.present()
    this.service.getAllUser().then(e=> {
      this.loading.dismiss()
      this.randoms()
      // this.getVersion()
     
      
    })
  }
  async presentLoading() {
    var allpers = this.service.Allpersonnes || []
    console.log('allpers ', allpers)
    if(allpers.length >= 1) {
      return
    } 
    this.loading = await this.loadingController.create({
      message: 'Chargement des profil...'
    });
    this.service.getAllUser()
    .then(async (e)=> {
      this.all = this.service.Allpersonnes
      this.user()
      this.getVersion()
      console.log('utilisateur dans portail ', this.service.utilisateur, ' storage ', this.service.getStorageUser().user)
      this.loading.dismiss()
      this.randoms()
      var pop = localStorage.getItem('pop')
      // if(pop == undefined) {
      //   this.presentPopover()
      // }
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
    console.log('this.service.Allpersonnes ', this.service.Allpersonnes)
    if(this.service.Allpersonnes.length >= 1) {
      this.users = this.service.Allpersonnes.find(e=> {
        return e.id == this.service.utilisateur.id
      })
      var r = this.service.Allpersonnes.filter((x, y)=> {
        return y < 11 && x.id !== this.service.utilisateur.id
      })
      this.random = r.sort(() => Math.random() - 0.5)
    }
    this.service.allperSub.subscribe((res: any)=> {
      console.log('reeeee ', res, 'util ', this.service.utilisateur)
      this.users = res.find(e=> {
        return e.id == this.service.utilisateur.id
      })
    })
    this.service.subsciberAllperso()
     console.log('user ', this.users, 'all ', this.all, ' ', this.service.utilisateur)
      this.toto = this.users.nom
    
    // l'app est ouverte
    this.platform.ready().then(e=> {
      console.log('application ouverte')
      this.service.setOnline({id: this.service.utilisateur.id, etat: 1})
    })
    // l'utilsateur est passé à une autre app
    this.platform.pause.subscribe(e=> {
      console.log('application est en pause')
      this.service.setOnline({id: this.service.utilisateur.id, etat: 0})
    })
    // l'utilisateur reouvre l'app
    this.platform.resume.subscribe(e=> {
      console.log('application est reouverte')
      this.service.setOnline({id: this.service.utilisateur.id, etat: 1})
    })
    }
    getVersion() {
      $.ajax({
        method: 'POST',
        url: this.service.server2+'/phpsoulmate/getVersion.php',
        success: e=> {
          var e =  JSON.parse(e)
          console.log('dernière version ', e)
          var codeversion = e.versionCode 
          this.lastversion = e.versionNum
          if(codeversion > this.versioncode) {
             this.updated = false
          } else {
            this.updated = true
          }
          var i = sessionStorage.getItem('version')
          if(i !== null) {
              var j= JSON.parse(i)
              console.log('ji ', j , ' i ', j)
              // Ajouter && codeversion > this.versioncode
              if(this.updated == false) {
                //this.modalversion()
              }
              return
          }
        //  this.modalversion()
        }
      })
    }
  randoms() {
    var r = this.all.filter((x, y)=> {
      return y < 11 && x.id !== this.service.utilisateur.id
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
  async modalversion() {
    const modal = await this.modalController.create({
      component: ModalVersionPage,
      cssClass: 'modalversion',
      backdropDismiss: false,
      componentProps: {versioncode: this.versioncode, numversion: this.versionNumber, updated: this.updated, lastversion: this.lastversion}
    });
    return await modal.present();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalFilterPage
    });
    return await modal.present();
  }
  ionViewWillEnter() {
    this.service.gpsSubscr.subscribe(e=> {
          this.titres = e == true?'Pres de chez moi':'Partout en Afrique'
    })
    this.service.SubscriptionGps()
    console.log('entreeeeer')
    this.service.favoriSub.subscribe(e=> {
      this.favoris = e
    })
    this.service.titreSub.subscribe(t=> {
      this.titre = t
    })
    this.service.favoriSybscriber()
    this.user()
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
