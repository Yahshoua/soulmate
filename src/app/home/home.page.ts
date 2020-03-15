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
  ngOnInit() {}
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
