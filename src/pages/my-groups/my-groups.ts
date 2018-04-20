import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
import {ToastProvider} from '../../providers/toast/toast';
/**
 * Generated class for the MyGroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-groups',
  templateUrl: 'my-groups.html',
})
export class MyGroupsPage {
  myGroups=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastProvider,
    public user: UserProvider,
    public loadingCtrl: LoadingController
  ) {
    this.getUserGroupsByUserId();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyGroupsPage');
  }
  goToPage(page,data) {
    console.log(data,'data')
    this.navCtrl.push(page,{'groupData':data});
  }
  getUserGroupsByUserId() {
    let loading = this.loadingCtrl.create({content: 'Please Wait...'});
    loading.present();
    this.user.getUserGroupsByUserId(this.user.user_session.hrcUser.hrcUserId).then(
      res => {
       let arr;
       arr=res;
        this.myGroups=arr.hrcUserGroupLineItemDtoList;
        console.log(this.myGroups)
        loading.dismiss();
        console.log(res);
      },
      err => {
        loading.dismiss();
        this.toast.showToastTop(err);
        console.log(err, 'error');
      }
    );
  }

  showPurpose(data){
    if(data.hrcIsGroupGiftUserGroup){
      return "Group Gift"
    }
    if(data.hrcIsGroupRewardUserGroup){
      return "Group Reward"
    }
    if(data.hrcIsFundraisingUserGroup){
      return "Fund Raising"
    }
    

  }
}
