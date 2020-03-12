import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoProfilSelectedPage } from './photo-profil-selected.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoProfilSelectedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoProfilSelectedPageRoutingModule {}
