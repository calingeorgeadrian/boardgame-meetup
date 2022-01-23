import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoteGamesPage } from './vote-games.page';

const routes: Routes = [
  {
    path: '',
    component: VoteGamesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoteGamesPageRoutingModule {}
