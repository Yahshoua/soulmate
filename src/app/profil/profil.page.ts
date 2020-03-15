import { PhotoProfilSelectedPage } from './../photo-profil-selected/photo-profil-selected.page';
import { NavController, ToastController, ModalController, NavParams } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
declare var $, moment
@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  pages = true
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  personne: any
  slide
  image = 'https://i.picsum.photos/id/230/200/300.jpg'
  @ViewChild('loopSlider', {static: true}) loopSlider;
  interet: any;
  mode: any;
  suggetion: any;
  modal
  Imagename
  constructor(public router:ActivatedRoute, private service: monservice, private navCtrl: NavController, private route: Router, public toastController: ToastController, private imagePicker: ImagePicker, private moadalCtrl: ModalController, private transfer: FileTransfer) { }
  monstyle(al) {
    let style=  {
        'background-image': 'url('+al.photo+')', 
      'height': $('app-profil').height()/2 + 'px', 
      'background-size': 'cover',
      'background-position': 'center',
      'width': '100%'
     }
     // console.log('taille ', $('app-proposition').height())
     return style
  }
  async pickImage() {
    let options = {
      maximumImagesCount: 1,
      outputType: 0,
      quality: 20,
      allow_video: false
    }
    this.imagePicker.getPictures(options).then(async (results) => {
        //
        var fileTransfer: FileTransferObject = this.transfer.create();
        if(results.length <= 0) return
        console.log('Image URI: ' + results[0], 'results ', results);
        //chemin de l image
        var imageUpload = results[0]
        // nom de l image
         this.Imagename = moment().format('DD-MMMM-YYYY-HH:mm:s')+'.jpg'
         //
         let options: FileUploadOptions = {
           fileKey: 'file',
           fileName: this.Imagename,
           headers: {}
        }
        fileTransfer.upload(imageUpload, 'https://kazimo.ga/cashapp/upload_photo.php', options).then(e=> {
          console.log(e, 'effectué')
        
        }).catch(err=>  {
          console.log('erreur du transfert ', err)
        })
        //
          console.log('Image url: ' + results[0]);
          this.image = (<any>window).Ionic.WebView.convertFileSrc(results[0])
     
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
          this.personne.album.push({id: this.personne.album.length+1, photo: this.image})
          this.loopSlider.update().then(e=> {
            var taille = this.loopSlider.length().then(e=> {
              console.log('taille ', e)
              this.loopSlider.slideTo(e)
              var album = this.personne.album
              var img1 = this.personne.images
              this.service.updateAllperson(img1, album, this.Imagename)
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

  ngOnInit() {
    // this.personne = this.service.Allpersonnes.find(i=> {
    //   return i.id == this.service.utilisateur.id
    // })
    this.service.allperSub.subscribe((i: any)=> {
      this.personne = i.find((e: any)=> {
           return e.id == this.service.utilisateur.id
         })
         this.interet = this.personne.interets
        })
     this.service.subsciberAllperso()
    console.log('personne ', this.personne, ' album ', this.personne.album)
   
  }
  decode(uri) {
    return decodeURI(uri)
  }
  ionViewWillEnter(){
    console.log('ok entrer')
    this.service.subsciberAllperso()
    console.log('personne ', this.personne.interets)
    
    this.mode = this.personne.mode
    this.suggetion = this.personne.suggetion
    var i = this.personne.album.find(e=> {
      return e.photo == this.personne.images
    })
    console.log('iiii ', i)
    if(i == undefined) {
        var k =  this.personne.album.push({id: this.personne.album.length+1,photo: this.personne.images})
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
  parsing(data) {
    console.log('data ', data, 'datype ', typeof data)
    if(data == null || data.length <= 0) return
      var e = data
    if(typeof data == 'string') {
        e = JSON.parse(data)
    }
    console.log('parsing ', data, 'interets', this.interet, 'type' )
      var k = ''
      for(let i =0;i < e.length; i++) {
        if(i>0 && i < e.length) {
          k+= ","+ e[i].texte
        } else {
          k+= e[i].texte
        }
      }
      return k
  }
  goBack() {
    this.navCtrl.navigateBack('portail/users/proposition')
  }
  tap() {
    this.loopSlider.getActiveIndex().then(e=> {
      this.navCtrl.navigateRoot('profil-view-image', {queryParams: {index: e}} )
    })
    
  }
  getAge(date) {
    var age = moment(date).format('Y')
     return moment().format('Y') - age
  }
  getKms(km) {
    var kM = Math.round(km)
    if(kM <= 1) {
      return "< 1"
    }
    return kM
  }
}
