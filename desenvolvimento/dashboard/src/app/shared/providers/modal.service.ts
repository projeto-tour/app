import { Injectable, bind } from '@angular/core';

@Injectable()
export class ModalService {
  activate: (message?: string, title?: string) => Promise<boolean>;
}

export var modalServiceInjectables: Array<any> = [
  bind(ModalService).toClass(ModalService)
];