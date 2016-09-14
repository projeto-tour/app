import { Component }  from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { NavParams, NavController } from 'ionic-angular';

import { keys, clone, isMatch } from 'lodash';

import { AgendaService } from '../../providers/data/agenda.service';
import { TipoAgendaService } from '../../providers/data/tipo-agenda.service';
import {
  GlobalMethodService,
  ControlMessagesComponent,
  IAgenda,
  ITipoAgenda
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
  listDeAgenda: ITipoAgenda[];
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
    this.agenda = clone(_navParams.data.agenda);
    this.isNovaAgenda = keys(this.agenda).length <= 0;
    this.configForm(true, false);
    this._tipoAgendaService.list.subscribe((list: ITipoAgenda[]) => {
      this.listDeAgenda = list;
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

  onLimpar(event): void {
    event.preventDefault();
    this.configForm(false, true);
  }

  onCarregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }

  private criar() {
    let key = this._agendaService.create(this.form.value);
    if (key) {
      this._tipoAgendaService.setAgenda(this.form.value.tipo_agenda, JSON.parse(`{"${key}": true }`))
        .then(data => {
          return this._globalMethod.mostrarMensagem('Dados de agenda foram salvos com êxito.', this._navCtrl);
        }).then(data => {
          this._globalMethod.carregarPagina(RotaPage, key, true, this._navCtrl);
        }).catch(this.handleError);
    }
  }

  private atualizar() {
    this._agendaService.update(this.agenda, this.form.value)
      .then(data => {
        return this._tipoAgendaService.setAgenda(this.agenda.tipo_agenda, JSON.parse(`{"${this.agenda.$key}": true }`));
      }).then(() => {
        if (!isMatch(<IAgenda>this._navParams.data.agenda, { 'tipo_agenda': this.agenda.tipo_agenda })) {
          return this._tipoAgendaService.setAgenda((<IAgenda>this._navParams.data.agenda).tipo_agenda, JSON.parse(`{"${this.agenda.$key}": null }`));
        }
      }).then(data => {
        return this._globalMethod.mostrarMensagem('Dados de agenda foram atualizados com êxito.', this._navCtrl);
      }).then(data => {
        this._globalMethod.carregarPagina(RotaPage, this.agenda, true, this._navCtrl);
      }).catch(this.handleError);
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
      this.form.controls['tipo_agenda'].updateValueAndValidity(this.listDeAgenda && this.listDeAgenda.length > 0 ? this.listDeAgenda[0].$key : '');
    } else {
      this.form.controls['descricao'].updateValueAndValidity(this.agenda ? this.agenda.descricao : '');
      this.form.controls['data_inicio'].updateValueAndValidity(this.agenda ? this.agenda.data_inicio : (new DatePipe()).transform(new Date(), 'yyyy-MM-dd'));
      this.form.controls['data_fim'].updateValueAndValidity(this.agenda ? this.agenda.data_fim : (new DatePipe()).transform(new Date(), 'yyyy-MM-dd'));
      this.form.controls['tipo_agenda'].updateValueAndValidity(this.agenda ? this.agenda.tipo_agenda : this.listDeAgenda && this.listDeAgenda.length > 0 ? this.listDeAgenda[0].$key : '');
    }
  }

  private handleError(error: any) {
    this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
  }

}
