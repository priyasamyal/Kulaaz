import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ModalController
} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
import {ToastProvider} from '../../providers/toast/toast';
/**
 * Generated class for the CreateGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-group',
  templateUrl: 'create-group.html',
})
export class CreateGroupPage {
  title = 'create group';
  isEdit: boolean = false;

  hrcUserGroup = {
    hrcUserGroupId: 0,
    hrcCountryId: 1,
    hrcMsgFrequencyId: 0,
    hrcUserId: this.user.user_session.hrcUser.hrcUserId,
    hrcUserGroupName: '',
    hrcUserGroupDesc: 'Group Desription',
    hrcUserGroupObjectives: '',
    hrcIsFundraisingUserGroup: false,
    hrcIsGroupGiftUserGroup: true,
    hrcIsGroupRewardUserGroup: false,
    hrcIsSingleLocationUserGroup: false,
    hrcIsAutomaticRemindersEnabled: true,
    hrcIsGiftRangeSuggestionByLocationEnabled: true,
    hrcUserGroupInvMsgSubject: '',
    hrcUserGroupInvMsgBody: '',
    hrcUserGroupInvMsgFooter: '',
    hrcUserGroupInvMsgBgImgLocation: null,
    hrcUserGroupEventStartDate: '',
    hrcUserGroupEndDate: '',
    hrcIsUserGroupActive: true,
    hrcUserGroupDeactivatedDt: null,
    hrcUserGroupUpdatedDate: 1515994156934,
    hrcCanInvitationBeExtendedByMember: false,
    startDate: null,
    endDate: null,
  };
  groupMemberList='';
  radioOptions = '1';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastProvider,
    public user: UserProvider,
    public loadingCtrl: LoadingController,
    public modal: ModalController,
  ) {
    console.log(this.navParams.get('groupData'));
    if (this.navParams.get('groupData') != undefined) {
      this.title = 'edit group';
      this.isEdit = true;
      this.hrcUserGroup = this.navParams.get('groupData').hrcUserGroup;
      this.hrcUserGroup.hrcUserGroupEventStartDate = new Date(
        this.hrcUserGroup.hrcUserGroupEventStartDate
      ).toISOString();
      this.hrcUserGroup.hrcUserGroupEndDate = new Date(
        this.hrcUserGroup.hrcUserGroupEndDate
      ).toISOString();
      console.log(this.hrcUserGroup, 'list');
      this.getEmails();
        if(this.hrcUserGroup.hrcIsFundraisingUserGroup){
          this.radioOptions='3'
        }else if(this.hrcUserGroup.hrcIsGroupGiftUserGroup){
          this.radioOptions='1'
        }
        else if(this.hrcUserGroup.hrcIsGroupRewardUserGroup){
          this.radioOptions='2'
        }

    }
  }

  getEmails(){
    this.user.getUserGroupMembersEmailList(this.hrcUserGroup.hrcUserGroupId).then(
      res => {
            let arr;
            arr=res;
            arr.map(c=>c+', ');
            this.groupMemberList=arr;
            console.log(this.groupMemberList,"memeber")
        },
      err => {
       
        this.toast.showToastTop(err);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateGroupPage');
  }
  createGroup() {
    if(this.hrcUserGroup.hrcUserGroupName==''){
      this.toast.showToastTop("Please enter group Name")
    }
    else if(this.hrcUserGroup.hrcUserGroupObjectives==''){
      this.toast.showToastTop("Please enter group Objectives")
    }
    else if(this.hrcUserGroup.hrcUserGroupEventStartDate==''){
      this.toast.showToastTop("Please enter Event Start Date")
    }
    else if(this.hrcUserGroup.hrcUserGroupEndDate==''){
      this.toast.showToastTop("Please enter Event End Date")
    }
    else if(this.groupMemberList==''){
      this.toast.showToastTop("Please enter group member emails")
    }
    else if(this.hrcUserGroup.hrcUserGroupInvMsgSubject==''){
      this.toast.showToastTop("Please enter Group Subject")
    }
    else if(this.hrcUserGroup.hrcUserGroupInvMsgBody==''){
      this.toast.showToastTop("Please enter Group Body")
    }
    else if(this.hrcUserGroup.hrcUserGroupInvMsgFooter==''){
      this.toast.showToastTop("Please enter Group Footer")
    }
    else{
      if (this.radioOptions == '1') {
        this.hrcUserGroup.hrcIsGroupRewardUserGroup = false;
        this.hrcUserGroup.hrcIsGroupGiftUserGroup = true;
        this.hrcUserGroup.hrcIsFundraisingUserGroup = false;
      }
      else if (this.radioOptions == '2') {
        this.hrcUserGroup.hrcIsGroupRewardUserGroup = true;
        this.hrcUserGroup.hrcIsGroupGiftUserGroup = false;
        this.hrcUserGroup.hrcIsFundraisingUserGroup = false;
      } else if (this.radioOptions == '3') {
        this.hrcUserGroup.hrcIsFundraisingUserGroup = true;
        this.hrcUserGroup.hrcIsGroupRewardUserGroup = false;
        this.hrcUserGroup.hrcIsGroupGiftUserGroup = false;
      }
      console.log(this.hrcUserGroup, 'Data', this.radioOptions);
  
      if (!this.isEdit) {
        let params = {
          hrcUser: this.user.user_session.hrcUser,
          hrcUserGroupLineItemDtoList: [
            {
              hrcUserGroup: this.hrcUserGroup,
              hrcUserGroupMemberList: [],
              hrcUserGroupContributionList: [],
              groupPurpose: null,
              groupMemberList: this.groupMemberList,
            },
          ],
        };
        console.log('params', params);
        let loading = this.loadingCtrl.create({content: 'Please Wait...'});
        loading.present();
        this.user.registerGroup(params).then(
          res => {
            this.toast.showToast('Group Created Successfuly');
            this.navCtrl.pop();
            loading.dismiss();
          },
          err => {
            loading.dismiss();
            this.toast.showToastTop(err);
          }
        );
      }
  
      else{
       console.log(this.hrcUserGroup,"Edit")
        let loading = this.loadingCtrl.create({content: 'Please Wait...'});
        loading.present();
        this.user.updateUserGroup(this.hrcUserGroup).then(
          res => {
            this.toast.showToast('Group Updated Successfuly');
            this.navCtrl.pop();
            loading.dismiss();
          },
          err => {
            loading.dismiss();
            this.toast.showToastTop(err);
          }
        );
      }
    }
  
  }

  previewGroup(){
    let modal = this.modal.create("PreviewGroupPage",{data:this.hrcUserGroup,members:this.groupMemberList});
    modal.present();
  }
}
