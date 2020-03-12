import { Component, OnInit } from '@angular/core';
import { NavParams, Platform, ModalController } from '@ionic/angular';
declare var $
@Component({
  selector: 'app-photo-profil-selected',
  templateUrl: './photo-profil-selected.page.html',
  styleUrls: ['./photo-profil-selected.page.scss'],
})
export class PhotoProfilSelectedPage implements OnInit {
  image
  constructor(private navParams: NavParams, private platform: Platform, private modalController: ModalController) { }
  monstyle(photo) {
      let style=  {
        'background-image': 'url('+photo+')', 
      'height': $('app-photo-profil-selected').height() + 'px', 
      'background-size': 'cover',
      'background-position': 'center',
      'width': '100%'
    }
    return style
  }
  
  ngOnInit() {
    this.image = this.navParams.get('image')
    console.log(this.navParams.get('image'));
    this.platform.backButton.subscribe(() => {
      this.modalController.dismiss({
        component: PhotoProfilSelectedPage,
        componentProps: {
          'image': true
        }
      })
    });
  }
  choice(val) {
      this.modalController.dismiss({
        component: PhotoProfilSelectedPage,
        componentProps: {
          'image': val
        }
      })
  }
}
