import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabBlacklistPage } from './tab-blacklist.page';

const routes: Routes = [
  {
    path: '',
    component: TabBlacklistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabBlacklistPageRoutingModule {}
