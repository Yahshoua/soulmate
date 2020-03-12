import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoProfilSelectedPageRoutingModule } from './photo-profil-selected-routing.module';

import { PhotoProfilSelectedPage } from './photo-profil-selected.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotoProfilSelectedPageRoutingModule
  ],
  declarations: [PhotoProfilSelectedPage]
})
export class PhotoProfilSelectedPageModule {}
