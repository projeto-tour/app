import { PipeTransform, Pipe } from '@angular/core';

import { Agenda } from '../../providers/agendas';

@Pipe({
    name: 'agendaFilter'
})
export class AgendaFilterPipe implements PipeTransform {

    transform(value: Agenda[], filter: string): Agenda[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((data: Agenda) =>
            data.descricao.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }

}