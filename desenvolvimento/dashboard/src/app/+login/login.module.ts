import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdIconModule } from '@angular2-material/icon';
import { MdInputModule } from '@angular2-material/input';
import { MdToolbarModule } from '@angular2-material/toolbar';

import { loginRouting } from './login.routing';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,

        MdButtonModule,
        MdCardModule,
        MdIconModule,
        MdInputModule,
        MdToolbarModule,
        MdGridListModule,

        loginRouting
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
    ]
})
export class LoginModule { }
