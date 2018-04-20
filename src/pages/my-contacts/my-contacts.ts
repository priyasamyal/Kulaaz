import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ActionSheetController,App } from 'ionic-angular';
import {ToastProvider} from '../../providers/toast/toast';
import {UserProvider} from '../../providers/user/user';
import { ContactsProvider } from '../../providers/contacts/contacts';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { concat } from 'rxjs/observable/concat';

declare var navigator;
/**
 * Generated class for the MyContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-contacts',
  templateUrl: 'my-contacts.html',
})
export class MyContactsPage {
 

  contact_list=[];
  hrcUserContact = {
    hrcUserContactId: null,
    hrcUserId: null,
    hrcUserContactFirstname: null,
    hrcUserContactLastname: null,
    hrcUserContactEmail: null,
    hrcUserContactCountryId: 0,
    hrcUserContactPhone: null,
    hrcIsContactAnExistingUser: false,
    hrcExistingUserId: null,
  };

  hrcUserContactLineItemDtoList=[];

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public app:App,
    public toast: ToastProvider,
    public user: UserProvider,
    public loadingCtrl: LoadingController,
    public contactsProvider : ContactsProvider,
    public actionSheetCtrl: ActionSheetController,
    private contact: Contacts,) {
    
  }
  ionViewWillEnter(){
    this.getMyContacts();
  }

  getMyContacts(){
    this.user.getUserContactsByUserId(this.user.user_session.hrcUser.hrcUserId).then(res=>{
      console.log(this.contact_list,"before");
      let arr;
      arr=res;
      this.contact_list=arr;
      console.log(this.contact_list,'after');
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyContactsPage');
  }
  goToEditContact(data){
    console.log(data)
    this.navCtrl.push("EditContactPage",{contact_data:data});
  }
      goToCreateContact(){
        this.navCtrl.push("EditContactPage");
      }

    fetchContactsFromMobile(){
      let country=1;
      this.contactsProvider.contactsfound=[];
      this.hrcUserContactLineItemDtoList=[];
        this.contactsProvider.fetchContactsFromMobile().then(res=>{
          console.log(res,"res");
         this.contactsProvider.contactsfound=res;
          console.log(this.contactsProvider.contactsfound,"Found Contacts");
          for(let i =0 ; i<this.contactsProvider.contactsfound.length;i++){
        //console.log(i, this.contactsProvider.contactsfound.length)
        if(this.contactsProvider.contactsfound[i].phoneNumbers.indexOf("91")==0){
          country=3;
        }
           this.hrcUserContactLineItemDtoList.push({
            hrcUserContact:{
              hrcUserContactId: null,
              hrcUserId: this.user.user_session.hrcUser.hrcUserId,
              hrcUserContactFirstname:  this.contactsProvider.contactsfound[i].displayName,
              hrcUserContactLastname: '',
              hrcUserContactEmail: '',
              hrcUserContactCountryId: country,
              hrcUserContactPhone:  this.contactsProvider.contactsfound[i].phoneNumbers,
              hrcIsContactAnExistingUser: false,
              hrcExistingUserId: null,
            },
            hrcUserContactKeyEventList:[]
           })
           if(i==this.contactsProvider.contactsfound.length-1){
           //  console.log("last Index")
            this.saveContactInServer();
           }
          }
        });
     
       
      }

      saveContactInServer(){
        let params={
          hrcUser:this.user.user_session.hrcUser,
          hrcUserContactLineItemDtoList:this.hrcUserContactLineItemDtoList
        }
        this.user.addUserContactList(params).then(
          res => {
            this.toast.showToast('Contact Created Sucessfully');
            this.navCtrl.pop();
          },
          err => {
            this.toast.showToast("Some Error occured");
          }
        );
       console.log(params,"params")
      }
   
       openActionsheet() {
        console.log('acton sheet method call');
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Import Contact From',
          buttons: [
            {
              text: 'Phone',
              icon: 'call',
              handler: () => {
                console.log('Phone clicked');
                this.fetchContactsFromMobile();
                //this.fetchContactsInIos();
              },
            },
            {
              text: 'Cancel',
              role: 'cancel',
              icon:'close',
              handler: () => {
                console.log('gallery clicked');
               
              },
            },
          ],
        });
        actionSheet.present();
      }

      fetchContactsInIos(){
        var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
        navigator.contacts.find(fields, this.onSuccess=(contacts)=>
        {
        let filterContact=[];
        console.log(contacts,'from navigator');
        let contactsfound=contacts;
        let validContacts = contactsfound.filter(x1 => x1.phoneNumbers != null && x1.name.givenName != "");
        console.log(validContacts,'from validContacts');
        
        for (let c in validContacts) {
        let email='';
        let country=1;
        console.log(validContacts[c].phoneNumbers[0].value.length);
        
        validContacts[c].phoneNumbers[0].value= validContacts[c].phoneNumbers[0].value.replace(/ |-|\(|\)/g, '');
        
        if (validContacts[c].phoneNumbers[0].value.startsWith("+")) {
        validContacts[c].phoneNumbers[0].value=validContacts[c].phoneNumbers[0].value.substring(1);
        }
        
        if(validContacts[c].emails != null){
        email=validContacts[c].emails[0].value;
        }
        
        if(validContacts[c].phoneNumbers[0].value.indexOf("91")==0){
        country=3;
        }
        
        if(validContacts[c].phoneNumbers[0].value.length >9 && validContacts[c].phoneNumbers[0].value.length < 14){
        
        this.hrcUserContactLineItemDtoList.push({
        hrcUserContact:{
        hrcUserContactId: null,
        hrcUserId: this.user.user_session.hrcUser.hrcUserId,
        hrcUserContactFirstname: validContacts[c].name.givenName,
        hrcUserContactLastname: '',
        hrcUserContactEmail: email,
        hrcUserContactCountryId: country,
        hrcUserContactPhone: validContacts[c].phoneNumbers[0].value,
        hrcIsContactAnExistingUser: false,
        hrcExistingUserId: null,
        },
        hrcUserContactKeyEventList:[]
        })
        
        }
        
        }
        console.log(this.hrcUserContactLineItemDtoList,"hrcUserContactLineItemDtoList");
        this.saveContactInServer();
        }, this.onError);
        }
        
        onSuccess(contacts) {
        };
        onError(contactError) {
        console.log('onError! in navigator');
        };
        
      

}
