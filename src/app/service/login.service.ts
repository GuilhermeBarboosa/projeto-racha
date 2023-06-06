import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { LoginInput } from '../interface/input/loginInput';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(login: LoginInput) {
    return this.http.post(`${environment.api}/auth/login`, login);
  }

  verifyToken() {
    return this.http.post(`${environment.api}/auth/verifyToken`, {});
  }

  isLogin() {
    if (localStorage.getItem('token') != null && this.verifyToken()) {
      return true;
    }
    return false;
  }
}
