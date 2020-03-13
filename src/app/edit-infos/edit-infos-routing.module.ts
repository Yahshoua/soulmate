import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditInfosPage } from './edit-infos.page';

const routes: Routes = [
  {
    path: '',
    component: EditInfosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditInfosPageRoutingModule {}
