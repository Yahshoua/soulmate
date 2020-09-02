import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEmptyPersonPageRoutingModule } from './modal-empty-person-routing.module';

import { ModalEmptyPersonPage } from './modal-empty-person.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEmptyPersonPageRoutingModule
  ],
  declarations: [ModalEmptyPersonPage]
})
export class ModalEmptyPersonPageModule {}
