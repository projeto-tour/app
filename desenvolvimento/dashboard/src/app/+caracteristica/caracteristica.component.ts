//Underscore imports
/// <reference path="../../../typings/globals/underscore/index.d.ts" />
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';

import { FirebaseListObservable } from 'angularfire2';

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
  CaracteristicaService,
  TipoDadoService,
  ICaracteristica,
  Caracteristica,
  ITipoDado,
  TipoDado,
  Autofocus,
  MDL
} from '../shared';

@Component({
  moduleId: module.id,
  selector: 'partiu-caracteristica',
  templateUrl: 'caracteristica.component.html',
  styleUrls: ['caracteristica.component.css'],
  directives: [
    MD_GRID_LIST_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_ICON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_RADIO_DIRECTIVES,
    FORM_DIRECTIVES,
    MdIcon,
    Autofocus,
    MDL
  ],
  providers: [
    MdIconRegistry,
    MdUniqueSelectionDispatcher
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaracteristicaComponent implements OnInit {

  caracteristica: ICaracteristica = new Caracteristica();
  editing: boolean = false;
  listCaracteristica: ICaracteristica[] = [];
  listTipoDado: ITipoDado[] = [];

  constructor(
    private _authService: AuthService,
    private _modalService: ModalService,
    private _toastService: ToastService,
    private _entityService: EntityService,
    public _caracteristicaService: CaracteristicaService,
    public _tipoDadoService: TipoDadoService) {
    this.clear();
  }

  ngOnInit() {
    this._authService.title = 'Característica';
    this._caracteristicaService.list.subscribe((data: ICaracteristica[]) => {
      this.listCaracteristica = data;
    });

    this._tipoDadoService.list.subscribe((data: ITipoDado[]) => {
      this.listTipoDado = data;
      this.caracteristica.tipo_dado = _.defaults(_.has(this.listTipoDado[0], '$key') ? this.listTipoDado[0].$key : '', '');
    });
  }

  submit(caracteristica: ICaracteristica): void {
    if (this.isValid(caracteristica)) {
      var key = null;
      var message = '';
      if (this.editing) {
        this._caracteristicaService.update(this.caracteristica, caracteristica)
        key = this.caracteristica.$key;
        message = `${caracteristica.descricao} foi alterado com successo.`;
      } else if (_.findWhere(this.listCaracteristica, { descricao: caracteristica.descricao })) {
        message = `${caracteristica.descricao} já existe.`;
      } else {
        key = this._caracteristicaService.create(new Caracteristica(caracteristica));
        message = key ? `${caracteristica.descricao} foi cadastrado com successo.` : `Não foi possível cadastrar ${caracteristica.descricao}.`;
      }
      if (key) {
        this._tipoDadoService.updates(`/${caracteristica.tipo_dado}/caracteristicas`, JSON.parse(`{"${key}": true}`));
        this.clear();
      }
      this._toastService.activate(message);
    }
  }

  edit(caracteristica: ICaracteristica): void {
    this.caracteristica = _.clone(caracteristica);
    this.editing = true;
  }

  remove(caracteristica: ICaracteristica): void {
    if (caracteristica.caracteristicas_tipo_ponto_interesse && _.keys(caracteristica.caracteristicas_tipo_ponto_interesse).length > 0) {
      this._toastService.activate(`${caracteristica.descricao} não pode ser excluído pois já foi atribuído à ${_.keys(caracteristica.caracteristicas_tipo_ponto_interesse).length} cadastros.`);
    } else {
      let msg = `Deseja realmente excluir ${caracteristica.descricao} ?`;
      this._modalService.activate(msg).then(responseOK => {
        if (responseOK) {
          this._caracteristicaService.remove(caracteristica).then(data => {
            this._tipoDadoService.updates(`/${caracteristica.tipo_dado}/caracteristicas`, JSON.parse(`{"${caracteristica.$key}": true}`));
            this._toastService.activate(`${caracteristica.descricao} foi removido com successo.`);
          });
        }
      });
    }
  }

  clear() {
    this.editing = false;
    this.caracteristica = new Caracteristica();
    this.caracteristica.tipo_dado = _.defaults(_.has(this.listTipoDado[0], '$key') ? this.listTipoDado[0].$key : '', '');
  }

  private isValid(caracteristica: ICaracteristica): boolean {
    return (caracteristica.descricao && caracteristica.descricao.trim().length > 0)
      && (caracteristica.tipo_dado && caracteristica.tipo_dado.length > 0);
  }

  getDescricao(tipoCaracteristica: string): string {
    let option = _.findWhere(this.listTipoDado, { $key: tipoCaracteristica });
    return _.has(option, 'descricao') ? option.descricao : '';
  }
}