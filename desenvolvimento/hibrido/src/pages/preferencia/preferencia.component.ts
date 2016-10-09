import { Component }  from '@angular/core';

import {
  NavParams,
  ViewController,
  NavController,
  NavOptions
} from 'ionic-angular';

// import { groupBy, get, keys, clone, find } from 'lodash';
import _ from 'lodash';

import { GlobalMethodService } from '../../providers/global/global-method.service';
import { PreferenciaUsuarioService } from '../../providers/data/preferencia-usuario.service';
import { TipoPontoInteresseService } from '../../providers/data/tipo-ponto-interesse.service';

import { ITipoPontoInteresse, IPreferenciaUsuario } from '../shared';

@Component({
  selector: 'page-preferencia',
  templateUrl: 'preferencia.component.html'
})
export class PreferenciaPage {

  titulo: string = 'Prefêrencias';
  preferencias: any = {};
  tipoPontoInteresse: ITipoPontoInteresse;
  preferenciaUsuario: IPreferenciaUsuario;

  dados: any;
  mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _viewCtrl: ViewController,
    public _navCtrl: NavController,
    public _preferenciaUsuarioService: PreferenciaUsuarioService,
    public _tipoPontoInteresseService: TipoPontoInteresseService,
    public _globalMethod: GlobalMethodService) {
    this.dados = _navParams.data;
    _preferenciaUsuarioService.list.subscribe((data: IPreferenciaUsuario[]) => {
      this.preferencias = _.groupBy(data, 'tipo_ponto_interesse');
    });
  }

  onSelectTipoPontoInteresse(tipoPontoInteresse: ITipoPontoInteresse): void {
    if (_.keys(this.getPreferencias(tipoPontoInteresse.$key)).length <= 0) {
      this.favorite(_.clone(tipoPontoInteresse));
    } else {
      this.unFavorite(
        _.clone(tipoPontoInteresse),
        <IPreferenciaUsuario>_.clone(_.find(this.getPreferencias(tipoPontoInteresse.$key), { 'tipo_ponto_interesse': tipoPontoInteresse.$key }))
      );
    }
  }

  onDismiss(): void {
    this.dismiss();
  }

  getPreferencias(tipo: string): any {
    return _.get(this.preferencias, tipo);
  }

  private favorite(tipoPontoInteresse: ITipoPontoInteresse): void {
    let key = this._preferenciaUsuarioService.create({ tipo_ponto_interesse: tipoPontoInteresse.$key });
    if (key) {
      this._tipoPontoInteresseService.setPreferenciasUsuario(tipoPontoInteresse.$key, JSON.parse(`{"${key}": true }`))
        .then(data => {
          this._globalMethod.mostrarMensagem(`O ponto de interesse ${tipoPontoInteresse.descricao} foi adicionado aos favoritos com êxito.`, this._navCtrl);
        }).catch(this.handleError);
    }
  }

  private unFavorite(tipoPontoInteresse: ITipoPontoInteresse, preferenciaUsuario: IPreferenciaUsuario): void {
    this._preferenciaUsuarioService.remove(preferenciaUsuario)
      .then(data => {
        return this._tipoPontoInteresseService.setPreferenciasUsuario(tipoPontoInteresse.$key, JSON.parse(`{"${preferenciaUsuario.$key}": null }`));
      }).then(data => {
        this._globalMethod.mostrarMensagem(`O ponto de interesse ${tipoPontoInteresse.descricao} foi removido dos favoritos com êxito.`, this._navCtrl);
      }).catch(this.handleError);
  }

  private dismiss(data?: any, role?: any, navOptions?: NavOptions) {
    this._viewCtrl.dismiss(data, role, navOptions);
  }

  private handleError(error: any) {
    this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl);
  }

}
