import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2';

import * as _ from 'underscore';

@Component({
    selector: 'partiu-cadastro',
    templateUrl: 'cadastro.component.html',
    styleUrls: ['cadastro.component.css'],
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

    onSubmit(item: any): void {
        if (this.editing) {
            this.update.emit({ item: this.item, changes: item });
        } else {
            this.create.emit(item);
        }
    }

    onEdit(item: any): void {
      this.item = _.clone(item);
      this.editing = true;
      // this.edit.emit(item);
    }

    onRemove(item: any): void {
      this.remove.emit(item);
    }

    onClear(event): void {
        event.preventDefault();
        this.clear.emit(true);
    }

}
