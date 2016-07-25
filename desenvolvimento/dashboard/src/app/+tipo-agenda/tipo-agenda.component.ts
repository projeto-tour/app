import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { TipoComponent, TipoAgendaService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'partiu-tipo-agenda',
  templateUrl: 'tipo-agenda.component.html',
  styleUrls: ['tipo-agenda.component.css'],
  directives: [
    TipoComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TipoAgendaComponent implements OnInit {

  title = 'Tipo de Agenda';
  placeholder: string = 'Tipo de agenda';
  maxLength: number = 50;

  constructor(public _tipoAgendaService: TipoAgendaService) { }

  ngOnInit() { }

}