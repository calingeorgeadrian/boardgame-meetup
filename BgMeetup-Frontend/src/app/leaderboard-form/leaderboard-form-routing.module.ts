import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaderboardFormPage } from './leaderboard-form.page';

const routes: Routes = [
  {
    path: '',
    component: LeaderboardFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaderboardFormPageRoutingModule {}
