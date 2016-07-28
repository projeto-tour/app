//Underscore imports
/// <reference path="../../../typings/globals/underscore/index.d.ts" />
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2';

import * as _ from 'underscore';

import { ToastService } from '../shared/providers/toast.service';
import { ModalService } from '../shared/providers/modal.service';
import { EntityService } from '../shared/providers/entity.service';

import { CadastroComponent, TipoAgendaService, ITipoAgenda, TipoAgenda } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'partiu-tipo-agenda',
  templateUrl: 'tipo-agenda.component.html',
  styleUrls: ['tipo-agenda.component.css'],
  directives: [
    CadastroComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TipoAgendaComponent implements OnInit {

  tipoAgenda: ITipoAgenda = new TipoAgenda();
  editing: boolean = false;
  listTipoAgenda: ITipoAgenda[] = [];

  showIcone: boolean = true;
  showDestaque: boolean = true;

  constructor(
    private _modalService: ModalService,
    private _toastService: ToastService,
    private _entityService: EntityService,
    private _tipoAgendaService: TipoAgendaService) {
    this.clear();
  }

  ngOnInit() {
    this._tipoAgendaService.list.subscribe((data: ITipoAgenda[]) => {
      this.listTipoAgenda = data;
    });
  }

  create(tipoAgenda: ITipoAgenda): void {
    if (this.isValid(tipoAgenda)) {
      if (_.findWhere(this.listTipoAgenda, { descricao: tipoAgenda.descricao })) {
        this._toastService.activate(`${tipoAgenda.descricao} já existe.`);
      } else {
        this._tipoAgendaService.create(new TipoAgenda(tipoAgenda));
        this._toastService.activate(`${tipoAgenda.descricao} foi cadastrado com successo.`);
      }
    }
    this.clear();
  }

  update(tipoAgenda: any): void {
    if (this.isValid(tipoAgenda.changes)) {
      this._tipoAgendaService.update(tipoAgenda.item, tipoAgenda.changes);
      this._toastService.activate(`${tipoAgenda.changes.descricao} foi alterado com successo.`);
    }
    this.clear();
  }

  edit(tipoAgenda: ITipoAgenda): void {
    this.tipoAgenda = _.clone(tipoAgenda);
    this.editing = true;
  }

  remove(tipoAgenda: ITipoAgenda): void {
    if (tipoAgenda.agendas && _.keys(tipoAgenda.agendas).length > 0) {
      this._toastService.activate(`${tipoAgenda.descricao} não pode ser excluído pois já foi atribuído à ${_.keys(tipoAgenda.agendas).length} cadastros.`);
    } else {
      let msg = `Deseja realmente excluir ${tipoAgenda.descricao} ?`;
      this._modalService.activate(msg).then(responseOK => {
        if (responseOK) {
          this._tipoAgendaService.remove(tipoAgenda);
          this._toastService.activate(`${tipoAgenda.descricao} foi removido com successo.`);
        }
      });
    }
  }

  clear(data?: any) {
    this.editing = false;
    this.tipoAgenda = new TipoAgenda();
    this.tipoAgenda.icone = null;
    this.tipoAgenda.destaque = null;
  }

  private isValid(tipoAgenda: ITipoAgenda): boolean {
    return (tipoAgenda.descricao && tipoAgenda.descricao.trim().length > 0);
  }

}