import { DefaultDto } from "./defaultDto";

export class Jogador extends DefaultDto{
  id?: number | undefined;
  user : number | undefined;
  posicao : number | undefined;
  gols?: number | undefined;
  assistencias?: number | undefined;
}
