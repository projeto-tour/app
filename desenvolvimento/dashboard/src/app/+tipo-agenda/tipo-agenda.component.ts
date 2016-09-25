import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import * as _ from 'underscore';

import { AuthService } from '../shared/providers/auth';
import { ModalService } from '../shared/directives/modal';
import { ToastService } from '../shared/directives/toast';
import { TipoAgendaService } from '../shared/providers';

import { ITipoAgenda, TipoAgenda } from '../shared/models';

@Component({
  selector: 'partiu-tipo-agenda',
  templateUrl: 'tipo-agenda.component.html',
  styleUrls: ['tipo-agenda.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TipoAgendaComponent implements OnInit {

  editing: boolean = false;
  tipoAgenda: ITipoAgenda = new TipoAgenda();
  listTipoAgenda: ITipoAgenda[] = [];
  showIcone: boolean = true;
  showDestaque: boolean = true;

  constructor(
    private _authService: AuthService,
    private _modalService: ModalService,
    private _toastService: ToastService,
    private _tipoAgendaService: TipoAgendaService) {
    // this.onClear();
  }

  ngOnInit() {
    this._authService.title = 'Tipo de Agenda';
    this._tipoAgendaService.list.subscribe((data: ITipoAgenda[]) => {
      this.listTipoAgenda = data;
    });
  }

  onCreate(tipoAgenda: ITipoAgenda): void {
    if (this.isValid(tipoAgenda)) {
      if (_.findWhere(this.listTipoAgenda, { descricao: tipoAgenda.descricao })) {
        this._toastService.activate(`${tipoAgenda.descricao} já existe.`);
      } else {
        let key = this._tipoAgendaService.create(new TipoAgenda(tipoAgenda));
        if (key) {
          this.onClear();
          this._toastService.activate(`${tipoAgenda.descricao} foi cadastrado com êxito.`);
        } else {
          this._toastService.activate(`Erro ao cadastrar ${tipoAgenda.descricao}.`);
        }
      }
    } else {
      this._toastService.activate('Por favor, preencha os campos de formulário corretamente.');
    }
  }

  onUpdate(tipoAgenda: any): void {
    if (this.isValid(tipoAgenda.changes)) {
      this._tipoAgendaService.update(tipoAgenda.item, tipoAgenda.changes)
        .then(data => {
          this.onClear();
          this._toastService.activate(`${tipoAgenda.changes.descricao} foi alterado com êxito.`);
        }).catch(error => {
          this._toastService.activate(`${error}`, 'Atenção');
        });
    }
  }

  onEdit(tipoAgenda: ITipoAgenda): void {
    this.tipoAgenda = _.clone(tipoAgenda);
    this.editing = true;
  }

  onRemove(tipoAgenda: ITipoAgenda): void {
    if (tipoAgenda.agenda && _.keys(tipoAgenda.agenda).length > 0) {
      this._toastService.activate(`${tipoAgenda.descricao} não pode ser excluído pois está sendo utilizado por 
        ${_.keys(tipoAgenda.agenda).length} cadastros.`);
    } else {
      let msg = `Deseja excluir ${tipoAgenda.descricao} ?`;
      this._modalService.activate(msg).then(responseOK => {
        if (responseOK) {
          this._tipoAgendaService.remove(tipoAgenda)
            .then(data => {
              this._toastService.activate(`${tipoAgenda.descricao} foi removido com êxito.`);
            }).catch(error => {
              this._toastService.activate(`${error}`, 'Atenção');
            });
        }
      });
    }
  }

  onClear(event?: any): void {
    this.editing = false;
    this.tipoAgenda = new TipoAgenda({ descricao: '', icone: '', destaque: '' });
  }

  private isValid(tipoAgenda: ITipoAgenda): boolean {
    return (tipoAgenda.descricao && tipoAgenda.descricao.trim().length > 0);
  }

}
