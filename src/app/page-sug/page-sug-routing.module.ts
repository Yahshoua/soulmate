import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageSugPage } from './page-sug.page';

const routes: Routes = [
  {
    path: '',
    component: PageSugPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageSugPageRoutingModule {}
