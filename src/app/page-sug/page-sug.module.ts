import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageSugPageRoutingModule } from './page-sug-routing.module';

import { PageSugPage } from './page-sug.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageSugPageRoutingModule
  ],
  declarations: [PageSugPage]
})
export class PageSugPageModule {}
