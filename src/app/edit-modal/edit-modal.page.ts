import { NavParams, Platform, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.page.html',
  styleUrls: ['./edit-modal.page.scss'],
})
export class EditModalPage implements OnInit {
  title
  libele
  text
  constructor(private navParams: NavParams, private platform: Platform, private modalCtl: ModalController) { }

  ngOnInit() {
    this.title = this.navParams.get('title')
    this.libele = this.navParams.get('libele')
    console.log('params ', this.navParams)
    this.platform.backButton.subscribe(e=> {
      this.modalCtl.dismiss({
        Component: EditModalPage,
        componentProps: {}
      })
    })
  }
  goBack() {
    this.modalCtl.dismiss({
      Component: EditModalPage,
      componentProps: {}
    })
  }
  valider() {
    if(this.text.length <= 3) return
    this.modalCtl.dismiss({
      Component: EditModalPage,
      componentProps: {texte: this.text, libele: this.libele}
    })
  }
}
