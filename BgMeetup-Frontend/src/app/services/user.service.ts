import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Globals } from "../globals";
import { SaveResult } from "../models/saveResult";
import { UserModel } from "../models/user.model";
import { UserLogin } from "../models/userLogin.model";

@Injectable({ providedIn: 'root' })
export class UserService {

  req = new XMLHttpRequest();

  constructor(
    private http: HttpClient,
    public globals: Globals) { }

  registerUser(userLogin: UserLogin) {
    var saveResult = new SaveResult();
    saveResult.result = true;
    saveResult.errors = null;

    return saveResult;
    //return this.http.post<any>(environment.apiUrl + '/users/RegisterUser', userLogin)
    //  .pipe(map(returnValue => {
    //    return returnValue;
    //  }));
  }

  saveUser(userModel: UserModel) {
    var currentService = this;
    localStorage.setItem('currentLoginInfo', JSON.stringify(userModel));
    sessionStorage.setItem('currentLoginInfo', JSON.stringify(userModel));

    currentService.globals.user = userModel;
    var saveResult = new SaveResult();
    saveResult.result = true;
    saveResult.errors = null;

    return saveResult;

    //let formData: FormData = new FormData();
    //formData.append('userDetails', JSON.stringify(userModel));

    //return this.http.post<any>(environment.apiUrl + '/users/SaveUserAsync', formData)
    //  .pipe(returnValue => {
    //    localStorage.setItem('currentLoginInfo', JSON.stringify(userModel));
    //    sessionStorage.setItem('currentLoginInfo', JSON.stringify(userModel));

    //    currentService.globals.user = userModel;
    //    return returnValue;
    //  });
  }

  //getUser(id: any): Observable<UserModel> {
  getUser(id: any): UserModel {
    var user = new UserModel();
    user.id = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3bbc";
    user.firstName = "George";
    user.lastName = "Calin";
    user.email = "calingeorgeadrian98@gmail.com";
    user.bggUsername = "RoyalFlush37";
    user.location = "Tulcea";
    return user;
    //return this.http.get<UserModel>(environment.apiUrl + '/users/GetUserAsync?id=' + id);
  }
}
