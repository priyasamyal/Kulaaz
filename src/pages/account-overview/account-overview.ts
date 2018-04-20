import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';

/**
 * Generated class for the AccountOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-overview',
  templateUrl: 'account-overview.html',
})
export class AccountOverviewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public user:UserProvider) {
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountOverviewPage');
  }

}
