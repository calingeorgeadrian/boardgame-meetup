import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FeedbackFormPage } from '../feedback-form/feedback-form.page';
import { Globals } from '../globals';
import { EventParticipantModel } from '../models/eventParticipant.model';
import { FeedbackModel } from '../models/feedback.model';
import { LeaderboardGameModel } from '../models/leaderboardGame.model';
import { LeaderboardScoreModel } from '../models/leaderboardScore.model';
import { BGGService } from '../services/bgg.service';
import { EventService } from '../services/event.service';
import { GameService } from '../services/game.service.';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
  leaderboardGames: LeaderboardGameModel[] = [];
  eventId: any;
  feedbacks: FeedbackModel[] = [];
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
    this.getFeedback();
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
          this.eventService.getLeaderboard(this.eventId).subscribe(leaderboardScores => {
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
                participantScore.score = leaderboardScores.filter(s => s.gameId == participantScore.gameId && s.participantId == participantScore.participantId)[0].score;
                scores.push(participantScore);
              });
              leaderboardGame.participantsScores = scores;
              this.leaderboardGames.push(leaderboardGame);
            });
          });
        });
  }

  async getFeedback() {
    this.eventService.getFeedback(this.eventId).subscribe(feedback => {
      this.feedbacks = feedback;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  checkForFeedback(score) {
    var canGiveFeedback = this.feedbacks.filter(f => f.gameId == score.gameId &&
      f.participantId == score.participantId &&
      f.feedbackGiverId == this.globals.user.id).length == 0;
    return canGiveFeedback;
  }

  async praise(score) {
    const modal = await this.viewCtrl.create({
      component: FeedbackFormPage,
      componentProps: { eventId: this.eventId, score: score, actionType: "praise" }
    });
    modal.onDidDismiss().then((data: any) => {
      this.getFeedback();
    });
    return await modal.present();
  }

  async report(score) {
    const modal = await this.viewCtrl.create({
      component: FeedbackFormPage,
      componentProps: { eventId: this.eventId, score: score, actionType: "report" }
    });
    modal.onDidDismiss().then((data: any) => {
      this.getFeedback();
    });
    return await modal.present();
  }

  async mvp(score) {
    var feedback = [];
    var mvp = new FeedbackModel();
    mvp.eventId = score.eventId;
    mvp.gameId = score.gameId;
    mvp.participantId = score.participantId;
    mvp.feedbackGiverId = this.globals.user.id;
    mvp.type = 100;
    feedback.push(mvp);

    this.eventService.submitFeedback(feedback)
      .subscribe(
        saveResult => {
          if (saveResult.result) {
            this.getFeedback();
          }
        });
  }
}
