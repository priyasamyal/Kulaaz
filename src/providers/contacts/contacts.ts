import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';


@Injectable()
export class ContactsProvider {
  contacttobefound: any;
  contactsfound: any = [];
  contactDisplay: any = [];
  contactDuplicate: any = [];
  contactsWithoutSpace: any = [];
  friendsContacts: any = [];
  contactsWithoutCode: any = [];
  isRepeat: boolean = false;

  constructor(
    public http: Http,
    private contact: Contacts,
    

  ) {
    //console.log('Hello ContactsProvider Provider');

  }
    // fetch contacts from mobile
   fetchContactsFromMobile() {
    return new Promise((resolve, reject) => {
      // fetch all contacts
      this.contact.find(['*'], { filter: "" }).then((contacts) => {
        let contactsfound = JSON.parse(JSON.stringify(contacts));

        let validContacts = contactsfound.filter(x1 => x1._objectInstance.phoneNumbers != null && x1._objectInstance.displayName!=null);
       //console.log("Contacts fetch from  mobile........", JSON.stringify(validContacts));
      
        // make array with elements name, phone number & photos with duplicates
        // also have removed special charaters and country code
        for (let c of validContacts) {
          if (c._objectInstance.phoneNumbers.length > 1)
            for (let i = 0; i < c._objectInstance.phoneNumbers.length; i++) {

              // this.contactDuplicate.push({ displayName: c._objectInstance.displayName, phoneNumbers: this.removeCountryCode(c._objectInstance.phoneNumbers[i].value.replace(/ |-|\(|\)/g, '')), photos: c._objectInstance.photos, isCheck: 0 })
              this.removeCountryCode(c._objectInstance.displayName, c._objectInstance.phoneNumbers[i].value.replace(/ |-|\(|\)/g, ''), c._objectInstance.photos);
            }
          else
            this.removeCountryCode(c._objectInstance.displayName, c._objectInstance.phoneNumbers[0].value.replace(/ |-|\(|\)/g, ''), c._objectInstance.photos);
          // this.contactDuplicate.push({ displayName: c._objectInstance.displayName, phoneNumbers: this.removeCountryCode(c._objectInstance.phoneNumbers[0].value.replace(/ |-|\(|\)/g, '')), photos: c._objectInstance.photos, isCheck: 0 })
        }

        let y = [];
        this.contactsfound = this.removeDuplicatePhoneNumbers(this.contactDuplicate);
        this.contactsfound.map(g1 => y.push(g1.phoneNumbers));
          resolve(this.contactsfound)
     
      })
    });
  }

  removeCountryCode(name, phoneNumber, photo) {
    //  console.log("number to be removed country code form.....",phoneNumber);
    if (phoneNumber.startsWith("+")) {
      this.contactDuplicate.push({ displayName: name, phoneNumbers: phoneNumber.substring(1), photos: photo, isCheck: 0 })
    } 

  }

  removeDuplicatePhoneNumbers(new_contacts) { // remove duplicate phone numbers
    return new_contacts.reduce((accumulator, current) => {
      return checkIfAlreadyExist(current) ? accumulator : [...accumulator, current];
      function checkIfAlreadyExist(currentVal) {
        return accumulator.some(item => item.phoneNumbers === currentVal.phoneNumbers);
      }
    }, []);
  }

 



}
