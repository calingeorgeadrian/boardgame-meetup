import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserLogin } from '../models/userLogin.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userLogin: UserLogin = new UserLogin();

  constructor(private router: Router,
    public toastController: ToastController,
    private userService: UserService) {
  }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Account succesfully created.',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  logForm() {
    this.presentToast();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  register() {
    var currentComponent = this;
    var user = this.userLogin;
    var saveResult = this.userService.registerUser(this.userLogin);
      if (saveResult.result) {
        this.router.navigate(['/login'], { replaceUrl: true });
      }

    //this.userService.registerUser(this.userLogin)
    //  .subscribe(
    //    saveResult => {
    //      if (saveResult.result) {
    //        this.router.navigate(['/login'], { replaceUrl: true });
    //      }
    //    });
  }
}
