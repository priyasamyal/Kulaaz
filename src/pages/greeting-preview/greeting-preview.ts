import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
/**
 * Generated class for the GreetingPreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-greeting-preview',
  templateUrl: 'greeting-preview.html',
})
export class GreetingPreviewPage {
  greeting_data =[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public user: UserProvider,) {
    console.log(this.navParams.get('data'),"getdata")
    this.greeting_data=this.navParams.get('data')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GreetingPreviewPage');
  }
  closeModal(){
    this.view.dismiss();
  }
}
