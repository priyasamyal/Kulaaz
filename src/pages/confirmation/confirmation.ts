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
/**
 * Generated class for the ConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {
  code: string = undefined;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertProvider,
    public toast: ToastProvider,
    public user: UserProvider,
    public loadingCtrl: LoadingController
  ) {
    //console.log('user Info is', this.user.userInfo.hrcUserConfirmationCode);
//this.code = this.user.userInfo.hrcUserConfirmationCode;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmationPage');
  }
  confirm() {
    var code_validation = /^[0-9]{8}$/;
    if (!code_validation.test(this.code)) {
      this.toast.showToast('Confirmation code must contain 8 digits');
    } else {
      let loading = this.loadingCtrl.create({content: 'Please Wait...'});
      loading.present();
      let params = {
        hrcUserEmail: this.user.userInfo.hrcUserEmail,
        tempConfirmationCode: this.code,
      };
      this.user.confirmCode(params).then(
        res => {
          this.user.isLogin=true;
          loading.dismiss();
          this.user.user_auth_data = res;
          this.alert.showAlert('CONFIRMATION', 'User registered successfully');
          this.navCtrl.setRoot('TabsPage');
         },
        err => {
          this.user.user_auth_data = null;
          loading.dismiss();
          this.toast.showToast(err);
        }
      );
    }
  }
  resend() {
    let loading = this.loadingCtrl.create({content: 'Please Wait...'});
    loading.present();
    var code_validation = /^[0-9]{8}$/;
    if (!code_validation.test(this.code)) {
      this.toast.showToast('Confirmation code must contain 8 digits');
    } else {
      let params = {hrcUserEmail: this.user.userInfo.hrcUserEmail};

      this.user.ResendCode(params).then(
        res => {
          loading.dismiss();
          this.alert.showAlert(
            'Code Sent!!',
            'Please check your email for the confirmation code '
          );
        },
        err => {
          loading.dismiss();
          this.toast.showToast(err);
        }
      );
    }
  }
}
