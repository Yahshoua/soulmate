import { monservice } from './../services/monserice';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonContent, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';
declare var $, moment
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  @ViewChild('loopSlider', {static: true}) loopSlider;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  formInscription: FormGroup
  color2= 'light'
  color1= 'light'
  genre
  dateNaissance
  numero
  email
  Femail
  password=''
  Fpass
  nom
  Fnom
  lieux= ''
  EmailExiste
  clkGPS = false
  localization = true
  toto = false
  customMonthShortNames = ['Janv', 'Fev', 'Mar', 'Avr', 'Mai', 'Ju', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'];
  constructor(private navCtrl: NavController, public formBuild: FormBuilder, private service: monservice, private geolocation: Geolocation, private alertController: AlertController, public toastController: ToastController) { }

  ngOnInit() {
    this.service.setPersonne()
    this.loopSlider.lockSwipes(true)
    this.formInscription = this.formBuild.group({
      genre: '',
    })
    this.email = this.service.facebook.email
  }
  getPosition() {
    this.clkGPS = true
    this.geolocation.getCurrentPosition().then((resp) => {
      this.toto = false
      console.log(resp.coords.latitude)
      console.log(resp.coords.longitude)
      this.service.myLat = resp.coords.latitude
      this.service.myLong = resp.coords.longitude
      this.service.displayLocation(resp.coords.latitude, resp.coords.longitude).then(async (res: any)=> {
          console.log('status ', res)
          if(res.status == 'OK') {
              this.lieux = res.results[0].formatted_address
          } else if(res.status !== 'OK') {
            this.lieux = ''
            this.presentAlert(res.erreur)
          }
      })
      this.loopSlider.lockSwipes(false)
      this.loopSlider.slideNext()
    }).catch((error) => {
       console.log('Error getting location', error);
       var message = 'Nous n\'avons pas pu trouver ta position GPS !'
       this.presentAlert(message)
       this.toto = true
       this.clkGPS = false
     });
  }
  checkEmail() {
    console.log('check email ...')
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let e = re.test(String(this.email).toLowerCase())
    if(e == true) {
        $.ajax({
          method: 'POST',
          url: this.service.server2+'/phpsoulmate/checkmail.php',
          data: {email: this.email},
          dataType: 'json',
          success: async(e: any)=> {
            if(e.reponse== true) {
              // si l'email existe deja
              this.EmailExiste = true
              const toast = await this.toastController.create({
                message: 'Cette adresse émail existe dèjà !',
                duration: 3000,
                color: 'danger',
                position: 'top'
              });
              toast.present();
            } else {
              this.EmailExiste = false
            }
          }
        })
    } else {
      this.Femail = true
    }
  }
  async presentAlert(erreur) {
    const alert = await this.alertController.create({
      header: 'Problème',
      subHeader: 'Erreur de localisation GPS',
      message: erreur,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ],
    });
    await alert.present();
  }
  seclect1() {
    this.color1 = 'primary'?'primary':'light'
    this.color2 = 'light'
    this.genre = 'Homme'
  }
  seclect2() {
    this.color2 = 'primary'?'primary':'light'
    this.color1 = 'light'
    this.genre = 'Femme'
  }
  goback() {
    this.navCtrl.back()
  }
  next() {
    if(this.genre !== undefined) {
      this.loopSlider.lockSwipes(false)
      this.loopSlider.slideNext()
    }
  }
  next2() {
    if(this.dateNaissance !== undefined) {
      this.loopSlider.lockSwipes(false)
      this.loopSlider.slideNext()
    }
  }
  next0() {
    if(this.nom == undefined || this.nom.length < 4) {
        this.Fnom = true
    } else {
      this.Fnom = false
      this.loopSlider.lockSwipes(false)
      this.loopSlider.slideNext()
    }
  }
  next3() {
    this.loopSlider.lockSwipes(false)
    this.loopSlider.slideNext()
  }
  next4() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let e = re.test(String(this.email).toLowerCase())
    if(e == false) {
      this.Femail = true
    } else {
      this.Femail = false
    }
    if(this.password == undefined || this.password.length <= 6) {
      this.Fpass = true
    } else {
      this.Fpass = false
    }
    if(this.Femail == false && this.Fpass == false && this.EmailExiste == false) {
       var profil = {
          nom: this.nom,
          genre: this.genre,
          datenaiss: this.dateNaissance,
          email: this.email,
          tel: this.numero,
          lieux: this.lieux,
          password: this.password
       }
       this.service.moi = profil
this.navCtrl.navigateForward('capture')
    }
  }
  finish() {
    var next = this.loopSlider.getActiveIndex().then(index=> {
      console.log('index ', index)
    })
    console.log('next ', next)
    this.loopSlider.lockSwipes(true)
  }
}
