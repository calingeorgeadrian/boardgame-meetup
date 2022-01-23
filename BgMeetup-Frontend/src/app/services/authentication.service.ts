import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { map } from 'rxjs/operators';
import { Globals } from "../globals";
import { UserModel } from "../models/user.model";
import { UserLogin } from "../models/userLogin.model";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user: UserModel;

  constructor(
    private http: HttpClient,
    public globals: Globals) { }

  login(userLogin: UserLogin) {
    var currentService = this;

    var loginInfo = new UserModel();
    loginInfo.id = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3bbc";
    loginInfo.firstName = "George";
    loginInfo.lastName = "Calin";
    loginInfo.email = "calingeorgeadrian98@gmail.com";
    loginInfo.bggUsername = "RoyalFlush37";
    loginInfo.location = "Tulcea";

    localStorage.setItem('currentLoginInfo', JSON.stringify(loginInfo));
    sessionStorage.setItem('currentLoginInfo', JSON.stringify(loginInfo));

    currentService.globals.user = loginInfo;

    return loginInfo;

    //return this.http.post<any>(environment.apiUrl + '/authentication/Authenticate', userLogin)
    //  .pipe(map(loginInfo => {

    //    if (loginInfo) {
    //      localStorage.setItem('currentLoginInfo', JSON.stringify(loginInfo));
    //      sessionStorage.setItem('currentLoginInfo', JSON.stringify(loginInfo));

    //      currentService.globals.user = loginInfo;
    //    }

    //    return loginInfo;
    //  }));
  }

  logout() {
    localStorage.removeItem('currentLoginInfo');
    sessionStorage.removeItem('currentLoginInfo');
    this.globals.user = null;
  }
}
