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

  editing: boolean = false;
  tipoPontoInteresse: ITipoPontoInteresse = new TipoPontoInteresse();
  listTipoPontoInteresse: ITipoPontoInteresse[] = [];
  showIcone: boolean = true;
  showDestaque: boolean = true;

  constructor(
    private _authService: AuthService,
    private _modalService: ModalService,
    private _toastService: ToastService,
    private _tipoPontoInteresseService: TipoPontoInteresseService) {
    // this.onClear();
  }

  ngOnInit() {
    this._authService.title = 'Tipo de Ponto de Interesse';
    this._tipoPontoInteresseService.list.subscribe((data: ITipoPontoInteresse[]) => {
      this.listTipoPontoInteresse = data;
    });
  }

  onCreate(tipoPontoInteresse: ITipoPontoInteresse): void {
    if (this.isValid(tipoPontoInteresse)) {
      if (_.findWhere(this.listTipoPontoInteresse, { descricao: tipoPontoInteresse.descricao })) {
        this._toastService.activate(`${tipoPontoInteresse.descricao} já existe.`);
      } else {
        let key = this._tipoPontoInteresseService.create(new TipoPontoInteresse(tipoPontoInteresse));
        if (key) {
          this.onClear();
          this._toastService.activate(`${tipoPontoInteresse.descricao} foi cadastrado com êxito.`);
        } else {
          this._toastService.activate(`Erro ao cadastrar ${tipoPontoInteresse.descricao}.`);
        }
      }
    } else {
      this._toastService.activate('Por favor, preencha os campos de formulário corretamente.');
    }
  }

  onUpdate(tipoPontoInteresse: any): void {
    if (this.isValid(tipoPontoInteresse.changes)) {
      this._tipoPontoInteresseService.update(tipoPontoInteresse.item, tipoPontoInteresse.changes)
        .then(data => {
          this.onClear();
          this._toastService.activate(`${tipoPontoInteresse.changes.descricao} foi alterado com êxito.`);
        }).catch(error => {
          this._toastService.activate(`${error}`, 'Atenção');
        });
    }
  }

  onEdit(tipoPontoInteresse: ITipoPontoInteresse): void {
    this.tipoPontoInteresse = _.clone(tipoPontoInteresse);
    this.editing = true;
  }

  onRemove(tipoPontoInteresse: ITipoPontoInteresse): void {
    if ((tipoPontoInteresse.preferencias_usuario && _.keys(tipoPontoInteresse.preferencias_usuario).length > 0)
      || (tipoPontoInteresse.caracteristica_tipo_ponto_interesse
        && _.keys(tipoPontoInteresse.caracteristica_tipo_ponto_interesse).length > 0)) {
      this._toastService.activate(
        `${tipoPontoInteresse.descricao} não pode ser excluído pois está sendo utilizado por 
        ${_.keys(tipoPontoInteresse.preferencias_usuario).length
        + _.keys(tipoPontoInteresse.caracteristica_tipo_ponto_interesse).length} cadastros.`
      );
    } else {
      let msg = `Deseja excluir ${tipoPontoInteresse.descricao} ?`;
      this._modalService.activate(msg).then(responseOK => {
        if (responseOK) {
          this._tipoPontoInteresseService.remove(tipoPontoInteresse)
            .then(data => {
              this._toastService.activate(`${tipoPontoInteresse.descricao} foi removido com êxito.`);
            }).catch(error => {
              this._toastService.activate(`${error}`, 'Atenção');
            });
        }
      });
    }
  }

  onClear(event?: any): void {
    this.editing = false;
    this.tipoPontoInteresse = new TipoPontoInteresse({ descricao: '', icone: '', destaque: '' });
  }

  private isValid(tipoPontoInteresse: ITipoPontoInteresse): boolean {
    return (tipoPontoInteresse.descricao && tipoPontoInteresse.descricao.trim().length > 0);
  }

}
