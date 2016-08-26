import { Component, OnInit } from '@angular/core';

import { ModalService } from './modal.service';

// const KEY_ESC = 27;

@Component({
  selector: 'partiu-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css']
})
export class ModalComponent implements OnInit {

  title: string;
  message: string;
  okText: string;
  cancelText: string;
  negativeOnClick: (e: any) => void;
  positiveOnClick: (e: any) => void;

  private defaults = {
    title: 'Confirmação',
    message: 'Deseja realmente descartar as alterações?',
    cancelText: 'Cancelar',
    okText: 'OK'
  };
  private modalElement: any;
  // private cancelButton: any;
  // private okButton: any;

  constructor(private _modalService: ModalService) {
    _modalService.activate = this.activate.bind(this);
  }

  activate(message = this.defaults.message, title = this.defaults.title) {
    this.title = title;
    this.message = message;
    this.okText = this.defaults.okText;
    this.cancelText = this.defaults.cancelText;

    let promise = new Promise<boolean>((resolve, reject) => {
      this.negativeOnClick = (e: any) => resolve(false);
      this.positiveOnClick = (e: any) => resolve(true);
      this.show();
    });

    return promise;
  }

  ngOnInit() {
    this.modalElement = document.getElementById('confirmationModal');
  }

  onCancel(event) {
    this.hide(event);
    this.negativeOnClick(event);
  }

  onOk(event) {
    this.hide(event);
    this.positiveOnClick(event);
  }

  private show() {
    this.modalElement.positionTarget = this;
    this.modalElement.open();
  }

  private hide(event) {
    event.preventDefault();
    this.modalElement.close();
  }

}
