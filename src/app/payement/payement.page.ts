import { monservice } from './../services/monserice';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
declare var Stripe, $, cordova, moment
@Component({
  selector: 'app-payement',
  templateUrl: './payement.page.html',
  styleUrls: ['./payement.page.scss'],
})
export class PayementPage implements OnInit {
  formule
  choix
  card: any;
  abonnement = this.service.abonnement
  cardname: any;
  url: any;
  loading: HTMLIonLoadingElement;
  constructor(private router: ActivatedRoute, private navCtl: NavController, private iab: InAppBrowser, public service: monservice, private navCtrl: NavController, public loadingController: LoadingController, private alertCtrl: AlertController ) { }
  stripe = Stripe('pk_test_GZzhjw9fnXuqi5b6n9Zku8zr006b1WwAa5');
  ngOnInit() {
        var url =   this.absolute(window.location.href)
        console.log("url absolute ", url[2])
        this.url = "http://"+ url[2]
        console.log("absolute ", this.absolute(window.location.href))
        window.open = (url, target?, opts?) => {
          this.openLink(url);
          return null;
       }
    if(this.router.snapshot.queryParams) {
      this.formule = this.router.snapshot.queryParams.formule
       console.log('formule choisie ', this.formule)
       this.choix = this.abonnement.find(e=> {
         return e.formule == this.formule
       })
       console.log('choix ', this.choix)
       sessionStorage.setItem("abonnement", JSON.stringify(this.choix))
    }
      
      this.setupStripes()
  }
  absolute(base) {
    var stack = base.split("/")
    //stack.pop(); // remove current file name (or empty string)
    
    return stack
}
  openLink(urlOpening: string) {
    const browser = this.iab.create(urlOpening, '_blank', 'location=yes,clearsessioncache=yes,clearcache=yes');   
    browser.executeScript
  }
  goback() {
    this.navCtl.back()
  }
  setupStripes () {
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
          this.makePayment(result.source.id);
             

        }
      });
    });
  }
  setupStripe() {

    // let elements = this.stripe.elements();
    // var style = {
    //   base: {
    //     color: '#32325d',
    //     lineHeight: '24px',
    //     fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    //     fontSmoothing: 'antialiased',
    //     fontSize: '16px',
    //     '::placeholder': {
    //       color: '#aab7c4'
    //     }
    //   },
    //   invalid: {
    //     color: '#fa755a',
    //     iconColor: '#fa755a'
    //   }
    // };

    // this.card = elements.create('card', { style: style });
    // console.log(this.card);
    // this.card.mount('#card-element');

    // this.card.addEventListener('change', event => {
    //   var displayError = document.getElementById('card-errors');
    //   if (event.error) {
    //     displayError.textContent = event.error.message;
    //   } else {
    //     displayError.textContent = '';
    //   }
    // });

    // var form = document.getElementById('payment-form');
    // form.addEventListener('submit', event => {
    //   var server = '//localhost'
    //   var server2 = 'https://kazimo.ga/cashapp'
      //this.url +"/payment-success"
      // fetch(server2+'/stripe/index.php', {method: 'POST', body: JSON.stringify({url: "https://mitashi-otha.com" })}).then(e=> {
      //   return e.json()
     // }).then(i=> {
      //  console.log('reponse ', i)
       // this.stripe.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
         // sessionId: i.id
       // }).then(function (result) {
        //  console.log('resultat ', result)
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
       // });
        // this.stripe.confirmCardSetup(
        //   i.id,
        //   {
        //     payment_method: {
        //       card: this.card,
        //       billing_details: {
        //         name: this.cardname,
        //       },
        //     },
        //   }
        // ).then(function(result) {
        //   console.log('resultat ', result)
        //   if (result.error) {
        //     // Display error.message in your UI.
        //   } else {
        //     // The setup has succeeded. Display a success message.
        //   }
        // });
     // })
      // event.preventDefault();

      // console.log(event)

      // this.stripe.createSource(this.card).then(result => {
      //   if (result.error) {
      //     var errorElement = document.getElementById('card-errors');
      //     errorElement.textContent = result.error.message;
      //   } else {
      //     console.log('resultat ', result);
      //     this.makePayment(result.id);
      //   }
      // });
    //});
  }
  makePayment(token) {
    var client = null;
    var server2 = 'https://kazimo.ga/cashapp'
    this.loader("Abonnement en cours...")
    //Recherchez si le user est deja abonné
    this.service.getCustomer().then(e=> {
      console.log('client ', e.customer)
        if(undefined !== e.customer) client = encodeURIComponent(e.customer)
        fetch(server2+'/stripe/index.php', {method: 'POST', body: JSON.stringify({token: token, abonnement: this.abonnement[0].formule, montant: Math.round(this.choix.total), customer: client, userid: this.service.utilisateur.id,  username: this.service.utilisateur.nom  })}).then(e=> {
          return e.json()
        }).then(e => {
          this.loading.dismiss()
          console.log('response ', e)
          if(e.operation.status_code == 200) {
             this.validepaiement(e.operation.customer)
          } else {
            this.alert("l'abonnement ne peut s'effectué")
          }
        }).catch(err=> {
          this.alert("Erreur du serveur: "+ err)
        })
    })
  }

   validepaiement(customer) {
    moment.locale("fr")
    var dates = moment().format('ll')
    var get_ab = JSON.parse(sessionStorage.getItem("abonnement")) || []
    if(Object.keys(get_ab).length >= 1) {
      get_ab.dates = dates
      this.loader("Abonnement en cours...")
      get_ab.user_id = this.service.utilisateur.id
      get_ab.customer = customer
      this.service.setAbonnement(get_ab).then(async e=> {
        console.log('resultat de l\'abonnement ', e)
        if(e.status == 200) {
          sessionStorage.removeItem('abonnement')
          this.loading.dismiss()
          this.navCtrl.navigateForward('payment-success')
        }
      
      })
    } else {
      this.alert('Vous êtes dejà abonné à cette formule. Choissisez une autre ou recommencez l\'opération')
    }
  }
  async loader(message) {
    this.loading = await this.loadingController.create({
      message: message
    });
    this.loading.present()
  }
  async alert(message) {
    this.loading.dismiss()
    const alert = await this.alertCtrl.create({
      header: 'Erreur',
      subHeader: "Impossible de continuer.",
      message: message,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: (blah) => {
           // this.service.logout()
            setTimeout(e=> {
                this.navCtl.navigateBack('home')
            }, 1500)
          }
        }
      ]
    });
    await alert.present();
  }
}
