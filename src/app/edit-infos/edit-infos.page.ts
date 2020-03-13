import { monservice } from './../services/monserice';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
declare var moment
@Component({
  selector: 'app-edit-infos',
  templateUrl: './edit-infos.page.html',
  styleUrls: ['./edit-infos.page.scss'],
})
export class EditInfosPage implements OnInit {
  dateNaissance
  personne
  constructor(private navCtrl: NavController, private service: monservice) { }
  customMonthShortNames = ['Janv', 'Fev', 'Mar', 'Avr', 'Mai', 'Ju', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'];

  ngOnInit() {
    this.personne = this.service.Allpersonnes.find(i=> {
      return i.id == this.service.utilisateur.id
    })
    this.dateNaissance = this.personne.datenaiss
  }
  goBack() {
    this.navCtrl.back()
  }
  apply() {
    
    this.personne.datenaiss = this.dateNaissance
    console.log(this.personne)
    this.service.updateInfos(this.personne)
    this.navCtrl.back({animated: true})
  }
}
