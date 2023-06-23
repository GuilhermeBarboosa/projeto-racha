export class UserInput {
  nome: string | undefined;

  idade: number | undefined;

  telefone: string | undefined;

  cpf : string | undefined;

  email: string | undefined;

  senha: string | undefined ;

  role : number | undefined;


  constructor(user: any) {
    this.nome = user.nome;
    this.idade = user.idade;
    this.telefone = user.telefone;
    this.cpf = user.cpf;
    this.email = user.email;
    this.senha = user.senha;
    this.role = user.role!;
  }
}
