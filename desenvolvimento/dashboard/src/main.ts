/// <reference path="../typings/globals/material-design-lite/index.d.ts" />
/// <reference path="../typings/globals/underscore/index.d.ts" />

import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(
    success => {
      console.log('bootstrapModule[AppModule]>> OK!');
    },
    error => {
      console.log('bootstrapModule[AppModule]>> ERROR: ' + error);
    }
  );
