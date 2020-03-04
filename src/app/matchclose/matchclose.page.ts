import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matchclose',
  templateUrl: './matchclose.page.html',
  styleUrls: ['./matchclose.page.scss'],
})
export class MatchclosePage implements OnInit {
  personne
  constructor(private service: monservice) { }

  ngOnInit() {
    this.personne = this.service.matching
    console.log('tableau matching ', this.personne)
  }
  getSize(i) {
    console.log('modulo ', i%2)
    if(i%2 == 0) {
      return 6
    } else {
      return 12
    }
  }
}
