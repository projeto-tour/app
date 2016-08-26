import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface ProgressBarState {
  show: boolean;
}

@Injectable()
export class ProgressBarService {

  private progressBarSubject = new Subject<ProgressBarState>();

  progressBarState = this.progressBarSubject;

  show() {
    this.progressBarSubject.next(<ProgressBarState>{ show: true });
  }

  hide() {
    this.progressBarSubject.next(<ProgressBarState>{ show: false });
  }

}

