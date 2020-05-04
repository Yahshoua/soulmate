import { monservice } from './../services/monserice';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
declare var Pusher
@Component({
  selector: 'app-tabs-portail',
  templateUrl: './tabs-portail.component.html',
  styleUrls: ['./tabs-portail.component.scss'],
})

export class TabsPortailComponent implements OnInit {
  notifications = {
    matche: [],
    chat: []
  }
  chaine
  personnes
  constructor(private navCtrl: NavController, private service: monservice) { }

  ngOnInit() {
   var k = this.service.allperSub.subscribe((e: any)=> {
          if(e !== undefined) {
            this.notifications = {
              matche: [],
              chat: []
            }
              this.notifications.matche = e.filter(i=> {
                return i.flash.reponse == 0
              })
               var j = e.filter(pk=> {
                    return pk.chat.length >= 1 
                })
                    if(j !== undefined) {
                      for(let i =0; i < j.length; i++) {
                          for(let e= 0; e < j[i].chat.length; e++) {
                              if(j[i].chat[e].etat == 0 && j[i].chat[e].id_dest == this.service.utilisateur.id) {
                                this.notifications.chat.push(j[i].chat[e])
                              }
                          }
                      }
                    }
              }
          console.log('notifications ', this.notifications, ' j', j)
    })
    this.service.subsciberAllperso()
   
    this.service.getAllUser().then(e=> {
          this.chaine = this.service.utilisateur.chaine_notif
          console.log('utilisateur ', this.service.utilisateur)
                //Pusher
            var pusher = new Pusher('cd29f2f1d7ed1ce9bd9c', {
              cluster: 'eu',
              encrypted: true
              //forceTLS: true
            });
            var channel = pusher.subscribe(this.chaine);
              channel.bind('my-event', (data)=> {
                  console.log('notification ', data)
                  if(data.type == 'chat') {
                    this.notifications.chat.push(data)
                  } else {
                    this.notifications.matche.push(data)
                  }
              })

    })
    
  }
  goProfil() {
      this.navCtrl.navigateRoot('/portail/users/profil/route/accueil')
  }
  goMessage() {
    this.navCtrl.navigateRoot('portail/users/messages')
  }
}
