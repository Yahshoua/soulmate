import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-portail',
  templateUrl: './portail.page.html',
  styleUrls: ['./portail.page.scss'],
})
export class PortailPage implements OnInit {
  image
  constructor(private menu: MenuController, private service: monservice) { }

  ngOnInit() {
    this.image = this.service.photo  
  }
      openmenu() {
    this.menu.enable(true, 'first');
      this.menu.open('first');
  }
}
