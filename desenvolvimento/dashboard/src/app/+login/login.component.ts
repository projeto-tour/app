import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/providers/auth';
import { ToastService } from '../shared/directives/toast';

@Component({
  selector: 'partiu-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    public _authService: AuthService,
    private _toastService: ToastService,
    private _router: Router) {
    this.configForm();
  }

  ngOnInit() {
    this._authService.title = 'Controle de Acesso';
  }

  onSubmit(user: any): void {
    this._authService.signIn(user.email, user.password)
      .then(() => {
        let redirect = this._authService.redirectUrl ? this._authService.redirectUrl : '/dashboard';
        this._router.navigate([redirect]);
      });
  }

  private configForm(): void {
    this.form = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ])
    });
  }

}
