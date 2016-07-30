import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';

import {
  AuthService,
  MDL
} from '../shared';

@Component({
  moduleId: module.id,
  selector: 'partiu-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [
    MD_GRID_LIST_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MDL
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(private _authService: AuthService) {
  }

  ngOnInit() {
    this._authService.title = 'Home';
  }

}