import { Jogador } from "../dto/jogador";

export class JogadorInput {
  user!: number ;

  posicao!: number;

  gols!: number;

  assistencias!: number;

  constructor(jogador: Jogador) {
    this.user = jogador.user!.id!;
    this.posicao = jogador.posicao?.id!;
    this.gols = jogador.gols!;
    this.assistencias = jogador.assistencias!;
  }
}
