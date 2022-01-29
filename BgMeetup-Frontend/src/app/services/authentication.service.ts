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

  registerUser(userLogin: UserLogin) {
    return this.http.post<any>(environment.apiUrl + '/auth/register', userLogin)
      .pipe(map(returnValue => {
        return returnValue;
      }));
  }

  login(userLogin: UserLogin) {
    var currentService = this;

    return this.http.post<any>(environment.apiUrl + '/auth/login', userLogin)
      .pipe(map(loginInfo => {

        if (loginInfo) {
          localStorage.setItem('currentLoginInfo', JSON.stringify(loginInfo));
          sessionStorage.setItem('currentLoginInfo', JSON.stringify(loginInfo));

          currentService.globals.user = loginInfo;
        }

        return loginInfo;
      }));
  }

  logout() {
    localStorage.removeItem('currentLoginInfo');
    sessionStorage.removeItem('currentLoginInfo');
    this.globals.user = null;
  }
}
