import { tipoAgendaServiceInjectables } from './tipo-agenda.service';
import { toastServiceInjectables } from './toast.service';
import { modalServiceInjectables } from './modal.service';
import { entityServiceInjectables } from './entity.service';

export * from './tipo-agenda.service';
export * from './toast.service';
export * from './modal.service';
export * from './entity.service';

export var APP_DATA_PROVIDERS: Array<any> = [
  tipoAgendaServiceInjectables,
  toastServiceInjectables,
  modalServiceInjectables,
  entityServiceInjectables
];
