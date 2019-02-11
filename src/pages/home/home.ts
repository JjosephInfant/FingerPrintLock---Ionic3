import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fingerprintOptions: FingerprintOptions;
  constructor(public navCtrl: NavController, private fingerAuth: FingerprintAIO, private alertCtrl: AlertController) {

  }

  public showFingerprintAuthDlg() {
    this.fingerAuth.show({
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password', // Only Android
      localizedFallbackTitle: 'Use Pin', // Only iOS
      localizedReason: 'Please authenticate' // Only iOS
    })
      .then((result: any) => {
        this.presentAlert("Fingerprint successfull");
        this.navCtrl.setRoot('HomePage');
      })
      .catch((error: any) => {
        this.presentAlert("Fingerprint error  "+JSON.stringify(error));
        console.log('err: ', error);
      });

    this.fingerAuth.isAvailable().then(result => {
      if (result === "OK") {
        this.fingerAuth.show(this.fingerprintOptions)
          .then((result: any) => console.log(result))
          .catch((error: any) => console.log(error));
      }
    }).catch(error => {
      this.presentAlert("Fingerprint-Demo error  "+JSON.stringify(error));
      console.log("Fingerprint-Demo error   " + error)
    });
  }

  presentAlert(message : string) {
    let alert = this.alertCtrl.create({
      title: 'Alert !!!',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
