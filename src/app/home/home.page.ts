import { NavController } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userData: { email: any; first_name: any; photo: any; nom: any; 'type': string; };
  senderID: any;

  constructor(private service: monservice, private navCtrl: NavController,private fb: Facebook, private push: Push) {}
  ngOnInit() {
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
  });
  pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
  facebook() {
    this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {email: profile['email'], first_name: profile['first_name'], photo: profile['picture_large']['data']['url'], nom: profile['name'], 'type': 'facebook'}
        this.service.facebook = this.userData
        console.log('userData ', this.userData)
        this.service.login({email: this.service.facebook.email}).then(async (e: any)=> {
        
            console.log('resultat de la connexion ', e, 'type of ', typeof e)
            if(e.length <= 0) {
                this.navCtrl.navigateForward('inscription')
            } else {
              var user = e[0]
              console.log('utilsya ', user)
              this.service.storeUser(user)
              this.navCtrl.navigateForward('portail')
              this.service.auth = true
            }
        })
      }).catch(err=> {
        alert('une erreur s\'est produit '+ err)
      })
    }).catch(err=> {
      console.log('erreur facebook ', err)
      alert(JSON.stringify(err))
    })
  }
}
