// Underscore imports
/// <reference path="../../../typings/globals/underscore/index.d.ts" />
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import * as _ from 'underscore';

import { AuthService } from '../shared/providers/auth';
import { ModalService } from '../shared/directives/modal';
import { ToastService } from '../shared/directives/toast';
import { TipoPontoInteresseService } from '../shared/providers';

import { ITipoPontoInteresse, TipoPontoInteresse } from '../shared/models';

@Component({
  selector: 'partiu-tipo-ponto-interesse',
  templateUrl: 'tipo-ponto-interesse.component.html',
  styleUrls: ['tipo-ponto-interesse.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TipoPontoInteresseComponent implements OnInit {

  tipoPontoInteresse: ITipoPontoInteresse = new TipoPontoInteresse();
  editing: boolean = false;
  listTipoPontoInteresse: ITipoPontoInteresse[] = [];

  showIcone: boolean = true;
  showDestaque: boolean = true;

  constructor(
    private _authService: AuthService,
    private _modalService: ModalService,
    private _toastService: ToastService,
    private _tipoPontoInteresseService: TipoPontoInteresseService) {
    this.clear();
  }

  ngOnInit() {
    this._authService.title = 'Tipo de Ponto de Interesse';
    this._tipoPontoInteresseService.list.subscribe((data: ITipoPontoInteresse[]) => {
      this.listTipoPontoInteresse = data;
    });
  }

  create(tipoPontoInteresse: ITipoPontoInteresse): void {
    if (this.isValid(tipoPontoInteresse)) {
      if (_.findWhere(this.listTipoPontoInteresse, { descricao: tipoPontoInteresse.descricao })) {
        this._toastService.activate(`${tipoPontoInteresse.descricao} já existe.`);
      } else {
        let key = this._tipoPontoInteresseService.create(new TipoPontoInteresse(tipoPontoInteresse));
        this._toastService.activate(key ? `${tipoPontoInteresse.descricao} foi cadastrado com successo.`
          : `Não foi possível cadastrar ${tipoPontoInteresse.descricao}.`);
      }
    }
    this.clear();
  }

  update(tipoPontoInteresse: any): void {
    if (this.isValid(tipoPontoInteresse.changes)) {
      this._tipoPontoInteresseService.update(tipoPontoInteresse.item, tipoPontoInteresse.changes).then(data => {
        this._toastService.activate(`${tipoPontoInteresse.changes.descricao} foi alterado com successo.`);
      });
    }
    this.clear();
  }

  edit(tipoPontoInteresse: ITipoPontoInteresse): void {
    this.tipoPontoInteresse = _.clone(tipoPontoInteresse);
    this.editing = true;
  }

  remove(tipoPontoInteresse: ITipoPontoInteresse): void {
    if ((tipoPontoInteresse.preferencias_usuario && _.keys(tipoPontoInteresse.preferencias_usuario).length > 0)
      || (tipoPontoInteresse.caracteristica_tipo_ponto_interesse
        && _.keys(tipoPontoInteresse.caracteristica_tipo_ponto_interesse).length > 0)) {
      this._toastService.activate(`${tipoPontoInteresse.descricao} não pode ser excluído pois já foi atribuído à 
        ${_.keys(tipoPontoInteresse.preferencias_usuario).length
        + _.keys(tipoPontoInteresse.caracteristica_tipo_ponto_interesse).length} cadastros.`);
    } else {
      let msg = `Deseja excluir ${tipoPontoInteresse.descricao} ?`;
      this._modalService.activate(msg).then(responseOK => {
        if (responseOK) {
          this._tipoPontoInteresseService.remove(tipoPontoInteresse).then(data => {
            this._toastService.activate(`${tipoPontoInteresse.descricao} foi removido com successo.`);
          });
        }
      });
    }
  }

  clear(data?: any) {
    this.editing = false;
    this.tipoPontoInteresse = new TipoPontoInteresse();
    this.tipoPontoInteresse.icone = null;
    this.tipoPontoInteresse.destaque = null;
  }

  private isValid(tipoPontoInteresse: ITipoPontoInteresse): boolean {
    return (tipoPontoInteresse.descricao && tipoPontoInteresse.descricao.trim().length > 0);
  }

}
