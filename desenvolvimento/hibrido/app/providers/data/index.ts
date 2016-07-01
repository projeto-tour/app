import { MenuDataService } from './menu-data.service';
import { TutorialDataService } from './tutorial-data.service';

export { MenuDataService, TutorialDataService };
export { IMenu, IMenuItem } from './menu.model';
export { ITutorial } from './tutorial.model';

export const DATA_PROVIDERS: any[] = [
  MenuDataService,
  TutorialDataService
];