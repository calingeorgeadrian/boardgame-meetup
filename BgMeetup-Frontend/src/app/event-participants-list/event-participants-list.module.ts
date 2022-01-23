import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventParticipantsListPageRoutingModule } from './event-participants-list-routing.module';

import { EventParticipantsListPage } from './event-participants-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventParticipantsListPageRoutingModule
  ],
  declarations: [EventParticipantsListPage]
})
export class EventParticipantsListPageModule {}
