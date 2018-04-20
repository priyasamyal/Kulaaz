import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,LoadingController} from 'ionic-angular';
import {ToastProvider} from '../../providers/toast/toast';
import {UserProvider} from '../../providers/user/user';
import {AlertProvider} from '../../providers/alert/alert';
import * as moment from 'moment';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  register_data = {
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    birthday: new Date().toISOString(),
    country: 0,
    phone: "",
  };
  contact_by_text: boolean = true;
  contact_by_email: boolean = true;
  contact_by_phone: boolean = true;
  auto_credit: boolean = true;

  countries: any=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastProvider,
    public user: UserProvider,
    public alert: AlertProvider,
    public loadingCtrl: LoadingController
  ) {
   
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
      err => {
        console.log(err, 'error');
      }
    );
  }

  ionViewWillEnter() {}
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  goToSignIn() {
    console.log(this.register_data);
    var number_validation = /^[0-9]{10}$/;
    var password_validation = /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-@!]{6,16}$/;
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (this.register_data.email == '') {
      this.toast.showToast('Email is required');
    } else if (!EMAIL_REGEXP.test(this.register_data.email)) {
      this.toast.showToast('Please enter valid Email address');
    } else if (this.register_data.password == '') {
      this.toast.showToast('Password is required');
    } else if (!password_validation.test(this.register_data.password)) {
      this.toast.showToast(
        'Password length should be between 6-16 with no spaces'
      );
    } else if (this.register_data.confirm_password == '') {
      this.toast.showToast('Confirm Password is required');
    } else if (
      this.register_data.confirm_password != this.register_data.password
    ) {
      this.toast.showToast('Password and Confirm Password does not match');
    } else if (this.register_data.first_name == '') {
      this.toast.showToast('First Name is required');
    } else if (this.register_data.last_name == '') {
      this.toast.showToast('Last Name is required');
    } else if (this.register_data.birthday == '') {
      this.toast.showToast('Birthday is required');
    } else if (this.register_data.country == 0) {
      this.toast.showToast('Please select country');
    } else if (this.register_data.phone == '') {
      this.toast.showToast('Phone number is required');
    } else if (!number_validation.test(this.register_data.phone)) {
      this.toast.showToast('Phone number must contain 10 digits');
    } else {
      let loading = this.loadingCtrl.create({content: 'Please Wait...'});
      loading.present();
      let params = {
        hrcUser: {
          hrcUserId: null,
          hrcUserEmail: this.register_data.email,
          hrcUserPassword: this.register_data.password,
          hrcUserCrtDt: null,
          hrcUserUptDt: null,
          hrcIsUserTemp: false,
          hrcUserDetailsId: 0,
          hrcCountryId: this.register_data.country,
          hrcIsUserOptedForAutoAccept: this.auto_credit,
          hrcUserConfirmationCode: null,
          hrcUserConfirmPassword: this.register_data.confirm_password,
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
          hrcUserRegistrationConfirmed: false,
          pwdValid: false,
          emailValid: false,
        },
        hrcUserDetails: {
          hrcUserDetailsId: 0,
          hrcUserFirstName: this.register_data.first_name,
          hrcUserLastName: this.register_data.last_name,
          hrcUserPhone: parseInt(this.register_data.phone.toString()),
          hrcUserOptedForReminderAlerts: true,
          hrcUserOptedForDialyQuote: true,
          hrcUserOptedForDialyFortune: this.auto_credit,
          hrcCanUserBeContactedByText: this.contact_by_text,
          hrcCanUserBeContactedByEmail: this.contact_by_email,
          hrcCanUserBeContactedByPhone: this.contact_by_phone,
          hrcUserCrtDt: null,
          hrcUserUptDt: null,
          hrcUserDob: this.register_data.birthday.toString(),
        },
      };

      this.user.register(params).then(
        res => {
          loading.dismiss();
          this.user.userInfo=res;
          this.alert.showAlert(
            'Code Sent',
            'Please check your email for the confirmation code '
          );
          this.navCtrl.push('ConfirmationPage');
        },
        err => {
          loading.dismiss();
          this.toast.showToast(err);
          console.log(err, 'error');
        }
      );
    }
  }
}
