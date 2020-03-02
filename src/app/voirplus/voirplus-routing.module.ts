import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoirplusPage } from './voirplus.page';

const routes: Routes = [
  {
    path: 'route',
    component: VoirplusPage,
    children: [
      {
        path: 'main',
        loadChildren: () => import('../voirpersonne/voirpersonne.module').then( m => m.VoirpersonnePageModule)
      },
      {
      path: 'diapo',
      loadChildren: () => import('../voirdiapo/voirdiapo.module').then( m => m.VoirdiapoPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'route/main'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoirplusPageRoutingModule {}
