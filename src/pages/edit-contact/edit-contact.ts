import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
} from 'ionic-angular';
import {ToastProvider} from '../../providers/toast/toast';
import {UserProvider} from '../../providers/user/user';
/**
 * Generated class for the EditContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-contact',
  templateUrl: 'edit-contact.html',
})
export class EditContactPage {
  countries: any = [];
  eventTypes: any = [];
  title = 'create contact';
  isEdit: boolean = false;
  displayText = 'Show More';
  more: boolean = false;
  temp_event_list: any = [];
  hrcUserContact = {
    hrcUserContactId: null,
    hrcUserId: this.user.user_session.hrcUser.hrcUserId,
    hrcUserContactFirstname: null,
    hrcUserContactLastname: null,
    hrcUserContactEmail: null,
    hrcUserContactCountryId: 0,
    hrcUserContactPhone: null,
    hrcIsContactAnExistingUser: false,
    hrcExistingUserId: null,
  };
  hrcUserContactKeyEventList = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastProvider,
    public user: UserProvider,
    public loadingCtrl: LoadingController
  ) {
    this.getAllCountries();
    this.getAllEvents();
    if (this.navParams.get('contact_data') != undefined) {
      this.title = 'edit contact';
      this.isEdit = true;
      this.getUserContactWithEventsByContactId(
        this.navParams.get('contact_data').hrcUserContactId
      );
    }
  }
  getUserContactWithEventsByContactId(id) {
    this.user.getUserContactWithEventsByContactId(id).then(
      res => {
        console.log(res);
        let arr;
        arr = res;
        this.hrcUserContact =
          arr.hrcUserContactLineItemDtoList[0].hrcUserContact;
        this.temp_event_list =
          arr.hrcUserContactLineItemDtoList[0].hrcUserContactKeyEventList;

        for (let i in this.temp_event_list) {
          this.hrcUserContactKeyEventList[i] = this.temp_event_list[i];
        }
        console.log(
          this.temp_event_list,
          'cc',
          this.hrcUserContactKeyEventList
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  getAllCountries() {
    this.user.getAllCountries().then(
      res => {
        let list = res;
        this.countries.push({
          hrcCountryAbbreviation: 'select',
          hrcCountryCode: 'sel',
          hrcCountryName: 'Select',
          hrcGeographicalRegionId: 0,
          hrcCountryId: 0,
        });

        for (let l in list) {
          this.countries.push({
            hrcCountryAbbreviation: list[l].hrcCountryAbbreviation,
            hrcCountryCode: list[l].hrcCountryCode,
            hrcCountryName: list[l].hrcCountryName,
            hrcGeographicalRegionId: list[l].hrcGeographicalRegionId,
            hrcCountryId: list[l].hrcCountryId,
          });
        }
        console.log(this.countries, 'get');
      },
      err => {}
    );
  }

  getAllEvents() {
    this.user.getAllHrcUserContactKeyEventType().then(
      res => {
        this.eventTypes = res;
        console.log(this.eventTypes, 'EVnetTypes');
      },
      err => {
        console.log('err');
      }
    );

    for (let i = 0; i < 5; i++) {
      this.hrcUserContactKeyEventList.push({
        hrcUserContactKeyEventId: null,
        hrcUserContactKeyEventTypeId: '0',
        hrcUserContactId: null,
        hrcUserContactKeyEventDate: '',
        hrcUserContactKeyEventOtherDesc: null,
        keyEventDate: null,
        eventTypeOther: false,
      });
    }
    console.log(this.hrcUserContactKeyEventList, 'event list');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditContactPage');
  }
  saveContact() {
  
    this.hrcUserContactKeyEventList = this.hrcUserContactKeyEventList.filter(
      x => x.hrcUserContactKeyEventTypeId != '0'
    );
    console.log(this.hrcUserContactKeyEventList, 'list');
    if (this.hrcUserContactKeyEventList.length == 0) {
      this.hrcUserContactKeyEventList = null;
    }
    if (
      this.hrcUserContact.hrcUserContactFirstname == null ||
      this.hrcUserContact.hrcUserContactFirstname == ''
    ) {
      this.toast.showToastTop('Please fill contacts first name');
    }
    // else if (
    //   this.hrcUserContact.hrcUserContactLastname == null ||
    //   this.hrcUserContact.hrcUserContactLastname == ''
    // ) {
    //   this.toast.showToastTop('Please fill contacts Last name');
    // }
     else if (
      this.hrcUserContact.hrcUserContactEmail == null ||
      this.hrcUserContact.hrcUserContactEmail == ''
    ) {
      this.toast.showToastTop('Please fill contacts Email Id');
    }
    // else if (
    //   this.hrcUserContact.hrcUserContactPhone == null ||
    //   this.hrcUserContact.hrcUserContactPhone == ''
    // ) {
    //   this.toast.showToastTop('Please fill contacts Phone Number');
    // }
    else if (this.hrcUserContact.hrcUserContactCountryId == 0) {
      this.toast.showToastTop('Please fill contacts Location');
    } else {
      let params = {
        hrcUser:this.user.user_session.hrcUser,
        hrcUserContactLineItemDtoList: [
          {
            hrcUserContact: this.hrcUserContact,
            hrcUserContactKeyEventList: this.hrcUserContactKeyEventList,
          },
        ],
      };
      if (!this.isEdit) {
        this.user.addUserContactList(params).then(
          res => {
            this.toast.showToast('Contact Created Sucessfully');
            this.navCtrl.pop();
          },
          err => {
            this.toast.showToast(err);
          }
        );
      } else {
        this.user.updateUserContact(params).then(
          res => {
            this.toast.showToast('Contact Updated Sucessfully');
            this.navCtrl.pop();
          },
          err => {
            this.toast.showToast(err);
          }
        );
      }
    }
  }
  show() {
    console.log(this.more);
    this.more = !this.more;
    if (this.more) {
      console.log('push');
      for (let i = 0; i < 5; i++) {
        this.hrcUserContactKeyEventList.push({
          hrcUserContactKeyEventId: null,
          hrcUserContactKeyEventTypeId: '0',
          hrcUserContactId: null,
          hrcUserContactKeyEventDate: '',
          hrcUserContactKeyEventOtherDesc: null,
          keyEventDate: null,
          eventTypeOther: false,
        });
      }
      this.displayText = 'Show Less';
    } else {
      console.log('splice');
      this.displayText = 'Show More';
      this.hrcUserContactKeyEventList.splice(
        5,
        this.hrcUserContactKeyEventList.length
      );
    }
  }
}
