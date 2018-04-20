import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InviteMembersPage } from './invite-members';

@NgModule({
  declarations: [
    InviteMembersPage,
  ],
  imports: [
    IonicPageModule.forChild(InviteMembersPage),
  ],
  exports:[InviteMembersPage]
})
export class InviteMembersPageModule {}
