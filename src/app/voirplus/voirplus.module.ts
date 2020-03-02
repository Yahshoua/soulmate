import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './../component';
import { IonicModule } from '@ionic/angular';

import { VoirplusPageRoutingModule } from './voirplus-routing.module';

import { VoirplusPage } from './voirplus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    VoirplusPageRoutingModule
  ],
  declarations: [VoirplusPage]
})
export class VoirplusPageModule {}
