import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
import {ToastProvider} from '../../providers/toast/toast';
/**
 * Generated class for the ViewMembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-members',
  templateUrl: 'view-members.html',
})
export class ViewMembersPage {
  hrcUserGroupId;
  members=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastProvider,
    public user: UserProvider,
    public loadingCtrl: LoadingController) {
      console.log( this.navParams.get('groupData'),"View")
    this.hrcUserGroupId= this.navParams.get('groupData').hrcUserGroup.hrcUserGroupId;
    this.getUserGroupsByUserId();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewMembersPage');
  }
  getUserGroupsByUserId() {
    let loading = this.loadingCtrl.create({content: 'Please Wait...'});
    loading.present();
    this.user.getUserGroupMembers(this.hrcUserGroupId).then(
      res => {
        let arr;
        arr=res;
        this.members=arr.hrcUserGroupMemberLineItemDtoList;
        console.log(this.members,"Members")
       loading.dismiss();
       
      },
      err => {
        loading.dismiss();
        this.toast.showToastTop(err);
        console.log(err, 'error');
      }
    );
  }

}
