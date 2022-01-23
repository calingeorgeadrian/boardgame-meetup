import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoteGamesPageRoutingModule } from './vote-games-routing.module';

import { VoteGamesPage } from './vote-games.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoteGamesPageRoutingModule
  ],
  declarations: [VoteGamesPage]
})
export class VoteGamesPageModule {}
