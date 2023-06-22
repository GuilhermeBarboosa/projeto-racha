import { environment } from './../../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JogoInput } from '../interface/input/jogoInput';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlJogo = `${environment.api}/jogo`;

  getById(id: number) {
    return this.http.get(`${this.urlJogo}/` + id);
  }

  getByIdRacha(id: number) {
    return this.http.get(`${this.urlJogo}/racha/` + id);
  }

  create(jogo: JogoInput) {
    return this.http.post(`${this.urlJogo}`, jogo);
  }

  getAll() {
    return this.http.get(`${this.urlJogo}`);
  }

  edit(jogo: JogoInput, id: number) {
    return this.http.put(`${this.urlJogo}/${id}`, jogo);
  }

  ativar(jogo: JogoInput, id: number) {
    return this.http.put(`${this.urlJogo}/ativar/${id}`, jogo);
  }

  delete(id: number) {
    return this.http.delete(`${this.urlJogo}/${id}`);
  }
}
