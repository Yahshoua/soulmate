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
    path: 'connexion',canActivate: [GuardHome],
    loadChildren: () => import('./connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  {
    path: 'tabfavoris',canActivate: [GuardHome],
    loadChildren: () => import('./tabfavoris/tabfavoris.module').then( m => m.TabfavorisPageModule)
  },
  {
    path: 'tab-blacklist',
    loadChildren: () => import('./tab-blacklist/tab-blacklist.module').then( m => m.TabBlacklistPageModule)
  },
  {
    path: 'tab-macth',
    loadChildren: () => import('./tab-macth/tab-macth.module').then( m => m.TabMacthPageModule)
  },
  {
    path: 'tabprofil-accueil',
    loadChildren: () => import('./tabprofil-accueil/tabprofil-accueil.module').then( m => m.TabprofilAccueilPageModule)
  },
  {
    path: 'page-visite',
    loadChildren: () => import('./page-visite/page-visite.module').then( m => m.PageVisitePageModule)
  },
  {
    path: 'page-like',
    loadChildren: () => import('./page-like/page-like.module').then( m => m.PageLikePageModule)
  },
  {
    path: 'page-sug',
    loadChildren: () => import('./page-sug/page-sug.module').then( m => m.PageSugPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'modal-filter',
    loadChildren: () => import('./modal-filter/modal-filter.module').then( m => m.ModalFilterPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'photo-profil-selected',
    loadChildren: () => import('./photo-profil-selected/photo-profil-selected.module').then( m => m.PhotoProfilSelectedPageModule)
  },
  {
    path: 'profil-view-image',
    loadChildren: () => import('./profil-view-image/profil-view-image.module').then( m => m.ProfilViewImagePageModule)
  },
  {
    path: 'edit-infos',
    loadChildren: () => import('./edit-infos/edit-infos.module').then( m => m.EditInfosPageModule)
  },
  {
    path: 'editpropos',
    loadChildren: () => import('./editpropos/editpropos.module').then( m => m.EditproposPageModule)
  },
  {
    path: 'edit-interet',
    loadChildren: () => import('./edit-interet/edit-interet.module').then( m => m.EditInteretPageModule)
  },
  {
    path: 'edit-modal',
    loadChildren: () => import('./edit-modal/edit-modal.module').then( m => m.EditModalPageModule)
  },
  {
    path: 'edit-vie-mode',
    loadChildren: () => import('./edit-vie-mode/edit-vie-mode.module').then( m => m.EditVieModePageModule)
  },
  {
    path: 'popover',
    loadChildren: () => import('./popover/popover.module').then( m => m.PopoverPageModule)
  },
  {
    path: 'modal-version',
    loadChildren: () => import('./modal-version/modal-version.module').then( m => m.ModalVersionPageModule)
  },
  {
    path: 'premium',
    loadChildren: () => import('./premium/premium.module').then( m => m.PremiumPageModule)
  },
  {
    path: 'payement',
    loadChildren: () => import('./payement/payement.module').then( m => m.PayementPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
