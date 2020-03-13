import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditproposPage } from './editpropos.page';

const routes: Routes = [
  {
    path: '',
    component: EditproposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditproposPageRoutingModule {}
