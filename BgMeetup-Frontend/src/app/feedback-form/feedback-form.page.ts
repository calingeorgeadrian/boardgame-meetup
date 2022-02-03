import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Globals } from '../globals';
import { FeedbackModel } from '../models/feedback.model';
import { LeaderboardScoreModel } from '../models/leaderboardScore.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.page.html',
  styleUrls: ['./feedback-form.page.scss'],
})
export class FeedbackFormPage implements OnInit {
  feedbackTypes: FeedbackModel[] = [];
  score: LeaderboardScoreModel;
  actionType: string = "";

  constructor(private navParams: NavParams,
    public viewCtrl: ModalController,
    public globals: Globals,
    private eventService: EventService) {
    this.score = navParams.get('score');
    this.actionType = navParams.get('actionType');
  }

  ngOnInit() {
    if (this.actionType == "praise") {
      this.getPositiveFeedbackTypes();
    }
    else if (this.actionType == "report") {
      this.getNegativeFeedbackTypes();
    }
  }

  getPositiveFeedbackTypes() {
    var knowsTheRules = new FeedbackModel();
    knowsTheRules.eventId = this.score.eventId;
    knowsTheRules.gameId = this.score.gameId;
    knowsTheRules.participantId = this.score.participantId;
    knowsTheRules.feedbackGiverId = this.globals.user.id;
    knowsTheRules.title = "Knows the rules";
    knowsTheRules.type = 1;
    knowsTheRules.isSelected = false;
    this.feedbackTypes.push(knowsTheRules);

    var helper = new FeedbackModel();
    helper.eventId = this.score.eventId;
    helper.gameId = this.score.gameId;
    helper.participantId = this.score.participantId;
    helper.feedbackGiverId = this.globals.user.id;
    helper.title = "Helper - gives good tips";
    helper.type = 2;
    helper.isSelected = false;
    this.feedbackTypes.push(helper);
  }

  getNegativeFeedbackTypes() {
    var soreLoser = new FeedbackModel();
    soreLoser.eventId = this.score.eventId;
    soreLoser.gameId = this.score.gameId;
    soreLoser.participantId = this.score.participantId;
    soreLoser.feedbackGiverId = this.globals.user.id;
    soreLoser.title = "Sore loser";
    soreLoser.type = 11;
    soreLoser.isSelected = false;
    this.feedbackTypes.push(soreLoser);

    var toxic = new FeedbackModel();
    toxic.eventId = this.score.eventId;
    toxic.gameId = this.score.gameId;
    toxic.participantId = this.score.participantId;
    toxic.feedbackGiverId = this.globals.user.id;
    toxic.title = "Toxic - ";
    toxic.type = 12;
    toxic.isSelected = false;
    this.feedbackTypes.push(toxic);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submit() {
    var feedback = this.feedbackTypes.filter(t => t.isSelected);
    this.eventService.submitFeedback(feedback)
      .subscribe(
        saveResult => {
          if (saveResult.result) {
            this.dismiss();
          }
        });
  }

}
