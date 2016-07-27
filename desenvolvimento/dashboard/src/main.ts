import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { AppComponent, environment } from './app';
import { APP_ROUTER_PROVIDERS } from './app/routing';
import { FIREBASE_APP_PROVIDERS, AUTH_PROVIDERS, APP_DATA_PROVIDERS, CONFIG_PROVIDERS } from './app/shared';

if (environment.production) {
  enableProdMode();
}

bootstrap(
  AppComponent,
  [
    APP_ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    FIREBASE_APP_PROVIDERS,
    AUTH_PROVIDERS,
    APP_DATA_PROVIDERS,
    CONFIG_PROVIDERS,
    disableDeprecatedForms(),
    provideForms()
  ]
).then(
  success => console.log('AppComponent bootstrapped!'),
  error => console.log('AppComponent bootstrapped with error: ' + error)
);
