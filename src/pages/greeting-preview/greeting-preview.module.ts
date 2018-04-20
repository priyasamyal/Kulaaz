import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GreetingPreviewPage } from './greeting-preview';

@NgModule({
  declarations: [
    GreetingPreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(GreetingPreviewPage),
  ],
  exports:[GreetingPreviewPage]
})
export class GreetingPreviewPageModule {}
