import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabMacthPage } from './tab-macth.page';

const routes: Routes = [
  {
    path: '',
    component: TabMacthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabMacthPageRoutingModule {}
