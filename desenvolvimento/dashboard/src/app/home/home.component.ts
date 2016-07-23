import { Component, OnInit } from '@angular/core';

import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';

@Component({
  moduleId: module.id,
  selector: 'partiu-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [
    MD_GRID_LIST_DIRECTIVES,
    MD_CARD_DIRECTIVES
  ]
})
export class HomeComponent implements OnInit {

  title = 'Home';

  constructor() {
  }

  ngOnInit() {

  }

}