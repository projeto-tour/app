import { Injectable, bind } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ToastService } from './toast.service';

@Injectable()
export class ExceptionService {

    constructor(private _toastService: ToastService) { }

    catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
        return this.errorHandler(errorResponse);
    };

    errorHandler(error: any) {
        let status = error.status ? `${error.status} - ${error.statusText}` : '';
        let code = error.code ? `${error.code}` : '';
        let message = error.message ? error.message : 'Houve falha na execução desta operação. Por favor, tente novamente mais tarde.';
        let errorResponse = JSON.stringify({message: message, status: status, code: code});
        this._toastService.activate(message);
        console.log('errorHandler: ' + errorResponse);
        // return Observable.throw(errorResponse); // TODO: We should NOT swallow error here.
        return Observable.of();
    }
}

export var exceptionServiceInjectables: Array<any> = [
  bind(ExceptionService).toClass(ExceptionService)
];