
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {

  constructor(public toastCtrl: ToastController) {
    console.log('Hello ToastProvider Provider');
  }

  showToastTop(msg){
    this.toastCtrl.create({
      message: msg,
      duration:1000,
      position: 'top'
    }).present();
  }
  showToastBack(msg){
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    }).present();
  }

  showToast(msg){
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    }).present();
  }
}
