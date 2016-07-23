import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    MD_PROGRESS_BAR_DIRECTIVES
  ],
  providers: [
    HTTP_PROVIDERS
  ]
})
export class AppComponent implements OnInit {

    title = 'Partiu!';
    
    constructor() { 
      console.log('constructor: AppComponent');
    }

    ngOnInit() { 

    }

}
