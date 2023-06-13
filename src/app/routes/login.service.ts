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

  obterClaims(){
    return this.http.post(`${environment.api}/auth/obterClaims`, localStorage.getItem('token'));
  }

  isLogin() {
    this.verifyToken().subscribe((res) => {
      var data = JSON.parse(JSON.stringify(res));
      if (data.status == 200) {
        return true;
      }
      else{
        return false;
      }
    });

    if (localStorage.getItem('token') != null) {
      return true;
    }

    return false;
  }
}
