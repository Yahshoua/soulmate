import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortailPage } from './portail.page';

const routes: Routes = [
  {
    path: 'users',
    component: PortailPage,
    children: [
      {
        path: 'proposition',
        loadChildren: () => import('../proposition/proposition.module').then( m => m.PropositionPageModule)

      },
      {
        path: 'match',
        loadChildren: () => import('../match/match.module').then( m => m.MatchPageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('../tabprofil/tabprofil.module').then( m => m.TabprofilPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'users/proposition'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortailPageRoutingModule {}
