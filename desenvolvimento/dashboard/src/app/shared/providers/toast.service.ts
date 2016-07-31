import { Injectable, bind } from '@angular/core';

@Injectable()
export class ToastService {
  activate: (message?: string, title?: string) => void;
}

export var toastServiceInjectables: Array<any> = [
  bind(ToastService).toClass(ToastService)
];
