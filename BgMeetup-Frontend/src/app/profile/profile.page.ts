import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { UserModel } from '../models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: UserModel = new UserModel();

  bggInputVisible: boolean = false;
  locationInputVisible: boolean = false;

  constructor(private router: Router,
    public globals: Globals,
    private authenticationService: AuthenticationService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.globals.user;
  }

  editBGGUsername() {
    this.bggInputVisible = true;
  }

  saveBGGUsername() {
    this.userService.update(this.user)
      .subscribe(
        saveResult => {
          if (saveResult.result) {
            this.bggInputVisible = false;
          }
        });
  }

  editLocation() {
    this.locationInputVisible = true;
  }

  saveLocation() {
    this.userService.update(this.user)
      .subscribe(
        saveResult => {
          if (saveResult.result) {
            this.locationInputVisible = false;
          }
        });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
