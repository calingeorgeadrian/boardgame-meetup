import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GameDetailsPage } from '../game-details/game-details.page';
import { Globals } from '../globals';
import { EventParticipantModel } from '../models/eventParticipant.model';
import { VoteModel } from '../models/vote.model';
import { BGGService } from '../services/bgg.service';
import { EventService } from '../services/event.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-vote-games',
  templateUrl: './vote-games.page.html',
  styleUrls: ['./vote-games.page.scss'],
})
export class VoteGamesPage implements OnInit {
  games: any[] = [];
  eventId: any;
  participants: EventParticipantModel[] = [];

  constructor(private navParams: NavParams,
    public viewCtrl: ModalController,
    public globals: Globals,
    private eventService: EventService,
    private bggService: BGGService,
    private userService: UserService) {
    this.eventId = navParams.get('eventId');
  }

  ngOnInit() {
    var proposedGames = this.eventService.getEventProposedGames(this.eventId);
    var proposers = [{ id: "49125c98-1aa6-4763-8e29-8de47b3b2512", name: "Calin George" }, { id: "df42cc31-c2c2-4fb2-9182-d601282e30ec", name: "Hirhui Ema" }, { id: "ed49c1cc-09d4-4f73-9a71-9d0035e616ce", name: "Matei Cristina" }]


    proposers.forEach(p => {
      var proposerGames = proposedGames.filter(g => g.proposerId == p.id);
      this.games.push({ proposerId: p.id, proposer: p.name, games: proposerGames });
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

  vote() {
    console.log(this.games);
    var selectedGames = [];
    this.games.forEach(owner => {
      owner.games.forEach(g => {
        if (g.isSelected) {
          console.log(g);
          var v = new VoteModel();
          v.eventId = this.eventId;
          v.ownerId = g.ownerId;
          v.gameId = g.gameId;
          v.voterId = this.globals.user.id;
          selectedGames.push(v);
        }
      });
    });
    console.log(selectedGames);
    var saveResult = this.eventService.submitVotes(selectedGames, this.globals.user.id);
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
