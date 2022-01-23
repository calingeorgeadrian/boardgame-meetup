import { Injectable } from "@angular/core";
import { UserModel } from "./models/user.model";

@Injectable()
export class Globals {
  public user: UserModel;

  constructor(private currentLogin: UserModel) {
    this.user = this.currentLogin;

    if (localStorage.getItem('currentLoginInfo'))
      this.user = JSON.parse(localStorage.getItem('currentLoginInfo'));
    else
      this.user = JSON.parse(sessionStorage.getItem('currentLoginInfo'));
  }
}
