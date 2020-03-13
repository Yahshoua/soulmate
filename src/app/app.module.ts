import { PhotoProfilSelectedPageModule } from './photo-profil-selected/photo-profil-selected.module';
import { ModalFilterPageModule } from './modal-filter/modal-filter.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { EditModalPageModule } from './edit-modal/edit-modal.module';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, ModalFilterPageModule, PhotoProfilSelectedPageModule, EditModalPageModule],
  providers: [
    StatusBar,
    ImagePicker,
    MenuController,
    Geolocation,
    MutationObserver,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
