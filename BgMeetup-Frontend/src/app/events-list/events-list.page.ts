import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Globals } from '../globals';
import { EventModel } from '../models/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.page.html',
  styleUrls: ['./events-list.page.scss'],
})
export class EventsListPage implements OnInit {
  events: EventModel[] = [];
  invites: EventModel[] = [];
  ownEvents: EventModel[] = [];
  otherEvents: EventModel[] = [];


  constructor(private router: Router,
    public globals: Globals,
    public modalController: ModalController,
    public toastController: ToastController,
    private eventService: EventService) {
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.events = this.eventService.getEvents(this.globals.user.id);
    this.invites = this.events.filter(e => e.status == 0);
    this.ownEvents = this.events.filter(e => e.status == 1);
    this.otherEvents = this.events.filter(e => e.status != 0 && e.status != 1);

    //this.eventService.getEvents(this.globals.user.id).subscribe(events => {
    //  this.events = events;
    //  this.invites = events.filter(e => e.status == 0);
    //  this.ownEvents = events.filter(e => e.status == 1);
    //  this.otherEvents = events.filter(e => e.status != 0 && e.status != 1);
    //});
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  refresh(event) {
    setTimeout(() => {
      this.presentToast('Events succesfully refreshed.', 'success');
      event.target.complete();
      this.getEvents();
    }, 2000);
  }

  viewEvent(id: any) {
    console.log("view event " + id);
  }

  acceptInvitation(id: any) {
    console.log("accept invitation " + id);
  }

  declineInvitation(id: any) {
    console.log("decline invitation " + id);
  }
}
