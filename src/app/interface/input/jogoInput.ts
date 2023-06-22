export class JogoInput {
  data: string | undefined;
  valorPago: number | undefined;
  racha: number | undefined;

  constructor(jogo: any) {
    this.data = jogo.data;
    this.valorPago = jogo.valorPago;
    this.racha = jogo.racha;
  }
}
