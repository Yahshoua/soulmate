import { NavController } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  personne
  title = "Mes discussions"
  constructor(private service: monservice, private navCtrl: NavController) { }

  ngOnInit() {
    this.service.personneSub.subscribe((e: any)=> {
        e = e.sort((a, b)=> {
          if (a.id < b.id ) {
          return 1;
        }
        if (a.id > b.id ) {
          return -1;
        }
        return 0;
    })
      this.personne = e.filter((res: any)=> {
         return res.chat.length >= 1
      })
  })
  
  console.log('Mes messages ', this.personne)
  }
  getLastMessage(chat) {
    var last = chat[chat.length - 1];
    return last.messages
  }
  getDate(chat) {
    var last = chat[chat.length - 1];
    return last.dates
  }
  route(id) {
    this.navCtrl.navigateForward('chat', {queryParams: {id: id, routes: '/portail/users/messages', title: this.title}})
  }
  ionViewWillEnter(){
    this.service.getAllUser()
    this.service.setSubscriptionFavoris(true, this.title)
    this.service.personneSubscription()
  }
  ionViewWillLeave(){
   this.service.setSubscriptionFavoris(false, this.title)
  }
  ionViewDidEnter(){
   console.log('salutation')
  }
}
