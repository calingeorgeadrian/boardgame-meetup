import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GameModel } from '../models/game.model';
import { BGGService } from '../services/bgg.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.page.html',
  styleUrls: ['./game-details.page.scss'],
})
export class GameDetailsPage implements OnInit {
  id: any;
  game: GameModel = new GameModel();

  constructor(private navParams: NavParams,
    public viewCtrl: ModalController,
    private bggService: BGGService) {
    this.id = navParams.get('id');
  }

  ngOnInit() {
    this.game = this.bggService.getGame(this.id);
    this.game.description = this.getSafehtml(this.game.description);

  }

  public getSafehtml(html: string) {
    var txt = document.createElement('textarea');
    html = html.split('&amp;#10;&amp;#10;').join('<br/> <br/>');
    txt.innerHTML = html;
    return txt.value;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
