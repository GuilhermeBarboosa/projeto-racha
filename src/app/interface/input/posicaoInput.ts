import { Posicao } from "../dto/posicao";

export class PosicaoInput {
  id?: number;
  posicao?: string;

  constructor(posicao: Posicao) {
    this.id = posicao.id;
    this.posicao = posicao.posicao;
  }
}
