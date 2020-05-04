import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-version',
  templateUrl: './modal-version.page.html',
  styleUrls: ['./modal-version.page.scss'],
})
export class ModalVersionPage implements OnInit {
  updated = false
  codeversion
  versionnum
  emoji = "fas fa-thumbs-up"
  texte = "Votre app est à jour !"
  lastversion
  constructor(private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('params ', this.navParams.data)
    this.versionnum = this.navParams.data.numversion
    this.lastversion = this.navParams.data.lastversion
    if( this.navParams.data.updated == false) {
      this.emoji = "fas fa-sad-tear"
      this.updated = true
      this.texte = "Votre app n'est pas à jour."
      sessionStorage.setItem('version', JSON.stringify({update: this.updated, verfication: false}) )
    } else {
      this.updated = false
      sessionStorage.setItem('version', JSON.stringify({update: this.updated, verfication: true}) )
    }
  }
  continus() {
    this.modalCtrl.dismiss({
      component: ModalVersionPage
    })
  }
  update() {
    window.open("https://play.google.com/store/apps/details?id=com.soulmate.mitashi.app", "_system", "location=yes")
  }
}
