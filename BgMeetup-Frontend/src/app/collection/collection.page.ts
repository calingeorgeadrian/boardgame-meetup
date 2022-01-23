import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GameDetailsPage } from '../game-details/game-details.page';
import { Globals } from '../globals';
import { GameModel } from '../models/game.model';
import { UserModel } from '../models/user.model';
import { BGGService } from '../services/bgg.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {
  user: UserModel = new UserModel();
  games: GameModel[] = [];

  constructor(public modalController: ModalController,
    public globals: Globals,
    private userService: UserService,
    private bggService: BGGService) {
  }

  ngOnInit() {
    console.log(this.globals);
    this.games = this.bggService.getUserCollection(this.globals.user.bggUsername);
  }

  async view(id: any) {
    const modal = await this.modalController.create({
      component: GameDetailsPage,
      componentProps: { id: id }
    });
    return await modal.present();
  }
}
