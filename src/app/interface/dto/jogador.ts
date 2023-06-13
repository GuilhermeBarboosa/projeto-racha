import { DefaultDto } from "./defaultDto";
import { Posicao } from "./posicao";
import { User } from "./user";


export interface Jogador extends DefaultDto{
  id?: number | undefined;
  user : User | undefined;
  posicao : Posicao | undefined;
  gols: number | undefined;
  assistencias: number | undefined;
}
