import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaderboardFormPageRoutingModule } from './leaderboard-form-routing.module';

import { LeaderboardFormPage } from './leaderboard-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaderboardFormPageRoutingModule
  ],
  declarations: [LeaderboardFormPage]
})
export class LeaderboardFormPageModule {}
