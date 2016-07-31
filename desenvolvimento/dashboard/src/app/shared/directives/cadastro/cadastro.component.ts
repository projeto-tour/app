import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';

import { FirebaseListObservable } from 'angularfire2';

import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

import {
    AutofocusDirective,
    MdlDirective
} from '../../';

@Component({
    moduleId: module.id,
    selector: 'partiu-cadastro',
    templateUrl: 'cadastro.component.html',
    styleUrls: ['cadastro.component.css'],
    directives: [
        MD_GRID_LIST_DIRECTIVES,
        MD_BUTTON_DIRECTIVES,
        MD_ICON_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        MD_INPUT_DIRECTIVES,
        FORM_DIRECTIVES,
        MdIcon,
        AutofocusDirective,
        MdlDirective
    ],
    providers: [
        MdIconRegistry
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CadastroComponent implements OnInit {

    @Input() items: FirebaseListObservable<any[]>;
    @Input() item: any = {};

    @Input() editing: boolean = false;

    @Input() showIcone: boolean = true;
    @Input() showDestaque: boolean = true;

    @Output() create: EventEmitter<any> = new EventEmitter(false);
    @Output() remove: EventEmitter<any> = new EventEmitter(false);
    @Output() update: EventEmitter<any> = new EventEmitter(false);
    @Output() edit: EventEmitter<any> = new EventEmitter(false);
    @Output() clear: EventEmitter<any> = new EventEmitter(false);

    constructor() { }

    ngOnInit() { }

    submit(item: any): void {
        if (this.editing) {
            this.update.emit({ item: this.item, changes: item });
        } else {
            this.create.emit(item);
        }
    }

    reset(): boolean {
        this.clear.emit(true);
        return false;
    }

}
