import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventFormPage } from '../event-form/event-form.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public modalController: ModalController) {
  }

  ngOnInit() {
  }

  async createEvent() {
    const modal = await this.modalController.create({
      component: EventFormPage
    });
    return await modal.present();
  }
}
