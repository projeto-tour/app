// Underscore imports
/// <reference path="../../../typings/globals/underscore/index.d.ts" />
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import * as _ from 'underscore';

import { AuthService } from '../shared/providers/auth';
import { ModalService } from '../shared/directives/modal';
import { ToastService } from '../shared/directives/toast';
import { TransporteService, TipoTransporteService } from '../shared/providers';

import { ITransporte, Transporte, ITipoTransporte } from '../shared/models';

@Component({
  selector: 'partiu-transporte',
  templateUrl: 'transporte.component.html',
  styleUrls: ['transporte.component.css'],
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
    public _transporteService: TransporteService,
    public _tipoTransporteService: TipoTransporteService) {
    this.reset();
  }

  ngOnInit() {
    this._authService.title = 'Transporte';
    this._transporteService.list.subscribe((data: ITransporte[]) => {
      this.listTransporte = data;
    });

    this._tipoTransporteService.list.subscribe((data: ITipoTransporte[]) => {
      this.listTipoTransporte = data;
    });
  }

  onSubmit(transporte: ITransporte): void {
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
      }
      this.reset();
      this._toastService.activate(message);
    }
  }

  onClear(event): void {
    event.preventDefault();
    this.editing = false;
    this.reset();
  }

  onEdit(transporte: ITransporte): void {
    this.transporte = _.clone(transporte);
    this.editing = true;
  }

  onRemove(transporte: ITransporte): void {
    if (transporte.rota && _.keys(transporte.rota).length > 0) {
      this._toastService.activate(`${transporte.descricao} não pode ser excluído pois já foi atribuído à  
        ${_.keys(transporte.rota).length} cadastros.`);
    } else {
      let msg = `Deseja excluir ${transporte.descricao} ?`;
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

  getDescricao(tipoTransporte: string): string {
    let option = _.findWhere(this.listTipoTransporte, { $key: tipoTransporte });
    return _.has(option, 'descricao') ? option.descricao : '';
  }

  private isValid(transporte: ITransporte): boolean {
    return (transporte.descricao && transporte.descricao.trim().length > 0)
      && (transporte.tipo_transporte && transporte.tipo_transporte.length > 0);
  }

  private reset(transporte?: ITransporte): void {
    this.transporte = new Transporte(transporte);
  }

}
