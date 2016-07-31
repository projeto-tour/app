// Underscore imports
/// <reference path="../../../typings/globals/underscore/index.d.ts" />
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';

import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_RADIO_DIRECTIVES } from '@angular2-material/radio/radio';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdUniqueSelectionDispatcher } from '@angular2-material/core/coordination/unique-selection-dispatcher';

import * as _ from 'underscore';

import {
  AuthService,
  ToastService,
  ModalService,
  EntityService,
  TransporteService,
  TipoTransporteService,
  ITransporte,
  Transporte,
  ITipoTransporte,
  AutofocusDirective,
  MdlDirective
} from '../shared';

@Component({
  moduleId: module.id,
  selector: 'partiu-transporte',
  templateUrl: 'transporte.component.html',
  styleUrls: ['transporte.component.css'],
  directives: [
    MD_GRID_LIST_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_ICON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_RADIO_DIRECTIVES,
    FORM_DIRECTIVES,
    MdIcon,
    AutofocusDirective,
    MdlDirective
  ],
  providers: [
    MdIconRegistry,
    MdUniqueSelectionDispatcher
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransporteComponent implements OnInit {

  transporte: ITransporte = new Transporte();
  editing: boolean = false;
  listTransporte: ITransporte[] = [];
  listTipoTransporte: ITipoTransporte[] = [];

  constructor(
    private _authService: AuthService,
    private _modalService: ModalService,
    private _toastService: ToastService,
    private _entityService: EntityService,
    public _transporteService: TransporteService,
    public _tipoTransporteService: TipoTransporteService) {
    this.clear();
  }

  ngOnInit() {
    this._authService.title = 'Transporte';
    this._transporteService.list.subscribe((data: ITransporte[]) => {
      this.listTransporte = data;
    });

    this._tipoTransporteService.list.subscribe((data: ITipoTransporte[]) => {
      this.listTipoTransporte = data;
      this.transporte.tipo_transporte = _.defaults(_.has(this.listTipoTransporte[0], '$key') ? this.listTipoTransporte[0].$key : '', '');
    });
  }

  submit(transporte: ITransporte): void {
    if (this.isValid(transporte)) {
      let key = null;
      let message = '';
      if (this.editing) {
        this._transporteService.update(this.transporte, transporte);
        key = this.transporte.$key;
        message = `${transporte.descricao} foi alterado com successo.`;
      } else if (_.findWhere(this.listTransporte, { descricao: transporte.descricao })) {
        message = `${transporte.descricao} já existe.`;
      } else {
        key = this._transporteService.create(new Transporte(transporte));
        message = key ? `${transporte.descricao} foi cadastrado com successo.`
          : `Não foi possível cadastrar ${transporte.descricao}.`;
      }
      if (key) {
        this._tipoTransporteService.updates(`/${transporte.tipo_transporte}/transporte`,
          JSON.parse(`{"${key}": true}`));
        this.clear();
      }
      this._toastService.activate(message);
    }
  }

  edit(transporte: ITransporte): void {
    this.transporte = _.clone(transporte);
    this.editing = true;
  }

  remove(transporte: ITransporte): void {
    if (transporte.rota && _.keys(transporte.rota).length > 0) {
      this._toastService.activate(`${transporte.descricao} não pode ser excluído pois já foi atribuído à  
        ${_.keys(transporte.rota).length} cadastros.`);
    } else {
      let msg = `Deseja realmente excluir ${transporte.descricao} ?`;
      this._modalService.activate(msg).then(responseOK => {
        if (responseOK) {
          this._transporteService.remove(transporte).then(data => {
            this._tipoTransporteService.updates(`/${transporte.tipo_transporte}/transporte`,
              JSON.parse(`{"${transporte.$key}": true}`));
            this._toastService.activate(`${transporte.descricao} foi removido com successo.`);
          });
        }
      });
    }
  }

  clear() {
    this.editing = false;
    this.transporte = new Transporte();
    this.transporte.icone = null;
    this.transporte.destaque = null;
    this.transporte.tipo_transporte = _.defaults(_.has(this.listTipoTransporte[0], '$key') ?
      this.listTipoTransporte[0].$key : '', '');
  }

  private isValid(transporte: ITransporte): boolean {
    return (transporte.descricao && transporte.descricao.trim().length > 0)
      && (transporte.tipo_transporte && transporte.tipo_transporte.length > 0);
  }

  getDescricao(tipoTransporte: string): string {
    let option = _.findWhere(this.listTipoTransporte, { $key: tipoTransporte });
    return _.has(option, 'descricao') ? option.descricao : '';
  }
}
