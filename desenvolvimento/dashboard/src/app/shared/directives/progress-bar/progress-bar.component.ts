import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar';

import { ProgressBarState, ProgressBarService } from '../../providers/progress-bar.service';

@Component({
  moduleId: module.id,
  selector: 'partiu-progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: ['progress-bar.component.css'],
  directives: [
    MD_PROGRESS_BAR_DIRECTIVES
  ]
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
