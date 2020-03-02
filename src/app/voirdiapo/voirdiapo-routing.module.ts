import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoirdiapoPage } from './voirdiapo.page';

const routes: Routes = [
  {
    path: '',
    component: VoirdiapoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoirdiapoPageRoutingModule {}
