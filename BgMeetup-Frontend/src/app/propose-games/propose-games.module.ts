import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProposeGamesPageRoutingModule } from './propose-games-routing.module';

import { ProposeGamesPage } from './propose-games.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProposeGamesPageRoutingModule
  ],
  declarations: [ProposeGamesPage]
})
export class ProposeGamesPageModule {}
