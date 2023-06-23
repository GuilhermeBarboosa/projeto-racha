export class QuadraInput {
  nome: string | undefined;
  valorQuadra: number | undefined;

  constructor(quadra: any) {
    this.nome = quadra.nome;
    this.valorQuadra = quadra.valorQuadra;
  }
}
