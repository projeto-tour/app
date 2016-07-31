import { Component, OnInit } from '@angular/core';

import { ToastService } from '../../providers/toast.service';

@Component({
  moduleId: module.id,
  selector: 'partiu-toast',
  templateUrl: 'toast.component.html',
  styleUrls: ['toast.component.css']
})
export class ToastComponent implements OnInit {

  private defaults = {
    title: '',
    message: 'Operação foi realizada com sucesso.'
  };
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
    // console.log(this.message);
    this.toastElement.style.opacity = 1;
    this.toastElement.style.zIndex = 9999;

    window.setTimeout(() => this.hide(), 2500);
  }

  private hide() {
    this.toastElement.style.opacity = 0;
    window.setTimeout(() => this.toastElement.style.zIndex = 0, 400);
  }
}
