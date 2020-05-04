import { NavController } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit } from '@angular/core';
declare var moment
@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  personne
  title = "Mes discussions"
  messages
  constructor(private service: monservice, private navCtrl: NavController) { }

  ngOnInit() {
    this.service.allperSub.subscribe((e: any)=> {
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
     if(this.personne.length >= 1) {
       this.compareDate()
     }
  
    })
  
  console.log('Mes messages ', this.personne)
  }
  getColor(etat) {
    return "#e0e0e0"
    //  etat ==0?'#e0e0e0':'#fff'
    //  return {
    //    "--background": etat
    //  }
  }
  compareDate() {
    var tab = []
    for(let i=0;i < this.personne.length;i++) {
      var chat = this.personne[i].chat
      var lastChat = chat[chat.length - 1]
      lastChat.image = this.personne[i].images
      lastChat.nom = this.personne[i].nom
      lastChat.id = this.personne[i].id
      var k = lastChat.etat==0?true:false
      var dest = lastChat.id_dest
      if(k == true && dest == this.service.utilisateur.id) {
        lastChat.color = true
      }
      tab.push(lastChat)
    }
    var e = tab.sort((a, b)=> {
      return <any>new Date(b.date_envoi) - <any>new Date(a.date_envoi);
    })
    console.log('getDAte ', e)
    this.messages = e
  }
  getLastMessage(chat) {
    var last = chat[chat.length - 1];
    return last.messages
  }
  getDate(chat) {
    var last = chat[chat.length - 1];
    // console.log('parse ', moment(last.dates).format())
    return last.dates
  }
  route(id) {
    this.navCtrl.navigateForward('chat', {queryParams: {id: id, routes: '/portail/users/messages', title: this.title}})
  }
  ionViewWillEnter(){
    this.service.getAllUser()
    this.service.setSubscriptionFavoris(true, this.title)
    this.service.subsciberAllperso()
  }
  ionViewWillLeave(){
   this.service.setSubscriptionFavoris(false, this.title)
  }
  ionViewDidEnter(){
   console.log('salutation')
  }
}
