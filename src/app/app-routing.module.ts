import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'capture',
    loadChildren: () => import('./capture/capture.module').then( m => m.CapturePageModule)
  },
  {
    path: 'portail',
    loadChildren: () => import('./portail/portail.module').then( m => m.PortailPageModule)
  },
  {
    path: 'proposition',
    loadChildren: () => import('./proposition/proposition.module').then( m => m.PropositionPageModule)
  },
  {
    path: 'match',
    loadChildren: () => import('./match/match.module').then( m => m.MatchPageModule)
  },
  {
    path: 'voirplus',
    loadChildren: () => import('./voirplus/voirplus.module').then( m => m.VoirplusPageModule)
  },
  {
    path: 'voirpersonne',
    loadChildren: () => import('./voirpersonne/voirpersonne.module').then( m => m.VoirpersonnePageModule)
  },
  {
    path: 'voirdiapo',
    loadChildren: () => import('./voirdiapo/voirdiapo.module').then( m => m.VoirdiapoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }