import { environment } from './../../../environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginClass } from '../shared/login-class';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

constructor(private http: HttpClient) { }
    tokenDTO = {
      token: ''
    }

  login(login: LoginClass) {
    return this.http.post(`${environment.api}/users/login`, login);
  }

  verifyToken() {
    this.tokenDTO.token = localStorage.getItem('token') || '';
    return this.http.post(`${environment.api}/users/verificartoken`, this.tokenDTO);
  }

  isLogin(){
    if (localStorage.getItem('token') != null) {
      console.log('teste')
      return true;
    }
    return false;
  }

}


