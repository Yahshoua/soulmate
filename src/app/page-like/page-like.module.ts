import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageLikePageRoutingModule } from './page-like-routing.module';

import { PageLikePage } from './page-like.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageLikePageRoutingModule
  ],
  declarations: [PageLikePage]
})
export class PageLikePageModule {}
