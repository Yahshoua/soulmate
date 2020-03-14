import { monservice } from './../services/monserice';
import { EditModalPage } from './../edit-modal/edit-modal.page';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-edit-interet',
  templateUrl: './edit-interet.page.html',
  styleUrls: ['./edit-interet.page.scss'],
})
export class EditInteretPage implements OnInit {
  libele
  personne
  constructor(private navCtrl: NavController, private modalCtrl: ModalController, private service: monservice, public toastController: ToastController) { }
  Tabmode = {
    music: [],
    film: [],
    passeTemps: [],
    sport: [],
    aime: [],
    deteste: []
  }
  ngOnInit() {
    this.service.allperSub.subscribe((e: any)=> {
       this.personne =  e.find(i=> {
           return i.id == this.service.utilisateur.id
        })
          console.log('moiii ', this.personne)
      })
    this.service.subsciberAllperso()
   // var Tabmode = JSON.parse(this.personne.interets)
      if(typeof this.personne.interets == 'string') {
        this.personne.interets = JSON.parse(this.personne.interets)
      }
    console.log('table parse ',  this.personne)
    // if(this.personne.interets >= 1) {
    //   this.Tabmode = this.personne
    // }
    for(let i in this.personne.interets) {
      if(this.personne.interets[i] !== null && this.personne.interets[i].length >= 1) {
        var e = this.personne.interets[i]
        if(typeof this.personne.interets[i] == 'string') {
            e = JSON.parse(this.personne.interets[i])
        }
        this.Tabmode[i] = e
      }
    }
  }
 async delete() {
    for(let i in this.Tabmode) {
        for(let e = 0;e < this.Tabmode[i].length;e++ ) {
          if(this.Tabmode[i][e].etat == true) {
             this.Tabmode[i].splice(e, 1)
          }
        }
          var table = i
          this.service.updateInteret(this.Tabmode[i], table, this.Tabmode)
      }
    //this.navCtrl.back({animated: true})
    console.log(this.Tabmode)
    const toast = await this.toastController.create({
      message: 'Suppression faite',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  async apply() {
    console.log('apply tab ', this.Tabmode)
    // this.service.updateInteret(this.Tabmode)
    var mytab = this.Tabmode
    console.log('mytab ', mytab)
    for(let i in this.Tabmode) {
      if(this.Tabmode[i].length >= 1) {
        var table = i
        this.service.updateInteret(this.Tabmode[i], table, mytab)
      }
  }
      const toast = await this.toastController.create({
        message: 'Centres d\'interets ajoutés:)',
        duration: 3000,
        position: 'bottom',
        color: 'success'
      });
      toast.present();
  }
  goBack() {
    this.navCtrl.back({animated: true})
  }
  switch(key, i) {
    console.log(key, i)
    console.log('Tabmod ', this.Tabmode)
  }
  async popup(libele, title) {
    this.libele = libele
    const modal = await this.modalCtrl.create({
      component: EditModalPage,
      cssClass: 'my-custom-modal-opinion',
      componentProps: {
        'libele': libele,
        'title': title
      }
    })
    modal.onDidDismiss().then((e: any)=> {
      console.log("dismiss ", e)
      var texte = e.data.componentProps.texte
      this.libele =  e.data.componentProps.libele
      console.log('libele ', libele)
      switch(this.libele) {
          case 'music':
            this.Tabmode.music.push({texte: texte, etat: false})
            break
          case 'film':
            this.Tabmode.film.push({texte: texte, etat: false})
            break
          case 'temps':
            this.Tabmode.passeTemps.push({texte: texte, etat: false})
            break
          case 'sport':
            this.Tabmode.sport.push({texte: texte, etat: false})
            break
          case 'aime':
            this.Tabmode.aime.push({texte: texte, etat: false})
            break
          case 'deteste':
            this.Tabmode.deteste.push({texte: texte, etat: false})
            break
      }
      console.log('tableau ', this.Tabmode)
    })
    return await modal.present()
  }
}
