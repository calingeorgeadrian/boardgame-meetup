import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GameDetailsPage } from '../game-details/game-details.page';
import { Globals } from '../globals';
import { EventParticipantModel } from '../models/eventParticipant.model';
import { VoteModel } from '../models/vote.model';
import { BGGService } from '../services/bgg.service';
import { EventService } from '../services/event.service';
import { GameService } from '../services/game.service.';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-vote-games',
  templateUrl: './vote-games.page.html',
  styleUrls: ['./vote-games.page.scss'],
})
export class VoteGamesPage implements OnInit {
  votes: VoteModel[] = [];
  games: any[] = [];
  eventId: any;
  participants: EventParticipantModel[] = [];
  actionType: number = 0;

  constructor(private navParams: NavParams,
    public viewCtrl: ModalController,
    public globals: Globals,
    private eventService: EventService,
    private gameService: GameService,
    private bggService: BGGService,
    private userService: UserService) {
    this.eventId = navParams.get('eventId');
    this.actionType = navParams.get('actionType');
    this.participants = navParams.get('participants');
  }

  ngOnInit() {
    this.gameService.getVotedGames(this.eventId)
      .subscribe(
        votes => {
          this.votes = votes;
        });

    this.gameService.getProposedGames(this.eventId)
    .subscribe(
      proposedGames => {
        this.participants.forEach(p => {
          var proposerGames = proposedGames.filter(g => g.proposerId == p.participantId);
          this.games.push({
            proposerId: p.participantId,
            proposer: p.participantName,
            games: proposerGames.map(game => {
              var temp = Object.assign({}, game);
              temp.isSelected = (this.votes.filter(vg => vg.gameId == game.gameId && vg.voterId == this.globals.user.id).length > 0);
                return temp;
              })
          });
        });
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

  vote() {
    var selectedGames = [];
    this.games.forEach(owner => {
      owner.games.forEach(g => {
        if (g.isSelected) {
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
    this.gameService.voteGames(this.eventId, this.globals.user.id, selectedGames).subscribe(
      saveResult => {
        if (saveResult.result) {
          this.dismiss();
        }
      });
  }

  choose() {
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
    var saveResult = this.eventService.chooseGames(selectedGames, this.eventId);
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
