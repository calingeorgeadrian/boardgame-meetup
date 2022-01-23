import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Globals } from '../globals';
import { EventModel } from '../models/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.page.html',
  styleUrls: ['./event-form.page.scss'],
})
export class EventFormPage implements OnInit {
  event: EventModel = new EventModel();

  constructor(public viewCtrl: ModalController,
    public globals: Globals,
    public toastController: ToastController,
    private eventService: EventService) {
    this.event.reqNumberOfPlayers = 2;
    this.event.location = globals.user.location;
  }

  ngOnInit() {

  }

  logForm() {
    this.save();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Event succesfully created.',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.event.hostId = this.globals.user.id;
    var saveResult = this.eventService.saveEvent(this.event);

    if (saveResult.result) {
    this.presentToast();
    this.dismiss();
    }

    //this.eventService.saveEvent(this.event)
    //  .subscribe(
    //    saveResult => {
    //      if (saveResult.result) {
    //        this.presentToast();
    //        this.dismiss();
    //      }
    //    });
  }
}
