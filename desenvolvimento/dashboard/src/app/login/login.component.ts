import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

import { AuthService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'partiu-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [
    MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_GRID_LIST_DIRECTIVES,
    MD_ICON_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MdIcon
  ],
  providers: [
    MdIconRegistry
  ]
})
export class LoginComponent implements OnInit {

  title = 'Login';

  constructor(
    public _authService: AuthService,
    public _router: Router) {
  }

  ngOnInit() {

  }

  login(user: string, password: string) {
    if (this._authService.login(user, password)) {
      let redirect = this._authService.redirectUrl ? this._authService.redirectUrl : 'dashboard';
      this._router.navigate([redirect]);
    }
  }

}