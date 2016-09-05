// Underscore imports
/// <reference path="../../../typings/globals/underscore/index.d.ts" />
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as _ from 'underscore';

import { AuthService } from '../shared/providers/auth';
import { ModalService } from '../shared/directives/modal';
import { ToastService } from '../shared/directives/toast';
import { AvaliacaoService } from '../shared/providers';

import { IAvaliacao, Avaliacao } from '../shared/models';

@Component({
  selector: 'partiu-avaliacao',
  templateUrl: 'avaliacao.component.html',
  styleUrls: ['avaliacao.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvaliacaoComponent implements OnInit {

  form: FormGroup;
  editing: boolean = false;
  avaliacao: IAvaliacao = new Avaliacao();
  listAvaliacao: IAvaliacao[] = [];

  constructor(
    private _authService: AuthService,
    private _modalService: ModalService,
    private _toastService: ToastService,
    public _avaliacaoService: AvaliacaoService) {
    this.configForm();
  }

  ngOnInit() {
    this._authService.title = 'Avaliação';
    this._avaliacaoService.list.subscribe((data: IAvaliacao[]) => {
      this.listAvaliacao = data;
    });
  }

  onSubmit(): void {
    if (this.form.dirty && this.form.valid) {
      if (this.editing) {
        this.update(this.form.value);
      } else {
        this.create(this.form.value);
      }
    } else if (!this.form.valid) {
      this._toastService.activate('Por favor, preencha os campos de formulário corretamente.');
    }
  }

  onClear(event): void {
    event.preventDefault();
    this.editing = false;
    this.resetForm();
  }

  onEdit(avaliacao: IAvaliacao): void {
    this.avaliacao = _.clone(avaliacao);
    this.editing = true;
    this.resetForm(this.avaliacao);
  }

  onRemove(avaliacao: IAvaliacao): void {
    if (avaliacao.avaliacao_usuario && _.keys(avaliacao.avaliacao_usuario).length > 0) {
      this._toastService.activate(`${avaliacao.descricao} não pode ser excluído pois está sendo utilizado por 
        ${_.keys(avaliacao.avaliacao_usuario).length} cadastros.`);
    } else {
      let msg = `Deseja excluir ${avaliacao.descricao} ?`;
      this._modalService.activate(msg).then(responseOK => {
        if (responseOK) {
          this._avaliacaoService.remove(avaliacao)
            .then(data => {
              this._toastService.activate(`${avaliacao.descricao} foi removido com êxito.`);
            }).catch(error => {
              this._toastService.activate(`${error}`, 'Atenção');
            });
        }
      });
    }
  }

  onRatingClicked(rate: any): void {
    this.form.get('nota').setValue(<number>rate || 1);
  }

  create(avaliacao: IAvaliacao): void {
    if (_.findWhere(this.listAvaliacao, { descricao: avaliacao.descricao })) {
      this._toastService.activate(`${avaliacao.descricao} já existe.`);
    } else if (_.findWhere(this.listAvaliacao, { nota: avaliacao.nota })) {
      this._toastService.activate(`A nota ${avaliacao.nota} já foi utilizado.`);
    } else {
      let key = this._avaliacaoService.create(new Avaliacao(avaliacao));
      this._toastService.activate(key ? `${avaliacao.descricao} foi cadastrado com êxito.`
        : `Erro ao cadastrar ${avaliacao.descricao}.`);
    }
    this.resetForm();
  }

  update(avaliacao: IAvaliacao): void {
    this._avaliacaoService.update(this.avaliacao, avaliacao).then(data => {
      this.resetForm();
      this._toastService.activate(`${avaliacao.descricao} foi alterado com êxito.`);
    });
  }

  private resetForm(avaliacao?: Avaliacao): void {
    this.form.reset();
    this.form.get('descricao').setValue(avaliacao && avaliacao.descricao || '');
    this.form.get('nota').setValue(avaliacao && avaliacao.nota || 1);
  }

  private configForm(): void {
    this.form = new FormGroup({
      'descricao': new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      'nota': new FormControl(1, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(2),
      ])
    });
  }

}
