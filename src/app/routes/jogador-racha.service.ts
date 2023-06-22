import { JogadorRacha } from './../interface/dto/jogador-racha';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { JogadorRachaInput } from '../interface/input/jogador-rachaInput';

@Injectable({
  providedIn: 'root'
})
export class JogadorRachaService {

  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlJogadorRacha = `${environment.api}/jogadorRacha`;

  getById(id: number) {
    return this.http.get(`${this.urlJogadorRacha}/` + id);
  }

  getByRacha(id: number) {
    return this.http.get(`${this.urlJogadorRacha}/racha/` + id);
  }

  getByUser(id: number) {
    return this.http.get(`${this.urlJogadorRacha}/usuario/` + id);
  }

  create(jogadorRacha: JogadorRachaInput[]) {
    return this.http.post(`${this.urlJogadorRacha}`, jogadorRacha);
  }

  getAll() {
    return this.http.get(`${this.urlJogadorRacha}`);
  }

  edit(jogadorRacha: JogadorRachaInput, id: number) {
    return this.http.put(`${this.urlJogadorRacha}/${id}`, jogadorRacha);
  }

  ativar(jogadorRacha: JogadorRacha, id: number) {
    return this.http.put(`${this.urlJogadorRacha}/ativar/${id}`, jogadorRacha);
  }

  delete(id: number) {
    return this.http.delete(`${this.urlJogadorRacha}/${id}`);
  }

}
