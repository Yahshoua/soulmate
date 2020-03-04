import { Component, OnInit } from '@angular/core';
declare var $
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {}
  ngOnInit() {
   // $('ion-content>div').css({'height': $('app-home').height() + 'px'})
  }
}
