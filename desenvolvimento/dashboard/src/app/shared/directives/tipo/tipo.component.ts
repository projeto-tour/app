//Underscore imports
/// <reference path="../../../../../typings/globals/underscore/index.d.ts" />
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgForm, NgModel }    from '@angular/common';
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES }    from '@angular/forms';

import { FirebaseListObservable } from 'angularfire2';

import * as _ from 'underscore';

import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

import { Tipo, ITipo, Autofocus } from '../../';
import { ToastService } from '../../providers/toast.service';
import { ModalService } from '../../providers/modal.service';
import { EntityService } from '../../providers/entity.service';

import { CanComponentDeactivate } from '../../../routing';

@Component({
    moduleId: module.id,
    selector: 'partiu-tipo',
    templateUrl: 'tipo.component.html',
    styleUrls: ['tipo.component.css'],
    directives: [
        FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES,
        MD_GRID_LIST_DIRECTIVES,
        MD_BUTTON_DIRECTIVES,
        MD_ICON_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        MD_INPUT_DIRECTIVES,
        MdIcon,
        Autofocus
    ],
    providers: [
        MdIconRegistry
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TipoComponent implements OnInit {

    @Input() tipos: FirebaseListObservable<ITipo[]>;
    @Input() showIcone: boolean = true;
    @Input() showDestaque: boolean = true;

    @Output() create: EventEmitter<any> = new EventEmitter(false);
    @Output() remove: EventEmitter<any> = new EventEmitter(false);
    @Output() update: EventEmitter<any> = new EventEmitter(false);

    tipo: Tipo = new Tipo();
    listTipos: ITipo[] = [];
    editing: boolean = false;
    message: string = '';

    constructor(
        private _modalService: ModalService,
        private _toastService: ToastService,
        private _entityService: EntityService) {
    }

    ngOnInit() {
        this.tipos.subscribe((data: ITipo[]) => {
            this.listTipos = data;
        });
        this.clear();
    }

    submit(tipo: ITipo): void {
        if (tipo.descricao && tipo.descricao.trim().length) {
            if (this.editing) {
                this.update.emit({ tipo: this.tipo, changes: tipo });
                this._toastService.activate(`${tipo.descricao} foi alterado com successo.`);
            } else if (_.findWhere(this.listTipos, { descricao: tipo.descricao })) {
                this._toastService.activate(`${tipo.descricao} já existe.`);
            } else {
                this.create.emit(new Tipo(tipo));
                this._toastService.activate(`${tipo.descricao} foi cadastrado com successo.`);
            }
        }
        this.clear();
    }

    edit(tipo: ITipo): void {
        this.tipo = this._entityService.clone(tipo);
        this.editing = true;
    }

    delete(tipo: ITipo): void {
        if (tipo.relacionamento && _.keys(tipo.relacionamento).length > 0) {
            this._toastService.activate(`${tipo.descricao} não pode ser excluído pois já foi atribuído à ${_.keys(tipo.relacionamento).length} cadastros.`);
        } else {
            let msg = `Deseja realmente excluir ${tipo.descricao} ?`;
            this._modalService.activate(msg).then(responseOK => {
                if (responseOK) {
                    this.remove.emit(tipo);
                    this._toastService.activate(`${tipo.descricao} foi removido com successo.`);
                }
            });
        }
    }

    clear(): boolean {
        this.editing = false;
        this.tipo = new Tipo();
        this.tipo.icone = null;
        this.tipo.destaque = null;
        return false;
    }

}