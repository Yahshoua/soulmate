import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditVieModePage } from './edit-vie-mode.page';

const routes: Routes = [
  {
    path: '',
    component: EditVieModePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditVieModePageRoutingModule {}
