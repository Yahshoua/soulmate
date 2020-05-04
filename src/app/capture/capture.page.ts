import { NavController, AlertController } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { LoadingController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
declare var moment, tracking, $
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
  objects
  ImageValide:Boolean
  userData: { email: any; first_name: any; photo: any; nom: any; 'type': string; };
  constructor(private service: monservice, private imagePicker: ImagePicker, private navCtrl: NavController, private fb: Facebook, public loadingController: LoadingController, private transfer: FileTransfer, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.image = this.service.photo
    this.service.utilisateurSubscriber.subscribe(e=> {
      console.log('utilisateur ', e)
    })
    this.service.utilsateurSubscription()
    console.log('moiii ', this.service.moi)
    this.imagePicker.requestReadPermission().then((e)=> {
      console.log('request ReadPermission ', e)
    })
     this.objects = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
				this.objects.on('track', async (event)=> {
				console.log('event ', event)
			  if (event.data.length === 0) {
          // No objects were detected in this frame.
          this.loading.dismiss()
          this.ImageValide = false
          const alert = await this.alertCtrl.create({
            header: 'Oups',
            subHeader: "Image invalide.",
            message: "Votre image n'est pas une personne ou est mal cadrée",
            buttons: ['Recommencer']
          });
          await alert.present();
			  } else {
          this.ImageValide = true
          this.loggerUser()
			    event.data.forEach(function(rect) {
			      // rect.x, rect.y, rect.height, rect.width
			    });
			  }
			});
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
          this.load()
          this.service.setPhoto(this.image).then(e=> {
            this.navCtrl.navigateForward('portail')
            this.loading.dismiss()
          })
       
        }).catch(err=> {
          alert('une erreur s\'est produit '+ err)
          this.loading.dismiss()
        })
      }).catch(err=> {
              console.log('erreur facebook ', err)
              alert(JSON.stringify(err))
              this.loading.dismiss()
      })
    } else {
      this.image = image
      this.load()
      this.service.setPhoto(this.image).then(e=> {
        this.navCtrl.navigateForward('portail')
        this.loading.dismiss()
      })
       
            
    }
  }
  permission() {
    this.imagePicker.hasReadPermission().then(e=> {
      console.log('has read ', e)
        if(e== true) {
          this.pickImage()
        } else {
                /**
               * Request permission to read images
               * @returns {Promise<any>}
               */
              this.imagePicker.requestReadPermission().then((e)=> {
                console.log('request ReadPermission ', e)
              })
        }
    
    })
  
  }
      //Logged User
      loggerUser() {
        this.service.setPhoto("https://kazimo.ga/cashapp/uploads/"+this.name).then(e=> {
                        this.loading.dismiss()
                        this.service.auth = true
                        this.navCtrl.navigateForward('portail')
                        console.log('ok terminé')
                      })
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
        
          var fileTransfer: FileTransferObject = this.transfer.create();
              console.log('Image URI: ' + results[0]);
               if(results[0] !== undefined) {
                
               this.load()
               var imageUpload = results[0]
               this.image = (<any>window).Ionic.WebView.convertFileSrc(imageUpload)
               var image = document.getElementById('images')
               $('#images').attr('src',this.image)
              
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
                      $('#images').attr('src', this.image)
                      tracking.track("#images", this.objects)
                      
                  }).catch(async err=> {
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
              }
               
         }, (err) => { 
           console.log('erreur', err)
            alert('Désolé une erreur s\'est produite !')
         })

  }
  async load() {
    this.loading = await this.loadingController.create({
      message: 'Creation de votre profil...'
    });
        await this.loading.present(); 
  }
}
