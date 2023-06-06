import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'src/app/shared/notifier.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nomeUsuario = localStorage.getItem('nome');
  Logout = "Logout";

  constructor(private router: Router,
    private notifier: NotifierService) { }


  ngOnInit() {

  }

  logout(){
    localStorage.clear();
    this.notifier.ShowSuccess('Logout efetuado com sucesso!');
    this.router.navigateByUrl('/authentication/login');
  }
}
