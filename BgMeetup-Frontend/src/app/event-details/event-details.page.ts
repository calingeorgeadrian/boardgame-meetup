import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventModel } from '../models/event.model';
import { EventParticipantModel } from '../models/eventParticipant.model';
import { UserModel } from '../models/user.model';
import { EventService } from '../services/event.service';
import { UserService } from '../services/user.service';

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
  games: any[] = [];

  participantsCount: number;
  locationInputVisible: boolean = false;

  constructor(private route: ActivatedRoute,
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
    console.log("invite user");
  }

  async vote() {
    console.log("vote games");
  }

  async seeParticipants() {
    console.log("view participants");
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
