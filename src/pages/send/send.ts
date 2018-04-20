import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ModalController} from 'ionic-angular';
import {ToastProvider} from '../../providers/toast/toast';
import {UserProvider} from '../../providers/user/user';
/**
 * Generated class for the SendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {

  send_data={
    cost:0,
    receivergets:0,
    receivergetsinpoint:0,
    receiver_email:'',
    receiver_location:'Select',
    send_points:this.user.user_session.hrcCountry.hrcCountrySendPointsMin * this.user.user_session.hrcCountry.hrcCountryPointsPerUnitOfCurrency,
    hrcRwrdPtsSentMsgSubj:'',
    hrcRwdPtsSentMsgBody : "",
    hrcRwdPtsSentMsgFooter : "",
    type:1,
    send_points_max:this.user.user_session.hrcCountry.hrcCountrySendPointsMax * this.user.user_session.hrcCountry.hrcCountryPointsPerUnitOfCurrency,
    send_points_min:this.user.user_session.hrcCountry.hrcCountrySendPointsMin * this.user.user_session.hrcCountry.hrcCountryPointsPerUnitOfCurrency,
   
   }
   min_points=this.user.user_session.hrcCountry.hrcCountrySendPointsMin * this.user.user_session.hrcCountry.hrcCountryPointsPerUnitOfCurrency;
   messages:any;
   countries: any=[];
   greeting=[
    {
      id:1,
      value:'Gifts',
      category:[]},
    {
      id:2,
      value:'Rewards',
      category:[],
    },
    {
      id:3,
      value:'Service Tip',
      category:[]
    }
  ]


  index=1;
  point;
  point_selected;
  points_to_display=[];
  point_to_send_list;
  points;
countryIndex
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public toast: ToastProvider,
     public user: UserProvider,
     public modal: ModalController,
     public loadingCtrl: LoadingController) {
      this.getAllCountries();
      this.getDefaultSendMessages();
      this.displayAmountOfPointsInitial();
  }
  getAllCountries(){
    this.user.getAllCountries().then(
        res => {
          let list=res;
          this.countries=res;
        },
        err => {
         }
      );
  }
 // show default messages on greeting
  getDefaultSendMessages(){
    this.user.getDefaultSendMessages().then(
      res => {
      this.messages=res;
      for(let i in this.messages.giftBodyMessagesMap){
        if(this.greeting[0].category.length==0){
          this.greeting[0].category.push({
            value:i,
          //title:'Birthday',
            select:true
          })
        }else{
          this.greeting[0].category.push({
            value:i,
          //title:'Birthday',
            select:false
          })
        }
      
        console.log(this.greeting)
      }
      for(let i in this.messages.rwrdBodyMessagesMap){
        if(this.greeting[1].category.length==0){
          this.greeting[1].category.push({
            value:i,
           // title:'Birthday',
            select:true
          })
        }else{
          this.greeting[1].category.push({
            value:i,
           // title:'Birthday',
            select:false
          })
        }
        
        console.log(this.greeting)
      }
      for(let i in this.messages.servTipSubjectMessagesMap){
        this.greeting[2].category.push({
          value:i,
        //title:'Birthday',
          select:true
        })
        console.log(this.greeting)
      }
      this.send_data.hrcRwrdPtsSentMsgSubj= this.messages.giftSubjectMessagesMap.bday+" "+this.user.user_session.hrcUserDetails.hrcUserFirstName,
      this.send_data.hrcRwdPtsSentMsgBody =this.messages.giftBodyMessagesMap.bday,
      this.send_data.hrcRwdPtsSentMsgFooter = this.messages.giftFooterMessagesMap.bday+" "+this.user.user_session.hrcUserDetails.hrcUserFirstName,
      console.log(this.messages,"messages")
       }
     );
  }

  //increment decrement points to send
  selectPoints(operation){
    console.log("call toggle")
    if(this.send_data.receiver_location=='Select'){
      this.toast.showToastTop("Plase select Receiver's Location first")
    }
    else{
      var interval= this.user.user_session.hrcCountry.hrcCountryPointsPerUnitOfCurrency
      if(operation=='+'){
          if(this.send_data.send_points<=this.send_data.send_points_max){
             console.log("add points");
             this.send_data.send_points+=interval;
             this.displayAmountOfPoints();
          }
       }
       else if(operation=='-'){
         if(this.send_data.send_points<this.send_data.send_points_max &&  this.send_data.send_points>this.min_points){
             console.log("decrement points");
             this.send_data.send_points-=interval;
             this.displayAmountOfPoints();
         }
      }
    }
    
  }
  displayAmountOfPointsInitial(){
    this.send_data.cost=this.send_data.send_points/this.user.user_session.hrcCountry.hrcCountryPointsPerUnitOfCurrency;
       }

//display amount when user select points 
 displayAmountOfPoints(){
 this.user.getSendDisplayAmounts(this.user.user_session.hrcCountry.hrcCountryId,this.send_data.receiver_location,this.send_data.send_points).then(
      res => {
      console.log(res,"res");
       var response;
        response=res;
        this.send_data.cost=response.costToYouInLocalCur.money;
        this.send_data.receivergets=response.receiverGetsInLocalCur.money;
        this.send_data.receivergetsinpoint=response.receiverGetsInPoints;
        
       }
     );
  }

  change_radiotype(event){
    console.log(event);
    this.index=event;
    if(event==1){
      this.send_data.hrcRwrdPtsSentMsgSubj = this.messages.giftSubjectMessagesMap.bday+" "+this.user.user_session.hrcUserDetails.hrcUserFirstName;
      this.send_data.hrcRwdPtsSentMsgBody =this.messages.giftBodyMessagesMap.bday;
      this.send_data.hrcRwdPtsSentMsgFooter =this.messages.giftFooterMessagesMap.bday+" "+this.user.user_session.hrcUserDetails.hrcUserFirstName;
    }
   else if(event==2){
      this.send_data.hrcRwrdPtsSentMsgSubj = this.messages.rwrdSubjectMessagesMap.help+" "+this.user.user_session.hrcUserDetails.hrcUserFirstName;
      this.send_data.hrcRwdPtsSentMsgBody =this.messages.rwrdBodyMessagesMap.help;
      this.send_data.hrcRwdPtsSentMsgFooter =this.messages.rwrdFooterMessagesMap.help + " "+this.user.user_session.hrcUserDetails.hrcUserFirstName;
    }
    else if(event==3){
      this.send_data.hrcRwrdPtsSentMsgSubj = this.messages.servTipSubjectMessagesMap.generic+" "+this.user.user_session.hrcUserDetails.hrcUserFirstName;
      this.send_data.hrcRwdPtsSentMsgBody =this.messages.servTipBodyMessagesMap.generic;
      this.send_data.hrcRwdPtsSentMsgFooter =this.messages.servTipFooterMessagesMap.generic +" "+this.user.user_session.hrcUserDetails.hrcUserFirstName;
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SendPage');
  }
  previewGreeting(){
    let modal = this.modal.create("GreetingPreviewPage",{data:this.send_data});
    modal.present();
   
  }
 

  sendGreeting(){
    console.log(this.send_data);
    if(this.send_data.receiver_email==''){
        this.toast.showToastTop("Please enter email")
    }else if(this.send_data.receiver_location=='Select'){
      this.toast.showToastTop("Please select location")
     }
    
    else{
      let params=
      {
        "hrcRewardPointsSent" : {
          "hrcRwrdPtsSentId" : 0,
          "hrcSenderId" : this.user.user_session.hrcUser.hrcUserId,
          "hrcReceiverId" : 0,
          "hrcRwrdPtsSentDate" :  new Date().toISOString(),
          "hrcRwrdPtsSentCountAtOrigin" : this.send_data.send_points,
          "hrcRwrdPtsSentCountAtDestnatn" : null,
          "hrcRwrdPtsSentMonitoryValueAtOrigination" : null,
          "hrcRwrdPtsSentMonitoryValueAtDestination" : null,
          "hrcRwrdPtsSentProcessingFee" : 0,
          "hrcRwrdPtsSentToEmailViewd" : false,
          "hrcRwrdPtsSentToEmailViewdDate" : null,
          "hrcIsRwrdPtsSentCreditedIntoRecvrAccount" : false,
          "hrcIsRwrdPtsSentCreditedDt" : null,
          "hrcIsRwrdPtsSentToNewUser" : false,
          "hrcPointsTypeId" : 0,
          "hrcRwrdPtsSentMsgSubj" : this.send_data.hrcRwrdPtsSentMsgSubj,
          "hrcRwdPtsSentMsgBody" : this.send_data.hrcRwdPtsSentMsgBody,
          "hrcRwdPtsSentMsgFooter" :this.send_data.hrcRwdPtsSentMsgFooter,
          "hecRwdPtsSentBgImgLocation" : null,
          "hrcIsRwrdPtsSentRemindersEnabled" : false,
          "hrcReminderFreqId" : 0
        },
        "receiverEmail" : this.send_data.receiver_email,
        "receiverCountryId" : 3,
        "hrcUserSessionDto" : this.user.user_session,
        "hrcUserContactList" : [ ],
        "footerFrom" : "your Connection",
        "quickSend" : false
      }
    delete params.hrcUserSessionDto.hrcUser.dobDispayDate.bidthDateFromDayMonYear;
    let loading = this.loadingCtrl.create({content: 'Please Wait...'});
    loading.present();
    this.user.sendPoints(params).then(
      res => {
        loading.dismiss();
        console.log(res);
        this.user.user_session=res;
        this.toast.showToastTop('Greeting Send Sucessfuly');
        this.send_data.receiver_email='';
      },
      err => {
        loading.dismiss();
        this.toast.showToastTop(err);
        console.log(err, 'error');
      }
    );
    }
   
  }

  
  addMessage(data){
    console.log(data);
if(data.value=="gradday"){
  this.send_data.hrcRwrdPtsSentMsgSubj = this.messages.giftSubjectMessagesMap.gradday+" "+this.user.user_session.hrcUserDetails.hrcUserFirstName;
  this.send_data.hrcRwdPtsSentMsgBody =this.messages.giftBodyMessagesMap.gradday;
  this.send_data.hrcRwdPtsSentMsgFooter =this.messages.giftFooterMessagesMap.gradday+" "+this.user.user_session.hrcUserDetails.hrcUserFirstName;
}
else if(data.value=="holiday"){
  this.send_data.hrcRwrdPtsSentMsgSubj = this.messages.giftSubjectMessagesMap.holiday+" "+this.user.user_session.hrcUserDetails.hrcUserFirstName;
  this.send_data.hrcRwdPtsSentMsgBody =this.messages.giftBodyMessagesMap.holiday;
  this.send_data.hrcRwdPtsSentMsgFooter =this.messages.giftFooterMessagesMap.holiday+" "+this.user.user_session.hrcUserDetails.hrcUserFirstName;
}
else if(data.value=="sday"){
  this.send_data.hrcRwrdPtsSentMsgSubj = this.messages.giftSubjectMessagesMap.sday+" "+this.user.user_session.hrcUserDetails.hrcUserFirstName;
  this.send_data.hrcRwdPtsSentMsgBody =this.messages.giftBodyMessagesMap.sday;
  this.send_data.hrcRwdPtsSentMsgFooter =this.messages.giftFooterMessagesMap.sday+" "+this.user.user_session.hrcUserDetails.hrcUserFirstName;
}
else if(data.value=="wedaniv"){
  this.send_data.hrcRwrdPtsSentMsgSubj = this.messages.giftSubjectMessagesMap.wedaniv+" "+this.user.user_session.hrcUserDetails.hrcUserFirstName;
  this.send_data.hrcRwdPtsSentMsgBody =this.messages.giftBodyMessagesMap.wedaniv;
  this.send_data.hrcRwdPtsSentMsgFooter =this.messages.giftFooterMessagesMap.wedaniv+" "+this.user.user_session.hrcUserDetails.hrcUserFirstName;
}
else if(data.value=="bday"){
  this.send_data.hrcRwrdPtsSentMsgSubj = this.messages.giftSubjectMessagesMap.bday+""+this.user.user_session.hrcUserDetails.hrcUserFirstName;
  this.send_data.hrcRwdPtsSentMsgBody =this.messages.giftBodyMessagesMap.bday;
  this.send_data.hrcRwdPtsSentMsgFooter =this.messages.giftFooterMessagesMap.bday+""+this.user.user_session.hrcUserDetails.hrcUserFirstName;
}
else if(data.value=="help"){
  this.send_data.hrcRwrdPtsSentMsgSubj = this.messages.rwrdSubjectMessagesMap.help+""+this.user.user_session.hrcUserDetails.hrcUserFirstName;
  this.send_data.hrcRwdPtsSentMsgBody =this.messages.rwrdBodyMessagesMap.help;
  this.send_data.hrcRwdPtsSentMsgFooter =this.messages.rwrdFooterMessagesMap.help+""+this.user.user_session.hrcUserDetails.hrcUserFirstName;
}
else if(data.value=="jobwelldone"){
  this.send_data.hrcRwrdPtsSentMsgSubj = this.messages.rwrdSubjectMessagesMap.jobwelldone+""+this.user.user_session.hrcUserDetails.hrcUserFirstName;
  this.send_data.hrcRwdPtsSentMsgBody =this.messages.rwrdBodyMessagesMap.jobwelldone;
  this.send_data.hrcRwdPtsSentMsgFooter =this.messages.rwrdFooterMessagesMap.jobwelldone+""+this.user.user_session.hrcUserDetails.hrcUserFirstName;
}
else if(data.value=="prize"){
  this.send_data.hrcRwrdPtsSentMsgSubj = this.messages.rwrdSubjectMessagesMap.prize+""+this.user.user_session.hrcUserDetails.hrcUserFirstName;
  this.send_data.hrcRwdPtsSentMsgBody =this.messages.rwrdBodyMessagesMap.prize;
  this.send_data.hrcRwdPtsSentMsgFooter =this.messages.rwrdFooterMessagesMap.prize+""+this.user.user_session.hrcUserDetails.hrcUserFirstName;
}
else if(data.value=="generic"){
  this.send_data.hrcRwrdPtsSentMsgSubj = this.messages.servTipSubjectMessagesMap.generic+""+this.user.user_session.hrcUserDetails.hrcUserFirstName;
  this.send_data.hrcRwdPtsSentMsgBody =this.messages.servTipBodyMessagesMap.generic;
  this.send_data.hrcRwdPtsSentMsgFooter =this.messages.servTipFooterMessagesMap.generic+""+this.user.user_session.hrcUserDetails.hrcUserFirstName;
}
  console.log(this.messages,  this.send_data.hrcRwrdPtsSentMsgSubj);
  }
}


