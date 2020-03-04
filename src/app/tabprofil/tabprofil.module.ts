import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabprofilPageRoutingModule } from './tabprofil-routing.module';

import { TabprofilPage } from './tabprofil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabprofilPageRoutingModule
  ],
  declarations: [TabprofilPage]
})
export class TabprofilPageModule {}
