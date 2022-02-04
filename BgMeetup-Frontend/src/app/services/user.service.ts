import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Globals} from "../globals";
import {FriendModel} from "../models/friend.model";
import {FriendRequestModel} from "../models/friendRequest.model";
import {SaveResult} from "../models/saveResult";
import {UserModel} from "../models/user.model";
import {UserLogin} from "../models/userLogin.model";

@Injectable({providedIn: 'root'})
export class UserService {

  req = new XMLHttpRequest();

  constructor(
    private http: HttpClient,
    public globals: Globals) {
  }

  update(userModel: UserModel) {
    var currentService = this;
    return this.http.post<any>(environment.apiUrl + '/users/update', userModel)
      .pipe(returnValue => {
        localStorage.setItem('currentLoginInfo', JSON.stringify(userModel));
        sessionStorage.setItem('currentLoginInfo', JSON.stringify(userModel));

        currentService.globals.user = userModel;
        return returnValue;
      });
  }

  //getUser(id: any): Observable<UserModel> {
  getUser(id: any): UserModel {
    var user = new UserModel();
    user.id = "84aafcd9-9df7-4676-9499-fe0bf897bdab";
    user.firstName = "George";
    user.lastName = "Calin";
    user.email = "calingeorgeadrian98@gmail.com";
    user.bggUsername = "RoyalFlush37";
    user.location = "Tulcea";
    return user;
    //return this.http.get<UserModel>(environment.apiUrl + '/users/GetUserAsync?id=' + id);
  }

  getFriends(id: any): Observable<FriendModel[]> {
    return this.http.get<FriendModel[]>(environment.apiUrl + '/friends/getFriends/' + id);
  }

  getFriendRequests(id: any): Observable<FriendRequestModel[]> {
    return this.http.get<FriendRequestModel[]>(environment.apiUrl + '/friends/friendRequests/' + id);
  }

  sendFriendRequest(friendRequestModel: FriendRequestModel) {
    let formData: FormData = new FormData();
    formData.append('email', friendRequestModel.email);

    return this.http.post<FriendRequestModel[]>(environment.apiUrl +
      '/friends/friendRequest/' + friendRequestModel.senderId, friendRequestModel.email);
  }

  acceptFriendRequest(item: FriendRequestModel): Observable<any> {
  // acceptFriendRequest(id: any): any {
  //   var saveResult = new SaveResult();
  //   saveResult.result = true;
  //   saveResult.errors = null;
  //
  //   return saveResult;

    return this.http.get<any>(environment.apiUrl + '/friends/friendRequest/' + item.senderId + '/accept/' + item.receiverId);
  }

  declineFriendRequest(item: FriendRequestModel): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + '/friends/friendRequest/' + item.senderId + '/decline/' + item.receiverId);
  }

  removeFriend(item: FriendModel): Observable<any> {
    console.log(item);
    return this.http.delete<any>(environment.apiUrl + '/friends/' + this.globals.user.id
      + '/remove/' + item.friendId);
    }
}
