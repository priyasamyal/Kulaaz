import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateBillingAddressPage } from './update-billing-address';

@NgModule({
  declarations: [
    UpdateBillingAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateBillingAddressPage),
  ],
  exports:[UpdateBillingAddressPage]
})
export class UpdateBillingAddressPageModule {}
