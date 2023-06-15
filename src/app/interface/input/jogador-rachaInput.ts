import { JogadorRacha } from "../dto/jogador-racha";

export class JogadorRachaInput {
  jogador: number | undefined;
  racha: number | undefined;

  constructor(jogadorRacha: JogadorRacha) {
    this.jogador = jogadorRacha.jogador?.id;
    this.racha = jogadorRacha.racha?.id;
  }
}
