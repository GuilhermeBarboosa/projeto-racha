import { Injectable } from '@angular/core';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root',
})
export class TokenJwtService {
  constructor() {}

  setToken(token: any) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('email', token.email);
    localStorage.setItem('id', token.id);
    localStorage.setItem('nome', token.nome);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
