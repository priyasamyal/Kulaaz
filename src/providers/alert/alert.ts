
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the AlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertProvider {

  constructor(private alertCtrl: AlertController) {
    console.log('Hello AlertProvider Provider');
  }

  showAlert(title, msg) {
    this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: ['Ok']
    }).present();
  }
}
