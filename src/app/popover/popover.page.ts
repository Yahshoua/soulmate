import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  constructor(private popover: PopoverController, private service: monservice) { }

  ngOnInit() {
  }
  async presentPopover() {
    const popover = await this.popover.dismiss({
      component: PopoverPage
    });
    this.service.Setpopover()
  }
}
