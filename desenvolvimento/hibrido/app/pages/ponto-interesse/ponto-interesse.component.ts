import { Component }  from '@angular/core';

import {
  App,
  NavParams,
  ViewController,
  NavController,
  Platform,
  NavOptions,
  ActionSheetController,
  AlertController
} from 'ionic-angular';
import { InAppBrowser }  from 'ionic-native';

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
  templateUrl: 'build/pages/ponto-interesse/ponto-interesse.component.html'
})
export class PontoInteressePage {

  titulo: string = 'Pontos Interesse';
  segment: string = 'all';
  isMarcarTodosComoFavorito: boolean = true;
  listTipoPontoInteresse: ITipoPontoInteresse[] = [];
  pontosInteresse: any = {};
  preferencias: any = {};

  dados: any;
  mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _viewCtrl: ViewController,
    public _navCtrl: NavController,
    public _platform: Platform,
    public _alertCtrl: AlertController,
    public _actionSheetCtrl: ActionSheetController,
    public _pontoInteresseService: PontoInteresseService,
    public _preferenciaUsuarioService: PreferenciaUsuarioService,
    public _tipoPontoInteresseService: TipoPontoInteresseService,
    public _globalMethod: GlobalMethodService) {
    this.dados = _navParams.data;
    _pontoInteresseService.list.subscribe((data: IPontoInteresse[]) => {
      this.pontosInteresse = groupBy(data, 'tipo_ponto_interesse');
    });
    _preferenciaUsuarioService.list.subscribe((data: IPreferenciaUsuario[]) => {
      this.preferencias = groupBy(data, 'tipo_ponto_interesse');
    });
    _tipoPontoInteresseService.list.subscribe((data: ITipoPontoInteresse[]) => {
      this.listTipoPontoInteresse = data;
    });
  }

  onMarcarTodosComoFavorito(): void {
    if (this.isMarcarTodosComoFavorito) {
      this.isMarcarTodosComoFavorito = false;
      this.listTipoPontoInteresse.forEach(data => {
        if (keys(this.getPreferencias(data.$key)).length <= 0) {
          this.favorite(clone(data));
        }
      });
    } else {
      this.isMarcarTodosComoFavorito = true;
      this.listTipoPontoInteresse.forEach(data => {
        if (keys(this.getPreferencias(data.$key)).length > 0) {
          this.unFavorite(
            clone(data),
            <IPreferenciaUsuario>clone(find(this.getPreferencias(data.$key), { 'tipo_ponto_interesse': data.$key }))
          );
        }
      });
    }
  }

  onSelectTipoPontoInteresse(tipoPontoInteresse: ITipoPontoInteresse): void {
    if (keys(this.getPreferencias(tipoPontoInteresse.$key)).length <= 0) {
      this.favorite(clone(tipoPontoInteresse));
    } else {
      this.unFavorite(
        clone(tipoPontoInteresse),
        <IPreferenciaUsuario>clone(find(this.getPreferencias(tipoPontoInteresse.$key), { 'tipo_ponto_interesse': tipoPontoInteresse.$key }))
      );
    }
  }

  onSelectPontoInteresse(pontoInteresse: IPontoInteresse): void {
    if (get(this.dados, 'confirmar')) {
      this.confirmar(clone(pontoInteresse));
    }
  }

  onGerenciarPontoInteresse(pontoInteresse: IPontoInteresse): void {
    let actionSheet = this._actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Excluir',
          role: 'destructive',
          icon: !this._platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.excluirPontoInteresse(pontoInteresse);
          }
        },
        {
          text: 'Editar',
          icon: !this._platform.is('ios') ? 'create' : null,
          handler: () => {
            // -- TODO
            console.log('Editar clicked');
          }
        },
        {
          text: 'Compartilhar',
          icon: !this._platform.is('ios') ? 'share' : null,
          handler: () => {
            // -- TODO
            console.log('Compartilhar clicked');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: !this._platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancelar clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  onLoadMap(tipoPontoInteresse: ITipoPontoInteresse): void {
    new InAppBrowser(`http://maps.google.com/maps?q=${tipoPontoInteresse.descricao}`, '_blank');
  }

  onDeleteTipoPontoInteresse(tipoPontoInteresse: ITipoPontoInteresse): void {
    let confirm = this._alertCtrl.create({
      title: 'Excluir',
      message: `Deseja excluir pontos de interesse de ${tipoPontoInteresse.descricao}?`,
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Não clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            // -- TODO
            console.log('Sim clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  onDismiss(): void {
    this.dismiss();
  }

  getPontosInteresse(tipo: string): any {
    return get(this.pontosInteresse, tipo);
  }

  getPreferencias(tipo: string): any {
    return get(this.preferencias, tipo);
  }

  private favorite(tipoPontoInteresse: ITipoPontoInteresse): void {
    let key = this._preferenciaUsuarioService.create({ tipo_ponto_interesse: tipoPontoInteresse.$key });
    if (key) {
      this._tipoPontoInteresseService.setPreferenciasUsuario(tipoPontoInteresse.$key, JSON.parse(`{"${key}": true }`))
        .then(data => {
          this._globalMethod.mostrarMensagem(`O ponto de interesse foi adicionado aos favoritos com êxito.`, this._navCtrl);
        }).catch(this.handleError);
    }
  }

  private unFavorite(tipoPontoInteresse: ITipoPontoInteresse, preferenciaUsuario: IPreferenciaUsuario): void {
    this._preferenciaUsuarioService.remove(preferenciaUsuario)
      .then(data => {
        return this._tipoPontoInteresseService.setPreferenciasUsuario(tipoPontoInteresse.$key, JSON.parse(`{"${preferenciaUsuario.$key}": null }`));
      }).then(data => {
        this._globalMethod.mostrarMensagem(`O ponto de interesse foi removido dos favoritos com êxito.`, this._navCtrl);
      }).catch(this.handleError);
  }

  private excluirPontoInteresse(pontoInteresse: IPontoInteresse): void {
    let confirm = this._alertCtrl.create({
      title: 'Excluir',
      message: `Deseja excluir ${pontoInteresse.descricao}?`,
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Não clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            // -- TODO
            console.log('Sim clicked');
          }
        }
      ]
    });
    confirm.present();
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
