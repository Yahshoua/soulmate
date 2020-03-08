import { Injectable } from '@angular/core';
import  { Subject, from } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
declare var $, moment, google
import { resolve } from 'url';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Injectable({
  providedIn: 'root'
})
export class monservice {
    utilisateur
    server1 = 'http://localhost'
    server2= 'https://kazimo.ga/cashapp'
    url2 = this.server1+'/phpsoulmate/getAlluser.php'
    url3 = this.server1+'/phpsoulmate/setSug.php'
    url4 = this.server1+'/phpsoulmate/getUserCloud.php'
    url5 = this.server1+'/phpsoulmate/login.php'
    url6 = this.server1+'/phpsoulmate/getChat.php'
    url7 = this.server2+'/phpsoulmate/setChat.php'
    url8 = this.server1+'/phpsoulmate/setFavoris.php'
    url9 = this.server1+'/phpsoulmate/setFlash.php'
    myroutes = 'portail'
    photo = '../assets/images/homme.png'
    type= 'formulaire'
    myLat
    myLong
    personnes =[]
    personneSub = new Subject()
    personneSubscription() {
      this.personneSub.next(this.personnes)
    }
    auth: boolean = true
    userSubscriber = new Subject()
    utilisateurSubscriber = new Subject()
    genreVoulu
    kilometreVoulu = 3
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
    url = this.server1+'/phpsoulmate/setUser.php';
    header = new HttpHeaders({'Content-Type': 'application/json', "Accept": 'application/json'})

   async setPhoto(img=this.photo) {
      this.photo = img
      this.setPicture(img)
      var date = moment().format()
      this.utilisateur.dateInscri = date
      this.utilisateur.type = this.type
      this.utilisateur.latitude = this.myLat
      this.utilisateur.longitude = this.myLong
      //Mise à jour des data user dans la BDD
          var e = $.ajax({
            method: 'POST',
            url: this.url,
            data: this.utilisateur
          }).done((response)=> {
            console.log('mise à jour des données users ', response)
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
    filter = {
      genre: this.genreVoulu,
      kilometre: this.kilometreVoulu
    }
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
              res[i].album[e].id = res[i].id
            }
          }
        }
          return this.filtrage(res)
      })
      return r
    }
    filtrage(data) {
      this.personnes = data.filter(item=> {
        for(var key in this.filter) {
          if(item['genre'] !== this.genreVoulu || item['kilometre'] > this.filter.kilometre) {
            return false
          }
        }
        return true
      })
      this.matching = data.filter(i=> {
          if(i.length >= 1) {
            return i.flash.etat == true
          } else {
            return []
          }
      })
      this.matchingsubscription()
      this.userSubscription()
      console.log('mes utilisateur ', this.personnes, 'mes matching ', this.matching)
      return this.personnes
    }
   
   
    //Mise à jour du match lorsque l'utilisateur click sur le coeur ou la X
    setMatch(index, etat) {
       for(var i=0;i< this.personnes.length;i++) {
         if(this.personnes[i].index == index) {
           this.personnes[i].flash.reponse = etat
           break
         }
       }
    }
    getStorageUser() {
      let user = JSON.parse(localStorage.getItem('user')) || []
      user.length <=0? this.auth= false:this.auth = true
      this.utilisateur = user
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
    storeUser(profil) {
        if(profil.image == undefined) {
          profil.image = this.photo
        }
        if( profil.latitude == undefined) {
          profil.latitude = this.myLat
          profil.longitude = this.myLong
        }
        let log = JSON.parse(localStorage.getItem('user')) || []
        localStorage.setItem('user', JSON.stringify(profil))
        this.utilisateur = JSON.parse(localStorage.getItem('user'))
    }
    // ajout de la photo de profil
    setPicture(image) {
      let log = JSON.parse(localStorage.getItem('user')) || []
      log.image = image
      localStorage.setItem('user', JSON.stringify(log))
      this.utilisateur.image = image
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