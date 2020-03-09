import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageVisitePage } from './page-visite.page';

const routes: Routes = [
  {
    path: '',
    component: PageVisitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageVisitePageRoutingModule {}
