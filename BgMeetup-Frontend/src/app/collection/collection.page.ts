import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { GameDetailsPage } from '../game-details/game-details.page';
import { Globals } from '../globals';
import { GameModel } from '../models/game.model';
import { UserModel } from '../models/user.model';
import { BGGService } from '../services/bgg.service';
import { GameService } from '../services/game.service.';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {
  user: UserModel = new UserModel();
  games: GameModel[] = [];
  collectionIsEmpty: boolean = true;

  constructor(public modalController: ModalController,
    public globals: Globals,
    public toastController: ToastController,
    private userService: UserService,
    private bggService: BGGService,
    private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.getCollection(this.globals.user.id)
    .subscribe(
      collection => {
        this.games = collection;
        this.collectionIsEmpty = this.games.length == 0;
      });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Collection succesfully imported.',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  async import() {
    console.log("import");
    var collectionGames = this.bggService.getUserCollection(this.globals.user.bggUsername);
    console.log(collectionGames);
    var newGames = collectionGames.filter(ng => this.games.find(g => g.bggId == ng.bggId) == null);
    console.log(newGames);
    if (newGames.length > 0) {
      this.gameService.importCollection(this.globals.user.id, newGames)
        .subscribe(
          saveResult => {
            if (saveResult.result) {
              this.games = collectionGames;
              this.presentToast();
            }
          });
    }
  }

  async view(id: any) {
    const modal = await this.modalController.create({
      component: GameDetailsPage,
      componentProps: { id: id }
    });
    return await modal.present();
  }
}
