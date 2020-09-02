import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
declare var moment, $
@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
})
export class PaymentSuccessPage implements OnInit {
  allabonnement: any = []
  couleur = "rgb(191 191 191)"
  constructor(private navCtl: NavController, private router: ActivatedRoute, private service: monservice) { }

  ngOnInit() {
    moment.locale("fr")
    var dates = moment().format('ll')
    var url = window.location.href
    var split_url = url.split("?")
    var get_session = split_url[1]
    var _session = get_session.split("=")
    var session_id =  _session[1]
    var get_ab = JSON.parse(sessionStorage.getItem("abonnement")) || []
    if(Object.keys(get_ab).length >= 1) {
      get_ab.dates = dates
      get_ab.session_id = session_id
      get_ab.user_id = this.service.utilisateur.id
      this.service.setAbonnement(get_ab)
    }
  }
  goback() {
    this.navCtl.back()
  }
  ionViewWillEnter(){
    this.service.getAbonnement().then((e: any)=> {
      e = JSON.parse(e)
      if(e.length >= 1) {
          this.allabonnement = e
      }
      console.log("this abn ", this.allabonnement)
    })
  }
  getState(invert, days) {
    if(invert >=1 && days >= 1) {
      return {
        couleur: "rgb(255 12 12)",
        etat: "Expiré"
      }
    }
    return {
      couleur: "#26ec26",
      etat: "En cours"
    }
  }
}
