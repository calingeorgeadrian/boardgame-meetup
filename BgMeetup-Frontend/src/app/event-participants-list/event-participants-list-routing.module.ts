import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventParticipantsListPage } from './event-participants-list.page';

const routes: Routes = [
  {
    path: '',
    component: EventParticipantsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventParticipantsListPageRoutingModule {}
