import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventParticipantsListPage } from '../event-participants-list/event-participants-list.page';
import { GameDetailsPage } from '../game-details/game-details.page';
import { Globals } from '../globals';
import { InvitePage } from '../invite/invite.page';
import { EventModel } from '../models/event.model';
import { EventParticipantModel } from '../models/eventParticipant.model';
import { UserModel } from '../models/user.model';
import { ProposeGamesPage } from '../propose-games/propose-games.page';
import { EventService } from '../services/event.service';
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
  proposedGames: any[] = [];
  choosenGames: any[] = [];

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
    public modalController: ModalController,
    private eventService: EventService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.id = params['id'];
        if (this.id) {
          this.event = this.eventService.getEvent(this.id);
          this.participants = this.eventService.getEventParticipants(this.id);
          this.event.participantsCount = this.participants.length;
          this.proposedGames = this.eventService.getEventProposedGames(this.id);
          this.choosenGames = this.eventService.getEventChoosenGames(this.id);

          this.canProposeGames = this.choosenGames.length == 0;
          this.canVoteGames = this.proposedGames.length > 0;
          this.canChooseGames = this.proposedGames.filter(g => g.votes > 0).length > 0;
          this.canCheckIn = this.choosenGames.length > 0;
          this.canConfirmEvent = this.participants.filter(p => !p.checkIn).length == 0;
          this.checkedIn = this.participants.filter(p => p.checkIn && p.participantId == this.globals.user.id).length > 0;

          //this.eventService.getEvent(this.id).subscribe(eventDetails => {
          //  this.event = eventDetails;
          //});
          //this.eventService.getEventParticipants(this.id).subscribe(participants => {
          //  this.participants = participants;
          //});
        }
      });
  }

  async invite() {
    const modal = await this.modalController.create({
      component: InvitePage,
      componentProps: { participants: this.participants, eventId: this.id }
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
      componentProps: { eventId: this.event.id, participants: this.participants }
    });
    return await modal.present();
  }

  async vote() {
    const modal = await this.modalController.create({
      component: VoteGamesPage,
      componentProps: { eventId: this.event.id, actionType: 0 }
    });
    return await modal.present();
  }

  async choose() {
    const modal = await this.modalController.create({
      component: VoteGamesPage,
      componentProps: { eventId: this.event.id, actionType: 1 }
    });
    return await modal.present();
  }

  async confirm() {
    var saveResult = this.eventService.confirmEvent(this.event.id);
    if (saveResult.result) {
      this.locationInputVisible = false;
    }
  }

  async cancel() {
    var saveResult = this.eventService.cancelEvent(this.event.id);
    if (saveResult.result) {
      this.router.navigate(['/events-list'], { replaceUrl: true });
    } 
  }

  async leave() {
    var saveResult = this.eventService.leaveEvent(this.globals.user.id, this.event.id);
    if (saveResult.result) {
      this.router.navigate(['/events-list'], { replaceUrl: true });
    }
  }

  checkIn() {
    var saveResult = this.eventService.checkInParticipant(this.globals.user.id, this.event.id);
    if (saveResult.result) {
      this.checkedIn = true;
    }
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
    var saveResult = this.eventService.saveEvent(this.event);
    if (saveResult.result) {
      this.locationInputVisible = false;
    }

    //this.eventService.saveEvent(this.event)
    //  .subscribe(
    //    saveResult => {
    //      if (saveResult.result) {
    //        this.locationInputVisible = false;
    //      }
    //    });
  }
}
