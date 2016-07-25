import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgForm, NgModel }    from '@angular/common';

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
export class TipoComponent implements OnInit, CanComponentDeactivate {

    @Input() tipos: ITipo[] = [];
    @Input() placeholder: string;
    @Input() maxLength: number;

    @Output() create: EventEmitter<any> = new EventEmitter(false);
    @Output() remove: EventEmitter<any> = new EventEmitter(false);
    @Output() update: EventEmitter<any> = new EventEmitter(false);

    tipo: Tipo = new Tipo('');
    editing: boolean = false;
    message: string = '';

    constructor(
        private _modalService: ModalService,
        private _toastService: ToastService,
        private _entityService: EntityService) {
    }

    ngOnInit() { }

    canDeactivate() {
        return this._modalService.activate();
    }

    submit(tipo: ITipo): void {
        if (tipo.descricao.trim().length) {
            this.tipo.descricao = tipo.descricao;
            if (this.editing) {
                this.update.emit(this.tipo);
                this._toastService.activate(`Tipo [ ${tipo.descricao} ] foi alterado com successo.`);
            } else {
                this.create.emit(this.tipo);
                this._toastService.activate(`Tipo [ ${tipo.descricao} ] foi cadastrado com successo.`);
            }
        }
        this.clear();
    }

    edit(tipo: ITipo): void {
        this.tipo = this._entityService.clone(tipo);
        this.editing = true;
    }

    delete(tipo: ITipo): void {
        let msg = `Deseja realmente excluir [ ${tipo.descricao} ] ?`;
        this._modalService.activate(msg).then(responseOK => {
            if (responseOK) {
                this.remove.emit(tipo);
                this._toastService.activate(`Tipo [ ${tipo.descricao} ] foi removido com successo.`);
            }
        });
    }

    clear(): void {
        this.editing = false;
        this.tipo = new Tipo('');
    }

    private isDirty() {
        return this.tipo.descricao.trim().length > 0;
    }

}