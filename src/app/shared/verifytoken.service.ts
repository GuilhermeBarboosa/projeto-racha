import { LoginServiceService } from './../service/login-service.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from './notifier.service';

@Injectable({
  providedIn: 'root',
})
export class VerifytokenService {
  constructor(private loginService: LoginServiceService, private router: Router, private notifier: NotifierService) {}

  verifyJWT() {
    if (localStorage.getItem('token') != null) {
      this.loginService.verifyToken().subscribe(
        (data) => {
          this.router.navigateByUrl('/home');
        },
        (error) => {
          localStorage.clear();
          this.notifier.ShowInfo('Faça seu login');
          this.router.navigateByUrl('/login');
        }
      );
    }
  }
}
