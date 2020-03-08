import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs-portail',
  templateUrl: './tabs-portail.component.html',
  styleUrls: ['./tabs-portail.component.scss'],
})
export class TabsPortailComponent implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}
  goProfil() {
      this.navCtrl.navigateRoot('/portail/users/profil/route/accueil')
  }
}
