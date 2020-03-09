import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
declare var $
@Component({
  selector: 'app-tab-blacklist',
  templateUrl: './tab-blacklist.page.html',
  styleUrls: ['./tab-blacklist.page.scss'],
})
export class TabBlacklistPage implements OnInit {
  personne
  constructor(private service: monservice, public alertController: AlertController) { }

  ngOnInit() {
    this.service.allperSub.subscribe((e: any)=> {
      this.personne = e.filter(per=> {
        return per.blacklist == true
      })
    })
    this.service.subsciberAllperso()
  }
  ionViewWillEnter(){
    this.service.getAllUser()
    this.service.setSubscriptionFavoris(true, "Ma blacklist")
  }
  ionViewWillLeave(){
   this.service.setSubscriptionFavoris(false, "Ma blacklist")
  }
  
  async deblock(id_deb, nom, i) {
    const alert = await this.alertController.create({
      header: 'Debloquer',
      subHeader: 'Confirmation',
      message: 'Voulez-vous debloquer '+ nom +' ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Oui',
          handler: () => {
            this.service.debloquer({id: this.service.utilisateur.id, id_deb: id_deb})
            $('.item'+i).fadeOut(1500)
          }
        }
      ]
    });

    await alert.present();
  }
}
