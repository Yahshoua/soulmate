import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $
@Component({
  selector: 'app-premium',
  templateUrl: './premium.page.html',
  styleUrls: ['./premium.page.scss'],
})
export class PremiumPage implements OnInit {
  card: any;
  toto
  constructor(private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
    $('ion-card').on('click', function() {
      //
      var formule = $(this).attr('data-amount')
      console.log('formule ', formule)
      $('#continuer').attr('data-amount', formule)
      $('ion-card').css('background', '#fff')
      $('ion-card').find('h4').css('color', ' #737373')
      $('ion-card').find('ion-badge').css({'color':'#fff','background': '#eb445a'})
      //
      $(this).css('background', '#f704ae')
      $(this).find('h4').css('color', '#fff')
      $(this).find('ion-badge').css({'color':'#000','background': '#fff'})
    })
  }
  continuer() {
    // this.navCtrl.navigateForward('/voirplus/route/main', {queryParams: {id: id, route: 'chat'}, queryParamsHandling: 'merge'})
    var formule = $('#continuer').attr('data-amount')
    this.navCtrl.navigateForward('payement', {queryParams: {formule: formule} } )
  }
  makePayment(token) {
    console.log(token)
  }
}
