import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-excluir',
  templateUrl: './button-excluir.component.html',
  styleUrls: ['./button-excluir.component.css']
})
export class ButtonExcluirComponent implements OnInit {

  @Input() value: String | undefined;
  constructor() { }

  ngOnInit() {
  }

}
