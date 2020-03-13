import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditproposPageRoutingModule } from './editpropos-routing.module';

import { EditproposPage } from './editpropos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditproposPageRoutingModule
  ],
  declarations: [EditproposPage]
})
export class EditproposPageModule {}
