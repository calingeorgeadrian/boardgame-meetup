import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Globals } from '../globals';
import { EventParticipantModel } from '../models/eventParticipant.model';
import { LeaderboardGameModel } from '../models/leaderboardGame.model';
import { LeaderboardScoreModel } from '../models/leaderboardScore.model';
import { BGGService } from '../services/bgg.service';
import { EventService } from '../services/event.service';
import { GameService } from '../services/game.service.';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-leaderboard-form',
  templateUrl: './leaderboard-form.page.html',
  styleUrls: ['./leaderboard-form.page.scss'],
})
export class LeaderboardFormPage implements OnInit {
  leaderboardGames: LeaderboardGameModel[] = [];
  eventId: any;
  participants: EventParticipantModel[] = [];

  constructor(private navParams: NavParams,
    public viewCtrl: ModalController,
    public globals: Globals,
    private eventService: EventService,
    private bggService: BGGService,
    private gameService: GameService,
    private userService: UserService) {
    this.eventId = navParams.get('eventId');
  }

  ngOnInit() {
    this.getParticipants();
  }

  async getParticipants() {
    this.eventService.getParticipants(this.eventId).subscribe(participants => {
      this.participants = participants;
      this.getProposedGames();
    });
  }

  async getProposedGames() {
    this.gameService.getProposedGames(this.eventId)
      .subscribe(
        proposedGames => {

          proposedGames.filter(pg => pg.isChosen).forEach(pg => {
            var leaderboardGame = new LeaderboardGameModel();
            leaderboardGame.gameId = pg.gameId;
            leaderboardGame.imageUrl = pg.imageUrl;
            leaderboardGame.title = pg.title;
            var scores = [];
            this.participants.forEach(p => {
              var participantScore = new LeaderboardScoreModel();
              participantScore.eventId = this.eventId;
              participantScore.gameId = pg.gameId;
              participantScore.participantId = p.participantId;
              participantScore.participantName = p.participantName;
              participantScore.score = 0;
              scores.push(participantScore);
            });
            leaderboardGame.participantsScores = scores;
            this.leaderboardGames.push(leaderboardGame);
          });
          
        });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submit() {
    var scores = this.leaderboardGames.map(g => g.participantsScores).reduce((acc, it) => [...acc, ...it], []);

    this.eventService.submitLeaderboard(scores)
      .subscribe(
        saveResult => {
          if (saveResult.result) {
            this.dismiss();
          }
        });
  }
}
