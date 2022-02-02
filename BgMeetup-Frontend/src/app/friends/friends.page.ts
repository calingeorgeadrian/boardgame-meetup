import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Globals } from '../globals';
import { FriendModel } from '../models/friend.model';
import { FriendRequestModel } from '../models/friendRequest.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  email: string = '';
  friends: FriendModel[] = [];
  friendRequests: FriendRequestModel[] = [];
  receivedFriendRequests: FriendRequestModel[] = [];
  sentFriendRequests: FriendRequestModel[] = [];
  segmentValue: number = 1;

  constructor(private globals: Globals,
    public toastController: ToastController,
    private userService: UserService) {
  }

  ngOnInit() {
    this.getFriends();
    this.getFriendRequests();
  }

  getFriends() {
    // this.friends = this.userService.getFriends(this.globals.user.id);

    this.userService.getFriends(this.globals.user.id).subscribe(friends => {
     this.friends = friends;
    });
  }

  getFriendRequests() {
    // this.friendRequests = this.userService.getFriendRequests(this.globals.user.id);
    // this.receivedFriendRequests = this.friendRequests.filter(fr => fr.receiverId == this.globals.user.id);
    // this.sentFriendRequests = this.friendRequests.filter(fr => fr.senderId == this.globals.user.id);

    this.userService.getFriendRequests(this.globals.user.id).subscribe(friendRequests => {
     this.friendRequests = friendRequests;
     this.receivedFriendRequests = this.friendRequests.filter(fr => fr.receiverId === this.globals.user.id);
     this.sentFriendRequests = this.friendRequests.filter(fr => fr.senderId === this.globals.user.id);
    });
  }

  sendFriendRequest() {
    var friendRequest = new FriendRequestModel();
    friendRequest.name = this.email;
    friendRequest.email = this.email;
    friendRequest.senderId = this.globals.user.id;
    friendRequest.receiverId = null;
    //
    // var saveResult = this.userService.sendFriendRequest(friendRequest);
    // if (saveResult.result) {
    //   this.friendRequests.push(friendRequest);
    //   this.sentFriendRequests.push(friendRequest);
    //   this.presentToast('Friend request sent.', 'success');
    // }

    this.userService.sendFriendRequest(friendRequest)
     .subscribe(
       saveResult => {
         if (saveResult.result) {
           this.friendRequests.push(friendRequest);
           this.sentFriendRequests.push(friendRequest);
           this.presentToast('Friend request sent.', 'success');
         }
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

  segmentChanged(e) {
    this.segmentValue = e.detail.value;
  }

  acceptFriendRequest(id: any) {
    var saveResult = this.userService.acceptFriendRequest(id);
    if (saveResult.result) {
      var friendRequest = this.receivedFriendRequests.find(fr => fr.id === id);
      var newFriend = new FriendModel();
      newFriend.userId = friendRequest.senderId;
      newFriend.name = friendRequest.name;
      this.friends.push(newFriend);
      this.friendRequests = this.friendRequests.filter(fr => fr.id !== id);
      this.receivedFriendRequests = this.receivedFriendRequests.filter(fr => fr.id !== id);
      this.presentToast('Friend request accepted.', 'success');
    }

    //this.userService.acceptFriendRequest(id)
    //  .subscribe(
    //    saveResult => {
    //      if (saveResult.result) {
    //        var friendRequest = this.receivedFriendRequests.find(fr => fr.id === id);
    //        var newFriend = new FriendModel();
    //        newFriend.userId = friendRequest.senderId;
    //        newFriend.name = friendRequest.name;
    //        this.friends.push(newFriend);
    //        this.friendRequests = this.friendRequests.filter(fr => fr.id !== id);
    //        this.receivedFriendRequests = this.receivedFriendRequests.filter(fr => fr.id !== id);
    //        this.presentToast('Friend request accepted.', 'success');
    //      }
    //    });
  }

  declineFriendRequest(id: any) {
    var saveResult = this.userService.declineFriendRequest(id);
    if (saveResult.result) {
      this.friendRequests = this.friendRequests.filter(fr => fr.id !== id);
      this.receivedFriendRequests = this.receivedFriendRequests.filter(fr => fr.id !== id);
      this.presentToast('Friend request declined.', 'danger');
    }

    //this.userService.declineFriendRequest(id)
    //  .subscribe(
    //    saveResult => {
    //      if (saveResult.result) {
    //        this.friendRequests = this.friendRequests.filter(fr => fr.id !== id);
    //        this.receivedFriendRequests = this.receivedFriendRequests.filter(fr => fr.id !== id);
    //        this.presentToast('Friend request declined.', 'danger');
    //      }
    //    });
  }

  removeFriend(id: any) {
    var saveResult = this.userService.removeFriend(id);
    if (saveResult.result) {
      this.friends = this.friends.filter(f => f.userId !== id);
      this.presentToast('Friend removed.', 'danger');
    }

    //this.userService.removeFriend(id)
    //  .subscribe(
    //    saveResult => {
    //      if (saveResult.result) {
    //        this.friends = this.friends.filter(f => f.userId !== id);
    //        this.presentToast('Friend removed.', 'danger');
    //      }
    //    });
  }
}
