import { DefaultDto } from "./defaultDto";
import { Posicao } from "./posicao";
import { User } from "./user";


export interface Jogador extends DefaultDto{
  nome : string | undefined;
  cpf: string | undefined;
  posicao : string | undefined;
  gols: number | undefined;
  assistencias: number | undefined;
}
