import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { Globals } from '../globals';
import { UserLogin } from '../models/userLogin.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userLogin: UserLogin = new UserLogin();

  constructor(private router: Router,
    public globals: Globals,
    public toastController: ToastController,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Successfully logged in.',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  logForm() {
    this.authenticationService.login(this.userLogin)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            console.log(this.globals);
            this.presentToast();
            this.router.navigate(['/tabs/profile'], { replaceUrl: true });
          }
        });
  }

  login() {
    this.logForm();
  }
}
