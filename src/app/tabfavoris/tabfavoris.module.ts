import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabfavorisPageRoutingModule } from './tabfavoris-routing.module';

import { TabfavorisPage } from './tabfavoris.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabfavorisPageRoutingModule
  ],
  declarations: [TabfavorisPage]
})
export class TabfavorisPageModule {}
