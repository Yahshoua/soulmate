import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabprofilPage } from './tabprofil.page';

const routes: Routes = [
  {
    path: 'route',
    component: TabprofilPage,
    children: [
      {
        path: 'accueil',
        loadChildren: () => import('../tabprofil-accueil/tabprofil-accueil.module').then( m => m.TabprofilAccueilPageModule)

      },
      {
        path: 'favoris',
        loadChildren: () => import('../tabfavoris/tabfavoris.module').then( m => m.TabfavorisPageModule)
      },
      {
        path: 'blacklist',
        loadChildren: () => import('../tab-blacklist/tab-blacklist.module').then( m => m.TabBlacklistPageModule)
      },
      {
        path: 'matchs',
        loadChildren: () => import('../tab-macth/tab-macth.module').then( m => m.TabMacthPageModule)
      },
      {
        path: 'visite',
        loadChildren: () => import('../page-visite/page-visite.module').then( m => m.PageVisitePageModule)

      },
      {
        path: 'like',
        loadChildren: () => import('../page-like/page-like.module').then( m => m.PageLikePageModule)

      },
      {
        path: 'suggetions',
        loadChildren: () => import('../page-sug/page-sug.module').then( m => m.PageSugPageModule)

      }
    ]
  },
  {
    path: '',
    redirectTo: 'route/accueil'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabprofilPageRoutingModule {}
