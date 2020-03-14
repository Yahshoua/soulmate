import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { monservice } from '../services/monserice';

@Component({
  selector: 'app-edit-vie-mode',
  templateUrl: './edit-vie-mode.page.html',
  styleUrls: ['./edit-vie-mode.page.scss'],
})
export class EditVieModePage implements OnInit {
  @ViewChild('myselect', {'static': true}) select1
  items
  label
  personne
  emptyTable = {
    situation: "Non indiqué",
    habitation: "Non indiqué",
    enfant: "Non indiqué",
    profession: "Non indiqué",
    apparence: "Non indiqué",
    taille: "Non indiqué",
    poids: "Non indiqué",
    id: this.service.utilisateur.id
  }
  tab = {
    situation: ["Non indiqué", "célibataire", "séparé", "divorcé", "en couple", "divorcé", "en couple", "marié", "veuf"],
    habitation: ["Non indiqué", "en appartement", "dans une maison", "chez mes parents", "en colocation", "dans un foyer", "autre"],
    enfant: ["Non indiqué", "aucun", "1 enfant", "2 enfants", "3 enfants", "+ de 3 enfants", "heureux parent", "sûrement pas"],
    profession: ["Non indiqué", "étudiant", "sans emploi", "ouvrier", "employé", "fonctionnaire", "cadre", "cadre supérieur", "prof. libérale", "retraité", "autre"],
    apparence: ["Non indiqué", "maigre", "mince", "dans la moyenne", "musclé", "un peu rond", "rond"],
    taille: ["Non indiqué", "moins d'1m 40", "environs 1m 45", "environ 1m 50", "1m 55", "1m 60", "1m 65", "1m 70", "1m 75", "1m 80", "1m 85", "1m 90"],
    poids: ["Non indiqué", "moins de 50 Kg", "environs 50 Kg", "environs 55 Kg", "environs 60 Kg", "environs 65 Kg", "environs 70 Kg", "environs 75 Kg", "environs 75 Kg", "environs 80 Kg", "environs 85 Kg", "environs 90 Kg", "environs 95 Kg", "environs 100 Kg", "plus de 100 Kg"]
  }
  constructor(private navCtrl: NavController, private service: monservice) { }

  ngOnInit() {
    this.service.allperSub.subscribe((e: any)=> {
      this.personne = e.find(i=> {
        return i.id == this.service.utilisateur.id
      })
    })
    this.service.subsciberAllperso()
    this.emptyTable = this.personne.mode
    this.emptyTable.id =  this.service.utilisateur.id
  }
  check(item) {
    for(let i in this.emptyTable) {
      if(this.emptyTable[i]== item) {
        return true
      }
      return false
    }
  }
  goBack() {
      this.navCtrl.back({animated: true})
  }
  apply() {
      this.service.updatemode(this.emptyTable)
      this.navCtrl.back({animated: true})
  }
  getSelect($event) {
    let obj: any = $event
    var value = obj.detail.value
    var key = (this.label).toLowerCase()
    this.emptyTable[key] = value
    console.log('mon tablea ', this.emptyTable)
  }
  openselect(mytab, label) {
    this.select1.open()
    this.items = mytab 
    this.label = label
  }
}
