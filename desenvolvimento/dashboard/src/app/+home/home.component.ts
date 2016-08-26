import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { AuthService } from '../shared/providers/auth';

@Component({
  selector: 'partiu-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(private _authService: AuthService) {
  }

  ngOnInit() {
    this._authService.title = 'Home';
  }

}
