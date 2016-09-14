import {  PipeTransform, Pipe } from '@angular/core';

import { INotificacao } from '../shared';

@Pipe({
    name: 'notificacaoFilter'
})
export class NotificacaoFilterPipe implements PipeTransform {

    transform(value: INotificacao[], filter: string): INotificacao[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((data: INotificacao) =>
            data.titulo.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }

}
