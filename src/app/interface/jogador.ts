import { DefaultDto } from "./defaultDto";
import { Posicao } from "./posicao";

export class Jogador extends DefaultDto{
  id?: number | undefined;
  user : number | undefined;
  posicao : Posicao | undefined;
  gols?: number | undefined;
  assistencias?: number | undefined;
}
