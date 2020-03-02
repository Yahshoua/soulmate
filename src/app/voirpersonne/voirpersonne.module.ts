import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoirpersonnePageRoutingModule } from './voirpersonne-routing.module';

import { VoirpersonnePage } from './voirpersonne.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoirpersonnePageRoutingModule
  ],
  declarations: [VoirpersonnePage]
})
export class VoirpersonnePageModule {}
