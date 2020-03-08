import { monservice } from './../services/monserice';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, AlertController, ToastController, IonCol  } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $, moment, Pusher
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  form: FormGroup
  myroute = "/voirplus/route/main"
  personne
  user
  texte
  chaine
  @ViewChild(IonContent, {'static': false}) content: IonContent;
  @ViewChild(IonCol, { read: ElementRef, static: true }) private chatList: ElementRef
  chating = [
  
  ]
  private mutationObserver: MutationObserver
  constructor(public router:ActivatedRoute, private service: monservice,public alertController: AlertController, public toastController: ToastController, private formBuild: FormBuilder) { }

  ngOnInit() {
    moment.locale('fr')
    var h1 = $('ion-header').height() - $('.myform').height()
    var taill = $('app-chat') - h1
   $('#mydiv').css({'height':  taill+'px', 'overflow-y': 'auto'})
   console.info('bbb ', h1)
    console.log(this.router.snapshot.queryParams)
    var id = this.router.snapshot.queryParams.id
    this.personne = this.service.personnes.find(res=> {
      return res.id == id
    })
   
    this.service.utilisateurSubscriber.subscribe(e=> {
      this.user = e
    })
   this.service.utilsateurSubscription()
   this.service.getCloudUtilisateur()
    console.log('user', this.user)
    console.log('personne', this.personne)
    this.chaine = this.user.chaine_notif
       this.service.getChat({id: this.user.id, id_user: this.personne.id}).then(e=> {
      console.log('recuperation des chats ', e)
      if(e.length>=1) {
        this.chaine = e[0].chaine
        console.log('il y a deja une chaine ', this.chaine)
        this.chating = e
      } else {
        this.chaine = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        console.log('pas de chaine, nouvelle chaine ', this.chaine)
      }
    //Pusher
    var pusher = new Pusher('cd29f2f1d7ed1ce9bd9c', {
      cluster: 'eu',
      encrypted: true
      //forceTLS: true
    });
    var channel = pusher.subscribe(this.chaine);
      channel.bind('my-event', (data)=> {
        console.log('data pusher', data);
        this.chating.push(data)
        // window.scrollTo(0,document.body.scrollHeight);
        var element = document.getElementById('mydiv');
        //element.scrollTop = element.scrollHeight - element.clientHeight;
        $('#mydiv').animate({scrollTop: document.body.scrollHeight},"fast");
      });
    }).catch(err=> {
        this.presentToast('impossible de recuperer vos conversations ')
    })
    this.form = this.formBuild.group({
      message: ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    })
  }

  ionViewDidEnter() {
    $('#mydiv').animate({scrollTop: document.body.scrollHeight},"fast");
  }
  ngAfterViewInit() {
 
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }
  getAge(an) {
    return moment().format('Y') - moment(an).format('Y') + 'ans'
  }
  envoi() {
    var message = this.texte
    let dates = moment().format('dddd DD MMMM.YYYY à HH:mm')
    let dateMoment = moment().format()
    var chaine = this.chaine
    var photo = this.user.images
    var nom = this.user.nom
    var obj = {idExp: this.user.id, idRecep: this.personne.id, message: message, dates: dates, nom: nom, photo: photo, chaine: chaine, chaineRecep: this.personne.chaine_notif, dateMoment: dateMoment}
    this.service.setChat(obj)
    this.form.reset()
  }
  slot(email) {
    return this.user.email == email?'end':'start'
  }
  align(email) {
    return this.user.email == email?'right':'left'
  }
}
