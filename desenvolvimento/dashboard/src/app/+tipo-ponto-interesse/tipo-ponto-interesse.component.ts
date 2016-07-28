//Underscore imports
/// <reference path="../../../typings/globals/underscore/index.d.ts" />
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2';

import * as _ from 'underscore';

import { ToastService } from '../shared/providers/toast.service';
import { ModalService } from '../shared/providers/modal.service';
import { EntityService } from '../shared/providers/entity.service';

import { CadastroComponent, TipoPontoInteresseService, ITipoPontoInteresse, TipoPontoInteresse } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'partiu-tipo-ponto-interesse',
  templateUrl: 'tipo-ponto-interesse.component.html',
  styleUrls: ['tipo-ponto-interesse.component.css'],
  directives: [
    CadastroComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TipoPontoInteresseComponent implements OnInit {

  tipoPontoInteresse: ITipoPontoInteresse = new TipoPontoInteresse();
  editing: boolean = false;
  listTipoPontoInteresse: ITipoPontoInteresse[] = [];

  showIcone: boolean = true;
  showDestaque: boolean = true;

  constructor(
    private _modalService: ModalService,
    private _toastService: ToastService,
    private _entityService: EntityService,
    private _tipoPontoInteresseService: TipoPontoInteresseService) {
    this.clear();
  }

  ngOnInit() {
    this._tipoPontoInteresseService.list.subscribe((data: ITipoPontoInteresse[]) => {
      this.listTipoPontoInteresse = data;
    });
  }

  create(tipoPontoInteresse: ITipoPontoInteresse): void {
    if (this.isValid(tipoPontoInteresse)) {
      if (_.findWhere(this.listTipoPontoInteresse, { descricao: tipoPontoInteresse.descricao })) {
        this._toastService.activate(`${tipoPontoInteresse.descricao} já existe.`);
      } else {
        this._tipoPontoInteresseService.create(new TipoPontoInteresse(tipoPontoInteresse));
        this._toastService.activate(`${tipoPontoInteresse.descricao} foi cadastrado com successo.`);
      }
    }
    this.clear();
  }

  update(tipoPontoInteresse: any): void {
    if (this.isValid(tipoPontoInteresse.changes)) {
      this._tipoPontoInteresseService.update(tipoPontoInteresse.item, tipoPontoInteresse.changes);
      this._toastService.activate(`${tipoPontoInteresse.changes.descricao} foi alterado com successo.`);
    }
    this.clear();
  }

  edit(tipoPontoInteresse: ITipoPontoInteresse): void {
    this.tipoPontoInteresse = _.clone(tipoPontoInteresse);
    this.editing = true;
  }

  remove(tipoPontoInteresse: ITipoPontoInteresse): void {
    if ((tipoPontoInteresse.preferencias_usuario && _.keys(tipoPontoInteresse.preferencias_usuario).length > 0)
        || (tipoPontoInteresse.caracteristicas_tipo_ponto_interesse && _.keys(tipoPontoInteresse.caracteristicas_tipo_ponto_interesse).length > 0)) {
      this._toastService.activate(`${tipoPontoInteresse.descricao} não pode ser excluído pois já foi atribuído à ${_.keys(tipoPontoInteresse.preferencias_usuario).length + _.keys(tipoPontoInteresse.caracteristicas_tipo_ponto_interesse).length} cadastros.`);
    } else {
      let msg = `Deseja realmente excluir ${tipoPontoInteresse.descricao} ?`;
      this._modalService.activate(msg).then(responseOK => {
        if (responseOK) {
          this._tipoPontoInteresseService.remove(tipoPontoInteresse);
          this._toastService.activate(`${tipoPontoInteresse.descricao} foi removido com successo.`);
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