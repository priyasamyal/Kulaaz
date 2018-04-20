import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyContactsPage } from './my-contacts';

@NgModule({
  declarations: [
    MyContactsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyContactsPage),
  ],
  exports:[MyContactsPage]
})
export class MyContactsPageModule {}
