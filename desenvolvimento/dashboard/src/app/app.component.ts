import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar';

import { ToastComponent } from '../app/shared/directives/toast/toast.component';
import { ModalComponent } from '../app/shared/directives/modal/modal.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    MD_PROGRESS_BAR_DIRECTIVES,
    ToastComponent,
    ModalComponent
  ],
  providers: [
    HTTP_PROVIDERS
  ]
})
export class AppComponent implements OnInit {

    title = 'Partiu!';
    
    constructor() { 
    }

    ngOnInit() {
    }

}
