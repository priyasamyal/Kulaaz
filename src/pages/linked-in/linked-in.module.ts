import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LinkedInPage } from './linked-in';

@NgModule({
  declarations: [
    LinkedInPage,
  ],
  imports: [
    IonicPageModule.forChild(LinkedInPage),
  ],
  exports:[LinkedInPage]
})
export class LinkedInPageModule {}
