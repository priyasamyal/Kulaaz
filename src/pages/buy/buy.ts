import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,LoadingController} from 'ionic-angular';
import {ToastProvider} from '../../providers/toast/toast';
import {UserProvider} from '../../providers/user/user';
/**
 * Generated class for the BuyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
})
export class BuyPage {
  point_to_purchase_list;
  points_to_display=[];
  countries: any = [];
  point;
  newUser:boolean=false;
  change: boolean = false;
  point_selected;
  limit_exceeds:boolean=false;
  currentyear=new Date().getFullYear();
  selected_option: string = 'current';
  display_card_type="MasterCard"
  
 
  months = [
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
  data = {
    hrcPointCost:'14',
    hrcPointProcessingFee:'29',
    hrcTotalAmount:'209',
    hrcPointPurchased: 'Select',
    hrcCreditCardTypeId: 'Select',
    hrcUserCcNo: '',
    hrcUserCcNameOnCard: '',
    hrcUserCcCCVCode: '',
    hrcUserCcExpirationMonth: 'Select',
    hrcUserCcExpirationYear: 'Select',
    hrcAddressLine1: '',
    hrcAddressLine2: '',
    hrcAddressLine3: '',
    hrcAddressCity: '',
    hrcAddressPostalCode: '',
    hrcAddressState: '',
    hrcCountryId: 'Select',
    userCCOption:'EXISTING_CC'
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastProvider,
    public user: UserProvider,
    public loadingCtrl: LoadingController
  ) {
    if(!this.user.user_session.hrcUserCreditCard.hrcUserCcExpirationMonth){
        this.newUser=true;
        this.change=true;
        this.data.userCCOption="NEW_CC"
        this.user.user_session.hrcUserCreditCard.hrcUserCcExpirationMonth='Select'
    }
    if(!this.user.user_session.hrcUserCreditCard.hrcUserCcExpirationYear){
      
      user.user_session.hrcUserCreditCard.hrcUserCcExpirationYear='Select'
    }
    if(!user.user_session.hrcAddress.hrcAddressLine1){
     
      user.user_session.hrcAddress.hrcAddressLine1='';
      user.user_session.hrcAddress.hrcAddressLine2='';
      user.user_session.hrcAddress.hrcAddressLine3='';
      user.user_session.hrcAddress.hrcAddressCity='';
      user.user_session.hrcAddress.hrcAddressPostalCode='';
      user.user_session.hrcAddress.hrcAddressState='';
      user.user_session.hrcAddress.hrcCountryId=0;
    }else{
      if( this.user.user_session.hrcUserCreditCard.hrcCreditCardTypeId==1){
        this.display_card_type="Visa"+"-"+this.user.user_session.hrcUserCreditCard.hrcUserCcNo.substring(this.user.user_session.hrcUserCreditCard.hrcUserCcNo.length-4,this.user.user_session.hrcUserCreditCard.hrcUserCcNo.length);
      }
      else if( this.user.user_session.hrcUserCreditCard.hrcCreditCardTypeId==2){
        this.display_card_type="MasterCard"+"-"+this.user.user_session.hrcUserCreditCard.hrcUserCcNo.substring(this.user.user_session.hrcUserCreditCard.hrcUserCcNo.length-4,this.user.user_session.hrcUserCreditCard.hrcUserCcNo.length);
        
      }
     
    }
    this.getAllCountries();
    this.getBuyPoints();
           if(this.user.user_session.hrcCountry.hrcMaxAnnualPurchLimit  * this.user.user_session.hrcCountry.hrcCountryPointsPerUnitOfCurrency < user.user_session.hrcRwrdPointBalance.hrcUserPointBalancePurchasedYearToDate){
            this.limit_exceeds=true;
           }

  }
  getBuyPoints(){
    console.log("getBuyPoints function call")
    this.user.getBuyPointsList(this.user.user_session.hrcCountry.hrcCountryId,this.user.user_session.hrcRwrdPointBalance.hrcUserPointBalancePurchasedYearToDate).then(
      res => {
        this.point_to_purchase_list=res;
        for(var i in this.point_to_purchase_list) {
          if (this.point_to_purchase_list.hasOwnProperty(i)) {
           this.points_to_display.push({value:this.point_to_purchase_list[i]})
          }
      }
      this.point=this.points_to_display[0].value;
      this.point_selected=this.point;
      this.points_selected(this.point);
      console.log(this.points_to_display,"display");
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
  points_selected(event){
    this.point_selected=event;
    console.log("points_selected",event)
    this.user.getBuyDisplayAmounts(this.user.user_session.hrcCountry.hrcCountryId,event).then(
      res => {
        console.log(res,"res");
       var response;
        response=res;
        this.data.hrcPointCost=response.costOfPoints.money;
        this.data.hrcPointProcessingFee=response.processingFee.money;
        this.data.hrcTotalAmount=response.totalAmount.money;
        console.log(res,this.data);
       }
     );
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyPage');
  }
  ionViewWillLoad(){
    console.log('ionViewWIllLoad BuyPage');
    
  }

  onBuyPoints() {
    console.log('buy points button click', this.data);
    var number_validation = /^[0-9]*$/;
    if ( this.user.user_session.hrcUserCreditCard.hrcCreditCardTypeId == 0) {
      this.toast.showToast('Please select card type ');
    } else if (this.user.user_session.hrcUserCreditCard.hrcUserCcNo == '') {
      this.toast.showToast('Card number is required');
    } else if (!number_validation.test(  this.user.user_session.hrcUserCreditCard.hrcUserCcNo) ) {
      this.toast.showToast('Enter valid card number');
    } else if ( this.user.user_session.hrcUserCreditCard.hrcUserCcNameOnCard == '' ) {
      this.toast.showToast('Card holder name is required');
    } else if ( this.user.user_session.hrcUserCreditCard.hrcUserCcCCVCode == ''|| this.user.user_session.hrcUserCreditCard.hrcUserCcCCVCode == null) {
      this.toast.showToast('CCV code is required');
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
    }else{
      let params={
        hrcUserSessionDto:this.user.user_session,
        hrcRewardsPointsPurchased: {
        hrcRwrdsPtsPurchId : 0,
        hrcUserId : this.user.user_session.hrcUser.hrcUserId,
        hrcUserCreditCardId: this.user.user_session.hrcUserCreditCard.hrcUserCcId,
        hrcRwrdsPtsPurchCount : this.point_selected,
        hrcRwrdsPtsPurchDt : 1514957632186,
        hrcRwrdsPtsPurchAmnt : this.data.hrcTotalAmount,
        hrcUserAddressId :this.user.user_session.hrcAddress.hrcAddressId ,
        hrcCreditCardTypeId: this.user.user_session.hrcUserCreditCard.hrcCreditCardTypeId,
        hrcUserCcNameOnCard :this.user.user_session.hrcUserCreditCard.hrcUserCcNameOnCard,
        hrcUserCcExpirationMonth: this.user.user_session.hrcUserCreditCard.hrcUserCcExpirationMonth,
        hrcUserCcExpirationYear: this.user.user_session.hrcUserCreditCard.hrcUserCcExpirationYear,
        hrcUserCcNo : this.user.user_session.hrcUserCreditCard.hrcUserCcNo,
        hrcAddressLine1: this.user.user_session.hrcAddress.hrcAddressLine1,
        hrcAddressLine2 : this.user.user_session.hrcAddress.hrcAddressLine2,
        hrcAddressLine3 : this.user.user_session.hrcAddress.hrcAddressLine3,
        hrcAddressCity : this.user.user_session.hrcAddress.hrcAddressCity,
        hrcAddressState :  this.user.user_session.hrcAddress.hrcAddressState,
        hrcAddressPostalCode : this.user.user_session.hrcAddress.hrcAddressPostalCode,
        hrcAddressCountryId : this.user.user_session.hrcAddress.hrcCountryId,
        hrcRwrdsPtsPurchProcessingFee: this.data.hrcPointProcessingFee
      },
      addAndCCExist : false,
      userCCOption:this.data.userCCOption,
      existingCCandType : null,
      updateCCandBillingH2Key: null,
      // hrcBuyAmounts: this.data.hrcTotalAmount,
      submitFromPointsDropDown: false
    }
    delete params.hrcUserSessionDto.hrcUser.dobDispayDate.bidthDateFromDayMonYear;
    console.log(params,"Params");
    let loading = this.loadingCtrl.create({content: 'Please Wait...'});
    loading.present();
    this.user.buyPoints(params).then(
      res => {
        loading.dismiss();
        console.log(res);
        this.toast.showToastTop('Points Purchased Sucessfuly');
      },
      err => {
        loading.dismiss();
        this.toast.showToastTop(err);
        console.log(err, 'error');
      }
    );
    }

    
  }

  selected(item) {
    if (item == 'new') {
      this.change = true;
      this.data.userCCOption="NEW_CC";
      this.user.user_session.hrcAddress.hrcAddressLine1='';
      this.user.user_session.hrcAddress.hrcAddressLine2='';
      this.user.user_session.hrcAddress.hrcAddressLine3='';
      this.user.user_session.hrcAddress.hrcAddressCity='';
      this.user.user_session.hrcAddress.hrcAddressPostalCode='';
      this.user.user_session.hrcAddress.hrcAddressState='';
      this.user.user_session.hrcAddress.hrcCountryId=0;

      this.user.user_session.hrcUserCreditCard.hrcUserCcExpirationMonth='Select'
      this.user.user_session.hrcUserCreditCard.hrcUserCcExpirationYear='Select'
      this.user.user_session.hrcUserCreditCard.hrcCreditCardTypeId=0
      this.user.user_session.hrcUserCreditCard.hrcUserCcNo=''
      this.user.user_session.hrcUserCreditCard.hrcUserCcNameOnCard=''
      this.user.user_session.hrcUserCreditCard.hrcUserCcNameOnCard=''
     } else {

       if(this.user.user_session.hrcAddress.hrcAddressLine1==''){
        this.user.userSession(this.user.user_session.hrcUser.hrcUserEmail).then(res=>{
          this.user.user_session=res;
        })
       }
    
      this.change = false;
      this.data.userCCOption="EXISTING_CC"
    }
  }
  edit() {
    if(this.user.user_session.hrcAddress.hrcAddressLine1==''){
      this.user.userSession(this.user.user_session.hrcUser.hrcUserEmail).then(res=>{
        this.user.user_session=res;
      })
     }
    if (!this.change) {
      this.change = true;
    }
    this.data.userCCOption="EXISTING_CC_EDIT"
  }
}
