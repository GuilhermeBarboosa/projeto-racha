import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-posicao-form',
  templateUrl: './posicao-form.component.html',
  styleUrls: ['./posicao-form.component.css']
})
export class PosicaoFormComponent implements OnInit {

  @Input() posicaoForm!: FormGroup
  constructor() { }

  ngOnInit() {
  }

}
