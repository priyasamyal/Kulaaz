import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, App, ViewController} from 'ionic-angular';

/**Plugin list */
//import {GoogleAnalytics} from '@ionic-native/google-analytics';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

/**Provider list */
import {ToastProvider} from '../providers/toast/toast';
import {UserProvider} from '../providers/user/user';
@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'LoginPage';
  activePage: any;
  pages: Array<{title: string; component: any; icon: any}>;

  constructor(
    public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public app: App,
    public toast: ToastProvider,
    public user: UserProvider,
    //private ga: GoogleAnalytics
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
     // this.startTracking();
    });

    var lastTimeBackPress = 0;
    var timePeriodToExit = 2000;
    this.platform.registerBackButtonAction(() => {
      let view = this.app.getActiveNav().getViews().length;
      console.log(view, 'view');
      if (view == 1) {
        if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
          console.log('press1');
          this.platform.exitApp(); //exit from app
          if (this.nav.canGoBack()) this.nav.pop({});
        } else {
          console.log('press');
          this.toast.showToastBack('Press back again to exit App?');
          lastTimeBackPress = new Date().getTime();
        }
      } else if (view != 1) {
        let nav = app.getActiveNav();
        let activeView: ViewController = nav.getActive();
        console.log(activeView);
        if (activeView != null) {
          if (nav.canGoBack()) nav.pop();
          else nav.parent.select(0); // goes to the first tab
        }
      }
    });
  }

  // startTracking() {
  //   this.ga
  //     .startTrackerWithId('YOUR_TRACKER_ID')
  //     .then(() => {
  //       console.log('Google analytics is ready now');
  //       this.ga.trackView('test');
  //     })
  //     .catch(e => console.log('Error starting GoogleAnalytics', e));
  // }

  openPage(page) {
    if (page == 'LoginPage') {
      this.nav.setRoot(page);
      this.user.isLogin = false;
    } else {
      this.nav.push(page);
    }

    //this.activePage = page;
  }

  // checkActive(page){
  //   return page == this.activePage;
  // }
}
