import { Component }  from '@angular/core';

import { NavParams, ViewController, AlertController, NavController, ActionSheetController, Platform } from 'ionic-angular';

import { Item } from '../shared';

@Component({
  templateUrl: 'build/pages/bagagem/bagagem.component.html',
})
export class BagagemPage {

  titulo: string = 'Bagagem';
  dados: any;
  bagagem: Item[] = [];
  contador: number = 0;

  private mensagenErro: any;

  constructor(
    public _navParams: NavParams,
    public _viewCtrl: ViewController,
    public _navCtrl: NavController,
    public _platform: Platform,
    public _alertCtrl: AlertController,
    public _actionSheetCtrl: ActionSheetController) {
    this.dados = _navParams.data;
  }

  ionViewLoaded() {
    this.getBagagem();
  }

  ionViewWillEnter() { }

  ionViewDidEnter() {
    this.gerenciarContador();
  }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ionViewWillUnload() { }

  ionViewDidUnload() { }

  salvar(): void {
    this.dismiss();
  }

  incluir(): void {
    let prompt = this._alertCtrl.create({
      title: 'Bagagem',
      message: 'Incluir um novo item na sua bagagem',
      inputs: [
        {
          name: 'item',
          placeholder: 'Ex. Pasta de dente',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancelar clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            this.bagagem.push(new Item({ descricao: data.item, status: false }));
          }
        }
      ]
    });
    prompt.present();
  }

  gerenciarContador(): void {
    this.contador = this.bagagem.filter((item: Item) => item.status === true).length;
  }

  gerenciar(item: Item): void {
    let actionSheet = this._actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Excluir',
          role: 'destructive',
          icon: !this._platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Excluir clicked');
          }
        },
        {
          text: 'Editar',
          icon: !this._platform.is('ios') ? 'create' : null,
          handler: () => {
            this.incluir();
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

  private dismiss() {
    this._viewCtrl.dismiss(this.titulo);
  }

  private getBagagem(): void {
    this.bagagem.push(new Item({ descricao: 'RG', status: false }));
    this.bagagem.push(new Item({ descricao: 'CPF', status: false }));
    this.bagagem.push(new Item({ descricao: 'Passaporte', status: false }));
    this.bagagem.push(new Item({ descricao: 'Câmera', status: false }));
    this.bagagem.push(new Item({ descricao: 'Carregador de celular', status: false }));
    this.bagagem.push(new Item({ descricao: 'Celular', status: false }));
    this.bagagem.push(new Item({ descricao: 'Escova de dentes', status: false }));
    this.bagagem.push(new Item({ descricao: 'Fones de ouvido', status: false }));
    this.bagagem.push(new Item({ descricao: 'Notebook', status: false }));
    this.bagagem.push(new Item({ descricao: 'Ipad/Tablet', status: false }));
    this.bagagem.push(new Item({ descricao: 'Óculos de sol', status: false }));
    this.bagagem.push(new Item({ descricao: 'Perfume', status: false }));
    this.bagagem.push(new Item({ descricao: 'Plugues adaptadores', status: false }));
  }

}
