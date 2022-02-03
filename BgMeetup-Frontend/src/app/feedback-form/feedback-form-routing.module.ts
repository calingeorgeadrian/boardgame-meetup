import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackFormPage } from './feedback-form.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackFormPageRoutingModule {}
