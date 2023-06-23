import { DefaultDto } from "./defaultDto";
import { Jogador } from "./jogador";
import { Role } from "./role";

export interface User extends DefaultDto{
    nome: string;
    idade: number;
    telefone: string;
    cpf: string;
    jogador?: Jogador;
    email: string;
    senha: string;
    idRole: number;
    role: string;
}
