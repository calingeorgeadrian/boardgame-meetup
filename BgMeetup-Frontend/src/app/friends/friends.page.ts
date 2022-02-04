import {Component, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {Globals} from '../globals';
import {FriendModel} from '../models/friend.model';
import {FriendRequestModel} from '../models/friendRequest.model';
import {UserService} from '../services/user.service';

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
    this.userService.getFriendRequests(this.globals.user.id).subscribe(friendRequests => {
      this.friendRequests = friendRequests;
      this.receivedFriendRequests = this.friendRequests.filter(fr => fr.receiverId === this.globals.user.id);
      this.sentFriendRequests = this.friendRequests.filter(fr => fr.senderId === this.globals.user.id);
      console.log(friendRequests);
      console.log(this.sentFriendRequests);
    });
  }

  sendFriendRequest() {
    var friendRequest = new FriendRequestModel();
    friendRequest.name = this.email;
    friendRequest.email = this.email;
    friendRequest.senderId = this.globals.user.id;
    friendRequest.receiverId = null;

    this.userService.sendFriendRequest(friendRequest)
      .subscribe(
        friendRequests => {
          console.log(friendRequests);
          this.friendRequests = friendRequests;
          // if (friendRequests.length) {
            this.receivedFriendRequests = this.friendRequests.filter(fr => fr.receiverId === this.globals.user.id);
            this.sentFriendRequests = this.friendRequests.filter(fr => fr.senderId === this.globals.user.id);
          // } else {
          //   this.receivedFriendRequests = [];
          //   this.sentFriendRequests = [];
          // }
          this.presentToast('Friend request sent.', 'success');
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

  acceptFriendRequest(friendRequestModel: FriendRequestModel) {
    this.userService.acceptFriendRequest(friendRequestModel)
      .subscribe(
        _ => {
          var friendRequest = this.receivedFriendRequests
            .find(fr => fr.senderId === friendRequestModel.senderId && fr.receiverId === friendRequestModel.receiverId);
          var newFriend = new FriendModel();
          console.log(friendRequest);
          newFriend.friendId = friendRequest.senderId;
          newFriend.name = friendRequest.name;
          this.friends.push(newFriend);

          this.friendRequests = this.friendRequests.filter(fr => fr.senderId === friendRequestModel.senderId
            && fr.receiverId === friendRequestModel.receiverId);
          this.receivedFriendRequests = this.receivedFriendRequests.filter(fr => fr.senderId !== friendRequestModel.senderId);

          this.presentToast('Friend request accepted.', 'success');
        });
  }

  declineFriendRequest(friendRequestModel: FriendRequestModel) {
    this.userService.declineFriendRequest(friendRequestModel)
      .subscribe(
        _ => {
          this.friendRequests = this.friendRequests.filter(fr => fr.senderId === friendRequestModel.senderId
            && fr.receiverId === friendRequestModel.receiverId);
          this.receivedFriendRequests = this.receivedFriendRequests.filter(fr => fr.senderId !== friendRequestModel.senderId);
          this.sentFriendRequests = this.sentFriendRequests.filter(fr => fr.receiverId !== friendRequestModel.receiverId);
          this.presentToast('Friend request declined.', 'danger');
        });
  }

  removeFriend(item: FriendModel) {
    this.userService.removeFriend(item)
      .subscribe(
        _ => {
          this.friends = this.friends.filter(f => f.friendId !== item.friendId);
          this.presentToast('Friend removed.', 'danger');
        });
  }
}
