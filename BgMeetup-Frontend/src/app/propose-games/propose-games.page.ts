import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GameDetailsPage } from '../game-details/game-details.page';
import { Globals } from '../globals';
import { EventParticipantModel } from '../models/eventParticipant.model';
import { ProposedGameModel } from '../models/proposedGame.model';
import { BGGService } from '../services/bgg.service';
import { EventService } from '../services/event.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-propose-games',
  templateUrl: './propose-games.page.html',
  styleUrls: ['./propose-games.page.scss'],
})
export class ProposeGamesPage implements OnInit {
  games: any[] = [];
  eventId: any;
  participants: EventParticipantModel[] = [];

  constructor(private navParams: NavParams,
    public viewCtrl: ModalController,
    public globals: Globals,
    private eventService: EventService,
    private bggService: BGGService,
    private userService: UserService) {
    this.participants = navParams.get('participants');
    this.eventId = navParams.get('eventId');
  }

  ngOnInit() {
    this.participants.forEach(p => {
      if (p.status === 1 && p.bggUsername != null) {
        var userCollection = this.bggService.getUserCollection(p.bggUsername);
        this.games.push({ ownerId: p.id, owner: p.name, games: userCollection });
      }
    });
    this.games.sort(function (a, b) {
      var textA = a.owner.toUpperCase();
      var textB = b.owner.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  async viewGame(id: any) {
    const modal = await this.viewCtrl.create({
      component: GameDetailsPage,
      componentProps: { id: id }
    });
    return await modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  propose() {
    var selectedGames = [];
    this.games.forEach(o => {
      o.games.forEach(g => {
        if (g.isSelected) {
          var v = new ProposedGameModel();
          v.eventId = this.eventId;
          v.ownerId = o.ownerId;
          v.gameId = g.id;
          v.proposerId = this.globals.user.id;
          selectedGames.push(v);
        }
      });
    });
    console.log(selectedGames);
    var saveResult = this.eventService.submitProposals(selectedGames, this.globals.user.id);
    if (saveResult.result) {
      this.dismiss();
    }

    //this.eventService.submitProposals(selectedGames, this.globals.user.id).subscribe(
    //  saveResult => {
    //    if (saveResult.result) {
    //      this.dismiss();
    //    }
    //  });
  }

  clear() {
    console.log(this.games);
    this.games.forEach(o => {
      o.games.forEach(g => {
        if (g.isSelected) {
          g.isSelected = false;
        }
      });
    });
    console.log(this.games);
  }
}
