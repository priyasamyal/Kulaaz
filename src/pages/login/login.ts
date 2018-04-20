import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  LoadingController,
} from 'ionic-angular';
import {ToastProvider} from '../../providers/toast/toast';
import {UserProvider} from '../../providers/user/user';
import {AlertProvider} from '../../providers/alert/alert';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string = 'test7@yopmail.com';
  password: string = 'admin@123';
 
  select="home";
  val="select";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public toast: ToastProvider,
    public user: UserProvider,
    public alert: AlertProvider,
    public loadingCtrl: LoadingController
  ) {
    menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  goToSignIn() {
    if (this.email == undefined || this.password == undefined) {
      this.toast.showToast('All fields are required');
    } else {
      let loading = this.loadingCtrl.create({content: 'Please Wait...'});
      loading.present();
      let params = {
        hrcUserEmail: this.email,
        hrcUserPassword: this.password
      };
      this.user.login(params).then(
        res => {
          this.user.isLogin=true;
          loading.dismiss();
          this.user.user_auth_data = res;
          if (this.user.user_auth_data.pwdValid) {
            this.user.userSession(this.email).then(res=>{
              this.user.user_session=res;
              this.toast.showToastTop(this.user.user_auth_data.validationMessage);
              this.navCtrl.setRoot('TabsPage');
            })
          
            
          } else {
            this.toast.showToast(this.user.user_auth_data.validationMessage);
            this.user.user_auth_data = null;
          }
        },
        err => {
          loading.dismiss();
          console.log(err, 'error');
          this.toast.showToast(err);
        }
      );
    }
  }
  goToSignUp() {
    this.navCtrl.push('RegistrationPage');
  }
  goToForgotPassword() {
    this.navCtrl.push('ForgotPasswordPage');
  }
}
