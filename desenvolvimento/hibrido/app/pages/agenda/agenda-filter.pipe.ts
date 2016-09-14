import { PipeTransform, Pipe } from '@angular/core';

import { IAgenda } from '../shared';

@Pipe({
    name: 'agendaFilter'
})
export class AgendaFilterPipe implements PipeTransform {

    transform(value: IAgenda[], filter: string): IAgenda[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((data: IAgenda) =>
            data.descricao.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }

}
