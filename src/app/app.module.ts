import { ModalEmptyPersonPageModule } from './modal-empty-person/modal-empty-person.module';
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
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { PopoverPageModule } from './popover/popover.module';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { ModalVersionPageModule } from './modal-version/modal-version.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, ModalFilterPageModule, PhotoProfilSelectedPageModule, EditModalPageModule, PopoverPageModule, ModalVersionPageModule, ModalEmptyPersonPageModule],
  providers: [
    Facebook,
    FileTransfer,
    Push,
    FileTransferObject,
    StatusBar,
    ImagePicker,
    MenuController,
    Geolocation,
    MutationObserver,
    SplashScreen,
    InAppBrowser,
    Stripe,
    AppVersion,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
