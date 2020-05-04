import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalVersionPageRoutingModule } from './modal-version-routing.module';

import { ModalVersionPage } from './modal-version.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalVersionPageRoutingModule
  ],
  declarations: [ModalVersionPage]
})
export class ModalVersionPageModule {}
