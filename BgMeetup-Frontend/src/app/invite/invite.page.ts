import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Globals } from '../globals';
import { EventParticipantModel } from '../models/eventParticipant.model';
import { FriendModel } from '../models/friend.model';
import { EventService } from '../services/event.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
})
export class InvitePage implements OnInit {
  email: string = '';
  eventId: any;
  friends: FriendModel[] = [];
  participants: EventParticipantModel[] = [];

  constructor(private navParams: NavParams,
    public globals: Globals,
    public viewCtrl: ModalController,
    public toastController: ToastController,
    private eventService: EventService,
    private userService: UserService) {
    this.eventId = navParams.get('eventId');
    this.participants = navParams.get('participants');
  }

  ngOnInit() {
    this.friends = this.userService.getFriends(this.globals.user.id);

    //this.userService.getFriends(this.globals.user.id).subscribe(friends => {
    //  this.friends = friends;
    //});
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Invitation sent.',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  invite() {
    var participant = new EventParticipantModel();
    participant.email = this.email;
    participant.eventId = this.eventId;
    participant.inviterId = this.globals.user.id;
    participant.status = 0;
    participant.participantName = this.email;

    this.eventService.invite(participant)
      .subscribe(
        saveResult => {
          if (saveResult.result) {
            this.eventService.getParticipants(this.eventId).subscribe(participants => {
              this.participants = participants;
              this.presentToast();
              this.dismiss();
            });
          }
        });
  }

  inviteFriend(friend: any) {
    var participant = new EventParticipantModel();
    participant.email = friend.email;
    participant.eventId = this.eventId;
    participant.participantId = friend.userId;
    participant.inviterId = this.globals.user.id;
    participant.status = 0;
    participant.participantName = friend.name;

    console.log("friends not yet implemented");

    //this.eventService.sendEventInvitation(participant)
    //  .subscribe(
    //    saveResult => {
    //      if (saveResult.result) {
    //        this.presentToast();
    //        this.participants.push(participant);
    //        this.dismiss();
    //      }
    //    });
  }
}
