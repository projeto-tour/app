import {  PipeTransform, Pipe } from '@angular/core';

import { Notificacao } from './';

@Pipe({
    name: 'notificacaoFilter'
})
export class NotificacaoFilterPipe implements PipeTransform {

    transform(value: Notificacao[], filter: string): Notificacao[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((data: Notificacao) =>
            data.titulo.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }

}