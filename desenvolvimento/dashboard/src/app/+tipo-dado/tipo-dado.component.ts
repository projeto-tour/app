//Underscore imports
/// <reference path="../../../typings/globals/underscore/index.d.ts" />
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2';

import * as _ from 'underscore';

import { ToastService } from '../shared/providers/toast.service';
import { ModalService } from '../shared/providers/modal.service';
import { EntityService } from '../shared/providers/entity.service';

import { CadastroComponent, TipoDadoService, ITipoDado, TipoDado } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'partiu-tipo-dado',
  templateUrl: 'tipo-dado.component.html',
  styleUrls: ['tipo-dado.component.css'],
  directives: [
    CadastroComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TipoDadoComponent implements OnInit {

  tipoDado: ITipoDado = new TipoDado();
  editing: boolean = false;
  listTipoDado: ITipoDado[] = [];

  showIcone: boolean = false;
  showDestaque: boolean = false;

  constructor(
    private _modalService: ModalService,
    private _toastService: ToastService,
    private _entityService: EntityService,
    private _tipoDadoService: TipoDadoService) {
    this.clear();
  }

  ngOnInit() {
    this._tipoDadoService.list.subscribe((data: ITipoDado[]) => {
      this.listTipoDado = data;
    });
  }

  create(tipoDado: ITipoDado): void {
    if (this.isValid(tipoDado)) {
      if (_.findWhere(this.listTipoDado, { descricao: tipoDado.descricao })) {
        this._toastService.activate(`${tipoDado.descricao} já existe.`);
      } else {
        this._tipoDadoService.create(new TipoDado(tipoDado));
        this._toastService.activate(`${tipoDado.descricao} foi cadastrado com successo.`);
      }
    }
    this.clear();
  }

  update(tipoDado: any): void {
    if (this.isValid(tipoDado.changes)) {
      this._tipoDadoService.update(tipoDado.item, tipoDado.changes);
      this._toastService.activate(`${tipoDado.changes.descricao} foi alterado com successo.`);
    }
    this.clear();
  }

  edit(tipoDado: ITipoDado): void {
    this.tipoDado = _.clone(tipoDado);
    this.editing = true;
  }

  remove(tipoDado: ITipoDado): void {
    if (tipoDado.caracteristicas && _.keys(tipoDado.caracteristicas).length > 0) {
      this._toastService.activate(`${tipoDado.descricao} não pode ser excluído pois já foi atribuído à ${_.keys(tipoDado.caracteristicas).length} cadastros.`);
    } else {
      let msg = `Deseja realmente excluir ${tipoDado.descricao} ?`;
      this._modalService.activate(msg).then(responseOK => {
        if (responseOK) {
          this._tipoDadoService.remove(tipoDado);
          this._toastService.activate(`${tipoDado.descricao} foi removido com successo.`);
        }
      });
    }
  }

  clear(data?: any) {
    this.editing = false;
    this.tipoDado = new TipoDado();
    this.tipoDado.icone = null;
    this.tipoDado.destaque = null;
  }

  private isValid(tipoDado: ITipoDado): boolean {
    return (tipoDado.descricao && tipoDado.descricao.trim().length > 0);
  }

}