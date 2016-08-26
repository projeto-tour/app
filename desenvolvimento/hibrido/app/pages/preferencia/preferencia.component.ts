import { Component }  from '@angular/core';

import { App, NavParams, ViewController, NavController, Platform, NavOptions } from 'ionic-angular';

import {
  GlobalMethodService,
  IPontoInteresse,
  ITipoPontoInteresse,
  IPreferenciaUsuario
} from '../shared';
import { PontoInteresseService } from '../../providers/data/ponto-interesse.service';
import { PreferenciaUsuarioService } from '../../providers/data/preferencia-usuario.service';
import { TipoPontoInteresseService } from '../../providers/data/tipo-ponto-interesse.service';

import { groupBy, get, keys, clone, find } from 'lodash';

@Component({
  templateUrl: 'build/pages/preferencia/preferencia.component.html'
})
export class PreferenciaPage {

  titulo: string = 'Prefêrencias';
  segment: string = 'preferencia';

  pontosInteresse: any = {};
  preferencias: any = {};
  tipoPontoInteresse: ITipoPontoInteresse;
  preferenciaUsuario: IPreferenciaUsuario;

  dados: any;
  mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _viewCtrl: ViewController,
    public _navCtrl: NavController,
    public _pontoInteresseService: PontoInteresseService,
    public _preferenciaUsuarioService: PreferenciaUsuarioService,
    public _tipoPontoInteresseService: TipoPontoInteresseService,
    public _globalMethod: GlobalMethodService) {
    this.dados = _navParams.data;
    console.log(JSON.stringify(this.dados));
    _pontoInteresseService.tipos.subscribe((data: IPontoInteresse[]) => {
      this.pontosInteresse = groupBy(data, 'tipo_ponto_interesse');
    });
    _preferenciaUsuarioService.tipos.subscribe((data: IPreferenciaUsuario[]) => {
      this.preferencias = groupBy(data, 'tipo_ponto_interesse');
    });
  }

  onSelectTipo(tipoPontoInteresse: ITipoPontoInteresse): void {
    this.tipoPontoInteresse = clone(tipoPontoInteresse);
    if (keys(this.getPreferencias(tipoPontoInteresse.$key)).length <= 0) {
      this.add();
    } else {
      this.preferenciaUsuario = <IPreferenciaUsuario>clone(find(this.getPreferencias(this.tipoPontoInteresse.$key), { 'tipo_ponto_interesse': this.tipoPontoInteresse.$key }));
      this.remove();
    }
  }

  onSelectPonto(pontoInteresse: IPontoInteresse): void {
    if (get(this.dados, 'confirmar')) {
      this.confirmar(clone(pontoInteresse));
    }
  }

  getPontosInteresse(tipo: string): any {
    return get(this.pontosInteresse, tipo);
  }

  getPreferencias(tipo: string): any {
    return get(this.preferencias, tipo);
  }

  onDismiss(): void {
    this.dismiss();
  }

  private add(): void {
    let key = this._preferenciaUsuarioService.create({ tipo_ponto_interesse: this.tipoPontoInteresse.$key });
    if (key) {
      this._tipoPontoInteresseService.setPreferenciasUsuario(this.tipoPontoInteresse.$key, JSON.parse(`{"${key}": true }`))
        .then(data => {
          this._globalMethod.mostrarMensagem(`O ponto de interesse ${this.tipoPontoInteresse.descricao} foi adicionado aos favoritos com êxito.`, this._navCtrl);
        })
        .catch(this.handleError);
    }
  }

  private remove(): void {
    this._preferenciaUsuarioService.remove(this.preferenciaUsuario).then(data => {
      this._tipoPontoInteresseService.setPreferenciasUsuario(this.tipoPontoInteresse.$key, JSON.parse(`{"${this.preferenciaUsuario.$key}": null }`))
        .then(data => {
          this._globalMethod.mostrarMensagem(`O ponto de interesse ${this.tipoPontoInteresse.descricao} foi removido dos favoritos com êxito.`, this._navCtrl);
        })
        .catch(this.handleError);
    });
  }

  private confirmar(pontoInteresse: IPontoInteresse) {
    this.dismiss(pontoInteresse, {}, {});
  }

  private dismiss(data?: any, role?: any, navOptions?: NavOptions) {
    this._viewCtrl.dismiss(data, role, navOptions);
  }

  private handleError(error: any) {
    this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
  }

}
