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

  ngOnNavigatedTo() {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getEvents(this.globals.user.id).subscribe(events => {
      this.events = events;
      this.invites = events.filter(e => e.status == 0);
      this.ownEvents = events.filter(e => e.status == 1);
      this.otherEvents = events.filter(e => e.status != 0 && e.status != 1);
    });
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
    this.router.navigate(['/tabs/event-details'], { queryParams: { id: id }, replaceUrl: true });
  }

  acceptInvitation(id: any) {
    this.eventService.acceptInvitation(id, this.globals.user.id)
      .subscribe(
        saveResult => {
          if (saveResult.result) {
            this.viewEvent(id);
            this.presentToast('Invitation accepted.', 'success');
          }
        });
  }

  declineInvitation(id: any) {
    this.eventService.declineInvitation(id, this.globals.user.id)
      .subscribe(
        saveResult => {
          if (saveResult.result) {
            this.getEvents();
            this.presentToast('Invitation declined.', 'danger');
          }
        });
  }
}
