import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
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
  customer: any;
  constructor(private navCtl: NavController, private router: ActivatedRoute, private service: monservice, private alertCtrl: AlertController) { }

  ngOnInit() {
    if(this.router.snapshot.queryParams) {
      this.customer = this.router.snapshot.queryParams.customer
    }
    
  }
  getExpire(date) {
    moment.locale('fr')
    console.log('moment ', moment(date).format('Do MMMM YYYY à h:mm:ss a'))
    return  moment(date).format('DD MMMM YYYY à h:mm:ss')
  }
  activedBtn(val1, val2) {
    if(val1 >=1 && val2 >= 1) {
      return true
    }
    return false
  }

  goback() {
    this.navCtl.back()
  }
  ionViewWillEnter(){
    this.get()
  }
  get() {
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
  async alert(id, formule) {
    const alert = await this.alertCtrl.create({
      header: 'Attention',
      message:  `Votre abonnement ${formule} sera supprimé`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: (blah) => {
            
          }
        },
        {
          text: 'Suivant',
          handler: () => {
              $.ajax({
                  method: 'POST',
                  url: this.service.server2+'/phpsoulmate/deleteAbonnement.php',
                  data: {id: id}
              }).done(e=> {
                $("div[id="+id+"]").hide()
              })
          }
        }
      ]
    });
    await alert.present();
  }
}
