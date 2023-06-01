
import { environment } from './../../../environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  async getById(id: number) {
    return this.http.get(`${environment.api}/user/` + id);
  }

  create(user: User) {
    return this.http.post(`${environment.api}/user`, user);
  }

  getAll() {
    return this.http.get(`${environment.api}/user`);
  }

  edit(user: User, id: number) {

    return this.http.put(`${environment.api}/user/${id}`, user);
  }

  ativar(user: User, id: number) {
    return this.http.put(`${environment.api}/user/ativar/${id}`, user);
  }

  delete(id: number) {

    return this.http.delete(`${environment.api}/user/${id}`);
  }

}
