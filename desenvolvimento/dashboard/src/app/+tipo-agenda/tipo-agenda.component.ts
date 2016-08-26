// Underscore imports
/// <reference path="../../../typings/globals/underscore/index.d.ts" />
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import * as _ from 'underscore';

import { AuthService } from '../shared/providers/auth';
import { ModalService } from '../shared/directives/modal';
import { ToastService } from '../shared/directives/toast';
import { TipoAgendaService } from '../shared/providers';

import { ITipoAgenda, TipoAgenda } from '../shared/models';

@Component({
  selector: 'partiu-tipo-agenda',
  templateUrl: 'tipo-agenda.component.html',
  styleUrls: ['tipo-agenda.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TipoAgendaComponent implements OnInit {

  tipoAgenda: ITipoAgenda = new TipoAgenda();
  editing: boolean = false;
  listTipoAgenda: ITipoAgenda[] = [];

  showIcone: boolean = true;
  showDestaque: boolean = true;

  constructor(
    private _authService: AuthService,
    private _modalService: ModalService,
    private _toastService: ToastService,
    private _tipoAgendaService: TipoAgendaService) {
    this.clear();
  }

  ngOnInit() {
    this._authService.title = 'Tipo de Agenda';
    this._tipoAgendaService.list.subscribe((data: ITipoAgenda[]) => {
      this.listTipoAgenda = data;
    });
  }

  create(tipoAgenda: ITipoAgenda): void {
    if (this.isValid(tipoAgenda)) {
      if (_.findWhere(this.listTipoAgenda, { descricao: tipoAgenda.descricao })) {
        this._toastService.activate(`${tipoAgenda.descricao} já existe.`);
      } else {
        let key = this._tipoAgendaService.create(new TipoAgenda(tipoAgenda));
        this._toastService.activate(key ? `${tipoAgenda.descricao} foi cadastrado com successo.`
          : `Não foi possível cadastrar ${tipoAgenda.descricao}.`);
      }
    }
    this.clear();
  }

  update(tipoAgenda: any): void {
    if (this.isValid(tipoAgenda.changes)) {
      this._tipoAgendaService.update(tipoAgenda.item, tipoAgenda.changes).then(data => {
        this._toastService.activate(`${tipoAgenda.changes.descricao} foi alterado com successo.`);
      });
    }
    this.clear();
  }

  edit(tipoAgenda: ITipoAgenda): void {
    this.tipoAgenda = _.clone(tipoAgenda);
    this.editing = true;
  }

  remove(tipoAgenda: ITipoAgenda): void {
    if (tipoAgenda.agenda && _.keys(tipoAgenda.agenda).length > 0) {
      this._toastService.activate(`${tipoAgenda.descricao} não pode ser excluído pois já foi atribuído à 
                                    ${_.keys(tipoAgenda.agenda).length} cadastros.`);
    } else {
      let msg = `Deseja excluir ${tipoAgenda.descricao} ?`;
      this._modalService.activate(msg).then(responseOK => {
        if (responseOK) {
          this._tipoAgendaService.remove(tipoAgenda).then(data => {
            this._toastService.activate(`${tipoAgenda.descricao} foi removido com successo.`);
          });
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
