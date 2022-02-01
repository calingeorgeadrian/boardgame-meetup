import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { EventParticipantsListPage } from '../event-participants-list/event-participants-list.page';
import { GameDetailsPage } from '../game-details/game-details.page';
import { Globals } from '../globals';
import { InvitePage } from '../invite/invite.page';
import { EventModel } from '../models/event.model';
import { EventParticipantModel } from '../models/eventParticipant.model';
import { ProposedGameModel } from '../models/proposedGame.model';
import { UserModel } from '../models/user.model';
import { ProposeGamesPage } from '../propose-games/propose-games.page';
import { EventService } from '../services/event.service';
import { GameService } from '../services/game.service.';
import { UserService } from '../services/user.service';
import { VoteGamesPage } from '../vote-games/vote-games.page';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  id: any;
  event: EventModel = new EventModel();
  eventHost: UserModel = new UserModel();
  participants: EventParticipantModel[] = [];
  proposedGames: ProposedGameModel[] = [];
  chosenGames: any[] = [];

  isInvited: boolean = false;
  isAttending: boolean = false;
  participantsCount: number;
  locationInputVisible: boolean = false;
  canProposeGames: boolean = false;
  canVoteGames: boolean = false;
  canChooseGames: boolean = false;
  canCheckIn: boolean = false;
  canConfirmEvent: boolean = false;
  checkedIn: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public globals: Globals,
    public toastController: ToastController,
    public modalController: ModalController,
    private eventService: EventService,
    private gameService: GameService) {
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.id = params['id'];
        if (this.id) {
          this.chosenGames = [];
          this.eventService.getEvent(this.id).subscribe(eventDetails => {
            this.event = eventDetails;

            this.getParticipants();
          });
        }
      });
  }

  async getParticipants() {
    this.eventService.getParticipants(this.id).subscribe(participants => {
      this.participants = participants;

      this.event.participantsCount = this.participants.filter(p => p.status == 1).length;
      this.getProposedGames();
      this.isInvited = this.participants.filter(p => p.participantId == this.globals.user.id && p.status == 0).length > 0;
      this.isAttending = this.participants.filter(p => p.participantId == this.globals.user.id && p.status == 1).length > 0;
      this.canConfirmEvent = this.event.status != 1 && this.participants.filter(p => !p.checkedIn).length == 0;
      this.checkedIn = this.participants.filter(p => p.checkedIn && p.participantId == this.globals.user.id).length > 0;
    });
  }

  async getProposedGames() {
    this.gameService.getProposedGames(this.id)
      .subscribe(
        proposedGames => {
          this.proposedGames = proposedGames.sort(function (a, b) {
            var votesA = a.votes;
            var votesB = b.votes;
            return (votesB < votesA) ? -1 : (votesB > votesA) ? 1 : 0;
          });
          this.canVoteGames = this.proposedGames.length > 0 && this.proposedGames.filter(pg => pg.isChosen).length == 0;
          this.canChooseGames = this.proposedGames.filter(g => g.votes > 0).length > 0;
          this.canProposeGames = this.event.status != 1 && this.proposedGames.filter(pg => pg.isChosen).length == 0;
          this.canCheckIn = this.event.status != 1 && this.proposedGames.filter(pg => pg.isChosen).length > 0;

          this.participants.forEach(p => {
            var ownedGames = proposedGames.filter(g => g.ownerId == p.participantId && g.isChosen);
            if (ownedGames.length > 0) {
              this.chosenGames.push({
                ownerId: p.participantId,
                owner: p.participantName,
                games: ownedGames
              });
            }
          });

        });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  async attend() {
    var participant = new EventParticipantModel();
    participant.email = this.globals.user.email;
    participant.eventId = this.event.id;
    participant.participantId = this.globals.user.id;
    participant.inviterId = this.globals.user.id;
    participant.status = 1;

    this.eventService.invite(participant)
      .subscribe(
        saveResult => {
          if (saveResult.result) {
            this.isAttending = true;
            this.getParticipants();
            this.presentToast("Successfully joined the event!", "success");
          }
        });
  }

  acceptInvitation() {
    this.eventService.acceptInvitation(this.id, this.globals.user.id)
      .subscribe(
        saveResult => {
          if (saveResult.result) {
            this.getParticipants();
            this.presentToast('Invitation accepted.', 'success');
          }
        });
  }

  declineInvitation() {
    this.eventService.declineInvitation(this.id, this.globals.user.id)
      .subscribe(
        saveResult => {
          if (saveResult.result) {
            this.getParticipants();
            this.presentToast('Invitation declined.', 'danger');
          }
        });
  }

  async leave() {
    this.eventService.leave(this.event.id, this.globals.user.id)
      .subscribe(
        saveResult => {
          if (saveResult.result) {
            this.presentToast("You left the event " + this.event.title + ".", "danger");
            this.router.navigate(['/tabs/events-list'], { replaceUrl: true });
          }
        });
  }

  async confirm() {
    this.eventService.confirm(this.event.id)
      .subscribe(
        saveResult => {
          if (saveResult.result) {
            this.presentToast("Event confirmed!", "success");
          }
        });
  }

  async cancel() {
    this.eventService.cancel(this.event.id)
      .subscribe(
        saveResult => {
          if (saveResult.result) {
            this.presentToast("You canceled the event " + this.event.title + ".", "danger");
            this.router.navigate(['/tabs/events-list'], { replaceUrl: true });
          }
        });
  }

  async invite() {
    const modal = await this.modalController.create({
      component: InvitePage,
      componentProps: { participants: this.participants, eventId: this.id }
    });
    modal.onDidDismiss().then((data: any) => {
      this.getParticipants();
    });
    return await modal.present();
  }

  async viewGame(id: any) {
    const modal = await this.modalController.create({
      component: GameDetailsPage,
      componentProps: { id: id }
    });
    return await modal.present();
  }

  async propose() {
    const modal = await this.modalController.create({
      component: ProposeGamesPage,
      componentProps: { eventId: this.event.id, participants: this.participants.filter(p => p.status == 1) }
    });
    modal.onDidDismiss().then((data: any) => {
      this.getProposedGames();
    });
    return await modal.present();
  }

  async vote() {
    const modal = await this.modalController.create({
      component: VoteGamesPage,
      componentProps: { eventId: this.event.id, actionType: 0, participants: this.participants.filter(p => p.status == 1) }
    });
    modal.onDidDismiss().then((data: any) => {
      this.getProposedGames();
    });
    return await modal.present();
  }

  async choose() {
    const modal = await this.modalController.create({
      component: VoteGamesPage,
      componentProps: { eventId: this.event.id, actionType: 1, participants: this.participants.filter(p => p.status == 1) }
    });
    modal.onDidDismiss().then((data: any) => {
      this.getProposedGames();
    });
    return await modal.present();
  }

  checkIn() {
    this.eventService.checkIn(this.id, this.globals.user.id)
      .subscribe(
        saveResult => {
          if (saveResult.result) {
            this.checkedIn = true;
            this.getParticipants();
          }
        });
  }

  async viewParticipants() {
    const modal = await this.modalController.create({
      component: EventParticipantsListPage,
      componentProps: { event: this.event, participants: this.participants }
    });
    return await modal.present();
  }

  editLocation() {
    this.locationInputVisible = true;
  }

  saveLocation() {
    this.eventService.update(this.event)
      .subscribe(
        saveResult => {
          if (saveResult.result) {
            this.locationInputVisible = false;
          }
        });
  }
}
