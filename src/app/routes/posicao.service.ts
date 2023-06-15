import { environment } from './../../../environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PosicaoInput } from '../interface/input/posicaoInput';
import { Posicao } from '../interface/dto/posicao';

@Injectable({
  providedIn: 'root',
})
export class PosicaoService {
  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlPosicao = `${environment.api}/posicao`;

  getById(id: number) {
    return this.http.get(`${this.urlPosicao}/` + id);
  }

  findPosicao(posicao: string) {
    return this.http.get(`${this.urlPosicao}/desc/` + posicao);
  }

  create(posicao: PosicaoInput) {
    return this.http.post(`${this.urlPosicao}`, posicao);
  }

  getAll() {
    return this.http.get(`${this.urlPosicao}`);
  }

  edit(posicao: PosicaoInput, id: number) {
    return this.http.put(`${this.urlPosicao}/${id}`, posicao);
  }

  ativar(posicao: PosicaoInput, id: number) {
    return this.http.put(`${this.urlPosicao}/ativar/${id}`, posicao);
  }

  delete(id: number) {
    return this.http.delete(`${this.urlPosicao}/${id}`);
  }

}
