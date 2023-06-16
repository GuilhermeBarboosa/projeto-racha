import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-jogador-form',
    templateUrl: './jogador-form.component.html',
    styleUrls: ['./jogador-form.component.css']
})
export class JogadorFormComponent {
    @Input() jogadorForm!: FormGroup;
    constructor () {}
}
