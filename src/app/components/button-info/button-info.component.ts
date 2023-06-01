import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-info',
  templateUrl: './button-info.component.html',
  styleUrls: ['./button-info.component.css']
})
export class ButtonInfoComponent implements OnInit {


   @Input() value: String | undefined;
  constructor() { }

  ngOnInit() {
  }

}
