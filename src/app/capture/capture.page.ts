import { NavController } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
@Component({
  selector: 'app-capture',
  templateUrl: './capture.page.html',
  styleUrls: ['./capture.page.scss'],
})
export class CapturePage implements OnInit {
  image
  constructor(private service: monservice, private imagePicker: ImagePicker, private navCtrl: NavController) { }

  ngOnInit() {
    this.image = this.service.photo
  }
  pickImage() {
    let options = {
      maximumImagesCount: 1,
      outputType: 1,
      allow_video: false
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image base64: ' + results[i]);
          this.image = "data:image/png;base64,"+results[i]
          this.service.setPhoto(this.image)
          setTimeout(()=> {
            this.navCtrl.navigateForward('portail')
          }, 5000)
      }
    }, (err) => { 
      console.log('erreur', err)
    })
    this.service.setPhoto(this.image)
    setTimeout(()=> {
    // this.navCtrl.navigateForward('portail')
    }, 3000)
  }
}
