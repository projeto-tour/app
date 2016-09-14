import { Component }  from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { SocialSharing } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/compartilhar/compartilhar.component.html',
})
export class CompartilharPage {

  titulo: string = 'Compartilhar';
  dados: any;

  constructor(
    public _navParams: NavParams,
    public _viewCtrl: ViewController) {
    this.dados = _navParams.data;
  }

  ionViewLoaded() { }

  ionViewWillEnter() { }

  ionViewDidEnter() { }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ionViewWillUnload() { }

  ionViewDidUnload() { }

  dismiss() {
    this._viewCtrl.dismiss(this.titulo);
  }

  whatsappShare() {
    SocialSharing.shareViaWhatsApp('Message via WhatsApp', 'img/calendar.svg', 'http://pointdeveloper.com/')
      .then(() => {
        alert('Success');
      },
      () => {
        alert('failed');
      });
  }

  twitterShare() {
    SocialSharing.shareViaTwitter('Message via Twitter', 'img/calendar.svg', 'http://pointdeveloper.com')
      .then(() => {
        alert('Success');
      },
      () => {
        alert('failed');
      });
  }

  facebookShare() {
    SocialSharing.shareViaFacebook('Message via Twitter', 'img/calendar.svg', 'http://pointdeveloper.com')
      .then(() => {
        alert('Success');
      },
      () => {
        alert('failed');
      });
  }

  instagramShare() {
    SocialSharing.shareViaInstagram('Message via Instagram', 'img/calendar.svg')
      .then(() => {
        alert('Success');
      },
      () => {
        alert('failed');
      });
  }


  otherShare() {
    SocialSharing.share('Genral Share Sheet', 'Partiu !', 'img/calendar.svg', 'http://pointdeveloper.com')
      .then(() => {
        alert('Success');
      },
      () => {
        alert('failed');
      });

  }

}
