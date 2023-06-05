import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-registrar',
  templateUrl: './button-registrar.component.html',
  styleUrls: ['./button-registrar.component.css']
})
export class ButtonRegistrarComponent implements OnInit {

  @Input() value?: String;

  constructor() { }

  ngOnInit() {
  }

}
