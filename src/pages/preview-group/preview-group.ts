import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
/**
 * Generated class for the PreviewGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preview-group',
  templateUrl: 'preview-group.html',
})
export class PreviewGroupPage {
  groupInfo=[];
  members='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public view: ViewController, public user: UserProvider) {
    console.log(this.navParams.get('data'),"getdata")
    console.log(this.navParams.get('members'),"getdata");
    this.groupInfo=this.navParams.get('data');
    this.members=this.navParams.get('members');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreviewGroupPage');
  }

  closeModal(){
    this.view.dismiss();
  }
}
