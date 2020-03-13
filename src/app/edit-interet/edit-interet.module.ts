import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditInteretPageRoutingModule } from './edit-interet-routing.module';

import { EditInteretPage } from './edit-interet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditInteretPageRoutingModule
  ],
  declarations: [EditInteretPage]
})
export class EditInteretPageModule {}
