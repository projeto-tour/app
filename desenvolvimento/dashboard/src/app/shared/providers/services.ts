import { caracteristicaServiceInjectables } from './caracteristica.service';
import { tipoAgendaServiceInjectables } from './tipo-agenda.service';
import { tipoDadoServiceInjectables } from './tipo-dado.service';
import { tipoPontoInteresseServiceInjectables } from './tipo-ponto-interesse.service';
import { tipoTransporteServiceInjectables } from './tipo-transporte.service';
import { transporteServiceInjectables } from './transporte.service';
import { toastServiceInjectables } from './toast.service';
import { modalServiceInjectables } from './modal.service';
import { entityServiceInjectables } from './entity.service';
import { exceptionServiceInjectables } from './exception.service';
import { progressBarServiceInjectables } from './progress-bar.service';

export * from './caracteristica.service';
export * from './tipo-agenda.service';
export * from './tipo-dado.service';
export * from './tipo-ponto-interesse.service';
export * from './tipo-transporte.service';
export * from './transporte.service';
export * from './toast.service';
export * from './modal.service';
export * from './entity.service';
export * from './exception.service';
export * from './progress-bar.service';

export var APP_DATA_PROVIDERS: Array<any> = [
  caracteristicaServiceInjectables,
  tipoAgendaServiceInjectables,
  tipoDadoServiceInjectables,
  tipoPontoInteresseServiceInjectables,
  tipoTransporteServiceInjectables,
  transporteServiceInjectables,
  toastServiceInjectables,
  modalServiceInjectables,
  entityServiceInjectables,
  exceptionServiceInjectables,
  progressBarServiceInjectables
];
