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

  editing: boolean = false;
  transporte: ITransporte = new Transporte();
  tipoTransporte: string;
  listTransporte: ITransporte[] = [];
  listTipoTransporte: ITipoTransporte[] = [];

  constructor(
    private _authService: AuthService,
    private _modalService: ModalService,
    private _toastService: ToastService,
    public _transporteService: TransporteService,
    public _tipoTransporteService: TipoTransporteService) {
    // this.reset();
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
      if (this.editing) {
        this._transporteService.update(this.transporte, transporte)
          .then(() => {
            this.updates(this.transporte.$key, true, transporte.tipo_transporte,
              `${this.transporte.descricao} foi alterado com êxito.`
            );
          }).catch(error => {
            this._toastService.activate(`${error}`, 'Atenção');
          });
      } else if (_.findWhere(this.listTransporte, { descricao: transporte.descricao })) {
        this._toastService.activate(`${transporte.descricao} já existe.`);
      } else {
        let key = this._transporteService.create(new Transporte(transporte));
        if (key) {
          this.updates(key, true, transporte.tipo_transporte,
            `${transporte.descricao} foi cadastrado com êxito.`
          );
        } else {
          this._toastService.activate(`Erro ao cadastrar ${transporte.descricao}.`);
        }
      }
    } else {
      this._toastService.activate('Por favor, preencha os campos de formulário corretamente.');
    }
  }

  onClear(event): void {
    event.preventDefault();
    this.editing = false;
    this.reset();
  }

  onEdit(transporte: ITransporte): void {
    this.transporte = _.clone(transporte);
    this.tipoTransporte = _.clone(transporte.tipo_transporte);
    this.editing = true;
  }

  onRemove(transporte: ITransporte): void {
    if (transporte.rota && _.keys(transporte.rota).length > 0) {
      this._toastService.activate(`${transporte.descricao} não pode ser excluído pois está sendo utilizado por
        ${_.keys(transporte.rota).length} cadastros.`);
    } else {
      let msg = `Deseja excluir ${transporte.descricao} ?`;
      this._modalService.activate(msg).then(responseOK => {
        if (responseOK) {
          this._transporteService.remove(transporte)
            .then(data => {
              return this._tipoTransporteService.updates(`/${transporte.tipo_transporte}/transporte`,
                JSON.parse(`{"${transporte.$key}": null}`));
            }).then(() => {
              this._toastService.activate(`${transporte.descricao} foi removido com êxito.`);
            }).catch(error => {
              this._toastService.activate(`${error}`, 'Atenção');
            });
        }
      });
    }
  }

  getDescricao(tipoTransporte: string): string {
    let option = _.findWhere(this.listTipoTransporte, { $key: tipoTransporte });
    return _.has(option, 'descricao') ? option.descricao : '';
  }

  private updates(key: string, value: boolean, tipoTransporte: string, msg: string): void {
    this._tipoTransporteService.updates(`/${tipoTransporte}/transporte`, JSON.parse(`{"${key}": ${value}}`))
      .then(() => {
        if (this.editing && !_.isMatch(this.transporte, { 'tipo_transporte': this.tipoTransporte })) {
          return this._tipoTransporteService.updates(
            `/${this.tipoTransporte}/transporte`, JSON.parse(`{"${key}": null}`)
          );
        }
        return;
      }).then(() => {
        this.reset();
        this._toastService.activate(msg);
      }).catch(error => {
        this._toastService.activate(`${error}`, 'Atenção');
      });
  }

  private isValid(transporte: ITransporte): boolean {
    return (transporte.descricao && transporte.descricao.trim().length > 0)
      && (transporte.tipo_transporte && transporte.tipo_transporte.length > 0);
  }

  private reset(): void {
    this.editing = false;
    this.transporte = new Transporte({ descricao: '', tipo_transporte: this.listTipoTransporte[0].$key });
    this.tipoTransporte = '';
  }

}
