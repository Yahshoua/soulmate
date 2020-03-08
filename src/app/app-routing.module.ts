import { GuardHome } from './services/guardHome';
import { GuardService } from './services/guardservice';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',canActivate: [GuardHome], loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'inscription',canActivate: [GuardHome],
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'capture',canActivate: [GuardHome],
    loadChildren: () => import('./capture/capture.module').then( m => m.CapturePageModule)
  },
  {
    path: 'portail',canActivate: [GuardService],
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
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'matchclose',
    loadChildren: () => import('./matchclose/matchclose.module').then( m => m.MatchclosePageModule)
  },
  {
    path: 'matching',
    loadChildren: () => import('./matching/matching.module').then( m => m.MatchingPageModule)
  },
  {
    path: 'tabprofil',
    loadChildren: () => import('./tabprofil/tabprofil.module').then( m => m.TabprofilPageModule)
  },
  {
    path: 'connexion',
    loadChildren: () => import('./connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
