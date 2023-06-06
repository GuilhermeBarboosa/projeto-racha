import { LoginService } from 'src/app/routes/login.service';
import { NotifierService } from './../../shared/notifier.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private notifier: NotifierService,
    private loginService : LoginService) { }

  ngOnInit() {
    this.loginService.verifyToken();
  }

}
