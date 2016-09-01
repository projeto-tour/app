// Underscore imports
/// <reference path="../../../typings/globals/underscore/index.d.ts" />
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import * as _ from 'underscore';

import { AuthService } from '../shared/providers/auth';
import { ModalService } from '../shared/directives/modal';
import { ToastService } from '../shared/directives/toast';
import { TipoTransporteService } from '../shared/providers';

import { ITipoTransporte, TipoTransporte } from '../shared/models';

@Component({
  selector: 'partiu-tipo-transporte',
  templateUrl: 'tipo-transporte.component.html',
  styleUrls: ['tipo-transporte.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TipoTransporteComponent implements OnInit {

  tipoTransporte: ITipoTransporte = new TipoTransporte();
  editing: boolean = false;
  listTipoTransporte: ITipoTransporte[] = [];

  showIcone: boolean = true;
  showDestaque: boolean = true;

  constructor(
    private _authService: AuthService,
    private _modalService: ModalService,
    private _toastService: ToastService,
    private _tipoTransporteService: TipoTransporteService) {
    // this.onClear();
  }

  ngOnInit() {
    this._authService.title = 'Tipo de Transporte';
    this._tipoTransporteService.list.subscribe((data: ITipoTransporte[]) => {
      this.listTipoTransporte = data;
    });
  }

  onCreate(tipoTransporte: ITipoTransporte): void {
    if (this.isValid(tipoTransporte)) {
      if (_.findWhere(this.listTipoTransporte, { descricao: tipoTransporte.descricao })) {
        this._toastService.activate(`${tipoTransporte.descricao} já existe.`);
      } else {
        let key = this._tipoTransporteService.create(new TipoTransporte(tipoTransporte));
         if (key) {
          this.onClear();
          this._toastService.activate(`${tipoTransporte.descricao} foi cadastrado com êxito.`);
        } else {
          this._toastService.activate(`Erro ao cadastrar ${tipoTransporte.descricao}.`);
        }
      }
    } else {
      this._toastService.activate('Por favor, preencha os campos de formulário corretamente.');
    }
  }

  onUpdate(tipoTransporte: any): void {
    if (this.isValid(tipoTransporte.changes)) {
      this._tipoTransporteService.update(tipoTransporte.item, tipoTransporte.changes)
        .then(data => {
          this.onClear();
          this._toastService.activate(`${tipoTransporte.changes.descricao} foi alterado com êxito.`);
        }).catch(error => {
          this._toastService.activate(`${error}`, 'Atenção');
        });
    }
  }

  onEdit(tipoTransporte: ITipoTransporte): void {
    this.tipoTransporte = _.clone(tipoTransporte);
    this.editing = true;
  }

  onRemove(tipoTransporte: ITipoTransporte): void {
    if (tipoTransporte.transporte && _.keys(tipoTransporte.transporte).length > 0) {
      this._toastService.activate(`${tipoTransporte.descricao} não pode ser excluído pois está sendo utilizado por 
        ${_.keys(tipoTransporte.transporte).length} cadastros.`);
    } else {
      let msg = `Deseja excluir ${tipoTransporte.descricao} ?`;
      this._modalService.activate(msg).then(responseOK => {
        if (responseOK) {
          this._tipoTransporteService.remove(tipoTransporte)
            .then(data => {
              this._toastService.activate(`${tipoTransporte.descricao} foi removido com êxito.`);
            }).catch(error => {
              this._toastService.activate(`${error}`, 'Atenção');
            });
        }
      });
    }
  }

  onClear(event?: any): void {
    this.editing = false;
    this.tipoTransporte = new TipoTransporte({ descricao: '', icone: '', destaque: '' });
  }

  private isValid(tipoTransporte: ITipoTransporte): boolean {
    return (tipoTransporte.descricao && tipoTransporte.descricao.trim().length > 0);
  }

}
