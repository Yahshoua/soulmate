import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalVersionPage } from './modal-version.page';

const routes: Routes = [
  {
    path: '',
    component: ModalVersionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalVersionPageRoutingModule {}
