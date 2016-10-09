import { Component }  from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { NavParams, NavController, ViewController } from 'ionic-angular';

// import { keys, clone, isMatch, lt } from 'lodash';
import _ from 'lodash';
import moment from 'moment';

import { GlobalMethodService } from '../../providers/global/global-method.service';
import { AgendaService } from '../../providers/data/agenda.service';
import { TipoAgendaService } from '../../providers/data/tipo-agenda.service';

import { PreferenciaPage } from '../preferencia';
import { RotaPage } from '../rota';

import { IAgenda, ITipoAgenda } from '../shared';

@Component({
  selector: 'page-agenda-detail',
  templateUrl: 'agenda-detail.component.html'
})
export class AgendaDetailPage {

  titulo: string = 'Agenda';
  agenda: IAgenda;
  listDeAgenda: ITipoAgenda[];
  isNovaAgenda: boolean = true;
  form: FormGroup;
  now: string = moment().format('YYYY-MM-DD');

  private mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _navCtrl: NavController,
    public _viewCtrl: ViewController,
    public _globalMethod: GlobalMethodService,
    public _agendaService: AgendaService,
    public _tipoAgendaService: TipoAgendaService,
    public _formBuilder: FormBuilder) {
    this.titulo = _navParams.data.titulo;
    this.agenda = _.clone(_navParams.data.agenda);
    this.isNovaAgenda = _.keys(this.agenda).length <= 0;
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

  onChangeDataInicio(event): void {
    if (_.lt(this.form.value.data_fim, this.form.value.data_inicio)) {
      (<FormControl>this.form.controls['data_fim']).setValue(_.clone(this.form.value.data_inicio));
    }
  }

  private criar() {
    let key = this._agendaService.create(this.form.value);
    if (key) {
      this._tipoAgendaService.setAgenda(this.form.value.tipo_agenda, JSON.parse(`{"${key}": true }`))
        .then(data => {
          return this._globalMethod.mostrarMensagem('Dados de agenda foram salvos com êxito.', this._navCtrl);
        }).then(data => {
          this._globalMethod.carregarPagina(RotaPage, key, true, this._navCtrl);
        }).then(data => {
          this.dismiss();
        }).catch(this.handleError);
    }
  }

  private atualizar() {
    this._agendaService.update(this.agenda, this.form.value)
      .then(data => {
        return this._tipoAgendaService.setAgenda(this.agenda.tipo_agenda, JSON.parse(`{"${this.agenda.$key}": true }`));
      }).then(() => {
        if (!_.isMatch(<IAgenda>this._navParams.data.agenda, { 'tipo_agenda': this.agenda.tipo_agenda })) {
          return this._tipoAgendaService.setAgenda((<IAgenda>this._navParams.data.agenda).tipo_agenda, JSON.parse(`{"${this.agenda.$key}": null }`));
        }
        return;
      }).then(data => {
        return this._globalMethod.mostrarMensagem('Dados de agenda foram atualizados com êxito.', this._navCtrl);
      }).then(data => {
        return this._globalMethod.carregarPagina(RotaPage, this.agenda, true, this._navCtrl);
      }).then(data => {
        this.dismiss();
      }).catch(this.handleError);
  }

  private configForm(isInit: boolean, isReset: boolean) {
    if (isInit) {
      this.form = this._formBuilder.group({
        'descricao': [this.agenda ? this.agenda.descricao : '', [Validators.required, Validators.minLength(5)]],
        'data_inicio': [this.agenda ? this.agenda.data_inicio : _.clone(this.now), [Validators.required]],
        'data_fim': [this.agenda ? this.agenda.data_fim : _.clone(this.now), [Validators.required]],
        'tipo_agenda': [this.agenda ? this.agenda.tipo_agenda : '', [Validators.required]],
        'distancia': [this.agenda ? this.agenda.distancia : '0 KM'],
        'favorito': [this.agenda ? this.agenda.favorito : false],
        'data_criacao': [this.agenda ? this.agenda.data_criacao : moment().format('YYYY-MM-DD HH:MM:SS')]
      });
    } else if (isReset) {
      (<FormControl>this.form.controls['descricao']).setValue('');
      (<FormControl>this.form.controls['data_inicio']).setValue(_.clone(this.now));
      (<FormControl>this.form.controls['data_fim']).setValue(_.clone(this.now));
      (<FormControl>this.form.controls['tipo_agenda']).setValue(this.listDeAgenda && this.listDeAgenda.length > 0 ? this.listDeAgenda[0].$key : '');
    } else {
      (<FormControl>this.form.controls['descricao']).setValue(this.agenda ? this.agenda.descricao : '');
      (<FormControl>this.form.controls['data_inicio']).setValue(this.agenda ? this.agenda.data_inicio : _.clone(this.now));
      (<FormControl>this.form.controls['data_fim']).setValue(this.agenda ? this.agenda.data_fim : _.clone(this.now));
      (<FormControl>this.form.controls['tipo_agenda']).setValue(this.agenda ? this.agenda.tipo_agenda : this.listDeAgenda && this.listDeAgenda.length > 0 ? this.listDeAgenda[0].$key : '');
    }
  }

  private dismiss() {
    this._viewCtrl.dismiss();
  }

  private handleError(error: any) {
    this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
  }

}
