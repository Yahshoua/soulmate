import { Component, OnInit, ViewChild } from '@angular/core';
import { monservice } from '../services/monserice';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
declare var $, moment
@Component({
  selector: 'app-matching',
  templateUrl: './matching.page.html',
  styleUrls: ['./matching.page.scss'],
})
export class MatchingPage implements OnInit {

  photo= []
  personne = []
  empty: boolean = true
  users
  @ViewChild('loopSlider', {static: true}) loopSlider;
  constructor(private service: monservice, private navCtrl: NavController, private router: Router) { }
  slideOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { $, slides, rtlTranslate: rtl } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let progress = $slideEl[0].progress;
          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          const rotate = -180 * progress;
          let rotateY = rotate;
          let rotateX = 0;
          let tx = -offset$$1;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }
  
           $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
  
           if (swiper.params.flipEffect.slideShadows) {
            // Set shadows
            let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
          $slideEl
            .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, activeIndex, $wrapperEl } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          // eslint-disable-next-line
          slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
  
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      }
    }
  };
  monStyle(i) {
    let style=  {
        'background-image': 'url('+i+')', 
      'height': $('app-match').height() + 'px', 
      'background-size': 'cover',
      'background-position': 'center',
      'width': '100%'
     }
     return style
  }
  ngOnInit() {
      this.service.allperSub.subscribe((e: any)=> {
        var i =  e.filter(e=> {
          return e.flash.reponse == 0
        })
        this.personne = i.sort((a, b)=> {
        if (a.id < b.id ) {
        return 1;
      }
      if (a.id > b.id ) {
        return -1;
      }
      return 0;
  })
      this.users = e.filter(e=> {
            return e.flash.etat == true
      })
      this.ready()
    })
   this.service.subsciberAllperso()
  }
  ready() {
   
    console.log('la route url', this.router.url);
    console.log('personne ', this.personne)
    console.log('uuuuuser ', this.users)
    if(this.users.length >= 1) {
      this.empty = false
      this.service.setMatching(this.users)
    }
    if(this.router.url == "/portail/users/match/route" || this.router.url == "/portail/users/match/route/matching") {
          if(this.personne.length <=0 && this.users.length >= 1) {
          this.navCtrl.navigateRoot('portail/users/match/route/closematch')
        } else {
          this.navCtrl.navigateRoot('portail/users/match/route/matching')
        }
        this.loopSlider.lockSwipes(true)
    }
    
  }
  getAge(an) {
    return moment().format('Y') - moment(an).format('Y') + 'ans'
  }
  action(action, index) {
    this.loopSlider.lockSwipes(false)
    this.loopSlider.isEnd().then(end=> {
      console.log('is end ? ', end)
      if(end == true) {
        this.service.setMatching(this.users)
          this.navCtrl.navigateRoot('portail/users/match/route/closematch')
      }
    })
      this.loopSlider.slideNext().then(()=> {
      this.loopSlider.lockSwipes(true)
    })
    var reponse = action==true?2:1
    this.service.setMatch(index, reponse)
    if(action == false) {
        for(var i=0;i< this.users.length;i++) {
          if(this.users[i].id == index) {
              this.users[i].flash.etat = false
              this.users[i].flash.reponse = 1
              break
          }
        }
    } else {
      for(var i=0;i< this.users.length;i++) {
        if(this.users[i].id == index) {
            this.users[i].flash.etat = true
            this.users[i].flash.reponse = 2
            break
        }
      }
    }
  }

}
