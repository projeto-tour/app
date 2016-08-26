import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ProgressBarState, ProgressBarService } from './progress-bar.service';

@Component({
  selector: 'partiu-progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: ['progress-bar.component.css']
})
export class ProgressBarComponent implements OnDestroy, OnInit {

  visible = false;

  private progressBarStateChanged: Subscription;

  constructor(private _progressBarService: ProgressBarService) { }

  ngOnInit() {
    this.progressBarStateChanged = this._progressBarService.progressBarState
      .subscribe((state: ProgressBarState) => this.visible = state.show);
  }

  ngOnDestroy() {
    this.progressBarStateChanged.unsubscribe();
  }
}
