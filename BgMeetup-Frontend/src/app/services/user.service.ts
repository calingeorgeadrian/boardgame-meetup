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
    // getFriendRequests(id: any): FriendRequestModel[] {
    //   var requests = [];
    //
    //   var request1 = new FriendRequestModel();
    //   request1.id = "40b7deed-e4a2-4b3c-ac35-4b8f5407b874";
    //   request1.email = "alexion@gmail.com";
    //   request1.name = "Alexandru Ionescu";
    //   request1.senderId = "40b7deed-e4a2-4b3c-ac35-4b8f5407b874";
    //   request1.receiverId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3bbc";
    //   requests.push(request1);
    //
    //   var request2 = new FriendRequestModel();
    //   request2.id = "40b7deed-e4a2-4b3c-ac35-4b8f5407b874";
    //   request2.email = "popandrei@gmail.com";
    //   request2.name = "Andrei Popa";
    //   request2.senderId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3bbc";
    //   request2.receiverId = "fc540693-4534-4904-affa-360bd86c6601";
    //   requests.push(request2);
    //
    //   return requests;
    return this.http.get<FriendRequestModel[]>(environment.apiUrl + '/friends/friendRequests/' + id);
  }

  sendFriendRequest(friendRequestModel: FriendRequestModel) {
    // var saveResult = new SaveResult();
    // saveResult.result = true;
    // saveResult.errors = null;
    //
    // return saveResult;

    let formData: FormData = new FormData();
    formData.append('email', friendRequestModel.email);

    return this.http.post<SaveResult>(environment.apiUrl +
      '/friends/friendRequest/' + friendRequestModel.senderId, friendRequestModel.email)
      .pipe(returnValue => {
        return returnValue;
      });
  }

  //acceptFriendRequest(id: any): Observable<any> {
  acceptFriendRequest(id: any): any {
    var saveResult = new SaveResult();
    saveResult.result = true;
    saveResult.errors = null;

    return saveResult;

    /*return this.http.get<any>(environment.apiUrl + '/users/AcceptFriendRequestAsync?id=' + id);*/
  }

  //declineFriendRequest(id: any): Observable<any> {
  declineFriendRequest(id: any): any {
    var saveResult = new SaveResult();
    saveResult.result = true;
    saveResult.errors = null;

    return saveResult;

    //return this.http.get<any>(environment.apiUrl + '/users/DeclineFriendRequestAsync?id=' + id);
  }

  //removeFriend(id: any): Observable<any> {
  removeFriend(id: any): any {
    var saveResult = new SaveResult();
    saveResult.result = true;
    saveResult.errors = null;

    return saveResult;

    //return this.http.get<any>(environment.apiUrl + '/users/RemoveFriendAsync?id=' + id);
  }
}
