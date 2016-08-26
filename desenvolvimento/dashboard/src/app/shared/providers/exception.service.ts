import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ToastService } from '../directives/toast/toast.service';

@Injectable()
export class ExceptionService {

    constructor(private _toastService: ToastService) { }

    catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
        return this.errorHandler(errorResponse);
    };

    errorHandler(error: any) {
        let message = error.message ? error.message : 'Houve falha na execução desta operação. Por favor, tente novamente mais tarde.';
        this._toastService.activate(message);
        return Observable.of();
    }
}
