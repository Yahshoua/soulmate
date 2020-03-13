import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilViewImagePage } from './profil-view-image.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilViewImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilViewImagePageRoutingModule {}
