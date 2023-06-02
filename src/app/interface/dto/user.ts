import { DefaultDto } from "./defaultDto";
import { Jogador } from "./jogador";
import { Role } from "./role";

export interface User extends DefaultDto{
    id?: number | null;
    nome: string | undefined;
    idade: number | undefined;
    telefone: string | undefined;
    jogador?: Jogador | undefined;
    email: string | undefined;
    senha: string | undefined;
    role: Role | undefined;
}
