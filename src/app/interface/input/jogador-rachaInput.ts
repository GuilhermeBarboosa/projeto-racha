export class JogadorRachaInput {
  jogador: number | undefined;
  racha: number | undefined;

  constructor(jogador: number | undefined, racha: number | undefined) {
    this.jogador = jogador;
    this.racha = racha;
  }
}
