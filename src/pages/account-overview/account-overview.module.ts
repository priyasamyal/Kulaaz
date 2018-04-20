import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountOverviewPage } from './account-overview';

@NgModule({
  declarations: [
    AccountOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountOverviewPage),
  ],
  exports:[AccountOverviewPage]
})
export class AccountOverviewPageModule {}
