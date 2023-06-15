import { JogadorRacha } from "../dto/jogador-racha";

export class JogadorRachaInput {
  jogador: number | undefined;
  racha: number | undefined;

  constructor(jogadorRacha: any) {
    this.jogador = jogadorRacha.jogador;
    this.racha = jogadorRacha.racha;
  }
}
