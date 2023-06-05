import { Jogador } from "../dto/jogador";

export class JogadorInput {
  user: number = 0;

  posicao: number = 0;

  gols: number = 0;

  assistencias: number = 0;

  constructor(jogador: any) {
    this.user = jogador.user!;
    this.posicao = jogador.posicao;
    this.gols = jogador.gols;
    this.assistencias = jogador.assistencias;
  }
}
