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
    if (this.form.dirty && this.form.valid) {
      this._authService.signIn(this.form.value.email, this.form.value.password)
        .then(data => {
          if (this._authService.authenticated) {
            this._toastService.activate(`Login efetuado com sucesso.`);
          } else {
            this._toastService.activate('E-mail ou senha inválido.');
          }
        }).then(() => {
          if (this._authService.authenticated) {
            this._router.navigate([this._authService.redirectUrl ? this._authService.redirectUrl : '/dashboard']);
          }
        }).catch(error => {
          this._toastService.activate(`Não foi possível realizar login.`);
        });
    } else if (!this.form.valid) {
      this._toastService.activate('E-mail ou senha inválido.');
    }
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
        Validators.maxLength(50),
      ])
    });
  }

}
