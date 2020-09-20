import { Injectable } from '@angular/core';
import  { Subject, from } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
declare var $, moment, google
import { resolve } from 'url';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { JsonPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class monservice {
  abonnement = [
    {
      formule: 'Gold',
      periode: '6 Mois',
      prix: '6.87',
      monnaie: 'eur',
      definition: '6.87€/semaine',
      total: '179'
    },
    {
      formule: 'Silver',
      periode: '3 Mois',
      prix: '9.13',
      monnaie: 'eur',
      definition: '9.13€/semaine',
      total: '119'
    },
    {
      formule: 'Diamond',
      periode: '1 Mois',
      prix: '13.58',
      monnaie: 'eur',
      definition: '13.58€/semaine',
      total: '59'
    },
    {
      formule: 'Rubi',
      periode: '2 semaines',
      prix: '13.58',
      monnaie: 'eur',
      definition: '13.58€/semaine',
      total: '39.5'
    }
  ]
    utilisateur
    moi
    server1 = 'http://localhost'
    server2= 'https://kazimo.ga/cashapp'
    server3 = 'http://mitashi-otha.com/cashapp'
    url2 = this.server2+'/phpsoulmate/getAlluser.php'
    url3 = this.server2+'/phpsoulmate/setSug.php'
    url4 = this.server2+'/phpsoulmate/getUserCloud.php'
    url5 = this.server2+'/phpsoulmate/login.php'
    url6 = this.server2+'/phpsoulmate/getChat.php'
    url7 = this.server2+'/phpsoulmate/setChat--.php'
    url8 = this.server2+'/phpsoulmate/setFavoris.php'
    url9 = this.server2+'/phpsoulmate/setFlash--.php'
    url10 = this.server2+'/phpsoulmate/setMatch.php'
    url11 = this.server2+'/phpsoulmate/debloquer.php'
    url12 = this.server2+'/phpsoulmate/updateimage.php'
    url13 = this.server2+'/phpsoulmate/updateprofil.php'
    url14 = this.server2+'/phpsoulmate/updateabout.php'
    url15 = this.server2+'/phpsoulmate/updateInteret.php'
    url16 = this.server2+'/phpsoulmate/updatemode.php'
    url17 = this.server2+'/phpsoulmate/token.php'
    url18 = this.server2+'/phpsoulmate/setVue.php'
    url19 = this.server2+'/phpsoulmate/setEtat.php'
    url20 = this.server2+'/phpsoulmate/relative.php'
    url21 = this.server2+'/phpsoulmate/setVisite.php'
    url22 = this.server2+'/phpsoulmate/deletePhoto.php'
    url23 = this.server2+'/phpsoulmate/setgps.php'
    url24 = this.server2+'/phpsoulmate/setabonnement.php'
    url25 = this.server2+'/phpsoulmate/getabonnement.php'
    url26 =  this.server2+'/phpsoulmate/getcustomer.php'
    //....-_-
    url = this.server2+'/phpsoulmate/setUser.php';
    //..
    myroutes = 'portail'
    photo = '../assets/images/homme.png'
    type= 'formulaire'
    myLat
    myLong
    favoris
    titre
    facebook = {
      email: undefined,
      photo: undefined
    }
    favoriSub = new Subject()
    titreSub = new Subject()
   
     
    favoriSybscriber() {
      this.favoriSub.next(this.favoris)
      this.titreSub.next(this.titre) 
    }
    async getTimeRelative(data) {
      var i = $.ajax({
        method: "POST",
        url: this.url20,
        data: data,
        success: e=> {
          return e.temps
        }
      })
    return i
    }
   async getAbonnement() {
     var e = $.ajax({
        method: "POST",
        url: this.url25,
        data: {id: this.utilisateur.id},
        success: e=> {
          return e
        },
        fail: err=> {
          return "Impossible de recuperer vos abonnements ";
        }
      })
      return e
  }
    setUtilisateur(user) {
      this.utilisateur.push(user)
      this.utilsateurSubscription()
    }
    getUtilisateur() {
      return this.utilisateur
    }
    setVue(data) {
      $.ajax({
        method: 'POST',
        url: this.url18,
        data: data
      })
    }
   async setAbonnement(data) {
     var $e =   $.ajax({
        method: 'POST',
        url: this.url24,
        dataType: 'json',
        data: data
      }).done(e=> {
        return e
      }).fail(err=> {
        return {status: 100}
      })
      return $e
    }
    async getCustomer() {
     var $e =  $.ajax({
        method: 'POST',
        url: this.url26,
        dataType: 'json',
        data: {id: this.utilisateur.id}
      }).done(e=> {
        return e
      })
      return $e
    }
    // preload() {
    //   var all: any = this.Allpersonnes
    //  var tab = []
    //  if(all !== undefined) {
    //       let e: any = all.filter((i: any)=> {
    //         return i.album.length >= 1
    //       })
          
    //       for(let i = 0; i < e.length; i++) {
    //           for(let k = 0; k < e[i].album.length; k++) {
    //             var photo = e[i].album[k].photo
    //             tab.push(photo)
    //           }
    //       }
    //       console.log('aaaaaaa', tab)
    //       $.preload(tab, {
    //         onRequest: e=> {
    //           console.log('image mis en cache ', e)
    //         },
    //         onFinish: e=> {
    //           console.log('images preloader terminés', e)
    //         }
    //       })
    //  }
    // }
    setToken(token) {
      $.ajax({
        method: "POST",
        url: this.url17,
        data: {id: this.utilisateur.id, token: token}
      })
    }
    deletePhoto(name) {
      $.ajax({
        method: "POST",
        url: this.url22,
        data: {image: name},
        dataType: 'json',
        success: ()=> {

        }
      })
    }
    sendNotification(token, titre, description) {
      let key="AAAA5Nx-Uvk:APA91bG0kI-T9V_RjZ-aUa7j3BfLVapILV9E-ofGzbYLXLG-HEell9rMuuRQT9DO7g6jCHi92Lap2ShWpdLPX5MboAA2AcaHNor5JMVG9vr80j5nogS2J__A6Cvf5QehyYQoBxSWT2QI";
      $.ajax({        
        type : 'POST',
        url : "https://fcm.googleapis.com/fcm/send",
        headers : {
            Authorization : 'key=' + key
        },
        contentType : 'application/json',
        dataType: 'json',
        data: JSON.stringify({"to": token, "priority": "high", "notification": {"title":titre,"body":description, "forceStart": "1"}}),
        success : function(response) {
            console.log(response);
        },
        error : function(xhr, status, error) {
            console.log(xhr.error);                   
        }
    });
  }
    setSubscriptionFavoris(etat, titre) {
        this.favoris = etat
        this.titre = titre
        this.favoriSybscriber()
    }
    personnes =[]

    allperSub = new Subject()
    Allpersonnes
    subsciberAllperso() {
      this.allperSub.next(this.Allpersonnes)
    }
    updatemode(datas) {
      console.log('dataaaaaaa ', datas)
      for(let i = 0;i< this.Allpersonnes.length; i++) {
        if(this.Allpersonnes[i].id == this.utilisateur.id) {
          this.Allpersonnes[i].mode = datas
          this.subsciberAllperso()
          break
        }
      }
      $.ajax({
        method: 'POST',
        url: this.url16,
        data: datas,
        dataType: 'json',
        success: e=> {
          // code pourri
        }
      })
    }
   async updateInteret(data, table,Tabmod) {
    //  Penses à mettre à jour directement la table des  interets de l'user dans variables this.allperso, ensuite appeler le subscribe pour eviter la MAJ asynchrone
    //...
  
    console.log('tabmod ', Tabmod)
    for(let i = 0;i< this.Allpersonnes.length; i++) {
      if(this.Allpersonnes[i].id == this.utilisateur.id) {
        this.Allpersonnes[i].interets = Tabmod
        this.subsciberAllperso()
        console.log('nouvelle val ', this.Allpersonnes[i])
        break
      }
    }
    //... les data sont un tableau de valeur, ex: [{texte: 'xxxx', status: true}, {texte: '',...}]
      var datas = JSON.stringify(data)
      $.ajax({
        method: 'POST',
        url: this.url15,
        data: {data: encodeURIComponent(datas), id: this.utilisateur.id, table: table},
        success: e=> {
          console.log('ok success ')
          // Code pouri à bannir
        }
      })
    
    }
    updatePropos(personne) {
      for(let i = 0; i < this.Allpersonnes.length; i++) {
        if(this.Allpersonnes[i].id == personne.id) {
          this.Allpersonnes[i].about = personne.about
          $.ajax({
            method: "POST",
            url: this.url14,
            data: {id_user: this.utilisateur.id, about: personne.about}
          })
          this.subsciberAllperso()
          break
        }
      }
    }
    updateInfos(personne) {
      for(let i = 0; i < this.Allpersonnes.length; i++) {
        if(this.Allpersonnes[i].id == personne.id) {
          this.Allpersonnes[i].nom = personne.nom
          this.Allpersonnes[i].adresse = personne.adresse
          this.Allpersonnes[i].datenaiss = personne.datenaiss
          console.log('date ', personne, ' all ', this.Allpersonnes[i])
          $.ajax({
            method: "POST",
            url: this.url13,
            data: {id_user: this.utilisateur.id, nom: personne.nom, adresse: personne.adresse, dates: personne.datenaiss}
          })
          this.subsciberAllperso()
          break
        }
      }
    }
    async updateAllperson(imag1, album, newimage) {
        for(let i=0;i < this.Allpersonnes.length; i++) {
            if(this.Allpersonnes[i].id == this.utilisateur.id) {
              this.Allpersonnes[i].images = imag1
              this.Allpersonnes[i].album = album
              break
            }
        }
        var res = $.ajax({
              method: "POST",
              url: this.url12,
              data: {image: newimage, id: this.utilisateur.id},
              dataType: "JSON"
            }).done(e=> {
              console.log('mise ) jour de la photo effectuée !')
              return e
            }).fail(err=> {
              console.log('erreur lors de la mise à jour de la photo ', err)
              return false
            })
        this.subsciberAllperso()
      return res
    }
    debloquer(data) {
      $.ajax({
         method: 'POST',
         url: this.url11,
         data: data
      })
      this.subsciberAllperso()
    }
    personneSub = new Subject()
    personneSubscription() {
      this.personneSub.next(this.personnes)
    }
    auth: boolean = true
    userSubscriber = new Subject()
    utilisateurSubscriber = new Subject()
    // Variable filtres par defaut
    public genreVoulu
    public kilometreVoulu = 500
    public gps = true
    public ageMin = 18
    public ageMax = 70
    public online = false
    //fin
    gpsSubscr = new Subject()

    SubscriptionGps() {
      this.gpsSubscr.next(this.gps)
    }
    setGps(val) {
      this.gps = val
      val = val==true?1:0
      $.ajax({
        method: 'POST',
        url: this.url23,
        dataType: 'json',
        data: {valeur: val, id: this.utilisateur.id}
      }).done(()=> {
        this.getCloudUtilisateur()
      })
      this.SubscriptionGps()
    }
    setEnligne(val) {
      this.online = val
    }
    // ce tableau sert à contenir les matchings selon que le user à accepter ou non, je le recupere dans la route matchclose
    matching: any
    matchingSubscriber = new Subject()

    matchingsubscription() {
      this.matchingSubscriber.next(this.matching)
    }
    setMatching(data) {
      this.matching = data
      this.matchingsubscription()
    }
    getGenres() {
      if(this.utilisateur.genre =='Homme') {
        this.genreVoulu = 'Femme'
      } else {
        this.genreVoulu = 'Homme'
      }
    }
    setFlash(data) {
      $.ajax({
        method: 'POST',
        url: this.url9,
        data: data
      })
    }
    setFavoris(data) {
      $.ajax({
        method: 'POST',
        url: this.url8,
        data: data
      })
    }
    utilsateurSubscription() {
      this.utilisateurSubscriber.next(this.utilisateur)
    }
    userSubscription() {
      this.userSubscriber.next(this.personnes)
    }
    setSug(sujet, idpers) {
      $.ajax({
        method: 'POST',
        url: this.url3,
        data: {email:  this.utilisateur.email, sujet: sujet, id_pers: idpers},
        dataType: 'Json'
      })
    }
    async login(data) {
      var e = $.ajax({
        method: 'POST',
        url: this.url5,
        data: data,
        dataType: 'json'
      }).done(e=> {
        return e
      }).fail(err=> {
        return 'erreur lors du login '+ err
      })
      return e
    }
    constructor(private geolocation: Geolocation) {
      moment().locale('fr')
        this.getUtilsateurStorage()
        console.log('utilisateur ', this.utilisateur)
    }
    
    header = new HttpHeaders({'Content-Type': 'application/json', "Accept": 'application/json'})

   async setPhoto(img=this.photo) {
     this.utilisateur = this.moi
     
      this.photo = img
      this.setPicture(img)
      var date = moment().format()
      this.utilisateur.dateInscri = date
      this.utilisateur.type = this.type
      this.utilisateur.latitude = this.myLat
      this.utilisateur.longitude = this.myLong
      this.utilisateur.image = img
      this.utilisateur.photo = img
      var data = this.utilisateur

     

      data.image = encodeURIComponent(data.image)
      console.log('donée a envoyé ', this.utilisateur)
      //Mise à jour des data user dans la BDD
          var e = $.ajax({
            method: 'POST',
            url: this.url,
            data: data
          }).done((response)=> {
            console.log('mise à jour des données users ', response)
            response = JSON.parse(response)
            this.utilisateur.id = response.id
            this.storeUser(this.utilisateur)
             console.log('moiii ', 'img ',  img,  this.moi, 'utili ', this.utilisateur, ' response ', response)
          }).fail((err)=> {
            console.log('erreur lors de la mise à jour des données users ', err)
          })
          return e
    }
    
    // FAKER
    setPersonne() {
      return
      for(let i=0;i<this.personnes.length;i++) {
        if(this.personnes[i].album.length >= 1) {
          for(let e=0;e<this.personnes[i].album.length;e++) {
                var image = this.personnes[i].album[e].image
                var id = this.personnes[i].index
                $.ajax({
                  url: this.server1+'/phpsoulmate/setPhoto.php',
                  method: 'POST',
                  data: {id: id, image: image}
                })
            }
          
        }
        
        var user = {
          nom: this.personnes[i].nom,
          genre: this.personnes[i].genre,
          datenaiss: this.personnes[i].dateNaiss,
          email: this.personnes[i].email,
          lieux: this.personnes[i].address,
          password: '',
          tel: this.personnes[i].phone,
          dateInscri: moment().format(),
          image: this.personnes[i].photo,
          latitude: this.personnes[i].latitude,
          longitude: this.personnes[i].longitude,
          type: 'formulaire'
        }
          //Mise à jour des data user dans la BDD
          var e = $.ajax({
            method: 'POST',
            url: this.url,
            data: user
          }).done((response)=> {
            console.log('mise à jour des données fakes ', response)
          }).fail((err)=> {
            console.log('erreur lors de la mise à jour des données fakes ', err)
          })
      }
    }
    // Recuperer tous les users
    
   async getAllUser() {
      var r = $.ajax({
        method: 'POST',
        url: this.url2,
        data: {email: this.utilisateur.email},
        dataType: 'Json'
      }).done(res=> {
        for(let i=0;i < res.length;i++) {
          if(res[i].album.length >= 1) {
            for(let e=0;e < res[i].album.length;e++) {
              res[i].album[e].id = e
              // res[i].album[e].id = res[i].id
            }
          }
        }
          this.Allpersonnes = res
          this.subsciberAllperso()
          console.log('aaaaaaallll ', this.Allpersonnes)
          //this.personnes = this.Allpersonnes
          this.userSubscription()
          return this.filtrage(res)
      })
      console.log('rrrr ', r)
      return r
    }
    
    filtrage(data) {

    // filtre
        var filter = {
          genre: this.genreVoulu,
          kilometre: this.kilometreVoulu,
          ageMinVoulu: this.ageMin,
          ageMaxVoulu: this.ageMax,
          monId: this.utilisateur.id
        }
        // methode du filtre

      this.personnes = data.filter(item=> {
        for(var key in filter) {
          var ageUser = moment().format('Y') - moment(item['datenaiss']).format('Y')
          console.log('age min ', filter.ageMinVoulu, "ageMAx ", filter.ageMaxVoulu, "GPS ", this.gps, " kilometre ", filter.kilometre)
          if(this.online == true) {
              if(item['etat'] !== '1') {
                return false
              }
          }
          
          if(item['genre'] !== this.genreVoulu || ageUser < filter.ageMinVoulu || ageUser > filter.ageMaxVoulu || item['id'] == filter.monId ) {
            return false
          }
            if(this.gps == true) {
                if(item['kilometre'] > filter.kilometre) {
                  return false
                }
              } 
          }
        return true
      })
      this.matching = data.filter(i=> {
            return i.flash.etat == true
      })
      this.matching = this.matching.sort((a, b)=> {
        if (a.id < b.id ) {
        return 1;
      }
      if (a.id > b.id ) {
        return -1;
      }
      return 0;
  })
      this.matchingsubscription()
      this.userSubscription()
      console.log('mes utilisateur ', this.personnes, "data",data, ' mes matching ', this.matching)
      return this.personnes
    }
   
   
    //Mise à jour du match lorsque l'utilisateur click sur le coeur ou la X
    setMatch(index, reponse) {
       for(var i=0;i< this.Allpersonnes.length;i++) {
         if(this.Allpersonnes[i].id == index) {
           this.Allpersonnes[i].flash.reponse = reponse
           break
         }
       }
        $.ajax({
          method: "POST",
          url: this.url10,
          data: {id: this.utilisateur.id, id_flasheur: index, etat: reponse},
          dataType: "json"
        })
      }
    getStorageUser() {
      let user = JSON.parse(localStorage.getItem('user')) || []
      user.length <=0? this.auth= false:this.auth = true
      this.utilisateur = user
     this.utilisateur.gps ==1?true:false
      this.gps = this.utilisateur.gps
      this.utilsateurSubscription()
      return {
            user: this.utilisateur,
            auth: this.auth
      }
    }
    myroute = false
    getUtilsateurStorage() {
      this.utilisateur = JSON.parse(localStorage.getItem('user')) || []
    }
    async getCloudUtilisateur() {
     var email = this.utilisateur.email
     var i = $.ajax({
        method: 'POST',
        url: this.url4,
        data: {email: email}
      }).done(e=> {
        var user = JSON.parse(e)
        user = user[0]
        console.log('eeeee ', user)
        user.gps == null?1:user.gps
        localStorage.setItem('user', JSON.stringify(user))
        this.utilisateur = user
        this.utilsateurSubscription()
        return user
      }).fail(err=> {
        return 'erreur lors de la recuperation de tes données'
      })
      return i
    }
    setMyroute(etat) {
      this.myroute = etat
    }
    getLocalization() {
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
       // data can be a set of coordinates, or an error (if an error occurred).
       // data.coords.latitude
       // data.coords.longitude
        this.myLat = data.coords.latitude,
        this.myLong = data.coords.longitude
      });
      return watch
    }
   async getChat(data) {
      var e = $.ajax({
        method: 'POST',
        url: this.url6,
        data: data,
        dataType: 'json'
      }).done(e=> {
        return e
      }).fail(err=> {
        return "erreur lors de la recuperation des conversations "+ err
      })
      return e
   }
   setChat(data) {
     var chat = {
       chaine: data.chaine,
       dates:data.dates,
       email: this.utilisateur.email,
       id: this.utilisateur.id,
       id_dest: data.idRecep,
       id_exp: data.idExp,
       photo: data.photo,
       messages: data.message,
       nom: this.utilisateur.nom,
       image: data.photo
     }
     var id  = data.idRecep
     for(let i =0;i < this.Allpersonnes.length; i++) {
       if(this.Allpersonnes[i].id == id) {
         this.Allpersonnes[i].chat.push(chat)
         this.subsciberAllperso()
         break
       }
     }
     $.ajax({
       method: "POST",
       url: this.url7,
       data: data,
       dataType: 'Json'
     }).done(e=> {

     }).fail(err=> {

     })
   }
    async getMyPosition() {
         var q =  this.geolocation.getCurrentPosition().then((resp) => {
            this.myLat = resp.coords.latitude,
            this.myLong = resp.coords.longitude
            return {
              latitude: this.myLat,
              longitude: this.myLong
            }
        })
        return q
  }
    logout() {
    this.Allpersonnes = []
    this.setOnline({id: this.utilisateur.id, etat: 0})
      localStorage.removeItem('user');
      this.auth = false
    }
    Setpopover() {
      var ck = localStorage.getItem('pop')
      console.log('popover ', ck)
      if(ck !== undefined) {
        localStorage.setItem('pop', JSON.stringify({pop: true}))
      }
    }
    setOnline(data) {
      $.ajax({
        method: 'POST',
        url: this.url19,
        data: data
      })
    }
    storeUser(profil) {
        if(profil.image == undefined) {
          profil.image = this.photo
        }
        if( profil.latitude == undefined) {
          profil.latitude = this.myLat
          profil.longitude = this.myLong
        }
        let log = JSON.parse(localStorage.getItem('user')) || []
        if(profil.gps==null) {
          profil.gps = 1
        }
        console.log('profiiil ', profil)
        localStorage.setItem('user', JSON.stringify(profil))
        this.utilisateur = JSON.parse(localStorage.getItem('user'))
    }
    // ajout de la photo de profil
    setPicture(image) {
      let log = JSON.parse(localStorage.getItem('user')) || []
      log.images = image
      localStorage.setItem('user', JSON.stringify(log))
    }
     // Recuperer le quartier ou la ville
   async displayLocation(latitude, longitude) {
    var request = new XMLHttpRequest();
    var method = 'GET';
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true&v=3.22&key=AIzaSyBT48OIWbmMipZUx6LnK7bHTXqK2uofyFI';
  
    var res = $.ajax({
      url: url,
      method: 'GET',
      success: (res)=> {
        var data = res;
        var address = data.results[0];
        var obj = {status: 200, quartier: address.formatted_address}
        return obj
      },
      error: (err)=> {
        errorCallback(err)
        var obj2 = {status: 500, quartier: '', erreur: errorCallback(request)}
        return obj2
      }
    })
     var errorCallback = (error)=> {
      var errorMessage = 'Unknown error';
      switch(error.code) {
        case 1:
          errorMessage = 'Permission refusé';
          break;
        case 2:
          errorMessage = 'Position indisponible';
          break;
        case 3:
          errorMessage = 'Temps de reponse ecoulé';
          break;
      }
      return errorMessage;
    };
    return res
  };
  //Recuperer les Kms
  getKms(lat, long) {
    var srcLocation = new google.maps.LatLng(this.myLat, this.myLong);
    var dstLocation = new google.maps.LatLng(lat, long);
    var distance = google.maps.geometry.spherical.computeDistanceBetween(srcLocation, dstLocation)
   // console.log('distance ', distance/1000); // Distance in Kms.
    return Math.round(distance/1000)
  }
}