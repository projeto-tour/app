import { Component }  from '@angular/core';

import { ViewController } from 'ionic-angular';

import { ITutorial } from '../shared';

@Component({
  templateUrl: 'build/pages/tutorial/tutorial.component.html'
})
export class TutorialPage {

  titulo: string = 'Tutorial';
  tutorials: ITutorial[] = [];

  constructor(
    public _viewCtrl: ViewController) {
  }

  ionViewLoaded() {
    this.getTutorials();
  }

  dismiss() {
    this._viewCtrl.dismiss(this.titulo);
  }

  private getTutorials(): void {
    this.tutorials = [
            {
                index: 1,
                titulo: 'Faça login',
                descricao: 'Utilize suas credenciais <b>Google</b> ou faça o cadastro para começar organizar toda a experiência de sua viagem',
                url: 'img/login2.svg',
            },
            {
                index: 2,
                titulo: 'Adicione<br/>suas agendas',
                descricao: 'Com o <b>Partiu!</b> adicionar, gerenciar e compartilhar suas agendas de viagem ficou muito fácil.',
                url: 'img/calendar2.svg',
            },
            { 
                index: 3,
                titulo: 'Pontos de interesse',
                descricao: 'Adicione os pontos de interesse que deseja visitar durante seu percurso e mantenha sua agenda mais organizada.',
                url: 'img/placeholder2.svg',
            },
            {
                index: 4,
                titulo: 'Informe </br>suas rotas',
                descricao: 'Você pode adicionar cada uma de suas <b>rotas</b> nas agendas, registrando sua viagem do início ao fim.',
                url: 'img/route2.svg',
            },
            {
                index: 5,
                titulo: 'Partiu!',
                descricao: 'Aperte os cintos e <b>Partiu!</b><br/> Ser organizado vai permitir que sua viagem seja inesquecível. E nós vamos de carona!',
                url: 'img/suitcase2.svg',
            }                        
        ];
  }

}
