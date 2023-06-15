import { DefaultDto } from "./defaultDto";
import { Jogador } from "./jogador";
import { Racha } from "./racha";

export interface JogadorRacha extends DefaultDto{
  jogador: Jogador | undefined;
  racha: Racha | undefined;
}
