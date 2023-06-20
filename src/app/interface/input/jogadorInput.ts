import { Jogador } from "../dto/jogador";

export class JogadorInput {
  user!: number ;

  posicao!: number;

  gols!: number;

  assistencias!: number;

  constructor(jogador: any) {
    this.user = jogador.user!;
    this.posicao = jogador.posicao!;
    if(jogador.gols == null) this.gols = 0;
    else     this.gols = jogador.gols!;
    if(jogador.assistencias == null) this.assistencias = 0;
    else this.assistencias = jogador.assistencias!;
  }
}
