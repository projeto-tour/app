import { Component }  from '@angular/core';

import { ViewController } from 'ionic-angular';

import { TutorialDataService, ITutorial } from '../../providers/data';

@Component({
  templateUrl: 'build/pages/tutorial/tutorial.component.html'
})
export class TutorialPage {

  titulo: string = "Tutorial";
  tutorials: ITutorial[] = [];

  constructor(private _viewCtrl: ViewController,
    private _dataProvider: TutorialDataService) {
  }

  ionViewLoaded() {
    this.getTutorials();
  }

  dismiss() {
    this._viewCtrl.dismiss(this.titulo);
  }

  private getTutorials(): void {
    this.tutorials = this._dataProvider.getTutorials();
  }

}
