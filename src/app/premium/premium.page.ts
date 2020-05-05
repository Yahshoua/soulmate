import { Component, OnInit } from '@angular/core';
declare var Stripe, $
@Component({
  selector: 'app-premium',
  templateUrl: './premium.page.html',
  styleUrls: ['./premium.page.scss'],
})
export class PremiumPage implements OnInit {
  stripe = Stripe('pk_test_GZzhjw9fnXuqi5b6n9Zku8zr006b1WwAa5');
  card: any;
  constructor() { }

  ngOnInit() {
    $('ion-card').on('click', function() {
      //
      $('ion-card').css('background', '#fff')
      $('ion-card').find('h4').css('color', ' #737373')
      $('ion-card').find('ion-badge').css({'color':'#fff','background': '#eb445a'})
      //
      $(this).css('background', '#f704ae')
      $(this).find('h4').css('color', '#fff')
      $(this).find('ion-badge').css({'color':'#000','background': '#fff'})
    })
  }
  setupStripe() {
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style });
    console.log(this.card);
    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      console.log(event)

      this.stripe.createSource(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          console.log(result);
          this.makePayment(result.id);
        }
      });
    });
  }
  makePayment(token) {
    console.log(token)
  }
}
