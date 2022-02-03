import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'events-list',
    loadChildren: () => import('./events-list/events-list.module').then( m => m.EventsListPageModule)
  },
  {
    path: 'event-details',
    loadChildren: () => import('./event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
  {
    path: 'event-form',
    loadChildren: () => import('./event-form/event-form.module').then( m => m.EventFormPageModule)
  },
  {
    path: 'event-participants-list',
    loadChildren: () => import('./event-participants-list/event-participants-list.module').then( m => m.EventParticipantsListPageModule)
  },
  {
    path: 'collection',
    loadChildren: () => import('./collection/collection.module').then( m => m.CollectionPageModule)
  },
  {
    path: 'game-details',
    loadChildren: () => import('./game-details/game-details.module').then( m => m.GameDetailsPageModule)
  },
  {
    path: 'friends',
    loadChildren: () => import('./friends/friends.module').then( m => m.FriendsPageModule)
  },
  {
    path: 'invite',
    loadChildren: () => import('./invite/invite.module').then( m => m.InvitePageModule)
  },
  {
    path: 'propose-games',
    loadChildren: () => import('./propose-games/propose-games.module').then( m => m.ProposeGamesPageModule)
  },
  {
    path: 'vote-games',
    loadChildren: () => import('./vote-games/vote-games.module').then( m => m.VoteGamesPageModule)
  },
  {
    path: 'leaderboard-form',
    loadChildren: () => import('./leaderboard-form/leaderboard-form.module').then( m => m.LeaderboardFormPageModule)
  },
  {
    path: 'leaderboard',
    loadChildren: () => import('./leaderboard/leaderboard.module').then( m => m.LeaderboardPageModule)
  },
  {
    path: 'feedback-form',
    loadChildren: () => import('./feedback-form/feedback-form.module').then( m => m.FeedbackFormPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
