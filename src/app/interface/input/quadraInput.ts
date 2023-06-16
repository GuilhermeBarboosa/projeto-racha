export class QuadraInput {
  nome: string | undefined;

  constructor(quadra: any) {
    this.nome = quadra.nome;
  }
}
