import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEmptyPersonPage } from './modal-empty-person.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEmptyPersonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEmptyPersonPageRoutingModule {}
