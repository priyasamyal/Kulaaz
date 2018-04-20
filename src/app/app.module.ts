import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
/**Plugin List  */
// import {GoogleAnalytics} from '@ionic-native/google-analytics';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import { Contacts } from '@ionic-native/contacts';
// import { LinkedIn } from '@ionic-native/linkedin';

/**Page List  */
import {MyApp} from './app.component';

/**Provider List  */
import {AlertProvider} from '../providers/alert/alert';
import {ApiProvider} from '../providers/api/api';
import {ToastProvider} from '../providers/toast/toast';
import {UserProvider} from '../providers/user/user';
import { ContactsProvider } from '../providers/contacts/contacts';

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back',
      pageTransition: 'ios',
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
  //  GoogleAnalytics,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ApiProvider,
    ToastProvider,
    AlertProvider,
    Contacts,
    ContactsProvider,
    //LinkedIn
  ]
})
export class AppModule {}
