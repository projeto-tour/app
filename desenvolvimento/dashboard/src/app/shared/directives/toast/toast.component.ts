import { Component, OnInit } from '@angular/core';

import { ToastService } from './toast.service';

@Component({
  selector: 'partiu-toast',
  templateUrl: 'toast.component.html',
  styleUrls: ['toast.component.css']
})
export class ToastComponent implements OnInit {

  private defaults = { title: '', message: 'Operação foi realizada com sucesso.' };
  private toastElement: any;

  title: string;
  message: string;

  constructor(private _toastService: ToastService) {
    _toastService.activate = this.activate.bind(this);
  }

  activate(message = this.defaults.message, title = this.defaults.title) {
    this.title = title;
    this.message = message;
    this.show();
  }

  ngOnInit() {
    this.toastElement = document.getElementById('toast');
  }

  private show() {
    this.toastElement.text = this.message;
    this.toastElement.open();
  }

}
