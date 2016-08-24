import { Component, Inject }  from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { NavParams, NavController } from 'ionic-angular';

import { keys, find } from 'lodash';

import { AgendaService } from '../../providers/data/agenda.service';
import { TipoAgendaService } from '../../providers/data/tipo-agenda.service';
import {
  GlobalMethodService,
  ValidationService,
  ControlMessagesComponent,
  IAgenda,
  Agenda,
  ITipoAgenda,
  TipoAgenda
} from '../shared';

import { PreferenciaPage } from '../preferencia';
import { RotaPage } from '../rota';

@Component({
  templateUrl: 'build/pages/agenda-detail/agenda-detail.component.html',
  directives: [
    ControlMessagesComponent,
    REACTIVE_FORM_DIRECTIVES
  ]
})
export class AgendaDetailPage {

  titulo: string = 'Agenda';
  agenda: IAgenda;
  tiposDeAgenda: ITipoAgenda[];
  isNovaAgenda: boolean = true;
  form: FormGroup;

  private mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _navCtrl: NavController,
    public _globalMethod: GlobalMethodService,
    public _agendaService: AgendaService,
    public _tipoAgendaService: TipoAgendaService,
    public _formBuilder: FormBuilder) {
    this.titulo = _navParams.data.titulo;
    this.agenda = _navParams.data.agenda;
    this.isNovaAgenda = keys(this.agenda).length <= 0;
    this.configForm(true, false);
    this._tipoAgendaService.tipos.subscribe((tipos: ITipoAgenda[]) => {
      this.tiposDeAgenda = tipos;
      if (this.isNovaAgenda) {
        this.configForm(false, false);
      }
    });
  }

  onSubmit(): void {
    if (this.form.dirty && this.form.valid) {
      if (this.isNovaAgenda) {
        this.criar();
      } else {
        this.atualizar();
      }
    } else if (!this.form.valid) {
      this._globalMethod.mostrarMensagem('Por favor, preencha os campos de formulário corretamente.', this._navCtrl);
    }
  }

  limpar(event): void {
    event.preventDefault();
    this.configForm(false, true);
  }

  private criar() {
    let key = this._agendaService.create(this.form.value);
    if (key) {
      this._tipoAgendaService.setAgenda(this.form.value.tipo_agenda, JSON.parse(`{"${key}": true }`))
        .then(data => {
          this._globalMethod.mostrarMensagem('Dados de agenda foram salvos com êxito.', this._navCtrl);
          this._globalMethod.carregarPagina(RotaPage, key, true, this._navCtrl);
        })
        .catch(this.handleError);
    }
  }

  private atualizar() {
    this._agendaService.update(this.agenda, this.form.value)
      .then(data => {
        this._tipoAgendaService.setAgenda(this.agenda.tipo_agenda, JSON.parse(`{"${this.agenda.$key}": true }`))
          .then(data => {
            this._globalMethod.mostrarMensagem('Dados de agenda foram atualizados com êxito.', this._navCtrl);
            this._globalMethod.carregarPagina(RotaPage, this.agenda.$key, true, this._navCtrl);
          })
          .catch(this.handleError);
      })
      .catch(this.handleError);
  }

  carregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

  private configForm(isInit: boolean, isReset: boolean) {
    if (isInit) {
      this.form = this._formBuilder.group({
        'descricao': [this.agenda ? this.agenda.descricao : '', [Validators.required, Validators.minLength(5)]],
        'data_inicio': [this.agenda ? this.agenda.data_inicio : (new DatePipe()).transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],
        'data_fim': [this.agenda ? this.agenda.data_fim : (new DatePipe()).transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],
        'tipo_agenda': [this.agenda ? this.agenda.tipo_agenda : '', [Validators.required]],
        'distancia': [this.agenda ? this.agenda.distancia : '0 KM'],
        'favorito': [this.agenda ? this.agenda.favorito : false],
        'data_criacao': [this.agenda ? this.agenda.data_criacao : (new DatePipe()).transform(new Date(), 'yyyy-MM-dd HH:mm:ss')]
      });
    } else if (isReset) {
      this.form.controls['descricao'].updateValueAndValidity('');
      this.form.controls['data_inicio'].updateValueAndValidity((new DatePipe()).transform(new Date(), 'yyyy-MM-dd'));
      this.form.controls['data_fim'].updateValueAndValidity((new DatePipe()).transform(new Date(), 'yyyy-MM-dd'));
      this.form.controls['tipo_agenda'].updateValueAndValidity(this.tiposDeAgenda && this.tiposDeAgenda.length > 0 ? this.tiposDeAgenda[0].$key : '');
    } else {
      this.form.controls['descricao'].updateValueAndValidity(this.agenda ? this.agenda.descricao : '');
      this.form.controls['data_inicio'].updateValueAndValidity(this.agenda ? this.agenda.data_inicio : (new DatePipe()).transform(new Date(), 'yyyy-MM-dd'));
      this.form.controls['data_fim'].updateValueAndValidity(this.agenda ? this.agenda.data_fim : (new DatePipe()).transform(new Date(), 'yyyy-MM-dd'));
      this.form.controls['tipo_agenda'].updateValueAndValidity(this.agenda ? this.agenda.tipo_agenda : this.tiposDeAgenda && this.tiposDeAgenda.length > 0 ? this.tiposDeAgenda[0].$key : '');
    }
  }

  private handleError(error: any) {
    this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
  }

}
