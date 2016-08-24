import { Component }  from '@angular/core';

import { App, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/sobre/sobre.component.html',
})
export class SobrePage {

  titulo: string = 'Sobre';

  private mensagenErro: any;

  constructor(
    public _app: App,
    public _navParams: NavParams,
    public _viewCtrl: ViewController) {
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

}
