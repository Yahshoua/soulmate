import { ComponentsModule } from './../component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PortailPageRoutingModule } from './portail-routing.module';

import { PortailPage } from './portail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortailPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PortailPage]
})
export class PortailPageModule {}
