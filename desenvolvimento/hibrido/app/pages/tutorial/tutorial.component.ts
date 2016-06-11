import { Component }  from '@angular/core';

import { App, NavParams, ViewController } from 'ionic-angular';

import { Tutorial } from './';

import { TutorialDataProvider } from '../../providers/tutorial-data.provider';

@Component({
  templateUrl: 'build/pages/tutorial/tutorial.component.html'
})
export class TutorialPage {

  titulo: string = "Tutorial";

  tutorials: Tutorial[] = [];
  dados: any;

  private mensagenErro: any;

  constructor(private _app: App,
    private _navParams: NavParams,
    private _viewCtrl: ViewController,
    private _dataProvider: TutorialDataProvider) {
    this.dados = _navParams.data;
  }

  ionViewLoaded() {
    this.getTutorials();
  }

  ionViewWillEnter() { }

  ionViewDidEnter() { }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ionViewWillUnload() { }

  ionViewDidUnload() { }

  dismiss() {
    this._viewCtrl.dismiss(this.titulo);
  }

  private getTutorials(): void {
    this.tutorials = this._dataProvider.getTutorials();
  }

}
