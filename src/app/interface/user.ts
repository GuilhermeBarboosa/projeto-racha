import { DefaultDto } from "./defaultDto";

export interface User extends DefaultDto{
    id?: number | null;
    nome: string | undefined;
    idade: number | undefined;
    telefone: string | undefined;
    email: string | undefined;
    senha: string | undefined;
    role: number | undefined;
}
