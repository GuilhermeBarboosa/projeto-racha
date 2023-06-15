import { Racha } from "../dto/racha";

export class RachaInput {
  nome: string | undefined;
  caixa: number | undefined;
  quadra: number | undefined;


  constructor(racha: Racha) {
    this.nome = racha.nome;
    this.caixa = racha.caixa;
    this.quadra = racha.quadra?.id;
  }
}
