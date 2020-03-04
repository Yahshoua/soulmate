import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchclosePageRoutingModule } from './matchclose-routing.module';

import { MatchclosePage } from './matchclose.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchclosePageRoutingModule
  ],
  declarations: [MatchclosePage]
})
export class MatchclosePageModule {}
