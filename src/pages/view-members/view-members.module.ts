import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewMembersPage } from './view-members';

@NgModule({
  declarations: [
    ViewMembersPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewMembersPage),
  ],
})
export class ViewMembersPageModule {}
