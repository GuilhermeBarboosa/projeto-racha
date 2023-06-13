import { Jogador } from "./jogador";
import { Racha } from "./racha";

export interface JogadorRacha {
  id?: number | undefined;
  jogador: Jogador | undefined;
  racha: Racha | undefined;
}
