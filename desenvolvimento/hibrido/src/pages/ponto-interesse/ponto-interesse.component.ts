import { Component }  from '@angular/core';

import {
  NavParams,
  ViewController,
  NavController,
  Platform,
  NavOptions,
  ActionSheetController,
  AlertController
} from 'ionic-angular';
import { InAppBrowser }  from 'ionic-native';

// import { groupBy, get, clone, find, keys } from 'lodash';
import _ from 'lodash';

import { GlobalMethodService } from '../../providers/global/global-method.service';
import { PontoInteresseService } from '../../providers/data/ponto-interesse.service';
import { PreferenciaUsuarioService } from '../../providers/data/preferencia-usuario.service';
import { TipoPontoInteresseService } from '../../providers/data/tipo-ponto-interesse.service';

import { IPontoInteresse, ITipoPontoInteresse, IPreferenciaUsuario } from '../shared';

@Component({
  selector: 'page-ponto-interesse',
  templateUrl: 'ponto-interesse.component.html'
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
      this.pontosInteresse = _.groupBy(data, 'tipo_ponto_interesse');
    });
    _preferenciaUsuarioService.list.subscribe((data: IPreferenciaUsuario[]) => {
      this.preferencias = _.groupBy(data, 'tipo_ponto_interesse');
    });
    _tipoPontoInteresseService.list.subscribe((data: ITipoPontoInteresse[]) => {
      this.listTipoPontoInteresse = data;
    });
  }

  onMarcarTodosComoFavorito(): void {
    if (this.isMarcarTodosComoFavorito) {
      this.isMarcarTodosComoFavorito = false;
      this.listTipoPontoInteresse.forEach(data => {
        if (_.keys(this.getPreferencias(data.$key)).length <= 0) {
          this.favorite(_.clone(data));
        }
      });
    } else {
      this.isMarcarTodosComoFavorito = true;
      this.listTipoPontoInteresse.forEach(data => {
        if (_.keys(this.getPreferencias(data.$key)).length > 0) {
          this.unFavorite(
            _.clone(data), <
            IPreferenciaUsuario>_.clone(_.find(this.getPreferencias(data.$key), {
              'tipo_ponto_interesse': data.$key
            }))
          );
        }
      });
    }
  }

  onSelectTipoPontoInteresse(tipoPontoInteresse: ITipoPontoInteresse): void {
    if (_.keys(this.getPreferencias(tipoPontoInteresse.$key)).length <= 0) {
      this.favorite(_.clone(tipoPontoInteresse));
    } else {
      this.unFavorite(
        _.clone(tipoPontoInteresse), <
        IPreferenciaUsuario>_.clone(_.find(this.getPreferencias(tipoPontoInteresse.$key), {
          'tipo_ponto_interesse': tipoPontoInteresse.$key
        }))
      );
    }
  }

  onSelectPontoInteresse(pontoInteresse: IPontoInteresse): void {
    if (_.get(this.dados, 'confirmar')) {
      this.confirmar(_.clone(pontoInteresse));
    }
  }

  onGerenciarPontoInteresse(pontoInteresse: IPontoInteresse): void {
    let actionSheet = this._actionSheetCtrl.create({
      title: 'Opções',
      buttons: [{
        text: 'Excluir',
        role: 'destructive',
        icon: !this._platform.is('ios') ? 'trash' : null,
        handler: () => {
          this.excluirPontoInteresse(pontoInteresse);
        }
      }, {
          text: 'Editar',
          icon: !this._platform.is('ios') ? 'create' : null,
          handler: () => {
            this.editarPontoInteresse(pontoInteresse);
          }
        },
        // {
        //   text: 'Compartilhar',
        //   icon: !this._platform.is('ios') ? 'share' : null,
        //   handler: () => {
        //     // -- TODO
        //     console.log('Compartilhar clicked');
        //   }
        // },
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
      buttons: [{
        text: 'Não',
        handler: () => {
          console.log('Não clicked');
        }
      }, {
          text: 'Sim',
          handler: () => {
            // -- TODO
            console.log('Sim clicked');
          }
        }]
    });
    confirm.present();
  }

  onDismiss(): void {
    this.dismiss();
  }

  getPontosInteresse(tipo: string): any {
    return _.get(this.pontosInteresse, tipo);
  }

  getPreferencias(tipo: string): any {
    return _.get(this.preferencias, tipo);
  }

  private favorite(tipoPontoInteresse: ITipoPontoInteresse): void {
    let key = this._preferenciaUsuarioService.create({
      tipo_ponto_interesse: tipoPontoInteresse.$key
    });
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

  private editarPontoInteresse(pontoInteresse: IPontoInteresse) {
    let prompt = this._alertCtrl.create({
      title: 'Ponto de Interesse',
      message: pontoInteresse.descricao,
      inputs: [
        {
          name: 'observacao',
          label: 'Observação',
          value: pontoInteresse.observacao,
          placeholder: 'Observação'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked: ', JSON.stringify(data));
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            pontoInteresse.observacao = data.observacao;
            this.editar(pontoInteresse);
          }
        }
      ]
    });
    prompt.present();
  }

  private excluirPontoInteresse(pontoInteresse: IPontoInteresse): void {
    if (_.keys(_.get(pontoInteresse, 'rota', '')).length > 0) {
      this._globalMethod.mostrarMensagem(`O ponto de interesse ${pontoInteresse.descricao} possui rotas e não pode ser excluído.`, this._navCtrl);
    } else {
      // this.excluir(pontoInteresse);
      let confirm = this._alertCtrl.create({
        title: 'Excluir',
        message: `Deseja excluir ${pontoInteresse.descricao}?`,
        buttons: [{
          text: 'Não',
          handler: () => {
            console.log('Não clicked');
          }
        }, {
            text: 'Sim',
            handler: () => {
              this.excluir(pontoInteresse);
            }
          }]
      });
      confirm.present();
    }
  }

  private editar(pontoInteresse: IPontoInteresse): void {
    this._pontoInteresseService.update(pontoInteresse.$key, {
        descricao: pontoInteresse.descricao,
        localizacao: pontoInteresse.localizacao,
        observacao: pontoInteresse.observacao,
        tipo_ponto_interesse: pontoInteresse.tipo_ponto_interesse
      }).then(data => {
        this._globalMethod.mostrarMensagem(`Dodos do ponto de interesse ${pontoInteresse.descricao} foram salvos com êxito.`, this._navCtrl);
      }).catch(this.handleError);
  }

  private excluir(pontoInteresse: IPontoInteresse): void {
    this._tipoPontoInteresseService.setPontoInteresse(pontoInteresse.tipo_ponto_interesse, JSON.parse(`{"${pontoInteresse.$key}": null }`))
      .then(data => {
        return this._pontoInteresseService.remove(pontoInteresse.$key);
      }).then(data => {
        this._globalMethod.mostrarMensagem(`O ponto de interesse ${pontoInteresse.descricao} foram excluído com êxito.`, this._navCtrl);
      }).catch(this.handleError);
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
