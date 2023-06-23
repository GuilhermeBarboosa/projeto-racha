export class RachaInput {
  nome: string | undefined;
  caixa: number | undefined;
  quadra: number | undefined;


  constructor(racha: any) {
    this.nome = racha.nome;
    if(racha.caixa == null) this.caixa = 0;
    else this.caixa = racha.caixa;
    this.quadra = racha.quadra!;
  }
}
