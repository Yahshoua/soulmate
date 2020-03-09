import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageLikePage } from './page-like.page';

const routes: Routes = [
  {
    path: '',
    component: PageLikePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageLikePageRoutingModule {}
