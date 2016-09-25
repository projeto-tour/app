import { Directive, AfterViewChecked } from '@angular/core';

import { ComponentHandler } from 'material-design-lite';

declare var componentHandler: ComponentHandler;

@Directive({
    selector: '[appMdl]'
})
export class MdlDirective implements AfterViewChecked {

    ngAfterViewChecked() {
        if (componentHandler) {
            componentHandler.upgradeAllRegistered();
        }
    }

}
