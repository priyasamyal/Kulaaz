import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
import {ToastProvider} from '../../providers/toast/toast';
/**
 * Generated class for the InviteMembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invite-members',
  templateUrl: 'invite-members.html',
})
export class InviteMembersPage {
  group_name='';
  members='';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastProvider,
    public user: UserProvider,
    public loadingCtrl: LoadingController) {
    console.log(this.navParams.get('groupData'));
    this.group_name=this.navParams.get('groupData').hrcUserGroup.hrcUserGroupName;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InviteMembersPage');
  }

  inviteMembers(){
    if(this.members==''){
      this.toast.showToastTop("Please enter comma separated Email Ids")
    }else{
      let params={
        hrcUser:this.user.user_session.hrcUser,
        hrcUserGroupLineItemDtoList :  [{
          hrcUserGroup : this.navParams.get('groupData').hrcUserGroup,
          hrcUserGroupMemberList : [],
          hrcUserGroupContributionList :[],
          groupPurpose : null,
          groupMemberList :this.members
        } ]
      }
      let loading = this.loadingCtrl.create({content: 'Please Wait...'});
      loading.present();
      this.user.inviteMembersToGroup(params).then(
        res => {
          loading.dismiss();
          this.toast.showToast("Members Invited Sucessfully");
          this.navCtrl.pop();
        },
        err => {
          loading.dismiss();
          this.toast.showToastTop(err);
          console.log(err, 'error');
        }
      );
    }
    
  }

}
