import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
} from 'ionic-angular';
import {ToastProvider} from '../../providers/toast/toast';
import {AlertProvider} from '../../providers/alert/alert';
import {UserProvider} from '../../providers/user/user';
/**
 * Generated class for the UpdateBillingAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-billing-address',
  templateUrl: 'update-billing-address.html',
})
export class UpdateBillingAddressPage {
  countries: any = [];
  months = [
    {value: 'Select'},
    {value: '01'},
    {value: '02'},
    {value: '03'},
    {value: '04'},
    {value: '05'},
    {value: '06'},
    {value: '07'},
    {value: '08'},
    {value: '09'},
    {value: '10'},
    {value: '11'},
    {value: '12'},
  ];
  years = [
    {value: 'Select'},
    {value: '2017'},
    {value: '2018'},
    {value: '2019'},
    {value: '2020'},
    {value: '2021'},
    {value: '2022'},
    {value: '2023'},
    {value: '2024'},
    {value: '2025'},
    {value: '2026'},
    {value: '2027'},
    {value: '2028'},
  ];

  
  
  data;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastProvider,
    public alert: AlertProvider,
    public user: UserProvider,
    public loadingCtrl: LoadingController
  ) {
    this.getAllCountries();
    console.log(this.user.user_session, 'session');

    // this.getUserCCandBilling();
    //this.getCCTypes();
    //console.log(this.user.user_auth_data, 'data');
  }
  getAllCountries() {
    this.user.getAllCountries().then(
      res => {
        let list = res;
        this.countries.push({
          hrcCountryAbbreviation: 'select',
          hrcCountryCode: 'sel',
          hrcCountryName: 'select',
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
  getCCTypes() {
    this.user.getAllCreditCard().then(
      res => {
        this.countries = res;
      },
      err => {}
    );
  }
  // getUserCCandBilling() {

  // let loading = this.loadingCtrl.create({content: 'Please Wait...'});
  // loading.present();
  // let params = {hrcUserId: this.user.user_auth_data.hrcUserId};
  // console.log(params);
  // this.user.getUserCCandBillingByUserId(params).then(
  //   res => {
  //     loading.dismiss();
  //     this.data = res;
  //     this.billing_data = {
  //       address1: this.data.hrcAddress.hrcAddressLine1,
  //       address2: this.data.hrcAddress.hrcAddressLine2,
  //       address3: this.data.hrcAddress.hrcAddressLine3,
  //       city: this.data.hrcAddress.hrcAddressCity,
  //       postalCode: this.data.hrcAddress.hrcAddressPostalCode,
  //       state: this.data.hrcAddress.hrcAddressState,
  //       country: this.data.hrcAddress.hrcCountryId,
  //     };
  //     this.card_info = {
  //       card_type: this.data.hrcUserCreditCard.hrcCreditCardTypeId,
  //       card_no: this.data.hrcUserCreditCard.hrcUserCcNo,
  //       card_name: this.data.hrcUserCreditCard.hrcUserCcNameOnCard,
  //       exp_date: this.data.hrcUserCreditCard.hrcUserCcExpirationMonth,
  //       exp_month: this.data.hrcUserCreditCard.hrcUserCcExpirationYear,
  //     };
  //   },
  //   err => {
  //     loading.dismiss();
  //     console.log(err, 'error');
  //   }
  // );
  //}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateBillingAddressPage');
  }
  update() {
    var number_validation = /^[0-9]*$/;
    if ( this.user.user_session.hrcUserCreditCard.hrcCreditCardTypeId == 'select') {
      this.toast.showToast('Please select card type ');
    } else if (this.user.user_session.hrcUserCreditCard.hrcUserCcNo == '') {
      this.toast.showToast('Card number is required');
    } else if (!number_validation.test(  this.user.user_session.hrcUserCreditCard.hrcUserCcNo) ) {
      this.toast.showToast('Enter valid card number');
    } else if ( this.user.user_session.hrcUserCreditCard.hrcUserCcNameOnCard == '' ) {
      this.toast.showToast('Card holder name is required');
    } else if (this.user.user_session.hrcUserCreditCard.hrcUserCcExpirationMonth =='Select')  {
      this.toast.showToast('Please select expiration month');
     } else if ( this.user.user_session.hrcUserCreditCard.hrcUserCcExpirationYear == 'Select' ) {
      this.toast.showToast('Please select expiration year');
    } else if (this.user.user_session.hrcAddress.hrcAddressLine1 == '') {
      this.toast.showToast('Address Line 1 is required');
    } else if (this.user.user_session.hrcAddress.hrcAddressLine2 == '') {
      this.toast.showToast('Address 2 is required');
    } else if (this.user.user_session.hrcAddress.hrcAddressLine3 == '') {
      this.toast.showToast('Address 3 is required');
    } else if (this.user.user_session.hrcAddress.hrcAddressCity == '') {
      this.toast.showToast('City is required');
    } else if (this.user.user_session.hrcAddress.hrcAddressPostalCode == '') {
      this.toast.showToast('Postal Code is required');
    } else if (this.user.user_session.hrcAddress.hrcAddressState == '') {
      this.toast.showToast('State is required');
    } else if (this.user.user_session.hrcAddress.hrcCountryId == 0) {
      this.toast.showToast('Please select country');
    } else {
      let params = {
        hrcAddress: this.user.user_session.hrcAddress,
        hrcUserCreditCard: this.user.user_session.hrcUserCreditCard,
      };
      console.log(params);
      let loading = this.loadingCtrl.create({content: 'Please Wait...'});
      loading.present();
      this.user.updateCCandBilling(params).then(
        res => {
          loading.dismiss();
          console.log(res);
          this.user.user_session = res;
          this.toast.showToastTop('Credit Card and Billing Address Updated');
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
