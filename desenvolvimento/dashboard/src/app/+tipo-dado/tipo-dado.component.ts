import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import * as _ from 'underscore';

import { AuthService } from '../shared/providers/auth';
import { ModalService } from '../shared/directives/modal';
import { ToastService } from '../shared/directives/toast';
import { TipoDadoService } from '../shared/providers';

import { ITipoDado, TipoDado } from '../shared/models';

@Component({
  selector: 'partiu-tipo-dado',
  templateUrl: 'tipo-dado.component.html',
  styleUrls: ['tipo-dado.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TipoDadoComponent implements OnInit {

  editing: boolean = false;
  tipoDado: ITipoDado = new TipoDado();
  listTipoDado: ITipoDado[] = [];
  showIcone: boolean = false;
  showDestaque: boolean = false;

  constructor(
    private _authService: AuthService,
    private _modalService: ModalService,
    private _toastService: ToastService,
    private _tipoDadoService: TipoDadoService) {
    // this.onClear();
  }

  ngOnInit() {
    this._authService.title = 'Tipo de Dado';
    this._tipoDadoService.list.subscribe((data: ITipoDado[]) => {
      this.listTipoDado = data;
    });
  }

  onCreate(tipoDado: ITipoDado): void {
    if (this.isValid(tipoDado)) {
      if (_.findWhere(this.listTipoDado, { descricao: tipoDado.descricao })) {
        this._toastService.activate(`${tipoDado.descricao} já existe.`);
      } else {
        let key = this._tipoDadoService.create(new TipoDado(tipoDado));
        if (key) {
          this.onClear();
          this._toastService.activate(`${tipoDado.descricao} foi cadastrado com êxito.`);
        } else {
          this._toastService.activate(`Erro ao cadastrar ${tipoDado.descricao}.`);
        }
      }
    } else {
      this._toastService.activate('Por favor, preencha os campos de formulário corretamente.');
    }
  }

  onUpdate(tipoDado: any): void {
    if (this.isValid(tipoDado.changes)) {
      this._tipoDadoService.update(tipoDado.item, tipoDado.changes)
        .then(data => {
          this.onClear();
          this._toastService.activate(`${tipoDado.changes.descricao} foi alterado com êxito.`);
        }).catch(error => {
          this._toastService.activate(`${error}`, 'Atenção');
        });
    }
  }

  onEdit(tipoDado: ITipoDado): void {
    this.tipoDado = _.clone(tipoDado);
    this.editing = true;
  }

  onRemove(tipoDado: ITipoDado): void {
    if (tipoDado.caracteristica && _.keys(tipoDado.caracteristica).length > 0) {
      this._toastService.activate(`${tipoDado.descricao} não pode ser excluído pois está sendo utilizado por 
        ${_.keys(tipoDado.caracteristica).length} cadastros.`);
    } else {
      let msg = `Deseja excluir ${tipoDado.descricao} ?`;
      this._modalService.activate(msg).then(responseOK => {
        if (responseOK) {
          this._tipoDadoService.remove(tipoDado)
            .then(data => {
              this._toastService.activate(`${tipoDado.descricao} foi removido com êxito.`);
            }).catch(error => {
              this._toastService.activate(`${error}`, 'Atenção');
            });
        }
      });
    }
  }

  onClear(event?: any): void {
    this.editing = false;
    this.tipoDado = new TipoDado({ descricao: '', icone: '', destaque: '' });
  }

  private isValid(tipoDado: ITipoDado): boolean {
    return (tipoDado.descricao && tipoDado.descricao.trim().length > 0);
  }

}
