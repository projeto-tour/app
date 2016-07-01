import { AgendaService } from './agenda.service';
import { TipoAgendaService } from './tipo-agenda.service';

export { AgendaService, TipoAgendaService };
export { Agenda, IAgenda } from './agenda.model';
export { TipoAgenda, ITipoAgenda } from './tipo-agenda.model';

export const AGENDAS_PROVIDERS: any[] = [
  AgendaService,
  TipoAgendaService
];