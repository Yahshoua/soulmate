import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilViewImagePageRoutingModule } from './profil-view-image-routing.module';

import { ProfilViewImagePage } from './profil-view-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilViewImagePageRoutingModule
  ],
  declarations: [ProfilViewImagePage]
})
export class ProfilViewImagePageModule {}
