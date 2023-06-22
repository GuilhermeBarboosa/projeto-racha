import { Component, Input } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-jogo-form',
    templateUrl: './jogo-form.component.html',
    styleUrls: ['./jogo-form.component.css']
})
export class JogoFormComponent {
    @Input() formulario! : FormGroup;
    constructor () {}
}
