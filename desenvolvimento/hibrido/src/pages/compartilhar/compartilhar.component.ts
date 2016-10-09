import { Component }  from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { SocialSharing } from 'ionic-native';

@Component({
  selector: 'page-compartilhar',
  templateUrl: 'compartilhar.component.html',
})
export class CompartilharPage {

  titulo: string = 'Compartilhar';
  dados: any;

  constructor(
    public _navParams: NavParams,
    public _viewCtrl: ViewController) {
    this.dados = _navParams.data;
  }

  dismiss() {
    this._viewCtrl.dismiss(this.titulo);
  }

  whatsappShare() {
    SocialSharing.shareViaWhatsApp('Message via WhatsApp', 'assets/img/calendar.svg', 'http://pointdeveloper.com/')
      .then(() => {
        // alert('Success');
      },
      () => {
        // alert('failed');
      });
  }

  twitterShare() {
    SocialSharing.shareViaTwitter('Message via Twitter', 'assets/img/calendar.svg', 'http://pointdeveloper.com')
      .then(() => {
        // alert('Success');
      },
      () => {
        // alert('failed');
      });
  }

  facebookShare() {
    SocialSharing.shareViaFacebook('Message via Twitter', 'assets/img/calendar.svg', 'http://pointdeveloper.com')
      .then(() => {
        alert('Success');
      },
      () => {
        alert('failed');
      });
  }

  instagramShare() {
    SocialSharing.shareViaInstagram('Message via Instagram', 'assets/img/calendar.svg')
      .then(() => {
        // alert('Success');
      },
      () => {
        // alert('failed');
      });
  }


  otherShare() {
    SocialSharing.share('Genral Share Sheet', 'Partiu !', 'assets/img/calendar.svg', 'http://pointdeveloper.com')
      .then(() => {
        // alert('Success');
      },
      () => {
        // alert('failed');
      });
  }

}
