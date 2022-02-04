import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackFormPageRoutingModule } from './feedback-form-routing.module';

import { FeedbackFormPage } from './feedback-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackFormPageRoutingModule
  ],
  declarations: [FeedbackFormPage]
})
export class FeedbackFormPageModule {}
