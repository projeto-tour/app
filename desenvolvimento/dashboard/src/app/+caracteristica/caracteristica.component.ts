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

  editing: boolean = false;
  caracteristica: ICaracteristica = new Caracteristica();
  tipoDado: string;
  listCaracteristica: ICaracteristica[] = [];
  listTipoDado: ITipoDado[] = [];

  constructor(
    private _authService: AuthService,
    private _modalService: ModalService,
    private _toastService: ToastService,
    public _caracteristicaService: CaracteristicaService,
    public _tipoDadoService: TipoDadoService) {
    // this.reset();
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
      if (this.editing) {
        this._caracteristicaService.update(this.caracteristica, caracteristica)
          .then(() => {
            this.updates(this.caracteristica.$key, true, caracteristica.tipo_dado,
              `${this.caracteristica.descricao} foi alterado com êxito.`
            );
          }).catch(error => {
            this._toastService.activate(`${error}`, 'Atenção');
          });
      } else if (_.findWhere(this.listCaracteristica, { descricao: caracteristica.descricao })) {
        this._toastService.activate(`${caracteristica.descricao} já existe.`);
      } else {
        let key = this._caracteristicaService.create(new Caracteristica(caracteristica));
        if (key) {
          this.updates(key, true, caracteristica.tipo_dado,
            `${caracteristica.descricao} foi cadastrado com êxito.`
          );
        } else {
          this._toastService.activate(`Erro ao cadastrar ${caracteristica.descricao}.`);
        }
      }
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
    this.tipoDado = _.clone(caracteristica.tipo_dado);
    this.editing = true;
  }

  onRemove(caracteristica: ICaracteristica): void {
    if (caracteristica.caracteristica_tipo_ponto_interesse
      && _.keys(caracteristica.caracteristica_tipo_ponto_interesse).length > 0) {
      this._toastService.activate(`${caracteristica.descricao} não pode ser excluído pois está sendo utilizado por 
        ${_.keys(caracteristica.caracteristica_tipo_ponto_interesse).length} cadastros.`);
    } else {
      let msg = `Deseja excluir ${caracteristica.descricao} ?`;
      this._modalService.activate(msg).then(responseOK => {
        if (responseOK) {
          this._caracteristicaService.remove(caracteristica)
            .then(data => {
              return this._tipoDadoService.updates(`/${caracteristica.tipo_dado}/caracteristica`,
                JSON.parse(`{"${caracteristica.$key}": null}`));
            }).then(() => {
              this._toastService.activate(`${caracteristica.descricao} foi removido com êxito.`);
            }).catch(error => {
              this._toastService.activate(`${error}`, 'Atenção');
            });
        }
      });
    }
  }

  getDescricao(tipoCaracteristica: string): string {
    let option = _.findWhere(this.listTipoDado, { $key: tipoCaracteristica });
    return _.has(option, 'descricao') ? option.descricao : '';
  }

  private updates(key: string, value: boolean, tipoDado: string, msg: string): void {
    this._tipoDadoService.updates(`/${tipoDado}/caracteristica`, JSON.parse(`{"${key}": ${value}}`))
      .then(() => {
        if (this.editing && !_.isMatch(this.caracteristica, { 'tipo_dado': this.tipoDado })) {
          return this._tipoDadoService.updates(
            `/${this.tipoDado}/caracteristica`, JSON.parse(`{"${key}": null}`)
          );
        }
      }).then(() => {
        this.reset();
        this._toastService.activate(msg);
      }).catch(error => {
        this._toastService.activate(`${error}`, 'Atenção');
      });
  }

  private isValid(caracteristica: ICaracteristica): boolean {
    return (caracteristica.descricao && caracteristica.descricao.trim().length > 0)
      && (caracteristica.tipo_dado && caracteristica.tipo_dado.length > 0);
  }

  private reset(caracteristica?: ICaracteristica): void {
    this.editing = false;
    this.caracteristica = new Caracteristica({ descricao: '', tipo_dado: this.listTipoDado[0].$key });
    this.tipoDado = '';
  }

}
