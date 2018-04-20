import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiProvider} from '../api/api';
import {Observable} from 'rxjs';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  userInfo;
  user_auth_data: any;
  user_session:any;
  isLogin:boolean=false;
  constructor(public http: Http, public api: ApiProvider) {
    console.log('Hello UserProvider Provider');
  }

  login(userInfo) {
    console.log(userInfo, 'Login Input Json');
    let headers = new Headers([{'Content-Type': 'application/json'},{'Access-Control-Allow-Origin':'*'}]);
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(this.api.server_base_url + 'validateUser', userInfo, options)
        .map(res => res.json())
        .subscribe(
          res => {
            console.log(res, 'Login response');
            resolve(res);
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }
  userSession(email) {
  
    let headers = new Headers([{'Content-Type': 'application/json'},{'Access-Control-Allow-Origin':'*'}]);
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .get(this.api.server_base_url + 'getUserSessionDtoByEmail/'+email, options)
        .map(res => res.json())
        .subscribe(
          res => {
            console.log(res,'userSession response');
            resolve(res);
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  register(userInfo) {
    console.log(userInfo, 'Register Input Json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(this.api.server_base_url + 'registerUser', userInfo, options)
        .map(res => res.json())
        .subscribe(
          res => {
            console.log(res, 'Register response');
            resolve(res);
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  changePassword(userInfo) {
    console.log(userInfo, 'CHange Password Input Json');
    let headers = new Headers([{'Content-Type': 'application/json'},{'Access-Control-Allow-Origin':'*'}]);
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(this.api.server_base_url + 'changePassword ', userInfo, options)
        .map(res => res.json())
        .subscribe(
          res => {
            console.log(res, 'CHange Password response');
            resolve(res);
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  forgotPassword(userInfo) {
    console.log(userInfo, 'forgotPassword Input Json');
    let headers = new Headers([{'Content-Type': 'application/json'}]);
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(this.api.server_base_url + 'forGotPassword', userInfo, options)
        .map(res => res.json())
        .subscribe(
          res => {
            console.log(res, 'Forgot Password response');
            resolve(res);
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject("No such email exist in database");
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }
  confirmCode(userInfo) {
    console.log(userInfo, 'Validate confirmation code input json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(
          this.api.server_base_url + 'validateConfirmationCode',
          userInfo,
          options
        )
        .map(res => res.json())
        .subscribe(
          res => {
            console.log(res, 'validate confirmation code response');
            resolve(res);
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }
  ResendCode(userInfo) {
    console.log(userInfo, 'data');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(
          this.api.server_base_url + 'resendRegistrationCode',
          userInfo,
          options
        )
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }
  updateUser(userInfo) {
    console.log(userInfo, 'update data');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(this.api.server_base_url + 'updateUser', userInfo, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }
  updateCCandBilling(userInfo) {
    console.log(userInfo, 'updateCCandBilling data');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(this.api.server_base_url + 'updateCCandBilling', userInfo, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }
  getUserCCandBillingByUserId(userInfo) {
    console.log(userInfo, 'getUserCCandBillingByUserId data');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(
          this.api.server_base_url + 'getUserCCandBillingByUserId',
          userInfo,
          options
        )
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }
  getUserProfile(id) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let body = new FormData();
    return new Promise((resolve, reject) => {
      this.api
        .get(this.api.server_crud_url + 'HrcUserDetailsCrudService/getById/'+id, headers)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  getAllCountries() {
    let headers = new Headers({'Content-Type': 'application/json'});
    let body = new FormData();
    return new Promise((resolve, reject) => {
      this.api
        .get(this.api.server_crud_url + 'HrcCountryCrudService/getAll', headers)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }
  getAllCreditCard() {
    let headers = new Headers({'Content-Type': 'application/json'});
    let body = new FormData();
    return new Promise((resolve, reject) => {
      this.api
        .get(this.api.server_crud_url + 'HrcUserCreditCardCrudService/getAll', headers)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  /** Phase 2 services */

  /**Buy Points */
  getBuyPointsList(hrcCountryId,purchasedYtoD) {
    console.log(hrcCountryId,purchasedYtoD, 'getBuyPointsList data');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .get(this.api.server_buy_base_url + 'getBuyPointsList/'+ hrcCountryId+'/'+purchasedYtoD , options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  } 
  getBuyDisplayAmounts(hrcCountryId,selectedPoints){
    console.log(hrcCountryId,selectedPoints, 'getBuyDisplayAmounts data');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .get(this.api.server_buy_base_url + 'getBuyDisplayAmounts/'+ hrcCountryId+'/'+selectedPoints , options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }
  buyPoints(data) {
    console.log(data, 'buyPoints input json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(this.api.server_buy_base_url + 'buyRewardPoints', data, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  /**Send Rewards */
  getSendPointsList(hrcCountryId,sentYtoD) {
    console.log(hrcCountryId,sentYtoD, 'getSendPointsList data');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .get(this.api.server_send_base_url + 'getSendPointsList/'+ hrcCountryId+'/'+sentYtoD , options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  } 
  getSendDisplayAmounts(senderCntryId,rcvrCntryId,selectedPoints){
    console.log(senderCntryId,rcvrCntryId,selectedPoints, 'getSendDisplayAmounts data');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .get(this.api.server_send_base_url + 'getSendDisplayAmounts/'+senderCntryId+'/'+rcvrCntryId+'/'+selectedPoints, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  getDefaultSendMessages(){
   let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .get(this.api.server_send_base_url + 'getDefaultSendMessages', options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }
  sendPoints(data) {
    console.log(data, 'buyPoints input json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(this.api.server_send_base_url + 'sendRewardPoints', data, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }
  /**Redeem */
  category_dropdown(data) {
    console.log(data, 'category_dropdown input json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .get(this.api.server_redeem_base_url + 'getCatgryMapByCatalog/'+data, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  sort_dropdown(data) {
    console.log(data, 'sort input json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .get(this.api.server_redeem_base_url + 'getProdSortMapByCatalog/'+data, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  getProductSearchResult(data) {
    console.log(data, 'getProductSearchResult input json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(this.api.server_redeem_base_url + 'getProdSearchResultsWithCount',data, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  getProductbyId(id) {
    console.log(id, 'getProductbyId input json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .get(this.api.server_redeem_base_url + 'getProductDtoBySkuId/'+id, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  getUpdatedBasketDto(data) {
    console.log(data, 'getUpdatedBasketDto input json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(this.api.server_redeem_base_url + 'getUpdatedBasketDto' , data, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }
  redeemRewardPoints(data) {
    console.log(data, 'redeemRewardPoints input json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(this.api.server_redeem_crud+"redeemRewardPoints", data, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  /**Groups */

  registerGroup(data) {
    console.log(data, 'registerGroup input json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(this.api.server_crud_url+"HrcUserGroupService/registerGroup", data, options)
        .map(res => res)
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } 
            else if (err.status ==200) {
              resolve('');
            } 
            else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  getGroupById(id){
    console.log(id, 'getGroupById input json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(this.api.server_crud_url+"HrcUserGroupCrudService/getById/"+id, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  getUserGroupMembersEmailList(id){
    console.log(id, 'getUserGroupMembersEmailList input json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .get(this.api.server_crud_url+"HrcUserGroupService/getUserGroupMembersEmailList/"+id, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  updateUserGroup(data) {
    console.log(data, 'updateUserGroup input json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(this.api.server_crud_url+"HrcUserGroupService/updateUserGroup", data, options)
        .map(res => res)
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  inviteMembersToGroup(data) {
    console.log(data, 'inviteMembersToGroup input json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(this.api.server_crud_url+"HrcUserGroupService/inviteMembersToGroup", data, options)
        .map(res => res)
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  getUserGroupsByUserId(id){
    console.log(id, 'getUserGroupsByUserId input json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .get(this.api.server_crud_url+"HrcUserGroupService/getUserGroupsByUserId/"+id, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  getUserGroupMembers(id){
    console.log(id, 'getUserGroupMembers input json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .get(this.api.server_crud_url+"HrcUserGroupService/getUserGroupMembers/"+id, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  /**Contacts */

  getAllHrcUserContactKeyEventType() {
    let headers = new Headers({'Content-Type': 'application/json'});
    let body = new FormData();
    return new Promise((resolve, reject) => {
      this.api
        .get(this.api.server_crud_url + 'HrcUserContactKeyEventTypeCrudService/getAll', headers)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

    addUserContactList(data) {
    console.log(data,"input json addUserContactList ")
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(this.api.server_crud_url + 'HrcUserContactsService/addUserContactList',data,options)
        .map(res => res)
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }
    
    updateUserContact(data){
    console.log(data,"input json updateUserContact ")
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .post(this.api.server_crud_url + 'HrcUserContactsService/updateUserContact',data,options)
        .map(res => res)
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  getUserContactsByUserId(id){
    console.log(id, 'getUserContactsByUserId input json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .get(this.api.server_crud_url+"HrcUserContactsService/getUserContactsByUserId/"+id, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

  getUserContactWithEventsByContactId(id){
    console.log(id, 'getUserContactWithEventsByContactId input json');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      this.api
        .get(this.api.server_crud_url+"HrcUserContactsService/getUserContactWithEventsByContactId/"+id, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
            console.log(res, 'response');
          },
          err => {
            console.log(err, 'error');
            if (err.status == 400) {
              reject(err.status);
            } else if (err.status == 0) {
              reject('Server not responding');
            } else {
              reject('Server not responding');
            }
          }
        );
    });
  }

}

