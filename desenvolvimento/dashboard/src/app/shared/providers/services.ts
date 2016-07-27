import { tipoAgendaServiceInjectables } from './tipo-agenda.service';
import { toastServiceInjectables } from './toast.service';
import { modalServiceInjectables } from './modal.service';
import { entityServiceInjectables } from './entity.service';
import { exceptionServiceInjectables } from './exception.service';
import { progressBarServiceInjectables } from './progress-bar.service';

export * from './tipo-agenda.service';
export * from './toast.service';
export * from './modal.service';
export * from './entity.service';
export * from './exception.service';
export * from './progress-bar.service';

export var APP_DATA_PROVIDERS: Array<any> = [
  tipoAgendaServiceInjectables,
  toastServiceInjectables,
  modalServiceInjectables,
  entityServiceInjectables,
  exceptionServiceInjectables,
  progressBarServiceInjectables
];
