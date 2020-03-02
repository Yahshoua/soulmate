import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoirpersonnePage } from './voirpersonne.page';

const routes: Routes = [
  {
    path: '',
    component: VoirpersonnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoirpersonnePageRoutingModule {}
