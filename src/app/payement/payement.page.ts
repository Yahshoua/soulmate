import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var Stripe, $
@Component({
  selector: 'app-payement',
  templateUrl: './payement.page.html',
  styleUrls: ['./payement.page.scss'],
})
export class PayementPage implements OnInit {
  formule
  choix
  card: any;
  abonnement = [
    {
      formule: 'formule-1',
      periode: '6 Mois',
      prix: '6.87',
      monnaie: 'eur',
      definition: '6.87€/semaine',
      total: '179'
    },
    {
      formule: 'formule-2',
      periode: '3 Mois',
      prix: '9.13',
      monnaie: 'eur',
      definition: '9.13€/semaine',
      total: '119'
    },
    {
      formule: 'formule-3',
      periode: '1 Mois',
      prix: '13.58',
      monnaie: 'eur',
      definition: '13.58€/semaine',
      total: '59'
    },
    {
      formule: 'formule-4',
      periode: '2 semaines',
      prix: '13.58',
      monnaie: 'eur',
      definition: '13.58€/semaine',
      total: '39.5'
    }
  ]
  cardname: any;
  constructor(private router: ActivatedRoute, private navCtl: NavController) { }
  stripe = Stripe('pk_test_GZzhjw9fnXuqi5b6n9Zku8zr006b1WwAa5');
  ngOnInit() {
    if(this.router.snapshot.queryParams) {
      this.formule = this.router.snapshot.queryParams.formule
       console.log('formule choisie ', this.formule)
       this.choix = this.abonnement.find(e=> {
         return e.formule == this.formule
       })
       console.log('choix ', this.choix)
    }
      
      this.setupStripe()
  }
  goback() {
    this.navCtl.back()
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
      fetch('//localhost/stripe/index.php').then(e=> {
        return e.json()
      }).then(i=> {
        console.log('reponse ', i)
        this.stripe.confirmCardSetup(
          i.id,
          {
            payment_method: {
              card: this.card,
              billing_details: {
                name: this.cardname,
              },
            },
          }
        ).then(function(result) {
          console.log('resultat ', result)
          if (result.error) {
            // Display error.message in your UI.
          } else {
            // The setup has succeeded. Display a success message.
          }
        });
      })
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
  makePayment(result) {

  }
}
