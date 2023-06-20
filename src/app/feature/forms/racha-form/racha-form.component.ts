import { Component, Input } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-racha-form',
    templateUrl: './racha-form.component.html',
    styleUrls: ['./racha-form.component.css']
})
export class RachaFormComponent {
    @Input() formulario! : FormGroup;
    constructor () {}
}
