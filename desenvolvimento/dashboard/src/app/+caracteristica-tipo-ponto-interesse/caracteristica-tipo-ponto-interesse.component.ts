// Underscore imports
/// <reference path="../../../typings/globals/underscore/index.d.ts" />
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import * as _ from 'underscore';

import { AuthService } from '../shared/providers/auth';
import { ModalService } from '../shared/directives/modal';
import { ToastService } from '../shared/directives/toast';
import {
    CaracteristicaTipoPontoInteresseService,
    TipoPontoInteresseService,
    CaracteristicaService
} from '../shared/providers';

import {
    ICaracteristicaTipoPontoInteresse,
    CaracteristicaTipoPontoInteresse,
    ITipoPontoInteresse,
    ICaracteristica
} from '../shared/models';

@Component({
    selector: 'partiu-caracteristica-tipo-ponto-interesse',
    templateUrl: 'caracteristica-tipo-ponto-interesse.component.html',
    styleUrls: ['caracteristica-tipo-ponto-interesse.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaracteristicaTipoPontoInteresseComponent implements OnInit {

    editing: boolean = false;
    caracteristicaTipoPontoInteresse: ICaracteristicaTipoPontoInteresse = new CaracteristicaTipoPontoInteresse();
    tipoPontoInteresse: string;
    caracteristica: string;
    listCaracteristicaTipoPontoInteresse: ICaracteristicaTipoPontoInteresse[] = [];
    listTipoPontoInteresse: ITipoPontoInteresse[] = [];
    listCaracteristica: ICaracteristica[] = [];

    constructor(
        private _authService: AuthService,
        private _modalService: ModalService,
        private _toastService: ToastService,
        public _tipoPontoInteresseService: TipoPontoInteresseService,
        public _caracteristicaService: CaracteristicaService,
        public _caracteristicaTipoPontoInteresseService: CaracteristicaTipoPontoInteresseService) {
        // this.reset();
    }

    ngOnInit() {
        this._authService.title = 'Característica de Tipo de Ponto Interesse';
        this._caracteristicaTipoPontoInteresseService.list.subscribe((data: ICaracteristicaTipoPontoInteresse[]) => {
            this.listCaracteristicaTipoPontoInteresse = data;
        });
        this._tipoPontoInteresseService.list.subscribe((data: ITipoPontoInteresse[]) => {
            this.listTipoPontoInteresse = data;
        });
        this._caracteristicaService.list.subscribe((data: ICaracteristica[]) => {
            this.listCaracteristica = data;
        });
    }

    onSubmit(caracteristicaTipoPontoInteresse: ICaracteristicaTipoPontoInteresse): void {
        if (this.isValid(caracteristicaTipoPontoInteresse)) {
            if (this.editing) {
                this.update(caracteristicaTipoPontoInteresse);
            } else {
                this.create(caracteristicaTipoPontoInteresse);
            }
        } else {
            this._toastService.activate('Por favor, preencha os campos de formulário corretamente.');
        }
    }

    onRemove(caracteristicaTipoPontoInteresse: ICaracteristicaTipoPontoInteresse): void {
        let msg = `Deseja excluir ${caracteristicaTipoPontoInteresse.valor} ?`;
        this._modalService.activate(msg).then(responseOK => {
            if (responseOK) {
                this._caracteristicaTipoPontoInteresseService.remove(caracteristicaTipoPontoInteresse)
                    .then(data => {
                        return this._tipoPontoInteresseService.updates(
                            `/${caracteristicaTipoPontoInteresse.tipo_ponto_interesse}/caracteristica_tipo_ponto_interesse`,
                            JSON.parse(`{"${caracteristicaTipoPontoInteresse.$key}": null}`)
                        );
                    }).then(() => {
                        return this._caracteristicaService.updates(
                            `/${caracteristicaTipoPontoInteresse.caracteristica}/caracteristica_tipo_ponto_interesse`,
                            JSON.parse(`{"${caracteristicaTipoPontoInteresse.$key}": null}`)
                        );
                    }).then(() => {
                        this._toastService.activate(`${caracteristicaTipoPontoInteresse.valor} foi removido com êxito.`);
                    }).catch(error => {
                        this._toastService.activate(`Error: ${error}`);
                    });
            }
        });
    }

    onEdit(caracteristicaTipoPontoInteresse: ICaracteristicaTipoPontoInteresse): void {
        this.caracteristicaTipoPontoInteresse = _.clone(caracteristicaTipoPontoInteresse);
        this.caracteristica = _.clone(caracteristicaTipoPontoInteresse.caracteristica);
        this.tipoPontoInteresse = _.clone(caracteristicaTipoPontoInteresse.tipo_ponto_interesse);
        this.editing = true;
    }

    onClear(event): void {
        event.preventDefault();
        this.editing = false;
        this.reset();
    }

    create(caracteristicaTipoPontoInteresse: ICaracteristicaTipoPontoInteresse): void {
        if (_.findWhere(this.listCaracteristicaTipoPontoInteresse, { descricao: caracteristicaTipoPontoInteresse.valor })) {
            this._toastService.activate(`${caracteristicaTipoPontoInteresse.valor} já existe.`);
        } else {
            let key = this._caracteristicaTipoPontoInteresseService.create(
                new CaracteristicaTipoPontoInteresse(caracteristicaTipoPontoInteresse)
            );
            if (key) {
                this.updates(
                    key,
                    true,
                    caracteristicaTipoPontoInteresse.tipo_ponto_interesse,
                    caracteristicaTipoPontoInteresse.caracteristica,
                    `${caracteristicaTipoPontoInteresse.valor} foi cadastrado com êxito.`
                );
            } else {
                this._toastService.activate(`Erro ao cadastrar ${caracteristicaTipoPontoInteresse.valor}.`);
            }
        }
    }

    update(caracteristicaTipoPontoInteresse: ICaracteristicaTipoPontoInteresse): void {
        this._caracteristicaTipoPontoInteresseService.update(this.caracteristicaTipoPontoInteresse, caracteristicaTipoPontoInteresse)
            .then(data => {
                this.updates(
                    this.caracteristicaTipoPontoInteresse.$key,
                    true,
                    caracteristicaTipoPontoInteresse.tipo_ponto_interesse,
                    caracteristicaTipoPontoInteresse.caracteristica,
                    `${caracteristicaTipoPontoInteresse.valor} foi alterado com êxito.`
                );
            }).catch(error => {
                this._toastService.activate(`${error}`, 'Atenção');
            });
    }

    getDescricaoTipoPontoInteresse(tipoPontoInteresse: string): string {
        let option = _.findWhere(this.listTipoPontoInteresse, { $key: tipoPontoInteresse });
        return _.has(option, 'descricao') ? option.descricao : '';
    }

    getDescricaoCaracteristica(caracteristica: string): string {
        let option = _.findWhere(this.listCaracteristica, { $key: caracteristica });
        return _.has(option, 'descricao') ? option.descricao : '';
    }

    private updates(key: string, value: boolean, tipoPontoInteresse: string, caracteristica: string, msg: string): void {
        this._tipoPontoInteresseService.updates(
            `/${tipoPontoInteresse}/caracteristica_tipo_ponto_interesse`, JSON.parse(`{"${key}": ${value}}`)
        ).then(() => {
            return this._caracteristicaService.updates(
                `/${caracteristica}/caracteristica_tipo_ponto_interesse`, JSON.parse(`{"${key}": ${value}}`)
            );
        }).then(() => {
            if (this.editing && !_.isMatch(this.caracteristicaTipoPontoInteresse, { 'tipo_ponto_interesse': this.tipoPontoInteresse })) {
                return this._tipoPontoInteresseService.updates(
                    `/${this.tipoPontoInteresse}/caracteristica_tipo_ponto_interesse`, JSON.parse(`{"${key}": null}`)
                );
            }
        }).then(() => {
            if (this.editing && !_.isMatch(this.caracteristicaTipoPontoInteresse, { 'caracteristica': this.caracteristica })) {
                return this._caracteristicaService.updates(
                    `/${this.caracteristica}/caracteristica_tipo_ponto_interesse`, JSON.parse(`{"${key}": null}`)
                );
            }
        }).then(() => {
            this.reset();
            this._toastService.activate(msg);
        }).catch(error => {
            this._toastService.activate(`${error}`, 'Atenção');
        });
    }

    private isValid(caracteristicaTipoPontoInteresse: ICaracteristicaTipoPontoInteresse): boolean {
        return (caracteristicaTipoPontoInteresse.valor && caracteristicaTipoPontoInteresse.valor.trim().length > 0)
            && (caracteristicaTipoPontoInteresse.tipo_ponto_interesse && caracteristicaTipoPontoInteresse.tipo_ponto_interesse.length > 0)
            && (caracteristicaTipoPontoInteresse.caracteristica && caracteristicaTipoPontoInteresse.caracteristica.length > 0)
            && (caracteristicaTipoPontoInteresse.obrigatorio);
    }

    private reset(): void {
        this.editing = false;
        this.caracteristicaTipoPontoInteresse = new CaracteristicaTipoPontoInteresse({
            valor: '',
            tipo_ponto_interesse: this.listTipoPontoInteresse[0].$key,
            caracteristica: this.listCaracteristica[0].$key,
            obrigatorio: true
        });
        this.caracteristica = null;
        this.tipoPontoInteresse = null;
    }

}
