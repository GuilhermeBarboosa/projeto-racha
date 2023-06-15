import { Posicao } from "../dto/posicao";

export class PosicaoInput {
  posicao?: string;

  constructor(posicao: any) {
    this.posicao = posicao.posicao;
  }
}
