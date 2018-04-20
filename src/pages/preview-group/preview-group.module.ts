import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreviewGroupPage } from './preview-group';

@NgModule({
  declarations: [
    PreviewGroupPage,
  ],
  imports: [
    IonicPageModule.forChild(PreviewGroupPage),
  ],
  exports:[PreviewGroupPage]
})
export class PreviewGroupPageModule {}
