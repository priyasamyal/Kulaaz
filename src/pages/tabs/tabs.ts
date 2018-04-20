import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  mySelectedIndex: number;
  tab1Root: any = "AccountOverviewPage";
  tab2Root: any = "BuyPage";
  tab3Root: any = "SendPage";
  tab4Root:any="RedeemPage"
  tab5Root:any="UpdateBillingAddressPage"

  constructor(public navCtrl: NavController, public navParams: NavParams,public user: UserProvider) {
    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
