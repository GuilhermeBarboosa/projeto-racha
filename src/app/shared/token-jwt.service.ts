import { LoginService } from 'src/app/routes/login.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class TokenJwtService {
  constructor(private loginService: LoginService) {}

  setToken(token: any) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('email', token.email);
    // this.loginService.obterClaims().subscribe(
    //   (data: any) => {
    //     var data = JSON.parse(JSON.stringify(data));
    //     localStorage.setItem('nome', data.nome);
    //     localStorage.setItem('id', data.id);
    //     localStorage.setItem('role', data.role);
    //   }
    // );
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
