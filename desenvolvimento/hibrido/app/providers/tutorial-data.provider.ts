import { Injectable } from '@angular/core';

import { Tutorial } from '../pages/tutorial/tutorial.model';

@Injectable()
export class TutorialDataProvider {

    constructor() { }

    getTutorials(): Tutorial[] {
        return [
            {
                index: 1,
                titulo: 'Welcome to <b>ICA</b>',
                descricao: 'The <b>Ionic Conference App</b> is a practical preview of the Ionic Framework in action, and a demonstration of proper code use.',
                url: 'img/ica-slidebox-img-1.png',
            },
            {
                index: 2,
                titulo: 'What is Ionic?',
                descricao: '<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.',
                url: 'img/ica-slidebox-img-2.png',
            },
            {
                index: 3,
                titulo: 'What is Ionic Platform?',
                descricao: 'The <b>Ionic Platform</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.',
                url: 'img/ica-slidebox-img-3.png',
            }
        ];
    }
}