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
    server2= 'https://kazimo.ga/soulmate'
    photo = '../assets/images/homme.png'
    type= 'formulaire'
    myLat
    myLong

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
    // ce tableau sert à contenir les matchings selon que le user à accepter ou non, je le recupere dans la route matchclose
    matching: any

    personnes = [
      {
        "id": "5e5d7e12faa225a80a3dbda7",
        "index": 0,
        "photo": "https://i.picsum.photos/id/230/200/300.jpg",
        "album": [
         
        ],
        "flash": true,
        "eyeColor": "brown",
        "nom": "Dean Simon",
        "genre": "male",
        "email": "deansimon@xumonk.com",
        "phone": "+1 (926) 519-2963",
        "address": "522 Harman Street, Dante, West Virginia",
        "latitude": 17.54166,
        "longitude": -47.487728,
        "about": "Mollit velit id eu irure minim dolor in duis commodo deserunt ex consectetur voluptate. Eiusmod adipisicing et esse ullamco aute irure nostrud amet pariatur adipisicing nulla enim elit. Sint tempor eiusmod excepteur dolor elit ullamco incididunt amet nulla fugiat occaecat officia est minim. Voluptate veniam occaecat qui sunt nisi exercitation est Lorem cillum incididunt est. Incididunt cupidatat ipsum voluptate aute dolor duis magna adipisicing. Sit deserunt aliqua laborum deserunt ullamco exercitation velit Lorem non id pariatur anim esse.\r\n",
        "dateNaiss": "1991-01-09"
      },
      {
        "id": "5e5d7e1268533d5fbf29cb36",
        "index": 1,
        "photo": "https://i.picsum.photos/id/231/200/300.jpg",
        "flash": true,
        "album": [
          {
            "id": 0,
            "image": "https://i.picsum.photos/id/210/200/300.jpg"
          },
          {
            "id": 1,
            "image": "https://i.picsum.photos/id/211/200/300.jpg"
          },
          {
            "id": 2,
            "image": "https://i.picsum.photos/id/212/200/300.jpg"
          },
          {
            "id": 3,
            "image": "https://i.picsum.photos/id/213/200/300.jpg"
          },
          {
            "id": 4,
            "image": "https://i.picsum.photos/id/214/200/300.jpg"
          }
        ],
        "eyeColor": "green",
        "nom": "Justine Drake",
        "genre": "female",
        "email": "justinedrake@xumonk.com",
        "phone": "+1 (957) 533-2571",
        "address": "124 Arlington Place, Hinsdale, Indiana",
        "latitude": -3.911451,
        "longitude": -102.8279,
        "about": "Id Lorem dolor magna consectetur pariatur magna nostrud laboris non ad ipsum magna. Quis consectetur id labore adipisicing ex ad id exercitation ea velit in officia anim officia. Sint pariatur proident veniam laborum.\r\n",
        "dateNaiss": "1996-10-09"
      },
      {
        "id": "5e5d7e12ce8f7078de809e8b",
        "index": 2,
        "photo": "https://i.picsum.photos/id/232/200/300.jpg",
        "flash": true,
        "album": [
          {
            "id": 0,
            "image": "https://i.picsum.photos/id/210/200/300.jpg"
          },
          {
            "id": 1,
            "image": "https://i.picsum.photos/id/211/200/300.jpg"
          },
          {
            "id": 2,
            "image": "https://i.picsum.photos/id/212/200/300.jpg"
          },
          {
            "id": 3,
            "image": "https://i.picsum.photos/id/213/200/300.jpg"
          },
          {
            "id": 4,
            "image": "https://i.picsum.photos/id/214/200/300.jpg"
          }
        ],
        "eyeColor": "blue",
        "nom": "Morgan Reeves",
        "genre": "male",
        "email": "morganreeves@xumonk.com",
        "phone": "+1 (972) 411-2773",
        "address": "961 Glendale Court, Glenbrook, Arkansas",
        "latitude": -65.536373,
        "longitude": 114.616371,
        "about": "Aute deserunt voluptate dolore id velit eiusmod. Cupidatat aute sunt amet laborum id fugiat consectetur et reprehenderit sint in. Ut occaecat et pariatur velit tempor. Aliquip esse fugiat minim esse irure in cillum dolore eiusmod sint laborum. Esse adipisicing dolor magna deserunt aute sunt incididunt ipsum consequat laborum ut culpa deserunt excepteur. Occaecat ut in excepteur consectetur deserunt excepteur labore enim aute velit cupidatat irure commodo magna.\r\n",
        "dateNaiss": "1999-11-08"
      },
      {
        "id": "5e5d7e12c0c6f379cb9910a1",
        "index": 3,
        "photo": "https://i.picsum.photos/id/233/200/300.jpg",
        "flash": false,
        "album": [
          {
            "id": 0,
            "image": "https://i.picsum.photos/id/210/200/300.jpg"
          },
          {
            "id": 1,
            "image": "https://i.picsum.photos/id/211/200/300.jpg"
          },
          {
            "id": 2,
            "image": "https://i.picsum.photos/id/212/200/300.jpg"
          },
          {
            "id": 3,
            "image": "https://i.picsum.photos/id/213/200/300.jpg"
          },
          {
            "id": 4,
            "image": "https://i.picsum.photos/id/214/200/300.jpg"
          }
        ],
        "eyeColor": "blue",
        "nom": "Tabatha Pope",
        "genre": "female",
        "email": "tabathapope@xumonk.com",
        "phone": "+1 (933) 428-3956",
        "address": "330 Oliver Street, Loma, Tennessee",
        "latitude": -53.534714,
        "longitude": -140.259344,
        "about": "Aliquip sit excepteur id voluptate pariatur laborum commodo incididunt. Consequat et mollit minim esse nostrud incididunt. Lorem labore velit commodo officia elit cupidatat commodo enim eiusmod exercitation labore ut. Do ut minim dolore consectetur qui cupidatat labore cupidatat culpa cupidatat. Nisi sunt do duis ipsum elit pariatur laboris ex est esse duis. Dolor excepteur Lorem ullamco dolore eiusmod laborum consequat aliquip esse et sunt ipsum veniam. Esse ex sunt aliquip sint esse veniam qui sint sint quis sit do.\r\n",
        "dateNaiss": "1990-05-02"
      },
      {
        "id": "5e5d7e128ef68fb224ff38da",
        "index": 4,
        "photo": "https://i.picsum.photos/id/234/200/300.jpg",
        "flash": false,
        "album": [
          {
            "id": 0,
            "image": "https://i.picsum.photos/id/210/200/300.jpg"
          },
          {
            "id": 1,
            "image": "https://i.picsum.photos/id/211/200/300.jpg"
          },
          {
            "id": 2,
            "image": "https://i.picsum.photos/id/212/200/300.jpg"
          },
          {
            "id": 3,
            "image": "https://i.picsum.photos/id/213/200/300.jpg"
          },
          {
            "id": 4,
            "image": "https://i.picsum.photos/id/214/200/300.jpg"
          }
        ],
        "eyeColor": "green",
        "nom": "Fields Wise",
        "genre": "male",
        "email": "fieldswise@xumonk.com",
        "phone": "+1 (970) 480-2231",
        "address": "397 Frank Court, Nicut, Minnesota",
        "latitude": 73.608369,
        "longitude": -135.546544,
        "about": "Qui dolor minim sit eiusmod. Eiusmod eu enim aute consequat. Est ad cupidatat nostrud occaecat non anim adipisicing deserunt. Qui do qui cillum do dolor enim enim cillum aliqua ex sint cillum.\r\n",
        "dateNaiss": "1993-05-18"
      },
      {
        "id": "5e5d7e125f2b4c60696b0e3d",
        "index": 5,
        "photo": "https://i.picsum.photos/id/235/200/300.jpg",
        "album": [
          {
            "id": 0,
            "image": "https://i.picsum.photos/id/210/200/300.jpg"
          },
          {
            "id": 1,
            "image": "https://i.picsum.photos/id/211/200/300.jpg"
          },
          {
            "id": 2,
            "image": "https://i.picsum.photos/id/212/200/300.jpg"
          },
          {
            "id": 3,
            "image": "https://i.picsum.photos/id/213/200/300.jpg"
          },
          {
            "id": 4,
            "image": "https://i.picsum.photos/id/214/200/300.jpg"
          }
        ],
        "flash": false,
        "eyeColor": "green",
        "nom": "Lesley Kelley",
        "genre": "female",
        "email": "lesleykelley@xumonk.com",
        "phone": "+1 (807) 457-3074",
        "address": "602 Dakota Place, Statenville, New Mexico",
        "latitude": 43.552309,
        "longitude": 153.440847,
        "about": "Anim aliqua minim magna eiusmod anim pariatur occaecat. Aliqua et anim nulla consequat et irure pariatur laboris minim. Occaecat fugiat mollit reprehenderit excepteur sint duis est do labore qui Lorem. Nisi ea excepteur reprehenderit quis tempor et voluptate fugiat aliqua non consectetur sit magna fugiat.\r\n",
        "dateNaiss": "1997-07-19"
      },
      {
        "id": "5e5d7e127d3bbbbdf8181bd1",
        "index": 6,
        "photo": "https://i.picsum.photos/id/236/200/300.jpg",
        "flash": false,
        "album": [
          {
            "id": 0,
            "image": "https://i.picsum.photos/id/210/200/300.jpg"
          },
          {
            "id": 1,
            "image": "https://i.picsum.photos/id/211/200/300.jpg"
          },
          {
            "id": 2,
            "image": "https://i.picsum.photos/id/212/200/300.jpg"
          },
          {
            "id": 3,
            "image": "https://i.picsum.photos/id/213/200/300.jpg"
          },
          {
            "id": 4,
            "image": "https://i.picsum.photos/id/214/200/300.jpg"
          }
        ],
        "eyeColor": "brown",
        "nom": "Rhodes Walter",
        "genre": "male",
        "email": "rhodeswalter@xumonk.com",
        "phone": "+1 (895) 578-3717",
        "address": "512 Post Court, Norvelt, North Carolina",
        "latitude": -26.715104,
        "longitude": 93.171698,
        "about": "Aliquip culpa ad commodo occaecat ad dolor incididunt qui tempor velit commodo dolore. Ullamco tempor quis pariatur quis Lorem aliquip ullamco do pariatur culpa. Ea exercitation ut adipisicing esse velit ad.\r\n",
        "dateNaiss": "1998-06-20"
      },
      {
        "id": "5e5d7e12f5a371158c52b68b",
        "index": 7,
        "photo": "https://i.picsum.photos/id/237/200/300.jpg",
        "flash": false,
        "album": [
          {
            "id": 0,
            "image": "https://i.picsum.photos/id/210/200/300.jpg"
          },
          {
            "id": 1,
            "image": "https://i.picsum.photos/id/211/200/300.jpg"
          },
          {
            "id": 2,
            "image": "https://i.picsum.photos/id/212/200/300.jpg"
          },
          {
            "id": 3,
            "image": "https://i.picsum.photos/id/213/200/300.jpg"
          },
          {
            "id": 4,
            "image": "https://i.picsum.photos/id/214/200/300.jpg"
          }
        ],
        "eyeColor": "blue",
        "nom": "Malinda Maynard",
        "genre": "female",
        "email": "malindamaynard@xumonk.com",
        "phone": "+1 (838) 600-3895",
        "address": "390 School Lane, Ribera, Virginia",
        "latitude": 35.353423,
        "longitude": 45.961137,
        "about": "Duis commodo nostrud aute et excepteur non consectetur exercitation. Deserunt esse elit fugiat nisi id sunt consequat nulla est incididunt. Qui esse et sunt elit excepteur amet deserunt anim laborum ad incididunt laborum aliquip. Pariatur labore aute dolor sit.\r\n",
        "dateNaiss": "1994-08-19"
      },
      {
        "id": "5e5d7e1205f0dce2457098f8",
        "index": 8,
        "photo": "https://i.picsum.photos/id/238/200/300.jpg",
        "flash": false,
        "album": [
          {
            "id": 0,
            "image": "https://i.picsum.photos/id/210/200/300.jpg"
          },
          {
            "id": 1,
            "image": "https://i.picsum.photos/id/211/200/300.jpg"
          },
          {
            "id": 2,
            "image": "https://i.picsum.photos/id/212/200/300.jpg"
          },
          {
            "id": 3,
            "image": "https://i.picsum.photos/id/213/200/300.jpg"
          },
          {
            "id": 4,
            "image": "https://i.picsum.photos/id/214/200/300.jpg"
          }
        ],
        "eyeColor": "brown",
        "nom": "Aurora Mueller",
        "genre": "female",
        "email": "auroramueller@xumonk.com",
        "phone": "+1 (913) 507-3642",
        "address": "291 Alice Court, Grenelefe, Delaware",
        "latitude": 25.062696,
        "longitude": -64.36204,
        "about": "Consectetur dolor do exercitation irure laboris nulla. Nulla veniam deserunt ipsum quis cillum cillum ad dolore voluptate tempor duis. Do ullamco ex proident laborum labore eu dolor exercitation Lorem cillum cillum exercitation tempor eiusmod. Commodo duis excepteur non non. Dolore laboris dolore mollit non. Enim ut enim qui eiusmod aliquip ea in in fugiat labore. Labore velit elit culpa Lorem.\r\n",
        "dateNaiss": "1999-11-19"
      },
      {
        "id": "5e5d7e120aafc0768e80507a",
        "index": 9,
        "photo": "https://i.picsum.photos/id/239/200/300.jpg",
        "flash": false,
        "album": [
          {
            "id": 0,
            "image": "https://i.picsum.photos/id/210/200/300.jpg"
          },
          {
            "id": 1,
            "image": "https://i.picsum.photos/id/211/200/300.jpg"
          },
          {
            "id": 2,
            "image": "https://i.picsum.photos/id/212/200/300.jpg"
          },
          {
            "id": 3,
            "image": "https://i.picsum.photos/id/213/200/300.jpg"
          },
          {
            "id": 4,
            "image": "https://i.picsum.photos/id/214/200/300.jpg"
          }
        ],
        "eyeColor": "brown",
        "nom": "Jane Britt",
        "genre": "female",
        "email": "janebritt@xumonk.com",
        "phone": "+1 (959) 505-2802",
        "address": "613 Newkirk Placez, Neibert, Rhode Island",
        "latitude": 67.120825,
        "longitude": 113.142469,
        "about": "Ex eu ad excepteur aliqua ad elit duis culpa. Enim est laboris fugiat aliqua. Eiusmod cupidatat commodo consectetur amet deserunt. Veniam velit consequat pariatur fugiat aliquip voluptate aliqua. Nisi deserunt sunt sunt ullamco laborum consectetur eiusmod. Occaecat ad ex irure consequat do cillum ipsum sunt eiusmod aliquip nulla labore. Ullamco do elit elit fugiat nostrud quis nostrud laborum reprehenderit sit.\r\n",
        "dateNaiss": "1992-03-17"
      }
    ]
    //Mise à jour du match lorsque l'utilisateur click sur le coeur ou la X
    setMatch(index, etat) {
       for(var i=0;i< this.personnes.length;i++) {
         if(this.personnes[i].index == index) {
           this.personnes[i].flash = etat
           break
         }
       }
    }
    myroute = false
    getUtilsateurStorage() {
      this.utilisateur = JSON.parse(localStorage.getItem('user')) || []
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
    getMyPosition() {
            this.geolocation.getCurrentPosition().then((resp) => {
            this.myLat = resp.coords.latitude,
            this.myLong = resp.coords.longitude
        })
  }
    storeUser(profil) {
        profil.image = this.photo
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