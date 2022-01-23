import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { EventModel } from '../models/event.model';
import { EventParticipantModel } from '../models/eventParticipant.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-participants-list',
  templateUrl: './event-participants-list.page.html',
  styleUrls: ['./event-participants-list.page.scss'],
})
export class EventParticipantsListPage implements OnInit {
  event: EventModel = new EventModel();
  participants: EventParticipantModel[] = [];
  constructor(private navParams: NavParams,
    public viewCtrl: ModalController,
    private eventService: EventService) {
    this.event = navParams.get('event');
    this.participants = navParams.get('participants');
    console.log(this.participants);
  }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
