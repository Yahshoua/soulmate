import { NavController } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-capture',
  templateUrl: './capture.page.html',
  styleUrls: ['./capture.page.scss'],
})
export class CapturePage implements OnInit {
  image
  loading
  loader
  userData: { email: any; first_name: any; photo: any; nom: any; 'type': string; };
  constructor(private service: monservice, private imagePicker: ImagePicker, private navCtrl: NavController, private fb: Facebook, public loadingController: LoadingController) { }

  ngOnInit() {
    this.image = this.service.photo
    this.service.utilisateurSubscriber.subscribe(e=> {
      console.log('utilisateur ', e)
    })
    this.service.utilsateurSubscription()
    console.log('moiii ', this.service.moi)
  }
  fbimage() {
    var image = this.service.facebook.photo
    if(image == undefined) {
      // connecte Facebook
      this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
        this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
          this.userData = {email: profile['email'], first_name: profile['first_name'], photo: profile['picture_large']['data']['url'], nom: profile['name'], 'type': 'facebook'}
          this.service.facebook = this.userData
          this.image = this.service.facebook.photo
          console.log('userData ', this.userData)
          this.service.setPhoto(this.image)
          setTimeout(()=> {
            this.navCtrl.navigateForward('portail')
          }, 3000)
        }).catch(err=> {
          alert('une erreur s\'est produit '+ err)
        })
      }).catch(err=> {
        console.log('erreur facebook ', err)
        alert(JSON.stringify(err))
      })
    } else {
      this.image = image
    }
  }
  pickImage() {
    let options = {
      maximumImagesCount: 1,
      outputType: 1,
      allow_video: false
    }
    this.imagePicker.getPictures(options).then(async (results) => {
          console.log('Image base64: ' + results[0]);
          this.image = "data:image/png;base64,"+results[0]
          this.load()
          this.service.setPhoto(this.image).then(async (e)=> {
             this.navCtrl.navigateForward('portail')
             this.loading.dismiss()
                this.loading = false
          })
      
    }, (err) => { 
      console.log('erreur', err)
    })
    // Test
    // this.service.setPhoto(this.image)
    // setTimeout(()=> {
    //   this.navCtrl.navigateForward('portail')
    // }, 3000)
    // fin
  }
  async load() {
    this.loading = await this.loadingController.create({
      message: 'Creation de votre profil...'
    });
        await this.loading.present(); 
  }
}
