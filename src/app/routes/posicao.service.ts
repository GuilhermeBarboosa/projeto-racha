import { environment } from './../../../environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PosicaoService {
  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });


  getById(id: number) {
    return this.http.get(`${environment.api}/posicao/` + id);
  }

  getAll() {
    return this.http.get(`${environment.api}/posicao`);
  }

}
