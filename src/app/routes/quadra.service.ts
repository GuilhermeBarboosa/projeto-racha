import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { QuadraInput } from '../interface/input/quadraInput';

@Injectable({
  providedIn: 'root'
})
export class QuadraService {

  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlQuadra = `${environment.api}/quadra`;

  getById(id: number) {
    return this.http.get(`${this.urlQuadra}/` + id);
  }

  findPosicao(quadra: string) {
    return this.http.get(`${this.urlQuadra}/desc/` + quadra);
  }

  create(quadra: QuadraInput) {
    return this.http.post(`${this.urlQuadra}`, quadra);
  }

  getAll() {
    return this.http.get(`${this.urlQuadra}`);
  }

  edit(quadra: QuadraInput, id: number) {
    return this.http.put(`${this.urlQuadra}/${id}`, quadra);
  }

  ativar(quadra: QuadraInput, id: number) {
    return this.http.put(`${this.urlQuadra}/ativar/${id}`, quadra);
  }

  delete(id: number) {
    return this.http.delete(`${this.urlQuadra}/${id}`);
  }
}
