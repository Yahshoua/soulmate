import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabprofilPage } from './tabprofil.page';

const routes: Routes = [
  {
    path: '',
    component: TabprofilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabprofilPageRoutingModule {}
