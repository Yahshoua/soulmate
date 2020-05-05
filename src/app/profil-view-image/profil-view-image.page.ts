import { PhotoProfilSelectedPage } from './../photo-profil-selected/photo-profil-selected.page';
import { NavController, ToastController, ModalController, NavParams } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ActionSheetController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
declare var $, moment
@Component({
  selector: 'app-profil-view-image',
  templateUrl: './profil-view-image.page.html',
  styleUrls: ['./profil-view-image.page.scss'],
})
export class ProfilViewImagePage implements OnInit {
  @ViewChild('loopSlider', {static: true}) loopSlider;
  curentSlide
  personne
  pages = true
  slidepos
  modal
  Photo
  image = 'https://i.picsum.photos/id/230/200/300.jpg'
  Imagename: string;
  constructor(public router:ActivatedRoute, private service: monservice, private navCtrl: NavController, private route: Router, public toastController: ToastController, private imagePicker: ImagePicker, private moadalCtrl: ModalController, public actionSheetController: ActionSheetController,  private transfer: FileTransfer) { }
  slideOpts = {
    initialSlide: this.curentSlide,
  };
  ngOnInit() {
    this.personne = this.service.Allpersonnes.find(e=> {
      return e.id == this.service.utilisateur.id
    })
    this.slideOpts.initialSlide = this.router.snapshot.queryParams.index
    this.slidepos = this.router.snapshot.queryParams.index
    this.Photo = this.personne.album[this.slidepos].photo
    console.log('index ', this.personne)
    var i = this.personne.album.find(e=> {
      return e.photo == this.personne.images
    })
    if(i == undefined) {
        var k =  this.personne.album.push({id: this.personne.album.length+1, photo: this.personne.images})
          this.personne.album = this.personne.album.sort((a, b)=> {
            if (a.id < b.id ) {
            return 1;
          }
          if (a.id > b.id ) {
            return -1;
          }
          return 0;
          })
      console.log('personne ', this.personne, 'taille album ', this.personne.album.length)
     this.loopSlider.lockSwipes(true)
    }
    if(this.personne.album.length > 1 ) {
        this.pages = true
        this.loopSlider.lockSwipes(false)
      }
  }
  changePosition() {
   this.loopSlider.getActiveIndex().then(index=> {
      console.log('index ', index)
      this.slidepos = index
      this.Photo = this.personne.album[index].photo
    })
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Que faire de la photo ?',
      buttons: [{
        text: 'Supprimer',
        role: 'destructive',
        icon: 'trash',
        disabled: true,
        handler: async () => {
          console.log('Delete clicked');
          if(this.slidepos==0) {
            const toast = await this.toastController.create({
              message: 'Vous ne pouvez pas supprimer votre photo principale',
              duration: 3000
            });
            toast.present();
          } else {
              var nameImage = this.personne.album[this.slidepos].photo
              this.service.deletePhoto(nameImage)
              this.service.utilisateur = this.personne
              this.personne.album.splice(this.slidepos, 1)
              console.log('nouvelle personne ', this.personne)
          }
        }
      }, {
        text: 'Definir comme photo pricipale',
        icon: 'happy-outline',
        cssClass: this.Photo == this.personne.images?'disabled':'deleted',
        disabled: false,
        handler: () => {
          // cette photo sera supp de album et add dans user[personne]
          var photoPricipale = this.personne.album[ this.slidepos].photo
          // cette photo sera supprimer de la table user[personne] et add dans album
          var ancPhotPric =  this.personne.images
          $.ajax({
            method: 'POST',
            url: 'https://kazimo.ga/cashapp/phpsoulmate/addprincipalephot.php',
            data: {newphoto: photoPricipale, ancphoto: ancPhotPric, id: this.personne.id},
            dataType: 'json'
          }).done(async (data)=> {
            this.personne.images = photoPricipale
            this.service.utilisateur = this.personne
            console.log('data ', data)
            this.personne.album = data
            this.loopSlider.slideTo(0, 500)
            const toast = await this.toastController.create({
              message: 'Photo principale choisie',
              duration: 3000, 
              position:'top',
              color: 'success'
            });
            toast.present();
          })
          console.log('Share clicked');
        }
      }, {
        text: 'Retour',
        icon: 'close',
        disabled: false,
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  goBack() {
    this.navCtrl.back()
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
              this.imagePicker.requestReadPermission().then(e=> {
                console.log('request ReadPermission ', e)
              })
        }
    
    })
  
  }
  ionViewWillEnter() {
    this.moadalCtrl.dismiss({
      component: PhotoProfilSelectedPage
    })
  }
  monstyle(al) {
    let style=  {
      'background-image': 'url('+al.photo+')', 
      'height': $('app-profil-view-image').height() - $('ion-header').height() + 'px', 
      'background-size': 'cover',
      'background-position': 'center',
      'width': '100%'
     }
     return style
  }
  async pickImage() {
    console.log('pick')
    let options = {
      maximumImagesCount: 1,
      outputType: 0,
      quality: 20,
      allow_video: false
    }
     //FAKE
    //   this.modal = await this.moadalCtrl.create({
    //   component: PhotoProfilSelectedPage,
    //   componentProps: {
    //     'image': this.image
    //   }
    // })
    
    // return await this.modal.present();
    this.imagePicker.getPictures(options).then(async (results) => {
      this.image =  (<any>window).Ionic.WebView.convertFileSrc(results[0])
      if(results[0] !== undefined) {
        this.Imagename = moment().format('DD-MMMM-YYYY-HH:mm:s')+'.jpg'
        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName: this.Imagename,
          headers: {}
        }
        var fileTransfer: FileTransferObject = this.transfer.create();
        this.modal = await this.moadalCtrl.create({
          component: PhotoProfilSelectedPage,
          componentProps: {
            'image': this.image
          }
        })
        this.modal.onDidDismiss().then((e: any)=> {
          console.log('dismiss', e)
          var data = e.data.componentProps.image
          if(data == true) {
            this.loopSlider.lockSwipes(false)
            this.personne.album.push({photo: this.image})
            //upload
            fileTransfer.upload(results[0], 'https://kazimo.ga/cashapp/upload_photo.php', options).then(e=> {
              console.log(e, 'effectué')
              this.loopSlider.update().then(e=> {
                var taille = this.loopSlider.length().then(e=> {
                  console.log('taille ', e)
                  // add dans l'album[personne]
                  this.personne.album[e-1].photo = 'https://kazimo.ga/cashapp/uploads/'+this.Imagename
                  this.loopSlider.slideTo(e)
                  var album = this.personne.album
                  var img1 = this.personne.images
                  //envois pour ajout global/ecrire en BDD
                  this.service.updateAllperson(img1, album, 'https://kazimo.ga/cashapp/uploads/'+this.Imagename).then(res=> {
                    console.log("resultat de l'update de l'album ", res)
                    if(res !== false) {
                      //this.personne.
                    }
                  })
                })
              })
            
            }).catch(err=>  {
              console.log('erreur du transfert ', err)
            })
            //
            if(this.pages == false) {
              this.pages = true
            }
          }
      })
      return await this.modal.present();
      
      }
    }, (err) => { 
      alert('erreur lors de la recuperation de votre image '+ err)
    })
  }
}
