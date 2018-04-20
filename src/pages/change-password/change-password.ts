import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,LoadingController} from 'ionic-angular';
import {ToastProvider} from '../../providers/toast/toast';
import {AlertProvider} from '../../providers/alert/alert';
import {UserProvider} from '../../providers/user/user';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  data = {
    currentpass: '',
    newpass: undefined,
    confirmpass: undefined,
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastProvider,
    public alert: AlertProvider,
    public user: UserProvider,
    public loadingCtrl: LoadingController
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');

  }
  goToSignIn() {
   
    var password_validation = /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-@!]{6,16}$/;
    if (this.data.currentpass =='' ) {
      this.toast.showToast('Please enter you current password                   ');
    }
    if (this.data.newpass != this.data.confirmpass) {
      this.toast.showToast('New and confirm password does not match');
    } else if (!password_validation.test(this.data.newpass)) {
      this.toast.showToast(
        'Password length should be between 6-16 with no spaces'
      );
    } else if (this.data.currentpass == this.data.newpass) {
      this.toast.showToast(
        'Current password and New password should not match'
      );
    } else {
      let loading = this.loadingCtrl.create({content: 'Please Wait...'});
      loading.present();
      let params = {
        hrcUserEmail:this.user.user_auth_data.hrcUserEmail,
        hrcUserPassword: this.data.newpass,
      };
      this.user.changePassword(params).then(
        res => {
          console.log(res);
          loading.dismiss();
          this.user.userInfo = res;
          this.alert.showAlert('CONFIRMATION', 'Password changed Successfully');
          this.navCtrl.pop();
        },
        err => {
          loading.dismiss();
          console.log(err, 'error');
        }
      );
    }
  }
}
