import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabfavorisPage } from './tabfavoris.page';

const routes: Routes = [
  {
    path: '',
    component: TabfavorisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabfavorisPageRoutingModule {}
