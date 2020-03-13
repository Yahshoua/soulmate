import { PhotoProfilSelectedPage } from './../photo-profil-selected/photo-profil-selected.page';
import { NavController, ToastController, ModalController, NavParams } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
declare var $
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
  modal
  image = 'https://i.picsum.photos/id/230/200/300.jpg'
  constructor(public router:ActivatedRoute, private service: monservice, private navCtrl: NavController, private route: Router, public toastController: ToastController, private imagePicker: ImagePicker, private moadalCtrl: ModalController) { }
  slideOpts = {
    initialSlide: this.curentSlide,
  };
  ngOnInit() {
    this.personne = this.service.Allpersonnes.find(e=> {
      return e.id == this.service.utilisateur.id
    })
    this.slideOpts.initialSlide = this.router.snapshot.queryParams.index
    console.log('index ', this.slideOpts.initialSlide)
    var i = this.personne.album.find(e=> {
      return e.photo == this.personne.images
    })
    console.log('iiii ', i)
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
  goBack() {
    this.navCtrl.back()
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
      outputType: 1,
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
      for (var i = 0; i < results.length; i++) {
          console.log('Image base64: ' + results[i]);
          this.image = "data:image/png;base64,"+results[i]
      }
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
          this.personne.album.push({id: this.personne.album.length+1,photo: this.image})
          this.loopSlider.update().then(e=> {
            var taille = this.loopSlider.length().then(e=> {
              console.log('taille ', e)
              this.loopSlider.slideTo(e)
              var album = this.personne.album
              var img1 = this.personne.images
              this.service.updateAllperson(img1, album, this.image)
            })
            
          })
          if(this.pages == false) {
            this.pages = true
          }
        }
    })
    return await this.modal.present();
    }, (err) => { 
      alert('erreur lors de la recuperation de votre image '+ err)
    })
  }
}
