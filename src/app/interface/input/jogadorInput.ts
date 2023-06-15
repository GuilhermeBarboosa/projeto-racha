import { Jogador } from "../dto/jogador";

export class JogadorInput {
  user!: number ;

  posicao!: number;

  gols!: number;

  assistencias!: number;

  constructor(jogador: any) {
    this.user = jogador.user!;
    this.posicao = jogador.posicao!;
    this.gols = jogador.gols!;
    this.assistencias = jogador.assistencias!;
  }
}
