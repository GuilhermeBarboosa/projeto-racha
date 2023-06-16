import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-quadra-form',
    templateUrl: './quadra-form.component.html',
    styleUrls: ['./quadra-form.component.css']
})
export class QuadraFormComponent {
    @Input() quadraForm!: FormGroup;
    constructor () {}
}
