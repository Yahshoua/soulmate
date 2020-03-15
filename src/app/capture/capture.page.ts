import { NavController, AlertController } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { LoadingController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
declare var moment
@Component({
  selector: 'app-capture',
  templateUrl: './capture.page.html',
  styleUrls: ['./capture.page.scss'],
})
export class CapturePage implements OnInit {
  image
  loading
  loader
  name
  userData: { email: any; first_name: any; photo: any; nom: any; 'type': string; };
  constructor(private service: monservice, private imagePicker: ImagePicker, private navCtrl: NavController, private fb: Facebook, public loadingController: LoadingController, private transfer: FileTransfer, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.image = this.service.photo
    this.service.utilisateurSubscriber.subscribe(e=> {
      console.log('utilisateur ', e)
    })
    this.service.utilsateurSubscription()
    console.log('moiii ', this.service.moi)
     
  }
  fbimage() {
    this.load()
    var image = this.service.facebook.photo
    if(image == undefined) {
      // connecte Facebook
      this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
        this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
          this.userData = {email: profile['email'], first_name: profile['first_name'], photo: profile['picture_large']['data']['url'], nom: profile['name'], 'type': 'facebook'}
          this.service.facebook = this.userData
          this.image = this.service.facebook.photo
          console.log('userData ', this.userData)
          this.service.setPhoto(this.image).then(e=> {
            this.navCtrl.navigateForward('portail')
            this.loading.dismiss()
          })
       
        }).catch(err=> {
          alert('une erreur s\'est produit '+ err)
        })
      }).catch(err=> {
              console.log('erreur facebook ', err)
              alert(JSON.stringify(err))
      })
    } else {
      this.image = image
      this.service.setPhoto(this.image).then(e=> {
        this.navCtrl.navigateForward('portail')
        this.loading.dismiss()
      })
       
            
    }
  }
  pickImage() {
    let options = {
      maximumImagesCount: 1,
      outputType: 0,
      quality: 20,
      allow_video: false
    }
      // Test
    
    // this.service.setPhoto(this.image).then(e=> {
    //   this.service.getAllUser().then(e=> {
    //      this.navCtrl.navigateForward('portail')
    //   })
    // })
    // fin


    this.imagePicker.getPictures(options).then(async (results) => {
      this.load()
     var fileTransfer: FileTransferObject = this.transfer.create();
         console.log('Image URI: ' + results[0]);
         var imageUpload = results[0]
         this.image = (<any>window).Ionic.WebView.convertFileSrc(imageUpload)
          this.name = moment().format('DD-MMMM-YYYY-HH:mm:s')+'.jpg'
          let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: this.name,
            headers: {}
         }
         fileTransfer.upload(imageUpload, 'https://kazimo.ga/cashapp/upload_photo.php', options)
            .then((data) => {
                console.log(data, 'effectué')
                this.image = "https://kazimo.ga/cashapp/uploads/"+this.name
                this.service.setPhoto("https://kazimo.ga/cashapp/uploads/"+this.name).then(e=> {
                  this.navCtrl.navigateForward('portail')
                  this.loading.dismiss()
                })
                
            }, async (err) => {
              // error
              this.loading.dismiss()
              console.log(err, 'une erreur est arrivé')
              const alert = await this.alertCtrl.create({
                header: 'Erreur',
                subHeader: "Impossible de continuer.",
                message: "Une erreur inconnue s'est produite ! Recommencez svp",
                buttons: ['OK']
              });
              await alert.present();
            })
        //  
      
    }, (err) => { 
      console.log('erreur', err)
    
    })
  }
  async load() {
    this.loading = await this.loadingController.create({
      message: 'Creation de votre profil...'
    });
        await this.loading.present(); 
  }
}
