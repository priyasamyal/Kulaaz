import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
} from 'ionic-angular';
import {AlertProvider} from '../../providers/alert/alert';
import {ToastProvider} from '../../providers/toast/toast';
import {UserProvider} from '../../providers/user/user';
import * as moment from 'moment';
/**
 * Generated class for the UpdateProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {
  countries: any=[];
  register_data = {
    email: '',
    first_name: '',
    last_name: '',
    birthday: new Date().toISOString(),
    country: this.user.user_auth_data.hrcCountryId,
    phone: '',
  };
  contact_by_text: boolean = true;
  contact_by_email: boolean = true;
  contact_by_phone: boolean = true;
  auto_credit: boolean = true;
  user_data:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastProvider,
    public alert: AlertProvider,
    public user: UserProvider,
    public loadingCtrl: LoadingController
  ) {
  this.getAllCountries();
  this.getUserDetails();
  }
  ionViewWillEnter() {
    console.log('ionViewDidLoad UpdateProfilePage');
  }
  getAllCountries(){
    this.user.getAllCountries().then(
      res => {
        let list=res;
        this.countries.push({
          hrcCountryAbbreviation:'select',
          hrcCountryCode:'sel',
          hrcCountryName:'Select',
          hrcGeographicalRegionId:0,
          hrcCountryId:0
        })
       
        for(let l in list){
          this.countries.push({
            hrcCountryAbbreviation:list[l].hrcCountryAbbreviation,
            hrcCountryCode:list[l].hrcCountryCode,
            hrcCountryName:list[l].hrcCountryName,
            hrcGeographicalRegionId:list[l].hrcGeographicalRegionId,
            hrcCountryId:list[l].hrcCountryId
          })
        }
        
       
        console.log(this.countries, 'get');
       },
      err => {   }
    );
  }
  getUserDetails(){
    let loading = this.loadingCtrl.create({content: 'Please Wait...'});
    loading.present();
     this.user.getUserProfile(this.user.user_auth_data.hrcUserDetailsId).then(
      res => {
        this.user_data=res;
        console.log(this.user_data,"data")
        this.register_data = {
          email: this.user.user_auth_data.hrcUserEmail,
          first_name:  this.user_data.hrcUserFirstName,
          last_name: this.user_data.hrcUserLastName,
          birthday:  this.user_data.hrcUserDob,
          country:  this.user_data.hrcCountryId,
          phone: this.user_data.hrcUserPhone,
        };
        this.contact_by_text = this.user_data.hrcCanUserBeContactedByText;
        this.contact_by_email= this.user_data.hrcCanUserBeContactedByEmail;
        this.contact_by_phone = this.user_data.hrcCanUserBeContactedByPhone;
        this.auto_credit= this.user_data.hrcUserOptedForDialyFortune;
       loading.dismiss();
       },
      err => {
           loading.dismiss();
       
      }
    );
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateProfilePage');
  }
  updateProfile() {
    var number_validation = /^[0-9]{10}$/;
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    console.log(this.register_data);
    if (this.register_data.email == '') {
      this.toast.showToast('Email is required');
    } else if (!EMAIL_REGEXP.test(this.register_data.email)) {
      this.toast.showToast('Please enter valid Email address');
    } else if (this.register_data.first_name == '') {
      this.toast.showToast('First Name is required');
    } else if (this.register_data.last_name == '') {
      this.toast.showToast('Last Name is required');
    } else if (this.register_data.birthday == '') {
      this.toast.showToast('Birthday is required');
    } else if (this.register_data.phone == '') {
      this.toast.showToast('Phone number is required');
    } else if (!number_validation.test(this.register_data.phone)) {
      this.toast.showToast('Enter valid phone number with 10 digits');
    } else {
      let params = {
        hrcUser: {
          hrcUserId: this.user.user_auth_data.hrcUserId,
          hrcUserEmail: this.register_data.email,
          hrcUserPassword: this.user.user_auth_data.hrcUserPassword,
          hrcUserCrtDt: this.user.user_auth_data.hrcUserCrtDt,
          hrcUserUptDt: null,
          hrcIsUserTemp: false,
          hrcUserDetailsId: this.user.user_auth_data.hrcUserDetailsId,
          hrcCountryId: this.register_data.country,
          hrcIsUserOptedForAutoAccept: this.auto_credit,
          hrcUserConfirmationCode: null,
          hrcUserConfirmPassword: this.user.user_auth_data.hrcUserPassword,
          dobDispayDate: {
            month: moment(this.register_data.birthday).format('MM'),
            day: moment(this.register_data.birthday).format('DD'),
            year: moment(this.register_data.birthday).format('YYYY'),
            //"bidthDateFromDayMonYear" : null
          },
          validationMessage: null,
          tempConfirmationCode: null,
          resendCode: false,
          valid: false,
          hrcUserRegistrationConfirmed: true,
          pwdValid: true,
          emailValid: true,
        },
        hrcUserDetails: {
          hrcUserDetailsId: this.user.user_auth_data.hrcUserDetailsId,
          hrcUserFirstName: this.register_data.first_name,
          hrcUserLastName: this.register_data.last_name,
          hrcUserPhone: parseInt(this.register_data.phone.toString()),
          hrcUserOptedForReminderAlerts: true,
          hrcUserOptedForDialyQuote: true,
          hrcUserOptedForDialyFortune: this.auto_credit,
          hrcCanUserBeContactedByText: this.contact_by_text,
          hrcCanUserBeContactedByEmail: this.contact_by_email,
          hrcCanUserBeContactedByPhone: this.contact_by_phone,
          hrcUserCrtDt: this.user.user_auth_data.hrcUserCrtDt,
          hrcUserUptDt: null,
          hrcUserDob: this.register_data.birthday.toString(),
        },
      };
      console.log(params);
     
      this.user.updateUser(params).then(
        res => {
          this.toast.showToastTop("Profile Updated Successfully")
        this.getUserDetails();
        },
        err => {
          this.toast.showToastTop(err);
        }
      );
    }
  }
}
