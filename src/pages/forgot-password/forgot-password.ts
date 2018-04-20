import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
import {AlertProvider} from '../../providers/alert/alert';
import {ToastProvider} from '../../providers/toast/toast';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  email: string = undefined;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public user: UserProvider,
    public alert: AlertProvider,
    public toast: ToastProvider,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  goToChangePassword() {
    let loading = this.loadingCtrl.create({content: 'Please Wait...'});
    loading.present();
    let params = {
      hrcUserEmail: this.email,
    };
    this.user.forgotPassword(params).then(
      res => {
        this.user.userInfo = res;
       
        loading.dismiss();
        this.alert.showAlert("Password Changed","Please check your email for password");
        this.navCtrl.pop();
      },
      err => {
        this.toast.showToast(err);
        loading.dismiss();
      }
    );
  }

  goToSignIn() {
    this.navCtrl.setRoot('LoginPage');
  }
}
