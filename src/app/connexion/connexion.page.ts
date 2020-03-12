import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { NavController, ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
declare var $, moment
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  formConnexion: FormGroup
  password: ''
  email: ''
  role
  loading
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,public formBuild: FormBuilder, private service: monservice, private alertCtrl: AlertController, private toastCtrl: ToastController, public loadingController: LoadingController) { }
  ngOnInit() {
    this.formConnexion = this.formBuild.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4),Validators.maxLength(10)])]
    })
  }
  connexion() {
    var email = this.formConnexion.value.email
    var password = this.formConnexion.value.password
    console.log('email ', email, ' password ', password)
    this.presentLoading()
    this.service.login({email: email, password: password}).then(async (e: any)=> {
      setTimeout(()=> {
        this.loading.dismiss()
        console.log('resultat de la connexion ', e, 'type of ', typeof e)
        if(e.length <= 0) {
        this.presentToast('Votre email ou mot de passe de nous dis rien !')
        } else {
          var user = e[0]
          console.log('utilsya ', user)
          this.service.storeUser(user)
          this.navCtrl.navigateForward('portail')
          this.service.auth = true
        }   
        
    }, 2000)
      
    }).catch(async (err)=> {
      this.loading.dismiss()
      console.log('err ', err)
      if(err.status == 400) {
          this. alertError('Nous avons rencontré un problème dans nos serveurs', err.status)
      } else if(err.status ==0) {
       this. alertError('Revoyez votre connexion internet !', err.status)
      }
    })
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Patientez'
    });
    await this.loading.present();

    // this.role =  loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
    async alertError(message, code) {
      const alert = await this.alertCtrl.create({
        header: 'Erreur',
        subHeader: "Vous ne pouvez pas vous connecter.",
        message: message,
        buttons: ['OK']
      });
  
      await alert.present();
    } 
     async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      color: 'danger',
      cssClass: 'myToast2'
    });
    toast.present();
  }
}
