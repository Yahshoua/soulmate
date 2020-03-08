import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabprofilAccueilPageRoutingModule } from './tabprofil-accueil-routing.module';

import { TabprofilAccueilPage } from './tabprofil-accueil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabprofilAccueilPageRoutingModule
  ],
  declarations: [TabprofilAccueilPage]
})
export class TabprofilAccueilPageModule {}
