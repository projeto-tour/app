// Underscore imports
/// <reference path="../../../typings/globals/underscore/index.d.ts" />
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import * as _ from 'underscore';

import { AuthService } from '../shared/providers/auth';
import { ModalService } from '../shared/directives/modal';
import { ToastService } from '../shared/directives/toast';
import { CaracteristicaService, TipoDadoService } from '../shared/providers';

import { ICaracteristica, Caracteristica, ITipoDado } from '../shared/models';

@Component({
  selector: 'partiu-caracteristica',
  templateUrl: 'caracteristica.component.html',
  styleUrls: ['caracteristica.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaracteristicaComponent implements OnInit {

  caracteristica: ICaracteristica;
  editing: boolean = false;
  listCaracteristica: ICaracteristica[] = [];
  listTipoDado: ITipoDado[] = [];

  constructor(
    private _authService: AuthService,
    private _modalService: ModalService,
    private _toastService: ToastService,
    public _caracteristicaService: CaracteristicaService,
    public _tipoDadoService: TipoDadoService) {
    this.reset();
  }

  ngOnInit() {
    this._authService.title = 'Característica';
    this._caracteristicaService.list.subscribe((data: ICaracteristica[]) => {
      this.listCaracteristica = data;
    });

    this._tipoDadoService.list.subscribe((data: ITipoDado[]) => {
      this.listTipoDado = data;
    });
  }

  onSubmit(caracteristica: ICaracteristica): void {
    if (this.isValid(caracteristica)) {
      let key = null;
      let message = '';
      if (this.editing) {
        this._caracteristicaService.update(this.caracteristica, caracteristica);
        key = this.caracteristica.$key;
        message = `${this.caracteristica.descricao} foi alterado com successo.`;
      } else if (_.findWhere(this.listCaracteristica, { descricao: caracteristica.descricao })) {
        message = `${caracteristica.descricao} já existe.`;
      } else {
        key = this._caracteristicaService.create(new Caracteristica(caracteristica));
        message = key ? `${caracteristica.descricao} foi cadastrado com successo.`
          : `Não foi possível cadastrar ${caracteristica.descricao}.`;
      }
      if (key) {
        this._tipoDadoService.updates(`/${caracteristica.tipo_dado}/caracteristica`,
          JSON.parse(`{"${key}": true}`));
      }
      this.reset();
      this._toastService.activate(message);
    } else {
      this._toastService.activate('Por favor, preencha os campos de formulário corretamente.');
    }
  }

  onClear(event): void {
    event.preventDefault();
    this.reset();
  }

  onEdit(caracteristica: ICaracteristica): void {
    this.caracteristica = _.clone(caracteristica);
    this.editing = true;
  }

  onRemove(caracteristica: ICaracteristica): void {
    if (caracteristica.caracteristica_tipo_ponto_interesse
      && _.keys(caracteristica.caracteristica_tipo_ponto_interesse).length > 0) {
      this._toastService.activate(`${caracteristica.descricao} não pode ser excluído pois já foi atribuído à 
        ${_.keys(caracteristica.caracteristica_tipo_ponto_interesse).length} cadastros.`);
    } else {
      let msg = `Deseja excluir ${caracteristica.descricao} ?`;
      this._modalService.activate(msg).then(responseOK => {
        if (responseOK) {
          this._caracteristicaService.remove(caracteristica).then(data => {
            this._tipoDadoService.updates(`/${caracteristica.tipo_dado}/caracteristica`,
              JSON.parse(`{"${caracteristica.$key}": true}`));
            this._toastService.activate(`${caracteristica.descricao} foi removido com successo.`);
          });
        }
      });
    }
  }

  getDescricao(tipoCaracteristica: string): string {
    let option = _.findWhere(this.listTipoDado, { $key: tipoCaracteristica });
    return _.has(option, 'descricao') ? option.descricao : '';
  }

  private isValid(caracteristica: ICaracteristica): boolean {
    return (caracteristica.descricao && caracteristica.descricao.trim().length > 0)
      && (caracteristica.tipo_dado && caracteristica.tipo_dado.length > 0);
  }

  private reset(caracteristica?: ICaracteristica): void {
    this.editing = false;
    this.caracteristica = new Caracteristica(caracteristica);
  }

}
