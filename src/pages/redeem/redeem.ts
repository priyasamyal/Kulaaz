import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
import {ToastProvider} from '../../providers/toast/toast';
/**
 * Generated class for the RedeemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redeem',
  templateUrl: 'redeem.html',
})
export class RedeemPage {
  redeem_data = {
    category: [],
    sort: [],
    cat_selected: "1",
    sort_selected: "1",
    totalPointsInBasket: 0,
    searchString:'',
    startIndex: 0,
    endIndex: 20,
    searchResultsTotalCount:''
  };
  grid;
  basketItem = [];
  product_list: any;
  items = [];
  total=[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastProvider,
    public user: UserProvider,
    public loadingCtrl: LoadingController
  ) {
    this.getCategoryList();
    this.getSortList();
    this.search();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedeemPage');
  }

  getCategoryList() {
    this.user
      .category_dropdown(
        this.user.user_session.hrcCountry.hrcCountryGiftcardCatalogId
      )
      .then(res => {
        let category_list = res;
        for (var i in category_list) {
          if (category_list.hasOwnProperty(i)) {
            this.redeem_data.category.push({id: i, value: category_list[i]});
            this.redeem_data.cat_selected = Object.keys(category_list)[0];
          }
        }
      });
  }
  getSortList() {
    this.user
      .sort_dropdown(
        this.user.user_session.hrcCountry.hrcCountryGiftcardCatalogId
      )
      .then(res => {
        let sort_list = res;
        for (var i in sort_list) {
          if (sort_list.hasOwnProperty(i)) {
            this.redeem_data.sort.push({id: i, value: sort_list[i]});
            this.redeem_data.sort_selected = Object.keys(sort_list)[0];
          }
        }
      });
  }

 
  search(){
    console.log("search");
    let requestParams = {
      searchString: this.redeem_data.searchString,
      catalogId:  this.user.user_session.hrcCountry.hrcCountryGiftcardCatalogId,
      categoryId: this.redeem_data.cat_selected,
      sortId: this.redeem_data.sort_selected,
      filterId: 0,
      startIndex: this.redeem_data.startIndex,
      endIndex: this.redeem_data.endIndex,
    };

    this.user.getProductSearchResult(requestParams).then(
      res => {
        let arr;
        arr=res;
        this.product_list = arr.hsProductDtoList;
        this.redeem_data.searchResultsTotalCount=arr.searchResultsTotalCount;
        console.log(this.product_list, 'producatlist');
      
      },
      err => {}
    );
  }

  paging(operation){
    if(operation=='+'){
      this.redeem_data.startIndex= this.redeem_data.endIndex;
      this.redeem_data.endIndex=this.redeem_data.endIndex+20;
      this.search();
    }
    if(operation=='-'){
      
      this.redeem_data.endIndex=this.redeem_data.startIndex;
      this.redeem_data.startIndex= this.redeem_data.startIndex-20;
      this.search();
    }
  }

  clearBasket() {
    console.log('clear basket');
    this.basketItem = [];
    this.items=[];
    this.redeem_data.totalPointsInBasket=0;
    console.log(this.redeem_data.totalPointsInBasket)
  }
  updateBasket(basket) {
    console.log(basket);
    this.addToBasket(basket, 'update');
  }

  addToBasket(product, type) {
    console.log(product, 'add to  basket');

    let requestpararms;
    if (type == 'update') {
      console.log('update if');
      requestpararms = {
        hsBasketLineItemDtoList: product,
        totalPointsInBasket: 0,
        totalBasketQuantity: 0,
        basketTotalFeePoints: 0,
        basketTotalItemPoints: 0,
        totalBasketMonetaryVal: null,
        basketTotalFeeMonetaryVal: null,
        basketTotalItemMonetaryVal: null,
        pointsPerUnitOfCurrency: this.user.user_session.hrcCountry
          .hrcCountryPointsPerUnitOfCurrency,
      };
    } else {
      this.items.push({
        productSkuId: product.hsProductSkuItem.hsProductSkuItemId,
        productSkuName: product.hsProductSkuItem.hsProductSkuItemName,
        itemQuantity: 1,
        itemsPointTotal: 0,
        itemsTotalMonetaryVal: null,
        itemsTotalFeePoints: 0,
        itemsTotalFeeMonetaryVal: null,
        itemLevelPoints: 0,
        itemLevelFeePoints: 0,
        itemLevelMonetaryVal: null,
        itemLevelFeeMonetaryVal: null,
      });
      console.log(this.items, 'items');
      for (let i = 0; i < this.items.length - 1; i++) {
        for (let j = i + 1; j < this.items.length; j++) {
          if (this.items[i].productSkuId == this.items[j].productSkuId) {
            this.items[i].itemQuantity = this.items[i].itemQuantity + 1;
            this.items.splice(j, 1);
          }
        }
      }
      console.log(this.items, 'items loop');
      requestpararms = {
        hsBasketLineItemDtoList: this.items,
        totalPointsInBasket: 0,
        totalBasketQuantity: 0,
        basketTotalFeePoints: 0,
        basketTotalItemPoints: 0,
        totalBasketMonetaryVal: null,
        basketTotalFeeMonetaryVal: null,
        basketTotalItemMonetaryVal: null,
        pointsPerUnitOfCurrency: this.user.user_session.hrcCountry
          .hrcCountryPointsPerUnitOfCurrency,
      };
    }
    console.log(requestpararms);

    this.user.getUpdatedBasketDto(requestpararms).then(
      res => {
        var list;
        list = res;
        this.redeem_data.totalPointsInBasket = list.totalPointsInBasket;
        this.basketItem = list.hsBasketLineItemDtoList;
        console.log(this.basketItem, 'basettem');
        this.total=list
      },
      err => {
        console.log(err, 'error');
      }
    );
  }

  redeemPoints() {
    if(this.user.user_session.hrcRwrdPointBalance.hrcUserPointBalanceForRedemption<this.redeem_data.totalPointsInBasket){
        this.toast.showToastTop("Not have have enough balance for redemption")
    }else{
      let params={
        "hrcUserSessionDto": this.user.user_session,
        "hsBasketDto":this.total
      }
      console.log(params, 'params');
      this.user.redeemRewardPoints(params).then(
        res => {
          this.toast.showToastTop("Amount Redeemed Succesfully")
          this.user.user_session=res;
          this.redeem_data.searchString=''
          this.basketItem = [];
          this.items = [];
          this.total=[];
        },
        err => {
          this.toast.showToastTop(err);
          console.log(err, 'error');
        }
      );
   
     

    }
  }
 
}
