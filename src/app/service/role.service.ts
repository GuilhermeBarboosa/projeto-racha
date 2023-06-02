import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {}

  getById(id: number) {
    return this.http.get(`${environment.api}/role/` + id);
  }

  getAll() {
    return this.http.get(`${environment.api}/role`);
  }

}
