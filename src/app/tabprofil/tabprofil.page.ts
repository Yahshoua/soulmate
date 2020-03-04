import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabprofil',
  templateUrl: './tabprofil.page.html',
  styleUrls: ['./tabprofil.page.scss'],
})
export class TabprofilPage implements OnInit {
  myvalue = 'favorite'
  switch = true
  constructor() { }

  ngOnInit() {
  }
  setSwitch(event) {
    console.log('event ', event)
    if(event.detail.value == 'map') {
      this.switch = false
      this.myvalue = 'map'
    } else {
      this.switch = true
    this.myvalue = 'favorite'
    }
  }
}
