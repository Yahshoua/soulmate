import { NavController, ToastController } from '@ionic/angular';
import { monservice } from './../services/monserice';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var $, moment

@Component({
  selector: 'app-voirpersonne',
  templateUrl: './voirpersonne.page.html',
  styleUrls: ['./voirpersonne.page.scss'],
})
export class VoirpersonnePage implements OnInit {
  @Input() user
  personne: any
  slide
  pages = false
  interet = {
  }
  mode = {

  }
  ObjMode: any = []
  ObjInteret:any = []
  suggetion: any = []
  affSugPhot: boolean
  affSugAbouts: boolean
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  @ViewChild('loopSlider', {static: true}) loopSlider;
  constructor(public router:ActivatedRoute, private service: monservice, private navCtrl: NavController, private route: Router, public toastController: ToastController) { }
  monstyle(al) {
    let style=  {
        'background-image': 'url('+al.photo+')', 
      'height': $('app-voirplus').height()/2 + 'px', 
      'background-size': 'cover',
      'background-position': 'center',
      'width': '100%'
     }
     // console.log('taille ', $('app-proposition').height())
     return style
  }
  ngOnInit() {
    console.log('useeer ', this.personne, 'tableau interet ', this.ObjInteret)
    console.log(this.router.snapshot.queryParams)
    var index = this.router.snapshot.queryParams.id
    this.slide = this.router.snapshot.queryParams.slide

    this.personne = this.service.Allpersonnes.find(res=> {
      return res.id == index
    })
    console.log('album ', this.personne.album)
    var i = this.personne.album.find(e=> {
      return e.photo == this.personne.images
    })
    console.log('iiii ', i)
        if(i == undefined) {
        var k =  this.personne.album.push({id: this.personne.album.length+1,photo: this.personne.images})
          this.personne.album = this.personne.album.sort((a, b)=> {
            if (a.id < b.id ) {
            return 1;
          }
          if (a.id > b.id ) {
            return -1;
          }
          return 0;
      })
    }

      console.log('personne ', this.personne, 'taille album ', this.personne.album.length)
      this.interet = this.personne.interets
      this.mode = this.personne.mode
      this.suggetion = this.personne.suggetion
      this.affSugPhoto()
      this.affSugAbout()
    this.loopSlider.lockSwipes(true)
    if(this.personne.album.length > 1 ) {
      this.pages = true
      this.loopSlider.lockSwipes(false)
    }
    var ObjMode = Object.keys(this.interet).length
    if(ObjMode >=1) {
      for(let ints in this.mode) {
          if(this.mode[ints] !== null && this.mode[ints] !== '') {
            this.ObjMode.push({
              libelle: ints,
              value: this.mode[ints]
            })
          }
      }
    }
    
      var myobj = Object.keys(this.interet).length
      console.log('interet', this.interet, 'taille de l objet ', Object.keys(this.interet).length)
      if(myobj >= 1) {
            for(let ints in this.interet) {
            console.log('interet ', ints)
            switch(ints) {
              case 'music':
                var icon = 'musical-notes-outline'
                var color = 'green'
                break
              case 'film':
                var icon = 'film-outline'
                var color = 'yellow'
                break
              case 'passeTemps':
                  var icon = 'hourglass-outline'
                  var color = 'red'
                break
              case 'sport':
                    var icon = 'football-outline'
                    var color = 'blue'
                    break
              case 'aime':
                    var icon = 'heart-outline'
                    var color = 'pink'
                    break
              case 'deteste':
                    var icon = 'heart-dislike-outline'
                    var color = 'gray'
                    break
            }
            
            if(this.interet[ints] !== null && this.interet[ints] !== '' && this.interet[ints] !== '[]') {
              this.ObjInteret.push({
                libele: ints,
                titre: this.interet[ints],
                icon: icon,
                color: color
              })
            }
        }
      }
      
  }
  ionViewWillLeave(){
    this.service.getAllUser()
    
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      cssClass: 'myToast2'
    });
    toast.present();
  }
  affSugPhoto() {
    if(this.suggetion.length >=1) {
      var aff = this.suggetion.find(e=> {
        return e.sujet == 1
      })
      console.log( 'aff ', aff, 'type ', typeof aff)
      if(typeof aff !== 'undefined') {
        this.affSugPhot = false
      } else {
        this.affSugPhot = true
      }
    } else {
      this.affSugPhot = true
    }
    console.log('sugg photo ', this.affSugPhot, ' sugg ', this.suggetion)
  }
  demander(sujet) {
      this.service.setSug(sujet, this.personne.id)
      if(sujet == 1) {
        this.presentToast('Demande d\'ajout de photo envoyée')
        this.service.sendNotification(this.personne.token, "Suggetion", this.service.utilisateur.nom+" Te demande + de photo de toi")
        this.affSugPhot = false
      } else {
        this.presentToast('Demande d\'ajout de description envoyée')
        this.service.sendNotification(this.personne.token, "Suggetion", this.service.utilisateur.nom+" Te demande d'ajouter une description de toi")
        this.affSugAbouts = false
      }
  }
  affSugAbout() {
    if(this.suggetion.length >=1) {
      var aff = []
      aff = this.suggetion.find(e=> {
        return e.sujet == 2
      })
      console.log('xxxx', aff, 'type ', typeof aff)
      if(typeof aff !== 'undefined') {
        this.affSugAbouts = false
      } else {
        this.affSugAbouts = true
      }
    } else {
      this.affSugAbouts = true
    }
  }
  tap() {
    this.service.setMyroute(true)
    this.loopSlider.getActiveIndex().then(index=> {
      this.route.navigate(['voirplus/route/diapo'], {queryParamsHandling: "merge", queryParams: {slide2: index, index: this.personne.index}})
    })
  }
  getAge(date) {
   if(date == null) return
    var age = moment(date).format('Y')
     return moment().format('Y') - age + ' ans'
  }
  getKms(km) {
    var kM = Math.round(km)
    if(kM <= 1) {
      return "< 1"
    }
    return kM
  }
  parsing(data) {
    
    if(typeof data == 'string' && typeof data !== 'object' && data !== null && data.length >= 1) {
      console.log('data ', data, 'datype ', typeof data, 'taille ', data.length)
      var k = ''
      var e = JSON.parse(data)
      for(let i =0;i < e.length; i++) {
        if(i>0 && i < e.length) {
          k+= ","+ e[i].texte
        } else {
          k+= e[i].texte
        }
      }
      return k
    }
  }
}
