import { DefaultDto } from "./defaultDto";
import { Jogador } from "./jogador";
import { Role } from "./role";

export interface User extends DefaultDto{
    nome: string | undefined;
    idade: number | undefined;
    telefone: string | undefined;
    cpf: string | undefined;
    jogador?: Jogador | undefined;
    email: string | undefined;
    senha: string | undefined;
    role: Role | undefined;
}
