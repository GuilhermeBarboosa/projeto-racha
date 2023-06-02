import { Jogador } from "../dto/jogador";

export class JogadorInput {
  user: number | undefined;

  posicao: number | undefined;

  gols: number | undefined;

  assistencias: number | undefined;

  constructor(jogador: any) {
    this.user = jogador.user!;
    this.posicao = jogador.posicao;
    this.gols = jogador.gols;
    this.assistencias = jogador.assistencias;
  }
}
