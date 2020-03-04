import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchPage } from './match.page';

const routes: Routes = [
  {
    path: 'route',
    component: MatchPage,
    children: [
      {
        path: 'matching',
        loadChildren: () => import('../matching/matching.module').then( m => m.MatchingPageModule)

      },
      {
          path: 'closematch',
          loadChildren: () => import('../matchclose/matchclose.module').then( m => m.MatchclosePageModule)
      }
    ]
  },
  {
    path:'',
    redirectTo: 'route/matching'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchPageRoutingModule {}
