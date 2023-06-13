import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Racha } from '../interface/dto/racha';
import { RachaInput } from '../interface/input/rachaInput';

@Injectable({
  providedIn: 'root'
})
export class RachaService {

  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlRacha = `${environment.api}/racha`;

  getById(id: number) {
    return this.http.get(`${this.urlRacha}/` + id);
  }

  getByUser(id: number) {
    return this.http.get(`${this.urlRacha}/usuario/` + id);
  }

  create(racha: RachaInput) {
    return this.http.post(`${this.urlRacha}`, racha);
  }

  getAll() {
    return this.http.get(`${this.urlRacha}`);
  }

  edit(racha: RachaInput, id: number) {
    return this.http.put(`${this.urlRacha}/${id}`, racha);
  }

  ativar(racha: Racha, id: number) {
    return this.http.put(`${this.urlRacha}/ativar/${id}`, racha);
  }

  delete(id: number) {
    return this.http.delete(`${this.urlRacha}/${id}`);
  }
}
