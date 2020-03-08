import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabMacthPageRoutingModule } from './tab-macth-routing.module';

import { TabMacthPage } from './tab-macth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabMacthPageRoutingModule
  ],
  declarations: [TabMacthPage]
})
export class TabMacthPageModule {}
