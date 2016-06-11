import { PipeTransform, Pipe } from '@angular/core';

import { AgendaView } from './';

@Pipe({
    name: 'agendaFilter'
})
export class AgendaFilterPipe implements PipeTransform {

    transform(value: AgendaView[], filter: string): AgendaView[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((data: AgendaView) =>
            data.descricao.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }

}