import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditVieModePageRoutingModule } from './edit-vie-mode-routing.module';

import { EditVieModePage } from './edit-vie-mode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditVieModePageRoutingModule
  ],
  declarations: [EditVieModePage]
})
export class EditVieModePageModule {}
