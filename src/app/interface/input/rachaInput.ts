export class RachaInput {
  nome: string | undefined;
  caixa: number | undefined;
  quadra: number | undefined;


  constructor(nome?: string, caixa?: number, quadra?: number) {
    this.nome = nome;
    this.caixa = caixa;
    this.quadra = quadra;
  }
}
