import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabprofilAccueilPage } from './tabprofil-accueil.page';

const routes: Routes = [
  {
    path: '',
    component: TabprofilAccueilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabprofilAccueilPageRoutingModule {}
