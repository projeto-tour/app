import { AgendaService } from './agenda.service';
import { MenuDataService } from './menu-data.service';
import { NotificacaoService } from './notificacao.service';
import { PontoInteresseService } from './ponto-interesse.service';
import { PreferenciaUsuarioService } from './preferencia-usuario.service';
import { RotaService } from './rota.service';
import { TipoAgendaService } from './tipo-agenda.service';
import { TipoPontoInteresseService } from './tipo-ponto-interesse.service';
import { TransporteService } from './transporte.service';
import { TutorialDataService } from './tutorial-data.service';
import { UsuarioService } from './usuario.service';

export {
  AgendaService,
  MenuDataService,
  NotificacaoService,
  PontoInteresseService,
  PreferenciaUsuarioService,
  RotaService,
  TipoAgendaService,
  TipoPontoInteresseService,
  TransporteService,
  TutorialDataService,
  UsuarioService
};

export const DATA_PROVIDERS: any[] = [
  AgendaService,
  MenuDataService,
  NotificacaoService,
  PontoInteresseService,
  PreferenciaUsuarioService,
  RotaService,
  TipoAgendaService,
  TipoPontoInteresseService,
  TransporteService,
  TutorialDataService,
  UsuarioService
];
