import { monservice } from './../services/monserice';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonContent } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';
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
  password
  Fpass
  nom
  Fnom
  lieux= ''
  customMonthShortNames = ['Janv', 'Fev', 'Mar', 'Avr', 'Mai', 'Ju', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'];
  constructor(private navCtrl: NavController, public formBuild: FormBuilder, private service: monservice, private geolocation: Geolocation, private alertController: AlertController) { }

  ngOnInit() {
    this.loopSlider.lockSwipes(true)
    this.formInscription = this.formBuild.group({
      genre: '',
    })
    this.geolocation.getCurrentPosition().then((resp) => {
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
    }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  async presentAlert(erreur) {
    const alert = await this.alertController.create({
      header: 'Problème',
      subHeader: 'Erreur de localisation GPS',
      message: erreur,
      buttons: ['OK']
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
    if(this.nom == undefined || this.nom <= 4) {
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
    if(this.password == undefined || this.password.length <= 3) {
      this.Fpass = true
    } else {
      this.Fpass = false
    }
    if(this.Femail == false && this.Fpass == false) {
       var profil = {
          nom: this.nom,
          genre: this.genre,
          datenaiss: this.dateNaissance,
          email: this.email,
          tel: this.numero,
          lieux: this.lieux,
          password: this.password
       }
       this.service.storeUser(profil)
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
