import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoirdiapoPageRoutingModule } from './voirdiapo-routing.module';

import { VoirdiapoPage } from './voirdiapo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoirdiapoPageRoutingModule
  ],
  declarations: [VoirdiapoPage]
})
export class VoirdiapoPageModule {}
