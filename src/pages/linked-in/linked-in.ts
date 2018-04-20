import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LinkedIn } from '@ionic-native/linkedin';

/**
 * Generated class for the LinkedInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-linked-in',
  templateUrl: 'linked-in.html',
})
export class LinkedInPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,private linkedin: LinkedIn) {
    this.linkedin.hasActiveSession().then((active) => {
      console.log(active,"already login")
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LinkedInPage');
  }
  login() {
   
    this.linkedin.login( ['r_basicprofile', 'r_emailaddress', 'rw_company_admin', 'w_share'], true)
      .then((res) => console.log('Logged in!',res))
      .catch(e => console.log('Error logging in', e));
  }

  logout() {
    this.linkedin.logout();
   }

  getConnection(){
    this.linkedin.getRequest('people/~/connections?modified=new')
  .then(res => console.log(res))
  .catch(e => console.log(e));
    }
  

}
