import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabBlacklistPageRoutingModule } from './tab-blacklist-routing.module';

import { TabBlacklistPage } from './tab-blacklist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabBlacklistPageRoutingModule
  ],
  declarations: [TabBlacklistPage]
})
export class TabBlacklistPageModule {}
