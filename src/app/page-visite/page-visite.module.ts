import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageVisitePageRoutingModule } from './page-visite-routing.module';

import { PageVisitePage } from './page-visite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageVisitePageRoutingModule
  ],
  declarations: [PageVisitePage]
})
export class PageVisitePageModule {}
