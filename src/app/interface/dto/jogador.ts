import { DefaultDto } from "./defaultDto";
import { Posicao } from "./posicao";
import { User } from "./user";


export interface Jogador extends DefaultDto{
  nome : string;
  cpf: string;
  posicao : string;
  gols: number;
  assistencias: number;
}
