import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditInfosPageRoutingModule } from './edit-infos-routing.module';

import { EditInfosPage } from './edit-infos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditInfosPageRoutingModule
  ],
  declarations: [EditInfosPage]
})
export class EditInfosPageModule {}
