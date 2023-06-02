import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Jogador } from '../interface/dto/jogador';
import { JogadorInput } from '../interface/input/jogadorInput';

@Injectable({
  providedIn: 'root'
})
export class JogadorService {

constructor(private http: HttpClient) { }

urlJogador = `${environment.api}/jogador`;

getById(id: number) {
  return this.http.get(`${this.urlJogador}/` + id);
}

async getByUser(id: number) {
  return this.http.get(`${this.urlJogador}/usuario/` + id);
}

create(jogador: JogadorInput) {
  return this.http.post(`${this.urlJogador}`, jogador);
}

getAll() {
  return this.http.get(`${this.urlJogador}`);
}

edit(jogador: JogadorInput, id: number) {
  return this.http.put(`${this.urlJogador}/${id}`, jogador);
}

ativar(jogador: Jogador, id: number) {
  return this.http.put(`${this.urlJogador}/ativar/${id}`, jogador);
}

delete(id: number) {

  return this.http.delete(`${this.urlJogador}/${id}`);
}

}
